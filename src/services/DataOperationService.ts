/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../common/AppError';
import Config from '../common/Config';
import { connectDatabase } from '../common/Connection';
import { ResponseCode } from '../common/ResponseCode';
import { DateTimeFormatString } from '../common/Transform';
import OperatorDomain from '../domains/OperatorDomain';
import EntityOperation from '../repositories/EntityOperation';
import DataOperationManage from '../repositories/postgres/DataOperationManage';
import GetDataOperationReqDto from '../resources/dto/GetDataOperationReqDto';
import PostDataOperationReqDto from '../resources/dto/PostDataOperationReqDto';
import CatalogService from './CatalogService';
import BookManageService from './BookManageService';
/* eslint-enable */
import moment = require('moment-timezone');
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

export default class DataOperationService {
    // タイプ: 更新
    readonly TYPE_UPDATE: number = 2;

    /**
     * データ処理定義申請取得
     * @param operator
     * @param dto
     */
    public async getDataOperation (operator: OperatorDomain, dto: GetDataOperationReqDto): Promise<any> {
        // データ取得
        const entities = await EntityOperation.getDataOperationManages(dto.approvalRequest, dto.approved, Number(dto.offset), Number(dto.limit), Number(operator.actorCode));

        // レスポンス作成
        const response: any[] = [];
        for (const entity of entities) {
            response.push(this.createResponse(entity));
        }
        return response;
    }

    /**
     * データ処理定義申請登録
     * @param operator
     * @param dto
     */
    public async postDataOperation (operator: OperatorDomain, dto: PostDataOperationReqDto): Promise<any> {
        await this.judgeNs(operator, dto);

        // カタログ更新用のテンプレート作成
        const template = JSON.parse(JSON.stringify(dto));
        delete template['isDraft'];
        let entity: DataOperationManage;
        if (dto.id) {
            // idが存在すれば更新用データ取得
            entity = await EntityOperation.getDataOperationManage(dto.id, operator.actorCode, true);
            if (!entity) {
                throw new AppError(message.NOT_EXISTS_APPLICATION_OF_ID, ResponseCode.BAD_REQUEST);
            }
            entity.template = JSON.stringify(template);
            entity.isDraft = dto.isDraft;
            entity.updatedBy = operator.loginId;
        } else {
            entity = new DataOperationManage();
            entity.template = JSON.stringify(template);
            entity.applicationActorCode = operator.actorCode;
            entity.applicationBlockCode = operator.blockCode;
            entity.isDraft = dto.isDraft;
            entity.createdBy = operator.loginId;
            entity.updatedBy = operator.loginId;
        }

        if (!dto.isDraft) {
            // 下書きでなければ承認用データ作成
            entity.applicationAt = new Date();
        }

        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            if (!dto.isDraft) {
                const reqCodes = [];
                for (const catalog of dto.catalog) {
                    if (catalog.type === this.TYPE_UPDATE) {
                        reqCodes.push({
                            _code: {
                                _value: catalog.template.catalogItem._code._value,
                                _ver: null
                            }
                        });
                    }
                }
                // カタログサービスから現在のカタログを取得
                let currentOperationCatalogs: any[] = [];
                if (reqCodes.length > 0) {
                    currentOperationCatalogs = await CatalogService.getCatalogInfos(reqCodes, operator);
                }
                // カタログサービスへリクエスト
                const registerRes = await CatalogService.postUpdateSetRegister(operator, template);
                const res = await CatalogService.postUpdateSetRequest(operator, Number(registerRes['id']), operator.actorCode);
                delete res['id'];
                entity.template = JSON.stringify(res);
                // 更新後のカタログを取得
                let operationCatalogs: any[] = [];
                if (reqCodes.length > 0) {
                    operationCatalogs = await CatalogService.getCatalogInfos(reqCodes, operator);
                }
                // 同意が必要なカタログのチェック
                const codes = this.checkConsentDataType(currentOperationCatalogs, operationCatalogs);
                if (codes.length > 0) {
                    await BookManageService.postSettingsUpdate(codes, operator);
                }
            }

            if (dto.id) {
                // データ更新
                await EntityOperation.updateDataOperationManage(trans, entity);
            } else {
                // データ登録
                const ret = await EntityOperation.insertDataOperationManage(trans, entity);
                entity.id = Number(ret.identifiers[0].id);
            }
        });

        // レスポンス作成
        return this.createResponse(entity);
    }

    /**
     * 同意が必要なデータ種に変化がないことをチェックする
     * @param beforeCatalogs
     * @param afterCatalogs
     */
    private checkConsentDataType (beforeCatalogs: any[], afterCatalogs: any[]) {
        const codes = [];
        for (const after of afterCatalogs) {
            let requireConsent = false;
            const before = beforeCatalogs.find(elem => Number(elem['catalogItem']['_code']['_value']) === Number(after['catalogItem']['_code']['_value']));
            const beforeOperations: any[] = before['template']['store'] ? before['template']['store'] : before['template']['share'];
            const afterOperations: any[] = after['template']['store'] ? after['template']['store'] : after['template']['share'];
            for (const afterOpe of afterOperations) {
                const afterDataTypes = this.getConsentDataType(afterOpe);
                const beforeOpe = beforeOperations.find(elem => elem['id'] === afterOpe['id']);
                if (!beforeOpe) {
                    if (afterDataTypes.documents.length === 0 && afterDataTypes.events.length === 0 && afterDataTypes.things.length === 0) {
                        continue;
                    } else {
                        requireConsent = true;
                        break;
                    }
                } else {
                    const beforDataTypes = this.getConsentDataType(beforeOpe);
                    // 同意が必要なデータ種が全て含まれるか確認する
                    for (const doc of afterDataTypes.documents) {
                        if (!beforDataTypes.documents.some(elem => elem._value === doc._value && elem._ver === doc._ver)) {
                            requireConsent = true;
                            break;
                        }
                    }
                    for (const eve of afterDataTypes.events) {
                        if (!beforDataTypes.events.some(elem => elem._value === eve._value && elem._ver === eve._ver)) {
                            requireConsent = true;
                            break;
                        }
                    }
                    for (const thi of afterDataTypes.things) {
                        if (!beforDataTypes.things.some(elem => elem._value === thi._value && elem._ver === thi._ver)) {
                            requireConsent = true;
                            break;
                        }
                    }
                    // 同意が必要なデータ種の数が違う場合
                    if (beforDataTypes.documents.length !== afterDataTypes.documents.length ||
                        beforDataTypes.events.length !== afterDataTypes.events.length ||
                        beforDataTypes.things.length !== afterDataTypes.things.length) {
                        requireConsent = true;
                        break;
                    }
                }
            }
            if (requireConsent) {
                codes.push({
                    _value: Number(after['catalogItem']['_code']['_value']),
                    _ver: Number(after['catalogItem']['_code']['_ver'])
                });
            }
        }
        return codes;
    }

    /**
     * 蓄積・共有定義から同意が必要なデータ種を取得する
     * @param operation
     */
    private getConsentDataType (operation: any) {
        const documents = [];
        const events = [];
        const things = [];
        if (operation['document'] && Array.isArray(operation['document'])) {
            for (const doc of operation['document']) {
                if (doc['requireConsent']) {
                    documents.push({
                        _value: Number(doc['code']['_value']),
                        _ver: Number(doc['code']['_ver'])
                    });
                }
            }
        }
        if (operation['event'] && Array.isArray(operation['event'])) {
            for (const eve of operation['event']) {
                if (eve['requireConsent']) {
                    events.push({
                        _value: Number(eve['code']['_value']),
                        _ver: Number(eve['code']['_ver'])
                    });
                }
                if (eve['thing'] && Array.isArray(eve['thing'])) {
                    for (const thi of eve['thing']) {
                        if (thi['requireConsent']) {
                            things.push({
                                _value: Number(thi['code']['_value']),
                                _ver: Number(thi['code']['_ver'])
                            });
                        }
                    }
                }
            }
        }
        if (operation['thing'] && Array.isArray(operation['thing'])) {
            for (const thi of operation['thing']) {
                if (thi['requireConsent']) {
                    things.push({
                        _value: Number(thi['code']['_value']),
                        _ver: Number(thi['code']['_ver'])
                    });
                }
            }
        }
        const ret = {
            documents: documents,
            events: events,
            things: things
        };
        return ret;
    }

    /**
     * カタログ内のネームスペースをチェックして、対象のネームスペースでなければエラーを返す
     * @param template
     */
    private async judgeNs (operator: OperatorDomain, dto: PostDataOperationReqDto) {
        const getNameRes = await CatalogService.getName(operator);
        const allowNs = [
            'catalog/ext/' + getNameRes['ext_name'] + '/actor/app/actor_' + operator.actorCode + '/store',
            'catalog/ext/' + getNameRes['ext_name'] + '/actor/app/actor_' + operator.actorCode + '/share'
        ];

        if (dto.catalog && Array.isArray(dto.catalog)) {
            for (const catalog of dto.catalog) {
                let isTarget = false;
                for (const ns of allowNs) {
                    isTarget = catalog.template.catalogItem.ns === ns;
                    if (isTarget) {
                        break;
                    }
                }
                if (!isTarget) {
                    throw new AppError(message.NOT_TARGET_NS, ResponseCode.BAD_REQUEST);
                }
            }
        }
    }

    /**
     * レスポンス作成
     * @param entity
     */
    private createResponse (entity: DataOperationManage): any {
        const ret = JSON.parse(entity.template);
        ret['id'] = Number(entity.id);
        ret['applicationActorCode'] = Number(entity.applicationActorCode);
        ret['applicationBlockCode'] = Number(entity.applicationBlockCode);
        ret['applicationAt'] = entity.applicationAt ? moment(entity.applicationAt).tz(config['app']['timezone']).format(DateTimeFormatString) : null;
        ret['isDraft'] = entity.isDraft;
        return ret;
    }
}
