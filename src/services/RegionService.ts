/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from "../common/AppError";
import ActorType from "../domains/ActorType";
import OperatorDomain from "../domains/OperatorDomain";
import CatalogService from "./CatalogService";
import Config from '../common/Config';
import { parse4update } from "../common/Catalog";
import { ResponseCode } from "../common/ResponseCode";
import RegionAcquireReqDto from "../resources/dto/RegionAcquireReqDto";
import RegionManage from "../repositories/postgres/RegionManage";
import { DateTimeFormatString } from "../common/Transform";
import RegionReqDto from "../resources/dto/RegionReqDto";
import EntityOperation from "../repositories/EntityOperation";
import RegionApprovalManage from "../repositories/postgres/RegionApprovalManage";
import { sprintf } from "sprintf-js";
import Generator from "../common/Generator";
import NotificationDomain from "../domains/NotificationDomain";
import NotificationService from "./NotificationService";
import RegionDeleteReqDto from "../resources/dto/RegionDeleteReqDto";
import config = require('config');
import CatalogDomain from "../domains/CatalogDomain";
import { isArray } from "class-validator";
const momentTz = require('moment-timezone');
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

export default class RegionService {
    static readonly ADD = 1;
    static readonly REMOVE = 2;

    /**
     * Region開始終了申請取得
     */
    static async aquire (dto: RegionAcquireReqDto, operator: OperatorDomain) {
        // アクター種別を取得
        const catalog = await CatalogService.searchActorCatalog(operator, operator.actorCode);
        if (catalog.actorName !== ActorType.PXR_ROOT && catalog.actorName !== ActorType.REGION_ROOT) {
            throw new AppError(Message.NOT_AUTHORIZED_OPERATOR, 401);
        }
        const results = await EntityOperation.getRegionApplications(dto.inApproved, catalog.actorName === ActorType.REGION_ROOT, operator);
        return this.createRegionResponse(results);
    }

    /**
     * Region作成
     * @param dto
     * @param operator
     */
    static async region (dto: RegionReqDto, operator: OperatorDomain) {
        let entity;
        if (dto.id) {
            // IDがあればRegion開始終了申請に等しいレコードが存在するか
            entity = await this.isExists(dto.id, RegionService.ADD, operator);
        }

        // Region開始終了申請に登録
        entity = await this.acquireInfo(entity, RegionService.ADD, operator, dto.isDraft, dto);

        // レコード登録
        entity = await EntityOperation.saveRegionEntity(entity);

        if (entity.regionApprovalManage) {
            // 承認状態に変更
            entity.regionApprovalManage.status = RegionApprovalManage.APPROVAL_STATUS;

            // 承認内容をカタログへ反映させる
            await RegionService.updateJoinDetails(entity, operator);

            // 承認情報を保存
            await RegionService.saveApprovalInfo(entity, operator);
        }

        // レスポンスを返す
        return entity;
    }

    /**
     * Region削除
     * @param dto
     * @param operator
     * リファクタ履歴
     *  separate: checkActorRelation (複雑度緩和のため)
     */
    static async regionRemove (dto: RegionDeleteReqDto, operator: OperatorDomain) {
        let entity;
        if (dto.id) {
            // IDがあればRegion開始終了申請に等しいレコードが存在するか
            entity = await this.isExists(dto.id, RegionService.REMOVE, operator);
        }

        if (!dto.id) {
            // Region開始終了申請管理、Region開始終了申請承認管理に等しいレコードがあればエラー
            const entities = await EntityOperation.searchExistsRegions(operator.actorCode, RegionService.REMOVE, dto.regionCode);
            if (entities && entities.length > 0) {
                throw new AppError(Message.ALREADY_IS_AS_REQUESTED, 400);
            }
        }

        // Regionの存在確認
        const regionCatalog = await CatalogService.get(operator, dto.regionCode) as CatalogDomain;
        /* 取得0件の場合はCatalogServiceでエラー送出するため、到達不可
        if (!regionCatalog) {
            throw new AppError(Message.NO_EXIST_REGION, 400);
        }
        */
        if (regionCatalog.rawData['template']['status'] && regionCatalog.rawData['template']['status'] === 'open') {
            throw new AppError(Message.REGIONS_IN_OPERATION, 400);
        }

        // アクターとの紐づき確認
        await this.checkActorRelation(operator, dto);

        // appおよびwfとの紐づき確認
        await this.checkAppWfRelation(operator, regionCatalog);

        // Region開始終了申請に登録
        entity = await this.acquireInfo(entity, RegionService.REMOVE, operator, dto.isDraft, null, Number(regionCatalog.code), Number(regionCatalog.version));

        // レコード登録
        entity = await EntityOperation.saveRegionEntity(entity);

        if (entity.regionApprovalManage) {
            // 承認状態に変更
            entity.regionApprovalManage.status = RegionApprovalManage.APPROVAL_STATUS;

            // 承認内容をカタログへ反映させる
            await RegionService.updateJoinDetails(entity, operator);

            // 承認情報を保存
            await RegionService.saveApprovalInfo(entity, operator);
        }

        // レスポンスを返す
        return entity;
    }

    /**
     * アクターとの紐づきを確認する
     * @param operator
     * @param dto
     */
    private static async checkActorRelation (operator: OperatorDomain, dto: RegionDeleteReqDto) {
        let isError = true;
        const actorCatalog = await CatalogService.get(operator, operator.actorCode) as CatalogDomain;
        const actorTemplate = actorCatalog.rawData;
        if (actorTemplate['template'] && actorTemplate['template']['region'] && Array.isArray(actorTemplate['template']['region'])) {
            for (const region of actorTemplate['template']['region']) {
                if (Number(region['_value']) === dto.regionCode) {
                    isError = false;
                    break;
                }
            }
        }
        if (isError) {
            throw new AppError(Message.NOT_LINK_ACTOR, 400);
        }
    }

    /**
     * appおよびwfとの紐づきを確認する
     * @param operator
     * @param regionCatalog
     */
    private static async checkAppWfRelation (operator: OperatorDomain, regionCatalog: CatalogDomain) {
        // 運営中のRegionに参加しているappおよびwfが存在しない
        const regionTemp = regionCatalog.rawData.template;
        if ((isArray(regionTemp['app-alliance']) && regionTemp['app-alliance'].length) || (isArray(regionTemp['wf-alliance']) && regionTemp['wf-alliance'].length)) {
            throw new AppError(Message.APP_WF_JOIN_IN_REGION, 400);
        }
    }

    /**
     * クエリパラムをdtoにセットする
     * @param dto
     * @param query
     * @returns dto
     */
    static async convertReqQuery (dto: RegionAcquireReqDto, query: any) {
        let inApproved;
        if (query['in_approved'] === 'true') {
            inApproved = true;
        } else if (query['in_approved'] === 'false') {
            inApproved = false;
        } else {
            // 未設定の場合はfalseと同等
            inApproved = false;
        }
        dto.inApproved = inApproved;

        return dto;
    }

    /**
     * レスポンスを作成する
     * @param results
     * リファクタ履歴
     * separate: createData (複雑度緩和のため)
     */
    static async createRegionResponse (results: RegionManage[]) {
        const json: any[] = [];
        for (const result of results) {
            let data;
            if (result.type === RegionService.ADD) {
                data = this.createData(result, data, 'add');
            } else {
                data = this.createData(result, data, 'remove');
            }
            json.push(data);
        }
        return json;
    }

    private static createData (result: RegionManage, data: any, method: string) {
        const region = result.regionCode ? {
            _value: Number(result.regionCode),
            _ver: Number(result.regionVersion)
        } : null;
        data = {
            id: Number(result.id),
            type: Number(result.type),
            region: region,
            approvalActor: {
                _value: Number(result.approvalActorCode),
                _ver: Number(result.approvalActorVersion)
            },
            applicantActor: {
                _value: Number(result.applicantActorCode),
                _ver: Number(result.applicantActorVersion)
            },
            regionCatalog: method === 'add' ? JSON.parse(result.template) : null,
            expireAt: result.approvalExpireAt ? momentTz(result.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString) : null,
            isDraft: result.isDraft,
            status: result.regionApprovalManage ? Number(result.regionApprovalManage.status) : 0,
            comment: result.regionApprovalManage ? result.regionApprovalManage.comment : null,
            approver: result.regionApprovalManage ? result.regionApprovalManage.approver : null,
            approvalAt: result.regionApprovalManage
                ? result.regionApprovalManage.approvalAt
                    ? momentTz(result.regionApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString)
                    : null
                : null
        };
        return data;
    }

    static async isExists (id: number, type: number, operator: OperatorDomain) {
        const entity = await EntityOperation.searchExistsRegion(id, operator.actorCode, type);

        if (!entity) {
            throw new AppError(Message.NOT_EXISTS_APPLICATION_OF_ID, 400);
        }

        if (!entity.isDraft) {
            throw new AppError(Message.NOT_EXISTS_APPLICATION_OF_ID, ResponseCode.BAD_REQUEST);
        }
        return entity;
    }

    /**
     * 申請内容を整理し、エンティティを形成する
     * @param dto
     * @param operator
     * @param exists
     */
    static async acquireInfo (entity: RegionManage, type: number, operator: OperatorDomain, isDraft: boolean, dto?: RegionReqDto, regionCode?: number, regionVersion?: number) {
        if (!entity) {
            entity = new RegionManage();
        }

        entity.type = type;
        entity.regionCode = regionCode;
        entity.regionVersion = regionVersion;
        entity.callerBlockCode = operator.blockCode;
        entity.callerBlockVersion = operator.blockVersion;
        entity.applicantActorCode = operator.actorCode;
        entity.applicantActorVersion = operator.actorVersion;
        entity.template = entity.type === RegionService.ADD ? JSON.stringify(dto) : null;
        entity.isDraft = isDraft;
        entity.createdBy = operator.loginId;
        entity.updatedBy = operator.loginId;
        if (!entity.isDraft) {
            const authCode = await Generator.authCode(4);
            entity.regionApprovalManage = new RegionApprovalManage();
            entity.regionApprovalManage.authCode = authCode;
            entity.regionApprovalManage.approvalActorCode = operator.actorCode;
            entity.regionApprovalManage.approvalActorVersion = operator.actorVersion;
            entity.regionApprovalManage.createdBy = operator.loginId;
            entity.regionApprovalManage.updatedBy = operator.loginId;
        }

        return entity;
    }

    /**
     * 申請リクエストの結果を返却する
     * @param entity
     */
    static async applicationStartResponse (dto: RegionReqDto, entity: RegionManage) {
        const obj: any = {
            id: Number(entity.id),
            name: dto.name,
            description: dto.description,
            catalog: JSON.parse(entity.template),
            appendix: dto.appendix,
            isDraft: dto.isDraft
        };
        return obj;
    }

    static async applicationEndResponse (dto: RegionDeleteReqDto) {
        const obj: any = {
            id: Number(dto.id),
            regionCode: Number(dto.regionCode),
            comment: dto.comment,
            isDraft: dto.isDraft
        };
        return obj;
    }

    /**
     * 承認結果をカタログへ反映させる
     * @param entity
     * @param operator
     */
    static async updateJoinDetails (entity: RegionManage, operator: OperatorDomain) {
        // 承認の場合
        // (このメソッドを呼ぶ直前に承認状態に変更しているため、elseはありえない)
        if (entity.regionApprovalManage.status === RegionApprovalManage.APPROVAL_STATUS) {
            // アクターカタログを取得
            const actorCatalog = parse4update(await (
                await CatalogService.searchActorCatalog(operator, entity.applicantActorCode)
            ).rawData);

            if (entity.type === RegionManage.CREATE_TYPE) {
                // Region作成
                const entityTemplate = JSON.parse(entity.template);
                const template = entityTemplate['catalog'][0]['template'];
                const res = await CatalogService.extAdd(template, operator);

                const regionAlliance = {
                    key: 'region',
                    value: [
                        {
                            key: '_value',
                            value: Number(res['catalogItem']['_code']['_value'])
                        },
                        {
                            key: '_ver',
                            value: Number(res['catalogItem']['_code']['_ver'])
                        }
                    ]
                };
                // region-allianceを追加する
                actorCatalog.template.value.push(regionAlliance);

                // カタログ更新を実行
                await CatalogService.update(entity.applicantActorCode, actorCatalog, operator);
            } else {
                // Region削除
                await CatalogService.extDelete(entity.regionCode, operator);

                // valueの中からカタログコードが一致するregionを外す
                const actorArray: any[] = [];
                for (const index in actorCatalog.template.value) {
                    const prop = actorCatalog.template.value[index];
                    if (prop.key === 'region' && Number(prop.value[0].value) === Number(entity.regionCode)) {
                        continue;
                    }
                    actorArray.push(prop);
                }
                actorCatalog.template.value = actorArray;

                // カタログ更新を実行
                await CatalogService.update(entity.applicantActorCode, actorCatalog, operator);
            }
        }
    }

    /**
     * データベースへ保存
     * @param entity
     * @param operator
     */
    static async saveApprovalInfo (entity: RegionManage, operator: OperatorDomain) {
        entity.regionApprovalManage.approvalActorCode = operator.actorCode;
        entity.regionApprovalManage.approvalActorVersion = operator.actorVersion;
        entity.regionApprovalManage.approver = operator.loginId;
        entity.regionApprovalManage.approvalAt = momentTz(new Date()).utc();
        entity.regionApprovalManage.updatedBy = operator.loginId;
        await EntityOperation.saveRegionEntity(entity);
    }
}
