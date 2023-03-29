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
import RegionAcquireReqDto from "../resources/dto/RegionAcquireReqDto";
import RegionManage from "../repositories/postgres/RegionManage";
import { DateTimeFormatString } from "../common/Transform";
import EntityOperation from "../repositories/EntityOperation";
import RegionApprovalManage from "../repositories/postgres/RegionApprovalManage";
import { sprintf } from "sprintf-js";
import Generator from "../common/Generator";
import NotificationDomain from "../domains/NotificationDomain";
import NotificationService from "./NotificationService";
import config = require('config');
import ApprovalReqDto from "../resources/dto/ApprovalReqDto";
import CatalogDomain from "../domains/CatalogDomain";
import RegionStatusStartReqDto from "../resources/dto/RegionStatusStartReqDto";
import RegionStatusManage from "../repositories/postgres/RegionStatusManage";
import RegionStatusApprovalManage from "../repositories/postgres/RegionStatusApprovalManage";
import RegionStatusEndReqDto from "../resources/dto/RegionStatusEndReqDto";
const momentTz = require('moment-timezone');
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

export default class RegionStatusService {
    /**
     * Region開始終了申請取得
     */
    static async aquire (dto: RegionAcquireReqDto, operator: OperatorDomain) {
        // アクター種別を取得
        const catalog = await CatalogService.searchActorCatalog(operator, operator.actorCode);
        if (catalog.actorName !== ActorType.PXR_ROOT && catalog.actorName !== ActorType.REGION_ROOT) {
            throw new AppError(Message.NOT_AUTHORIZED_OPERATOR, 401);
        }
        const entities = await EntityOperation.getRegionStatusApplications(dto.inApproved, catalog.actorName === ActorType.REGION_ROOT, operator);
        return this.createRegionResponse(entities);
    }

    static async start (dto: RegionStatusStartReqDto, operator: OperatorDomain) {
        // Regionの存在確認
        await CatalogService.get(operator, dto.regionCode._value);

        await this.isExists(dto.regionCode._value, RegionStatusManage.START_TYPE, operator);

        // Region開始終了申請に登録
        let entity = await this.createRegionStatus(RegionStatusManage.START_TYPE, operator, dto.regionCode._value, dto.regionCode._ver);

        // レコード登録
        entity = await EntityOperation.saveRegionStatusEntity(entity);

        // 通知サービスへの登録
        await this.approvalLinkage(entity, operator);

        // 有効期限更新
        await EntityOperation.updateExpireAtRegionStatusEntity(entity);

        // レスポンスを返す
        return entity;
    }

    static async end (dto: RegionStatusEndReqDto, operator: OperatorDomain) {
        // Regionの存在確認
        await CatalogService.get(operator, dto.regionCode._value);

        await this.isExists(dto.regionCode._value, RegionStatusManage.END_TYPE, operator);

        // Region開始終了申請に登録
        let entity = await this.createRegionStatus(RegionStatusManage.END_TYPE, operator, dto.regionCode._value, dto.regionCode._ver, dto.requestComment, dto.endDate);

        // レコード登録
        entity = await EntityOperation.saveRegionStatusEntity(entity);

        // 通知サービスへの登録
        await this.approvalLinkage(entity, operator);

        // 有効期限更新
        await EntityOperation.updateExpireAtRegionStatusEntity(entity);

        // レスポンスを返す
        return entity;
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
     * @returns
     */
    static async createRegionResponse (entities: RegionStatusManage[]) {
        const json: any[] = [];
        for (const entity of entities) {
            const res = await RegionStatusService.applicationResponse(entity);
            json.push(res);
        }
        return json;
    }

    static async isExists (regionCode: number, type: number, operator: OperatorDomain) {
        const entities = await EntityOperation.searchExistsRegionStatus(regionCode, type);

        if (entities && entities.length > 0) {
            throw new AppError(Message.APPLIED_REGIONS, 400);
        }
    }

    /**
     * 申請内容を整理し、エンティティを形成する
     * @param dto
     * @param operator
     * @param exists
     */
    static async createRegionStatus (type: number, operator: OperatorDomain, regionCode: number, regionVersion: number, comment?: string, endDate?: string) {
        const entity = new RegionStatusManage();
        entity.type = type;
        entity.regionCode = regionCode;
        entity.regionVersion = regionVersion;
        entity.callerBlockCode = operator.blockCode;
        entity.callerBlockVersion = operator.blockVersion;
        entity.applicantActorCode = operator.actorCode;
        entity.applicantActorVersion = operator.actorVersion;
        entity.endDate = endDate ? momentTz(endDate).utc() : null;
        entity.requestComment = comment;
        entity.createdBy = operator.loginId;
        entity.updatedBy = operator.loginId;
        const authCode = await Generator.authCode(4);
        entity.regionStatusApprovalManage = new RegionStatusApprovalManage();
        entity.regionStatusApprovalManage.authCode = authCode;
        entity.regionStatusApprovalManage.approvalActorCode = operator.actorCode;
        entity.regionStatusApprovalManage.approvalActorVersion = operator.actorVersion;
        entity.regionStatusApprovalManage.createdBy = operator.loginId;
        entity.regionStatusApprovalManage.updatedBy = operator.loginId;
        return entity;
    }

    /**
     * 承認要求のリクエスト送付
     * @param entity
     * @param operator
     */
    static async approvalLinkage (entity: RegionStatusManage, operator: OperatorDomain) {
        const noticeUrl = sprintf(config.get('region.noticeUrl'), entity.regionStatusApprovalManage.authCode);
        const detail: NotificationDomain = {
            type: 1,
            title: entity.type === RegionStatusManage.START_TYPE ? config.get('region.add.title.applying') : config.get('region.remove.title.applying'),
            content: entity.type === RegionStatusManage.START_TYPE ? config.get('region.add.content.applying') : config.get('region.remove.content.applying'),
            attribute: {
                actor: operator.actorCode,
                id: entity.id,
                region: entity.regionCode
            },
            category: {
                _value: parseInt(config.get('region.applying')),
                _ver: 1
            },
            destination: {
                blockCode: Number(config.get('noticeBlockCode')),
                operatorType: 3,
                isSendAll: true
            },
            approval: {
                noticeBlockCode: parseInt(config.get('noticeBlockCode')),
                noticeUrl: noticeUrl
            }
        };
        const result = await NotificationService.linkage([detail], operator);
        entity.approvalExpireAt = momentTz(result).utc();
    }

    /**
     * 申請リクエストの結果を返却する
     * @param entity
     */
    static async applicationResponse (entity: RegionStatusManage) {
        const obj: any = {
            id: Number(entity.id),
            type: Number(entity.type),
            approvalActor: {
                _value: entity.approvalActorCode ? Number(entity.approvalActorCode) : null,
                _ver: entity.approvalActorVersion ? Number(entity.approvalActorVersion) : null
            },
            applicantActor: {
                _value: Number(entity.applicantActorCode),
                _ver: Number(entity.applicantActorVersion)
            },
            regionCode: {
                _value: Number(entity.regionCode),
                _ver: Number(entity.regionVersion)
            },
            requestComment: entity.requestComment,
            endDate: entity.endDate ? momentTz(entity.endDate).tz(config.get('timezone')).format(DateTimeFormatString) : null,
            expireAt: entity.approvalExpireAt ? momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString) : null,
            status: Number(entity.regionStatusApprovalManage.status),
            comment: entity.regionStatusApprovalManage.comment,
            approvar: entity.regionStatusApprovalManage.approver,
            approvalAt: entity.regionStatusApprovalManage.approvalAt ? momentTz(entity.regionStatusApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString) : null
        };
        return obj;
    }

    /**
     * 承認対象を取得する
     * @param code
     * @param dto
     */
    static async getApprovalTarget (code: string, dto: ApprovalReqDto) {
        const entity = await EntityOperation.getApprovalManageWithAuthCode(RegionStatusApprovalManage, code) as RegionStatusManage;
        entity.regionStatusApprovalManage.status = dto.status;
        entity.regionStatusApprovalManage.comment = dto.comment;
        return entity;
    }

    /**
     * 承認結果をカタログへ反映させる
     * @param entity
     * @param operator
     */
    static async updateRegionStatus (entity: RegionStatusManage, operator: OperatorDomain) {
        // 承認かつ開始の場合
        if (entity.regionStatusApprovalManage.status === RegionApprovalManage.APPROVAL_STATUS && entity.type === RegionStatusManage.START_TYPE) {
            // アクターカタログを取得
            const regionCatalog = await (await CatalogService.searchActorCatalog(operator, entity.regionCode)).rawData;
            // statusをopenに設定
            regionCatalog.template.status = 'open';
            const regionCatalog4update = parse4update(regionCatalog);
            // カタログ更新
            await CatalogService.update(entity.regionCode, regionCatalog4update, operator);
        }
    }

    /**
     * データベースへ保存
     * @param entity
     * @param operator
     */
    static async saveApprovalInfo (entity: RegionStatusManage, operator: OperatorDomain) {
        entity.regionStatusApprovalManage.approvalActorCode = operator.actorCode;
        entity.regionStatusApprovalManage.approvalActorVersion = operator.actorVersion;
        entity.regionStatusApprovalManage.approver = operator.loginId;
        entity.regionStatusApprovalManage.approvalAt = momentTz(new Date()).utc();
        entity.regionStatusApprovalManage.updatedBy = operator.loginId;
        await EntityOperation.saveRegionStatusEntity(entity);
    }

    /**
     * 承認結果を連携、通知する
     * @param entity
     * @param operator
     */
    static async noticeLinkage (entity: RegionStatusManage, operator: OperatorDomain) {
        const details: NotificationDomain[] = [];

        const applicantBlockCode = await CatalogService.searchBlockCatalogWithActorCode(operator, entity.applicantActorCode);
        const approvalBlockCode = await CatalogService.searchBlockCatalogWithActorCode(operator, entity.regionStatusApprovalManage.approvalActorCode);

        let title = '';
        let content = '';
        let categoryCode = 0;
        const categoryVersion = 1;
        if (entity.regionStatusApprovalManage.status === RegionApprovalManage.APPROVAL_STATUS) {
            categoryCode = parseInt(config.get('region.approved'));
            if (entity.type === RegionManage.CREATE_TYPE) {
                title = config.get('region.add.title.approved');
                content = config.get('region.add.content.approved');
            } else {
                title = config.get('region.remove.title.approved');
                content = config.get('region.remove.content.approved');
            }
        } else {
            categoryCode = parseInt(config.get('region.nonApproved'));
            if (entity.type === RegionManage.CREATE_TYPE) {
                title = config.get('region.add.title.nonApproved');
                content = sprintf(config.get('region.add.content.nonApproved'), entity.regionStatusApprovalManage.comment);
            } else {
                title = config.get('region.remove.title.nonApproved');
                content = sprintf(config.get('region.remove.content.nonApproved'), entity.regionStatusApprovalManage.comment);
            }
        }

        const detail: NotificationDomain = {
            type: 0,
            title: title,
            content: content,
            attribute: {
                actor: operator.actorCode,
                id: entity.id,
                region: entity.regionCode ? entity.regionCode : undefined
            },
            category: {
                _value: categoryCode,
                _ver: categoryVersion
            },
            destination: {
                blockCode: approvalBlockCode,
                operatorType: 3,
                isSendAll: true
            }
        };
        details.push(detail);

        const detail2: NotificationDomain = {
            type: 0,
            title: title,
            content: content,
            attribute: {
                actor: operator.actorCode,
                id: entity.id,
                region: entity.regionCode ? entity.regionCode : undefined
            },
            category: {
                _value: categoryCode,
                _ver: categoryVersion
            },
            destination: {
                blockCode: applicantBlockCode,
                operatorType: 3,
                isSendAll: true
            }
        };
        details.push(detail2);

        await NotificationService.linkage(details, operator);
    }
}
