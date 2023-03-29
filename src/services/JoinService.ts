/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../domains/OperatorDomain';
import JoinAcquireReqDto from '../resources/dto/JoinAcquireReqDto';
import JoinReqDto from '../resources/dto/JoinReqDto';
import AppError from '../common/AppError';
import CatalogService from './CatalogService';
import ActorType from '../domains/ActorType';
import OperatorType from '../domains/OperatorType';
import EntityOperation from '../repositories/EntityOperation';
import JoinManage from '../repositories/postgres/JoinManage';
import JoinApprovalManage from '../repositories/postgres/JoinApprovalManage';
import JoinServiceManage from '../repositories/postgres/JoinServiceManage';
import ApprovalReqDto from '../resources/dto/ApprovalReqDto';
import NotificationDomain from '../domains/NotificationDomain';
import NotificationService from './NotificationService';
import { parse4update } from '../common/Catalog';
import { sprintf } from 'sprintf-js';
import Generator from '../common/Generator';
import { DateTimeFormatString } from '../common/Transform';
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */
import Config from '../common/Config';
import config = require('config');
const momentTz = require('moment-timezone');
const Message = Config.ReadConfig('./config/message.json');

export default class JoinService {
    /**
     * 申請取得
     * @param dto
     * @param operator
     */
    static async acquire (dto: JoinAcquireReqDto, operator: OperatorDomain) {
        // オペレーター種別を確認する
        if (operator.type !== OperatorType.TYPE_MANAGE_MEMBER) {
            throw new AppError(Message.NOT_AUTHORIZED_OPERATOR, 401);
        }
        // アクター種別を取得
        const actorCatalog = await CatalogService.searchActorCatalog(operator, operator.actorCode);

        if (actorCatalog.actorName === ActorType.WF || actorCatalog.actorName === ActorType.CONSUMER || actorCatalog.actorName === ActorType.DATA_TRADER) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        if (actorCatalog.actorName !== ActorType.APP && actorCatalog.actorName !== ActorType.REGION_ROOT) {
            throw new AppError(Message.NOT_AUTHORIZED_OPERATOR, 401);
        }
        const data = await EntityOperation.getJoinApplications(dto, operator.actorCode, operator.actorVersion, actorCatalog);

        return this.createJoinResponse(data);
    }

    /**
     * クエリパラムをdtoにセットする
     * @param dto
     * @param query
     */
    static async convertReqQuery (dto: JoinAcquireReqDto, query: any) {
        // リクエストを取得
        let isRequest;
        if (query['is_request'] === 'true') {
            isRequest = true;
        } else if (query['is_request'] === 'false') {
            isRequest = false;
        } else {
            // 未設定の場合は全部取得の為、nullを設定
            isRequest = null;
        }

        let inApproved;
        if (query['in_approved'] === 'true') {
            inApproved = true;
        } else if (query['in_approved'] === 'false') {
            inApproved = false;
        } else {
            // 未設定の場合はfalseと同等
            inApproved = false;
        }

        dto.isRequest = isRequest;
        dto.inApproved = inApproved;
        return dto;
    }

    static async createJoinResponse (results: JoinManage[]) {
        const json: any[] = [];
        if (results.length > 0) {
            for (const jm of results) {
                const app = [];
                for (const joinService of jm.joinServiceManages) {
                    if (joinService.type === JoinServiceManage.TYPE_APP) {
                        app.push({
                            code: Number(joinService.serviceCode),
                            version: Number(joinService.serviceVersion)
                        });
                    }
                    if (joinService.type === JoinServiceManage.TYPE_WF) {
                        throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
                    }
                }
                const data = {
                    id: Number(jm.id),
                    type: Number(jm.type),
                    caller: {
                        code: Number(jm.applicantActorCode),
                        version: Number(jm.applicantActorVersion)
                    },
                    region: {
                        code: Number(jm.joinRegionCode),
                        version: Number(jm.joinRegionVersion)
                    },
                    actor: {
                        code: Number(jm.joinActorCode),
                        version: Number(jm.joinActorVersion),
                        app: app.length > 0 ? app : undefined
                    },
                    applicantDate: jm.applicantDate ? momentTz(jm.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString) : null,
                    expireAt: jm.approvalExpireAt ? momentTz(jm.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString) : null,
                    isDraft: jm.isDraft,
                    status: jm.joinApprovalManage ? Number(jm.joinApprovalManage.status) : 0,
                    comment: jm.joinApprovalManage ? jm.joinApprovalManage.comment : null,
                    approver: jm.joinApprovalManage ? jm.joinApprovalManage.approver : null,
                    approvalAt: jm.joinApprovalManage
                        ? jm.joinApprovalManage.approvalAt
                            ? momentTz(jm.joinApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString)
                            : null
                        : null
                };
                json.push(data);
            }
        }
        return json;
    }

    /**
     * 承認対象を取得する
     * @param code
     * @param dto
     */
    static async getApprovalTarget (code: string, dto: ApprovalReqDto) {
        const entity = await EntityOperation.getApprovalManageWithAuthCode(JoinApprovalManage, code) as JoinManage;
        entity.joinApprovalManage.status = dto.status;
        entity.joinApprovalManage.comment = dto.comment;
        // JoinServiceManage取得
        const joinServiceManages = await EntityOperation.getJoinServiceManagesWithJoinManageId(entity.id);
        entity.joinServiceManages = joinServiceManages;
        return entity;
    }

    /**
     * 承認結果を連携、通知する
     * @param entity
     * @param operator
     */
    static async noticeLinkage (entity: JoinManage, operator: OperatorDomain) {
        const details: NotificationDomain[] = [];

        const applicantBlockCode = await CatalogService.searchBlockCatalogWithActorCode(operator, entity.applicantActorCode);
        const approvalBlockCode = await CatalogService.searchBlockCatalogWithActorCode(operator, entity.joinApprovalManage.approvalActorCode);

        let title = '';
        let content = '';
        let categoryCode = 0;
        const categoryVersion = 1;
        if (entity.joinApprovalManage.status === JoinApprovalManage.APPROVAL_STATUS) {
            categoryCode = parseInt(config.get('join.approved'));
            if (entity.type === JoinManage.APPLYING_JOIN_TYPE) {
                title = config.get('join.title.approved');
                content = config.get('join.content.approved');
            } else {
                title = config.get('defection.title.approved');
                content = config.get('defection.content.approved');
            }
        } else {
            categoryCode = parseInt(config.get('join.nonApproved'));
            if (entity.type === JoinManage.APPLYING_JOIN_TYPE) {
                title = config.get('join.title.nonApproved');
                content = sprintf(config.get('join.content.nonApproved'), entity.joinApprovalManage.comment);
            } else {
                title = config.get('defection.title.nonApproved');
                content = sprintf(config.get('defection.content.nonApproved'), entity.joinApprovalManage.comment);
            }
        }

        const detail: NotificationDomain = {
            type: 0,
            title: title,
            content: content,
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

    /**
     * 承認結果をカタログへ反映させる
     * @param entity
     * @param operator
     */
    static async updateJoinDetails (entity: JoinManage, operator: OperatorDomain) {
        // 承認の場合
        if (entity.joinApprovalManage.status === JoinApprovalManage.APPROVAL_STATUS) {
            // 各カタログを取得
            const actor = await CatalogService.searchActorCatalog(operator, entity.joinActorCode);
            if (actor.actorName === ActorType.WF) {
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
            for (const serviceManage of entity.joinServiceManages) {
                const service = await CatalogService.searchActorCatalog(operator, serviceManage.serviceCode);
                const serviceCatalog = parse4update(service.rawData);
                const regionCatalog = parse4update(
                    await (await CatalogService.searchActorCatalog(operator, entity.joinRegionCode)).rawData
                );

                // アクター種別からkey名を設定
                const targetStr = 'app-alliance';

                // 参加要求の場合
                if (entity.type === JoinManage.APPLYING_JOIN_TYPE) {
                    const regionAlliance = {
                        key: 'region-alliance',
                        value: [
                            {
                                key: '_value',
                                value: Number(entity.joinRegionCode)
                            },
                            {
                                key: '_ver',
                                value: Number(entity.joinRegionVersion)
                            }
                        ]
                    };
                    // region-allianceを追加する
                    serviceCatalog.template.value.push(regionAlliance);

                    const actorAlliance = {
                        key: targetStr,
                        value: [
                            {
                                key: '_value',
                                value: Number(service.code)
                            },
                            {
                                key: '_ver',
                                value: Number(service.version)
                            }
                        ]
                    };
                    // ○○-allianceを追加する
                    regionCatalog.template.value.push(actorAlliance);
                } else {
                    // 参加解除の場合
                    // valueの中からカタログコードが一致するregion-allianceを外す
                    const actorArray: any[] = [];
                    for (const index in serviceCatalog.template.value) {
                        const prop = serviceCatalog.template.value[index];
                        if (prop.key === 'region-alliance' && Number(prop.value[0].value) === Number(entity.joinRegionCode)) {
                            continue;
                        }
                        actorArray.push(prop);
                    }
                    serviceCatalog.template.value = actorArray;

                    // valueの中からカタログコードが一致する○○-allianceを外す
                    const regionArray: any[] = [];
                    for (const index in regionCatalog.template.value) {
                        const prop = regionCatalog.template.value[index];
                        if (prop.key === targetStr && prop.value[0].value === Number(service.code)) {
                            continue;
                        }
                        regionArray.push(prop);
                    }
                    regionCatalog.template.value = regionArray;
                }

                // カタログ更新を実行
                await CatalogService.update(Number(service.code), serviceCatalog, operator);
                await CatalogService.update(entity.joinRegionCode, regionCatalog, operator);
            }
        }
    }

    /**
     * データベースへ保存
     * @param entity
     * @param operator
     */
    static async saveApprovalInfo (entity: JoinManage, operator: OperatorDomain) {
        entity.joinApprovalManage.approvalActorCode = operator.actorCode;
        entity.joinApprovalManage.approvalActorVersion = operator.actorVersion;
        entity.joinApprovalManage.approver = operator.loginId;
        entity.joinApprovalManage.approvalAt = momentTz(new Date()).utc();
        entity.joinApprovalManage.updatedBy = operator.loginId;
        await EntityOperation.saveJoinEntity(entity);
    }

    /**
     * 同等の申請が存在するか、確認する
     * @param dto
     * @param type
     * @param operator
     */
    static async isExists (dto: JoinReqDto, type: 1 | 2, operator: OperatorDomain) {
        if (dto.actor.wf) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        const serviceCodes = dto.actor.app;
        const entity = await EntityOperation.searchExistsJoin(dto.id, dto.actor, dto.region, serviceCodes, operator);
        // 同等の申請が存在しない場合
        if (!entity) {
            // IDで申請されている場合
            if (!isNaN(dto.id)) {
                throw new AppError(Message.NOT_EXISTS_APPLICATION_OF_ID, 400);
            }

            // 同等の申請が存在する場合
        } else if (entity.type === type) {
            // 下書きの状態、かつIDによる申請がされていない場合
            if (entity.isDraft && !dto.id) {
                const message = sprintf(Message.EXISTS_IS_REQUESTED_AS_DRAFT, entity.id);
                throw new AppError(message, 400);
            } else if (
                !entity.isDraft &&
                entity.joinApprovalManage.status ===
                JoinApprovalManage.APPLYING_STATUS
            ) {
                throw new AppError(Message.ALREADY_IS_AS_REQUESTED, 400);
            } else if (
                !entity.isDraft &&
                entity.joinApprovalManage.status !== JoinApprovalManage.APPLYING_STATUS
            ) {
                // 上記以外の場合承認済のため、問題ない
                return undefined;
            }
            // 同等の申請が存在しない場合は、問題ない
        } else {
            return undefined;
        }

        return entity;
    }

    /**
     * 申請内容を整理し、エンティティを形成する
     * @param dto
     * @param operator
     * @param exists
     */
    static async acquireInfo (dto: JoinReqDto, operator: OperatorDomain, exists: JoinManage, type: 1 | 2) {
        if (dto.actor.wf) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        const serviceCodes = dto.actor.app;
        for (const serviceCode of serviceCodes) {
            const serviceCatalog = await CatalogService.searchActorCatalog(operator, serviceCode.code);

            const alliance = serviceCatalog.rawData.template['region-alliance'];
            let flag = false;
            for (const index in alliance) {
                if (alliance[index]._value === dto.region.code) {
                    if (type === 1) {
                        throw new AppError(Message.ALREADY_CONTRACTED, 400);
                    } else {
                        flag = true;
                        break;
                    }
                }
            }
            if (!flag && type === 2) {
                throw new AppError(Message.ALREADY_ABORTED, 400);
            }
        }

        let entity = new JoinManage();
        if (exists) {
            entity = exists;
        } else {
            entity.createdBy = operator.loginId;
        }

        entity.type = type;
        entity.joinActorCode = dto.actor.code;
        entity.joinActorVersion = dto.actor.version;
        entity.joinRegionCode = dto.region.code;
        entity.joinRegionVersion = dto.region.version;
        entity.applicantActorCode = operator.actorCode;
        entity.applicantActorVersion = operator.actorVersion;
        entity.isDraft = dto.isDraft;
        entity.updatedBy = operator.loginId;
        if (!entity.isDraft) {
            entity.applicantDate = momentTz(new Date()).utc();
            const authCode = await Generator.authCode(2);
            entity.joinApprovalManage = new JoinApprovalManage();
            entity.joinApprovalManage.authCode = authCode;
            if (operator.actorCode === dto.actor.code) {
                entity.joinApprovalManage.approvalActorCode = dto.region.code;
                entity.joinApprovalManage.approvalActorVersion = dto.region.version;
            } else {
                entity.joinApprovalManage.approvalActorCode = dto.actor.code;
                entity.joinApprovalManage.approvalActorVersion = dto.actor.version;
            }
            entity.joinApprovalManage.createdBy = operator.loginId;
            entity.joinApprovalManage.updatedBy = operator.loginId;
        }
        entity.joinServiceManages = [];
        for (const serviceCode of serviceCodes) {
            const joinServiceManage = new JoinServiceManage();
            joinServiceManage.type = JoinServiceManage.TYPE_APP;
            joinServiceManage.serviceCode = serviceCode.code;
            joinServiceManage.serviceVersion = serviceCode.version;
            joinServiceManage.createdBy = operator.loginId;
            joinServiceManage.updatedBy = operator.loginId;
            entity.joinServiceManages.push(joinServiceManage);
        }

        return entity;
    }

    /**
     * 申請リクエストの結果を返却する
     * @param entity
     */
    static async applicationResponse (entity: JoinManage) {
        const app = [];
        for (const joinService of entity.joinServiceManages) {
            if (joinService.type === JoinServiceManage.TYPE_APP) {
                app.push({
                    code: Number(joinService.serviceCode),
                    version: Number(joinService.serviceVersion)
                });
            }
            if (joinService.type === JoinServiceManage.TYPE_WF) {
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
        }
        const obj: any = {
            id: Number(entity.id),
            region: {
                code: entity.joinRegionCode,
                version: entity.joinRegionVersion
            },
            actor: {
                code: entity.joinActorCode,
                version: entity.joinActorVersion,
                app: app.length > 0 ? app : undefined
            },
            isDraft: entity.isDraft
        };
        if (!entity.isDraft) {
            obj.applicantDate = momentTz(entity.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString);
            obj.expireAt = momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString);
        }
        return obj;
    }

    /**
     * 承認要求のリクエスト送付
     * @param entity
     * @param operator
     */
    static async approvalLinkage (entity: JoinManage, operator: OperatorDomain) {
        if (entity.isDraft) {
            return;
        }

        const actorCatalog = await CatalogService.searchActorCatalog(operator, entity.joinActorCode);
        const regionCatalog = await CatalogService.searchActorCatalog(operator, entity.joinRegionCode);
        const regionRootBlockCode = await CatalogService.getRegionRoot(regionCatalog, operator);
        const noticeUrl = sprintf(config.get('join.noticeUrl'), entity.joinApprovalManage.authCode);
        const app = [];
        for (const joinService of entity.joinServiceManages) {
            if (joinService.type === JoinServiceManage.TYPE_APP) {
                app.push(Number(joinService.serviceCode));
            }
            if (joinService.type === JoinServiceManage.TYPE_WF) {
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
        }
        const detail: NotificationDomain = {
            type: 1,
            title: entity.type === JoinManage.APPLYING_JOIN_TYPE ? config.get('join.title.applying') : config.get('defection.title.applying'),
            content: entity.type === JoinManage.APPLYING_JOIN_TYPE ? config.get('join.content.applying') : config.get('defection.content.applying'),
            attribute: {
                region: regionCatalog.code,
                actor: actorCatalog.code,
                app: app.length > 0 ? app : undefined
            },
            category: {
                _value: parseInt(config.get('join.applying')),
                _ver: 1
            },
            destination: {
                blockCode: Number(operator.blockCode) === Number(actorCatalog.mainBlockCode) ? Number(regionRootBlockCode) : Number(actorCatalog.mainBlockCode),
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
}
