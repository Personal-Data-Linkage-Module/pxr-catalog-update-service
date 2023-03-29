/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import ActorManage from '../repositories/postgres/ActorManage';
import OperatorDomain from '../domains/OperatorDomain';
import EntityOperation from '../repositories/EntityOperation';
import ActorApprovalManage from '../repositories/postgres/ActorApprovalManage';
import ApprovalReqDto from '../resources/dto/ApprovalReqDto';
import NotificationDomain from '../domains/NotificationDomain';
import NotificationService from './NotificationService';
import OperatorType from '../domains/OperatorType';
import { sprintf } from 'sprintf-js';
import CertificationAuthorityService from './CertificationAuthorityService';
import CertificateManageService from './CertificateManageService';
import ActorReqDto from '../resources/dto/ActorReqDto';
import AppError from '../common/AppError';
import Generator from '../common/Generator';
import CatalogService from './CatalogService';
import { DateTimeFormatString } from '../common/Transform';
import ActorAcquireReqDto from '../resources/dto/ActorAcquireReqDto';
import ActorRemoveReqDto from '../resources/dto/ActorRemoveReqDto';
import ActorType from '../domains/ActorType';
import Config from '../common/Config';
import NsDomain from '../domains/NsDomain';
import config = require('config');
import CatalogDomain from '../domains/CatalogDomain';
import { parse4update } from '../common/Catalog';
import BookManageService from './BookManageService';
import { isArray } from "class-validator";
import {ResponseCode} from '../common/ResponseCode'
/* eslint-enable */
const momentTz = require('moment-timezone');
const Message = Config.ReadConfig('./config/message.json');

export default class ActorService {
    /**
     * 申請情報を取得する
     * @param dto
     * @param operator
     */
    static async acquire (dto: ActorAcquireReqDto, operator: OperatorDomain) {
        let entities = await EntityOperation.getActorApplications(
            operator.blockCode,
            operator.actorCode ? operator.actorCode : null,
            dto.approved
        );

        // 申請元Blockが指定されている場合、絞り込みを行う
        if (entities.length > 0 && dto.code && dto.ver) {
            entities = entities.filter(ele => Number(ele.callerBlockCode) === Number(dto.code) && Number(ele.callerBlockVersion) === Number(dto.ver));
        }

        // 取得結果が0件だった場合
        if (entities.length <= 0) {
            throw new AppError(Message.NOT_EXISTS_REQUESTED, 204);
        }

        const data = await this.createResponse(entities, dto.actorType, operator);
        return data;
    }

    /**
     * 申請情報をオブジェクト化
     * @param entities
     */
    static async createResponse (entities: ActorManage[], actorType: string, operator: OperatorDomain) {
        const result: any[] = [];
        for (const entity of entities) {
            if (entity.type === ActorManage.APPLYING_AUTHORIZATION_TYPE) {
                const data = JSON.parse(entity.template);
                const ns = data.catalogItem.ns;
                if (ns.indexOf(actorType) > 0) {
                    result.push({
                        id: Number(entity.id),
                        type: entity.type,
                        approvalActor: entity.actorApprovalManage && entity.actorApprovalManage.approvalActorCode
                            ? {
                                _value: Number(entity.actorApprovalManage.approvalActorCode),
                                _ver: Number(entity.actorApprovalManage.approvalActorVersion)
                            }
                            : null,
                        actorCatalog: data,
                        expireAt: entity.approvalExpireAt
                            ? momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString)
                            : null,
                        isDraft: entity.isDraft,
                        status: entity.actorApprovalManage
                            ? entity.actorApprovalManage.status
                            : null,
                        authCode: entity.actorApprovalManage
                            ? entity.actorApprovalManage.authCode
                            : null,
                        applicantDate: entity.applicantDate ? momentTz(entity.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString) : null,
                        comment: entity.actorApprovalManage
                            ? entity.actorApprovalManage.comment
                            : null,
                        approver: entity.actorApprovalManage
                            ? entity.actorApprovalManage.approver
                            : null,
                        approvalAt: entity.actorApprovalManage && entity.actorApprovalManage.approvalAt
                            ? momentTz(entity.actorApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString)
                            : null,
                        attributes: entity.attributes ? JSON.parse(entity.attributes) : null
                    });
                }
            } else {
                const actorCatalog = await CatalogService.searchActorCatalog(operator, entity.callerActorCode);
                if (actorCatalog.actorName === actorType) {
                    result.push({
                        id: Number(entity.id),
                        type: entity.type,
                        caller: {
                            _value: Number(entity.callerActorCode),
                            _ver: Number(entity.callerActorVersion)
                        },
                        migration: entity.actorApprovalManage && entity.actorApprovalManage.migrationActorCode
                            ? {
                                actor: {
                                    _value: Number(entity.actorApprovalManage.migrationActorCode),
                                    _ver: Number(entity.actorApprovalManage.migrationActorVersion)
                                },
                                comment: entity.actorApprovalManage.migrationComment,
                                approver: entity.actorApprovalManage.migragtionApprover,
                                approvalAt: entity.actorApprovalManage.migrationApprovalAt
                                    ? momentTz(entity.actorApprovalManage.migrationApprovalAt).tz(config.get('timezone')).format(DateTimeFormatString)
                                    : null
                            }
                            : null,
                        approval: entity.actorApprovalManage && entity.actorApprovalManage.approvalActorCode
                            ? {
                                actor: {
                                    _value: Number(entity.actorApprovalManage.approvalActorCode),
                                    _ver: Number(entity.actorApprovalManage.approvalActorVersion)
                                },
                                comment: entity.actorApprovalManage.comment,
                                approver: entity.actorApprovalManage.approver,
                                approvalAt: entity.actorApprovalManage.approvalAt
                                    ? momentTz(entity.actorApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString)
                                    : null
                            }
                            : null,
                        expireAt: entity.approvalExpireAt
                            ? momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString)
                            : null,
                        isDraft: entity.isDraft,
                        status: entity.actorApprovalManage
                            ? entity.actorApprovalManage.status
                            : null,
                        authCode: entity.actorApprovalManage
                            ? entity.actorApprovalManage.authCode
                            : null,
                        applicantDate: entity.applicantDate ? momentTz(entity.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString) : null,
                        attributes: entity.attributes ? JSON.parse(entity.attributes) : null
                    });
                }
            }
        }
        return result;
    }

    /**
     * エンティティへの変換を行う
     * @param dto
     * @param operator
     */
    static async convert (dto: ActorReqDto, operator: OperatorDomain) {
        let flag = false;
        // PXR-Rootの場合はフラグを立てる
        if (
            dto.actorCatalog.catalogItem.ns
                .indexOf('/actor/pxr-root') > 0
        ) {
            flag = true;
        }

        // id指定がある場合、レコードの存在確認をする
        let entity = new ActorManage();
        if (dto.id) {
            entity = await EntityOperation
                .searchExistsActor(dto.id, operator);
            if (!entity) {
                throw new AppError(Message.NOT_EXISTS_ACTOR_ENTITY, 400);
            }
        } else {
            entity.createdBy = operator.loginId;
        }

        entity.callerBlockCode = operator.blockCode;
        entity.callerBlockVersion = operator.blockVersion;
        entity.callerActorCode = operator.actorCode;
        entity.callerActorVersion = operator.actorVersion;
        entity.type = 1;
        entity.template = JSON.stringify(dto.actorCatalog);
        entity.isDraft = dto.isDraft;
        entity.updatedBy = operator.loginId;

        // 承認レコード
        entity.actorApprovalManage = new ActorApprovalManage();
        entity.actorApprovalManage.status = ActorApprovalManage.APPLYING_STATUS;
        entity.actorApprovalManage.approvalActorCode = flag ? null : dto.approvalActor._value;
        entity.actorApprovalManage.approvalActorVersion = flag ? null : dto.approvalActor._ver;
        entity.actorApprovalManage.updatedBy = operator.loginId;

        if (!dto.isDraft) {
            entity.applicantDate = momentTz(new Date()).utc();
            entity.actorApprovalManage.authCode = await Generator.authCode(1);
        }
        if (!dto.id) {
            entity.actorApprovalManage.createdBy = operator.loginId;
        }
        return entity;
    }

    /**
     * 承認要求を通知サービスへ連携する
     * @param entity
     * @param operator
     * @param dto
     */
    static async approvalLinkage (
        entity: ActorManage,
        operator: OperatorDomain,
        dto: ActorReqDto
    ) {
        // 下書きまたはPXR-Rootの場合は承認要求は送らない
        if (
            entity.isDraft ||
            dto.actorCatalog.catalogItem.ns
                .indexOf('/actor/pxr-root') > 0
        ) {
            return;
        }

        // アクターコードを基にカタログからブロックコードを取得する
        const blockCode = await CatalogService
            .searchBlockCatalogWithActorCode(
                operator,
                entity.actorApprovalManage.approvalActorCode
            );

        // 承認要求を通知する
        const detail: NotificationDomain = {
            type: 1,
            title: config.get('actor.title.applying'),
            content: config.get('actor.content.applying'),
            category: {
                _value: Number(config.get('actor.applying')),
                _ver: undefined
            },
            destination: {
                blockCode: blockCode,
                operatorType: 3,
                isSendAll: true
            },
            approval: {
                noticeBlockCode: Number(config.get('noticeBlockCode')),
                noticeUrl: sprintf(
                    config.get('actor.noticeUrl'),
                    entity.actorApprovalManage.authCode
                )
            }
        };
        const expireAt = await NotificationService
            .linkage([detail], operator);
        entity.approvalExpireAt = momentTz(expireAt).utc();
    }

    /**
     * 承認操作を行う
     * @param entity
     * @param operator
     */
    static async approval (
        entity: ActorManage, operator: OperatorDomain
    ) {
        const actorCatalog = JSON.parse(entity.template);
        // 下書きまたはPXR-Root以外の場合は、何もせず終了
        if (
            entity.isDraft ||
            actorCatalog.catalogItem.ns.indexOf('/actor/pxr-root') <= 0
        ) {
            return;
        }

        // entityに値をセット
        entity.actorApprovalManage.status = ActorApprovalManage.APPROVAL_STATUS;
        entity.actorApprovalManage.comment = null;
        entity.actorApprovalManage.approver = operator.loginId;
        entity.actorApprovalManage.approvalAt = momentTz(new Date()).utc();

        // 承認操作を実行
        await this.updateActorDetails(entity, operator);

        // 承認されたことを通知する
        await this.noticeLinkage(entity, operator);
    }

    /**
     * 申請内容をレスポンスオブジェクトへ変換
     * @param entity
     * @param dto
     */
    static async applicantResponse (
        entity: ActorManage,
        dto: ActorReqDto
    ) {
        // 下書きの場合
        if (entity.isDraft) {
            const response: any = {};
            response.id = Number(entity.id);
            response.type = Number(entity.type);
            const approvalActor = entity.actorApprovalManage.approvalActorCode ? {
                _value: entity.actorApprovalManage.approvalActorCode,
                _ver: entity.actorApprovalManage.approvalActorVersion
            } : null;
            response.approvalActor = approvalActor;
            response.actorCatalog = JSON.parse(entity.template);
            response.isDraft = entity.isDraft;
            response.expireAt = null;
            response.applicantDate = null;
            return response;
        } else {
            // PXR-Rootの場合
            if (
                dto.actorCatalog.catalogItem.ns.indexOf('/actor/pxr-root') > 0
            ) {
                const response: any = {};
                response.id = Number(entity.id);
                const callerBlock = {
                    _value: entity.callerBlockCode,
                    _ver: entity.callerBlockVersion
                };
                response.callerBlock = callerBlock;
                const callerActor = {
                    _value: entity.callerActorCode,
                    _ver: entity.callerActorVersion
                };
                response.callerActor = callerActor;
                response.status = entity.actorApprovalManage.status;
                response.comment = entity.actorApprovalManage.comment;
                response.approver = entity.actorApprovalManage.approver;
                const now = new Date();
                response.approvalAt = momentTz(now).tz(config.get('timezone')).format(DateTimeFormatString);
                response.attributes = JSON.parse(entity.attributes);
                return response;
            } else {
                // PXR-Root以外の場合
                const response: any = {};
                response.id = Number(entity.id);
                response.type = entity.type;
                const approvalActor = {
                    _value: entity.actorApprovalManage.approvalActorCode,
                    _ver: entity.actorApprovalManage.approvalActorVersion
                };
                response.approvalActor = approvalActor;
                response.actorCatalog = JSON.parse(entity.template);
                response.expireAt = momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString);
                response.isDraft = entity.isDraft;
                response.status = entity.actorApprovalManage.status;
                response.authCode = entity.actorApprovalManage.authCode;
                response.applicantDate = momentTz(entity.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString);
                return response;
            }
        }
    }

    /**
     * 承認コードを以って、エンティティを取得する
     * @param code
     * @param dto
     */
    static async getApprovalTarget (code: string, dto: ApprovalReqDto) {
        const entity = await EntityOperation.getApprovalManageWithAuthCode(
            ActorApprovalManage,
            code
        ) as ActorManage;
        // 認定申請の場合
        if (entity.type === 1) {
            entity.actorApprovalManage.status = dto.status;
            entity.actorApprovalManage.comment = dto.comment;
        }
        return entity;
    }

    /**
     * 通知サービスへ承認結果を連携する
     * @param entity
     * @param operator
     */
    static async noticeLinkage (
        entity: ActorManage,
        operator: OperatorDomain
    ) {
        const details: NotificationDomain[] = [];

        if (
            entity.actorApprovalManage.status ===
                ActorApprovalManage.APPROVAL_STATUS
        ) {
            details.push({
                type: 0,
                title: config.get('actor.title.approved'),
                content: config.get('actor.content.approved'),
                category: {
                    _value: Number(config.get('actor.approved')),
                    _ver: null
                },
                destination: {
                    blockCode: Number(entity.callerBlockCode),
                    isSendAll: true,
                    operatorType: OperatorType.TYPE_MANAGE_MEMBER
                }
            });
        } else {
            details.push({
                type: 0,
                title: config.get('actor.title.nonApproved'),
                content: sprintf(config.get('actor.content.nonApproved'), entity.actorApprovalManage.comment),
                category: {
                    _value: Number(config.get('actor.nonApproved')),
                    _ver: null
                },
                destination: {
                    blockCode: Number(entity.callerBlockCode),
                    isSendAll: true,
                    operatorType: OperatorType.TYPE_MANAGE_MEMBER
                }
            });
        }

        await NotificationService.linkage(details, operator);
    }

    /**
     * 承認内容に基づき、カタログ更新を行う
     * @param entity
     * @param operator
     */
    static async updateActorDetails (
        entity: ActorManage,
        operator: OperatorDomain
    ) {
        const c = JSON.parse(entity.template);
        // ステータスが承認以外の場合は、何もせず終了
        if (
            entity.actorApprovalManage.status !==
                ActorApprovalManage.APPROVAL_STATUS
        ) {
            return;
        }

        // valueがnullなら初期化
        if (c.template.value === null) {
            c.template.value = [];
        }

        // statusの追加
        c['template']['value'].push(
            {
                key: 'status',
                value: [
                    {
                        key: 'status',
                        value: 'certified'
                    },
                    {
                        key: 'by',
                        value: [
                            {
                                key: '_value',
                                value: operator.actorCode
                            },
                            {
                                key: '_ver',
                                value: operator.actorVersion
                            }
                        ]
                    },
                    {
                        key: 'at',
                        value: momentTz(new Date()).tz(config.get('timezone')).format(DateTimeFormatString)
                    }
                ]
            }
        );
        // main-blockの追加
        c['template']['value'].push(
            {
                key: 'main-block',
                value: [
                    {
                        key: '_value',
                        value: entity.callerBlockCode
                    },
                    {
                        key: '_ver',
                        value: entity.callerBlockVersion
                    }
                ]
            }
        );

        // カタログを登録
        const result = await CatalogService.actorUpdate(c, operator);
        entity.callerActorCode = parseInt(result.catalogItem._code._value);
        entity.callerActorVersion = parseInt(result.catalogItem._code._ver);
        const name = result.catalogItem.name;

        // PXR-Rootのnameを取得
        const rootCatalog = await CatalogService.getPxrRootCatalog(operator);
        const rootName = rootCatalog[0].rawData.catalogItem.name;

        // アクター種別を取得
        const actorType = await CatalogService.takeActorType(result.catalogItem.ns);

        // ネームスペースを登録
        const nsList = Config.ReadConfig('./config/add_ns.json');
        const targetNsList: any[] = nsList[actorType];
        if (targetNsList.length > 0) {
            for (let index = 0; index < targetNsList.length; index++) {
                // 各パラメータに値をセット
                const req: NsDomain = this.setToNs(targetNsList[index], entity.callerActorCode, name, rootName);

                // ネームスペース登録を実行
                await CatalogService.addExtNs(req, operator);
            }
        }

        // settingカタログを追加
        const settingCatalogList = Config.ReadConfig('./config/add_setting_catalog.json');
        const settingCatalog: any = settingCatalogList[actorType];
        // 各パラメータに値をセット
        const request = this.setToCatalogItem(settingCatalog, entity.callerActorCode, name, rootName);
        // settingカタログ登録を実行
        await CatalogService.actorUpdate(request, operator);

        // クライアント証明書を生成
        const certInfo = await CertificationAuthorityService.createClient(
            name,
            entity.callerActorCode, entity.callerActorVersion,
            entity.callerBlockCode, entity.callerBlockVersion,
            operator
        );

        // 証明書に関する通知を登録
        const detail: NotificationDomain = ({
            type: 0,
            title: config.get('actor.title.cert'),
            content: sprintf(
                config.get('actor.content.cert'),
                name,
                certInfo.serialNo, certInfo.fingerPrint
            ),
            category: {
                _value: Number(config.get('actor.cert')),
                _ver: null
            },
            destination: {
                blockCode: operator.blockCode,
                operatorType: OperatorType.TYPE_MANAGE_MEMBER,
                isSendAll: true
            }
        });
        await NotificationService.linkage([detail], operator);

        // attributesに保存
        const attributes = {
            actorCode: entity.callerActorCode,
            serialNo: certInfo.serialNo,
            fingerPrint: certInfo.fingerPrint
        };
        entity.attributes = JSON.stringify(attributes);
    }

    /**
     * 承認内容を保存する
     * @param entity
     * @param operator
     */
    static async saveApprovalInfo (
        entity: ActorManage, operator: OperatorDomain
    ) {
        entity.actorApprovalManage.approvalActorCode = operator.actorCode;
        entity.actorApprovalManage.approvalActorVersion = operator.actorVersion;
        entity.actorApprovalManage.approver = operator.loginId;
        entity.actorApprovalManage.approvalAt = momentTz(new Date()).utc();
        entity.actorApprovalManage.updatedBy = operator.loginId;
        const result = await EntityOperation.saveActorEntity(entity);

        // レスポンスに値をセット
        const ret: any = {};
        ret.id = Number(result.id);
        ret.type = Number(result.type);
        const approvalActor = {
            _value: Number(result.actorApprovalManage.approvalActorCode),
            _ver: Number(result.actorApprovalManage.approvalActorVersion)
        };
        ret.approvalActor = approvalActor;
        ret.actorCatalog = JSON.parse(result.template);
        ret.applicantDate = momentTz(result.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString);
        ret.expireAt = momentTz(result.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString);
        ret.isDraft = result.isDraft;
        ret.status = Number(result.actorApprovalManage.status);
        ret.authCode = result.actorApprovalManage.authCode;
        ret.comment = result.actorApprovalManage.comment;
        ret.approver = result.actorApprovalManage.approver;
        ret.approvalAt = momentTz(result.actorApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString);
        ret.attributes = result.attributes ? JSON.parse(result.attributes) : null;

        return ret;
    }

    /**
     * アクター種別により、情報を取得する
     * @param actorType
     * @param operator
     */
    static async accredits (actorType: string, operator: OperatorDomain) {
        const res: any[] = [];
        // PXR-ROOTなら処理終了
        if (actorType === ActorType.PXR_ROOT) {
            return res;
        }

        // アクター種別によって、認定のkey名を設定
        const certName: string = sprintf('%s-cert', actorType);

        // PXR-Rootのカタログを取得
        const pxrRootCatalogs = await CatalogService.getPxrRootCatalog(operator);
        for (const pxrRoot of pxrRootCatalogs) {
            if (pxrRoot.rawData.catalogItem.name && pxrRoot.rawData.catalogItem._code._value && pxrRoot.rawData.catalogItem._code._ver) {
                if (pxrRoot.rawData.template && pxrRoot.rawData.template[certName]) {
                    const cert = pxrRoot.rawData.template[certName];
                    if (cert['cert']) {
                        const accredits = {
                            name: pxrRoot.rawData.catalogItem.name,
                            approvalActor: {
                                _value: parseInt(pxrRoot.rawData.catalogItem._code._value),
                                _ver: parseInt(pxrRoot.rawData.catalogItem._code._ver)
                            }
                        };
                        res.push(accredits);
                    }
                }
            }
        }

        // wf,consumerの場合
        if (actorType === ActorType.WF || actorType === ActorType.CONSUMER) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        // app場合
        if (actorType === ActorType.APP) {
            // ネームスペースを生成
            let ns = '';
            ns = sprintf(config.get('catalog.ns'), config.get('catalog.extName'), ActorType.REGION_ROOT);

            // ネームスペースでカタログを取得
            const cd = await CatalogService.get(operator, null, ns);
            // (nsで取得の際は必ず配列が返ってくるため三項演算子の分岐は網羅しない)
            const catalogs = Array.isArray(cd) ? cd : [cd];
            // アクター種別によって、認定のkey名を設定
            const certifyName = sprintf('certify-%s', actorType);

            for (const catalog of catalogs) {
                if (catalog.rawData.catalogItem.name && catalog.rawData.catalogItem._code._value && catalog.rawData.catalogItem._code._ver) {
                    let targetActorType = '';
                    targetActorType = ActorType.REGION_ROOT;

                    const settings = await CatalogService.getActorSettings(operator, targetActorType, catalog.rawData.catalogItem._code._value);
                    for (const setting of settings) {
                        if (setting.rawData.template[certifyName] === true) {
                            const p = {
                                name: catalog.rawData.catalogItem.name,
                                approvalActor: {
                                    _value: parseInt(catalog.rawData.catalogItem._code._value),
                                    _ver: parseInt(catalog.rawData.catalogItem._code._ver)
                                }
                            };
                            res.push(p);
                        }
                    }
                }
            }
        }

        return {
            approvalActors: res
        };
    }

    /**
     * ネームスペースの各パラメータに値をセット
     * @param nsData
     * @param catalogCode
     * @param name
     * @param rootName
     */
    private static setToNs (nsData: any, catalogCode: number, name: string, rootName: string): NsDomain {
        // 各項目を取り出す
        let ns: string = nsData.ns;
        let desc: string = nsData.description;

        // nsの各パラメーターに値をセット
        ns = ns.replace('{ext_name}', config.get('catalog.extName'));
        ns = ns.replace('{catalog_code}', catalogCode.toString());

        // descriptionの各パラメータに値をセット
        desc = desc.replace('{root_name}', rootName);
        desc = desc.replace('{name}', name);

        const d = new NsDomain();
        d.ns = ns;
        d.description = desc;
        return d;
    }

    /**
     * 各actorのsettingカタログを作成
     * @param nsData
     * @param catalogCode
     * @param name
     * @param rootName
     */
    private static setToCatalogItem (catalogData: any, catalogCode: number, ActorName: string, rootName: string): NsDomain {
        // 各項目を取り出す
        let ns: string = catalogData['catalogItem']['ns'];
        const name: string = catalogData['catalogItem']['name'];
        let description: string = catalogData['catalogItem']['description'];

        // nsの各パラメーターに値をセット
        ns = ns.replace('{ext_name}', config.get('catalog.extName'));
        catalogData['catalogItem']['ns'] = ns.replace('{catalog_code}', catalogCode.toString());

        // nameの各パラメーターに値をセット
        catalogData['catalogItem']['name'] = name.replace('{name}', ActorName);

        // descriptionの各パラメータに値をセット
        description = description.replace('{root_name}', rootName);
        catalogData['catalogItem']['description'] = description.replace('{name}', ActorName);

        return catalogData;
    }

    /**
     * 同等の申請が存在するか、確認する
     * @param dto
     * @param type
     * @param operator
     */
    static async isExists (dto: ActorRemoveReqDto, type: number, operator: OperatorDomain) {
        // 運営メンバー以外はエラー
        if (operator.type !== OperatorType.TYPE_MANAGE_MEMBER) {
            throw new AppError(Message.NOT_AUTHORIZED_OPERATOR, 401);
        }

        // レコード取得
        const entity = await EntityOperation.searchExistsActorRemove(dto.id, type, operator.actorCode);

        // 同等の申請が存在しない場合
        if (!entity) {
            // IDで申請されている場合
            if (!isNaN(dto.id)) {
                throw new AppError(Message.NOT_EXISTS_APPLICATION_OF_ID, 400);
            }
        // 同等の申請が存在する場合
        } else {
            // 下書きかつID指定が無い場合
            if (entity.isDraft && !dto.id) {
                throw new AppError(sprintf(Message.EXISTS_IS_REQUESTED_AS_DRAFT, entity.id), 400);
            } else if (!entity.isDraft &&
                (entity.actorApprovalManage.status === ActorApprovalManage.APPLYING_STATUS || entity.actorApprovalManage.status === ActorApprovalManage.APPROVAL_PENDING_STATUS)
            ) {
                // 清書かつステータスが0 (未承認) または3 (最終承認待ち) で存在する場合
                throw new AppError(Message.ALREADY_IS_AS_REQUESTED, 400);
            } else if (!entity.isDraft &&
                (entity.actorApprovalManage.status === ActorApprovalManage.APPROVAL_STATUS || entity.actorApprovalManage.status === ActorApprovalManage.UN_APPROVAL_STATUS)
            ) {
                // ステータスが1 (承認) か2 (否認) なら承認処理済みの為、問題無し
                return undefined;
            }
        }
        return entity;
    }

    /**
     * 離脱可否確認
     * @param operator
     * @param dto
     */
    static async checkRemovePossible (operator: OperatorDomain, dto: ActorRemoveReqDto, entity: ActorManage) {
        // アクターを取得する
        const actor = await CatalogService.searchActorCatalog(operator, operator.actorCode);

        // PXR-Rootの場合、離脱不可
        if (actor.actorName === ActorType.PXR_ROOT) {
            throw new AppError(Message.NOT_REMOVE, 400);
        }

        // Data-Trader、Consumerの場合、例外スロー
        if (actor.actorName === ActorType.DATA_TRADER || actor.actorName === ActorType.CONSUMER) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        // Region-Rootの場合、移行先アクターコードは指定不可
        if ((actor.actorName === ActorType.REGION_ROOT) && dto.migrationActorCode !== null) {
            throw new AppError(Message.MIGRATION_ACTOR_IS_NOT_REQUIRED, 400);
        }

        // 移行先に指定したカタログコードがアクターのものであるか確認
        let mActorVersion = null;
        if (dto.migrationActorCode) {
            const migrationActor = await CatalogService.searchActorCatalog(operator, dto.migrationActorCode);
            // 移行先にconsumerが指定されている場合
            if (migrationActor.actorName === ActorType.CONSUMER) {
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }

            // どのアクター種別にも一致しない場合
            if (!ActorType.TYPE_ARRAY.includes(migrationActor.actorName)) {
                throw new AppError(sprintf(Message.THIS_IS_NOT_ACTOR_CATALOG, migrationActor.code), 400);
            }
            mActorVersion = migrationActor.version;
        }

        // アクターのステータスを取得
        const statusList = actor.rawData.template.status ? actor.rawData.template.status : [];
        if (statusList.length <= 0) {
            throw new AppError(Message.ACTOR_HAS_NOT_STATUS, 400);
        }

        // 最新の承認アクターを取得する
        let latestStatus = null;
        for (const index in statusList) {
            const status = statusList[index];
            if (latestStatus) {
                if (status.at > latestStatus.at) {
                    latestStatus = status;
                }
            } else {
                latestStatus = status;
            }
        }

        // 離脱可否チェック
        await this.checkActorConditions(operator, actor);

        if (!entity) {
            entity = new ActorManage();
        }

        // エンティティに値をセット
        entity.callerActorCode = actor.code;
        entity.callerActorVersion = actor.version;
        entity.callerBlockCode = actor.mainBlockCode;
        entity.callerBlockVersion = actor.mainBlockVersion;
        entity.type = 2;
        entity.isDraft = dto.isDraft;

        if (!dto.id) {
            entity.createdBy = operator.loginId;
        }
        entity.updatedBy = operator.loginId;

        if (!entity.actorApprovalManage) {
            entity.actorApprovalManage = new ActorApprovalManage();
            entity.actorApprovalManage.createdBy = operator.loginId;
        }

        entity.actorApprovalManage.status = ActorApprovalManage.APPLYING_STATUS;
        entity.actorApprovalManage.migrationActorCode = dto.migrationActorCode;
        entity.actorApprovalManage.migrationActorVersion = mActorVersion;
        entity.actorApprovalManage.approvalActorCode = latestStatus.by._value;
        entity.actorApprovalManage.approvalActorVersion = latestStatus.by._ver;
        entity.actorApprovalManage.updatedBy = operator.loginId;

        // 清書
        if (!entity.isDraft) {
            entity.applicantDate = momentTz(new Date()).utc();
            const authCode = await Generator.authCode(1);
            entity.actorApprovalManage.authCode = authCode;
        }

        return entity;
    }

    /**
     * アクターが離脱条件を満たしているか確認
     * @param actor
     */
    private static async checkActorConditions (operator: OperatorDomain, actor: CatalogDomain) {
        // Region-Rootの場合
        if (actor.actorName === ActorType.REGION_ROOT) {
            const temp = actor.rawData.template;
            // Region-Trader提携が解除されている事
            if (temp['trader-alliance'] !== null) {
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }

            // 運営中のRegionに参加しているappおよびwfが存在しない事
            const regions = temp.region ? temp.region : [];
            if (regions.length > 0) {
                for (const index in regions) {
                    const regionCatalog = await CatalogService.searchActorCatalog(operator, regions[index]._value);
                    const regionTemp = regionCatalog.rawData.template;
                    if (isArray(regionTemp['wf-alliance']) && regionTemp['wf-alliance'].length) {
                        throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
                    }
                    if (isArray(regionTemp['app-alliance']) && regionTemp['app-alliance'].length) {
                        throw new AppError(Message.ACTOR_JOIN_IN_REGION, 401);
                    }
                }
            }
        } else if (actor.actorName === ActorType.DATA_TRADER) {
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
    }

    /**
     * 承認要求を通知サービスへ連携する
     * @param entity
     * @param operator
     * @param dto
     */
    static async approvalLinkageForRemove (entity: ActorManage, operator: OperatorDomain) {
        // 下書きの場合は承認要求は送らない
        if (entity.isDraft) {
            return;
        }

        // 移行先が設定されている場合は移行先、無い場合は承認先を対象にする
        let blockCode = null;
        let detail: NotificationDomain;
        if (entity.actorApprovalManage.migrationActorCode) {
            const catalog = await CatalogService.searchActorCatalog(operator, entity.actorApprovalManage.migrationActorCode);
            blockCode = catalog.mainBlockCode;

            // 移行先への承認要求
            detail = {
                type: 1,
                title: config.get('migration.title.applying'),
                content: config.get('migration.content.applying'),
                category: {
                    _value: Number(config.get('migration.applying')),
                    _ver: undefined
                },
                destination: {
                    blockCode: blockCode,
                    operatorType: 3,
                    isSendAll: true
                },
                approval: {
                    noticeBlockCode: Number(config.get('noticeBlockCode')),
                    noticeUrl: sprintf(
                        config.get('remove.noticeUrl'),
                        entity.actorApprovalManage.authCode
                    )
                }
            };
        } else {
            const catalog = await CatalogService.searchActorCatalog(operator, entity.actorApprovalManage.approvalActorCode);
            blockCode = catalog.mainBlockCode;

            // 最終承認者への承認要求
            detail = {
                type: 1,
                title: config.get('remove.title.applying'),
                content: config.get('remove.content.applying'),
                category: {
                    _value: Number(config.get('actor.applying')),
                    _ver: undefined
                },
                destination: {
                    blockCode: blockCode,
                    operatorType: 3,
                    isSendAll: true
                },
                approval: {
                    noticeBlockCode: Number(config.get('noticeBlockCode')),
                    noticeUrl: sprintf(
                        config.get('remove.noticeUrl'),
                        entity.actorApprovalManage.authCode
                    )
                }
            };
        }

        const expireAt = await NotificationService.linkage([detail], operator);
        entity.approvalExpireAt = momentTz(expireAt).utc();
    }

    /**
     * 申請内容をレスポンスオブジェクトへ変換
     * @param entity
     * @param dto
     */
    static async removeApplicantResponse (
        entity: ActorManage
    ) {
        // 下書きの場合
        if (entity.isDraft) {
            const response: any = {};
            response.id = Number(entity.id);
            response.actorCode = Number(entity.callerActorCode);
            response.migrationActorCode = entity.actorApprovalManage.migrationActorCode
                ? Number(entity.actorApprovalManage.migrationActorCode)
                : null;
            response.approvalActorCode = Number(entity.actorApprovalManage.approvalActorCode);
            response.isDraft = entity.isDraft;
            response.expireAt = null;
            response.applicantDate = null;
            return response;
        } else {
            // 清書の場合
            const response: any = {};
            response.id = Number(entity.id);
            response.actorCode = Number(entity.callerActorCode);
            response.migrationActorCode = entity.actorApprovalManage.migrationActorCode
                ? Number(entity.actorApprovalManage.migrationActorCode)
                : null;
            response.approvalActorCode = Number(entity.actorApprovalManage.approvalActorCode);
            response.isDraft = entity.isDraft;
            response.applicantDate = momentTz(entity.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString);
            response.expireAt = momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString);
            return response;
        }
    }

    /**
     * 解除を実行
     * @param entity
     * @param operator
     * @param dto
     */
    static async removeExcute (entity: ActorManage, operator: OperatorDomain, dto: ApprovalReqDto) {
        // 承認種別を取得
        const approvalType = await this.checkApprovalType(entity, operator);

        // 承認だった場合
        if (dto.status === ActorApprovalManage.APPROVAL_STATUS) {
            // 移行先からの承認の場合
            if (approvalType === 1) {
                // 承認後のステータスをセット
                entity.actorApprovalManage.status = ActorApprovalManage.APPROVAL_PENDING_STATUS;
                entity.actorApprovalManage.migrationComment = dto.comment;
                entity.actorApprovalManage.migragtionApprover = operator.loginId;
                entity.actorApprovalManage.migrationApprovalAt = momentTz(new Date()).utc();
                entity.actorApprovalManage.updatedBy = operator.loginId;
            } else {
                // 最終承認者からの承認の場合
                // 承認後のステータスをセット
                entity.actorApprovalManage.status = ActorApprovalManage.APPROVAL_STATUS;
                entity.actorApprovalManage.comment = dto.comment;
                entity.actorApprovalManage.approver = operator.loginId;
                entity.actorApprovalManage.approvalAt = momentTz(new Date()).utc();
                entity.actorApprovalManage.updatedBy = operator.loginId;

                // カタログ更新処理を実行
                await this.updateExcute(entity, operator);
            }
        } else {
            // 否認だった場合
            // 移行先からの承認の場合
            if (approvalType === 1) {
                // 承認後のステータスをセット
                entity.actorApprovalManage.status = ActorApprovalManage.UN_APPROVAL_STATUS;
                entity.actorApprovalManage.migrationComment = dto.comment;
                entity.actorApprovalManage.migragtionApprover = operator.loginId;
                entity.actorApprovalManage.migrationApprovalAt = momentTz(new Date()).utc();
                entity.actorApprovalManage.updatedBy = operator.loginId;
            } else {
                // 最終承認者からの承認の場合
                // 承認後のステータスをセット
                entity.actorApprovalManage.status = ActorApprovalManage.UN_APPROVAL_STATUS;
                entity.actorApprovalManage.comment = dto.comment;
                entity.actorApprovalManage.approver = operator.loginId;
                entity.actorApprovalManage.approvalAt = momentTz(new Date()).utc();
                entity.actorApprovalManage.updatedBy = operator.loginId;
            }
        }

        return approvalType;
    }

    /**
     * 承認の種別を確認する
     * @param entity
     * @param operator
     */
    private static async checkApprovalType (entity: ActorManage, operator: OperatorDomain) {
        // 未承認の場合
        if (entity.actorApprovalManage.status === ActorApprovalManage.APPLYING_STATUS) {
            // 移行先アクターと一致する場合
            if (operator.actorCode === Number(entity.actorApprovalManage.migrationActorCode)) {
                return 1; // 移行先からの承認
            } else if (
                operator.actorCode === Number(entity.actorApprovalManage.approvalActorCode) &&
                entity.actorApprovalManage.migrationActorCode === null
            ) {
                return 2; // 最終承認者からの承認
            } else {
                // 承認アクターが一致しない
                throw new AppError(Message.NOT_MATCH_APPROVAL_ACTOR, 401);
            }
        } else {
            // 最終承認待ちの場合
            if (operator.actorCode !== Number(entity.actorApprovalManage.approvalActorCode)) {
                throw new AppError(Message.NOT_MATCH_APPROVAL_ACTOR, 401);
            }
            return 2; // 最終承認者からの承認
        }
    }

    /**
     * カタログの更新処理を実行
     * @param operator
     * @param entity
     */
    private static async updateExcute (entity: ActorManage, operator: OperatorDomain) {
        // アクターカタログに離脱フラグを立てる
        // アクターを取得
        const actor = await CatalogService.searchActorCatalog(operator, entity.callerActorCode);
        const updateRequest = parse4update(actor.rawData);

        // 離脱フラグを追加
        const prop = {
            key: 'breakaway-flg',
            value: true
        };
        updateRequest.template.value.push(prop);

        // 移行先がある場合
        if (entity.actorApprovalManage.migrationActorCode) {
            // アクターを取得
            const migrationActor = await CatalogService.searchActorCatalog(operator, entity.actorApprovalManage.migrationActorCode);
            const migrationRequest = parse4update(migrationActor.rawData);

            // 管理移行先に移譲ブロック設定を追加
            const migrationProp = {
                key: 'other-block',
                value: [
                    {
                        key: '_value',
                        value: Number(entity.callerBlockCode)
                    },
                    {
                        key: '_ver',
                        value: Number(entity.callerBlockVersion)
                    }
                ]
            };
            migrationRequest.template.value.push(migrationProp);

            // カタログ更新を実行
            await CatalogService.update(migrationActor.code, migrationRequest, operator);
        }

        // カタログ更新を実行
        await CatalogService.update(actor.code, updateRequest, operator);

        // アクターコードで証明書一覧を取得
        const certList = await CertificationAuthorityService.getCertByActorCode(actor.code, operator);

        // クライアント証明書を失効
        for (const index in certList) {
            const cert = certList[index];
            if (cert.certType && cert.certType === 'client') {
                if (cert.serialNo && cert.fingerPrint) {
                    // 証明書管理から証明書を失効させる
                    await CertificateManageService.revokeCertificate(entity.callerBlockCode, cert.serialNo, cert.fingerPrint, operator);

                    // 認証局からクライアント証明書を失効させる
                    await CertificationAuthorityService.revokeClientCertificate(cert.serialNo, cert.fingerPrint, operator);
                }
            }
        }
    }

    /**
     * 通知サービスへ承認結果を連携する（解除用）
     * @param entity
     * @param operator
     */
    static async noticeLinkageForRemove (entity: ActorManage, operator: OperatorDomain) {
        const details: NotificationDomain[] = [];

        // 承認の場合
        if (entity.actorApprovalManage.status === ActorApprovalManage.APPROVAL_STATUS) {
            // 申請元に承認結果通知を通知
            details.push({
                type: 0,
                title: config.get('remove.title.approved'),
                content: config.get('remove.content.approved'),
                category: {
                    _value: Number(config.get('actor.approved')),
                    _ver: null
                },
                destination: {
                    blockCode: Number(entity.callerBlockCode),
                    isSendAll: true,
                    operatorType: OperatorType.TYPE_MANAGE_MEMBER
                }
            });

            // 移行先がある場合は移行先に管理移行完了も通知
            if (entity.actorApprovalManage.migrationActorCode) {
                const migrationActor = await CatalogService.searchActorCatalog(operator, Number(entity.actorApprovalManage.migrationActorCode));
                details.push({
                    type: 0,
                    title: config.get('migration.title.completed'),
                    content: config.get('migration.content.completed'),
                    category: {
                        _value: Number(config.get('actor.approved')),
                        _ver: null
                    },
                    destination: {
                        blockCode: Number(migrationActor.mainBlockCode),
                        isSendAll: true,
                        operatorType: OperatorType.TYPE_MANAGE_MEMBER
                    }
                });
            }
        } else if (entity.actorApprovalManage.status === ActorApprovalManage.UN_APPROVAL_STATUS) {
            // 否認の場合
            let comment;
            if (operator.actorCode === Number(entity.actorApprovalManage.migrationActorCode)) {
                comment = entity.actorApprovalManage.migrationComment;
            } else {
                comment = entity.actorApprovalManage.comment;
            }

            // 申請元に承認結果通知を通知
            details.push({
                type: 0,
                title: config.get('remove.title.nonApproved'),
                content: sprintf(config.get('remove.content.nonApproved'), comment),
                category: {
                    _value: Number(config.get('actor.nonApproved')),
                    _ver: null
                },
                destination: {
                    blockCode: Number(entity.callerBlockCode),
                    isSendAll: true,
                    operatorType: OperatorType.TYPE_MANAGE_MEMBER
                }
            });
        } else {
            // 最終承認待ちの場合
            const approvalActor = await CatalogService.searchActorCatalog(operator, Number(entity.actorApprovalManage.approvalActorCode));

            // 最終承認者へ管理移行が承認された事を通知
            details.push({
                type: 0,
                title: config.get('migration.title.approved'),
                content: config.get('migration.content.approved'),
                category: {
                    _value: Number(config.get('actor.approved')),
                    _ver: undefined
                },
                destination: {
                    blockCode: approvalActor.mainBlockCode,
                    operatorType: OperatorType.TYPE_MANAGE_MEMBER,
                    isSendAll: true
                }
            });

            // 最終承認者へ承認要求を通知
            details.push({
                type: 1,
                title: config.get('remove.title.applying'),
                content: config.get('remove.content.applying'),
                category: {
                    _value: Number(config.get('actor.applying')),
                    _ver: undefined
                },
                destination: {
                    blockCode: approvalActor.mainBlockCode,
                    operatorType: OperatorType.TYPE_MANAGE_MEMBER,
                    isSendAll: true
                },
                approval: {
                    noticeBlockCode: Number(config.get('noticeBlockCode')),
                    noticeUrl: sprintf(
                        config.get('remove.noticeUrl'),
                        entity.actorApprovalManage.authCode
                    )
                }
            });
        }

        await NotificationService.linkage(details, operator);
    }

    /**
     * 承認結果をレスポンスオブジェクトへ変換
     * @param entity
     * @param dto
     */
    static async removeApprovalResponse (
        entity: ActorManage,
        approvalType: number
    ) {
        const response: any = {};

        response.id = Number(entity.id);
        response.type = Number(entity.type);
        response.status = Number(entity.actorApprovalManage.status);

        // 移行先がある場合
        if (entity.actorApprovalManage.migrationActorCode) {
            const migration = {
                actor: {
                    _value: Number(entity.actorApprovalManage.migrationActorCode),
                    _ver: Number(entity.actorApprovalManage.migrationActorVersion)
                },
                comment: entity.actorApprovalManage.migrationComment,
                approver: entity.actorApprovalManage.migragtionApprover,
                approvalAt: momentTz(entity.actorApprovalManage.migrationApprovalAt).tz(config.get('timezone')).format(DateTimeFormatString)
            };
            response.migration = migration;
        }

        // 移行先からの承認の場合
        if (approvalType === 1) {
            const approval = JSON.stringify({
                actor: {
                    _value: Number(entity.actorApprovalManage.approvalActorCode),
                    _ver: Number(entity.actorApprovalManage.approvalActorVersion)
                },
                comment: null,
                approver: null,
                approvalAt: null
            });
            response.approval = JSON.parse(approval);
        } else {
            // 最終承認者からの承認の場合
            const approval = {
                actor: {
                    _value: Number(entity.actorApprovalManage.approvalActorCode),
                    _ver: Number(entity.actorApprovalManage.approvalActorVersion)
                },
                comment: entity.actorApprovalManage.comment,
                approver: entity.actorApprovalManage.approver,
                approvalAt: momentTz(entity.actorApprovalManage.approvalAt).tz(config.get('timezone')).format(DateTimeFormatString)
            };
            response.approval = approval;
        }

        response.isDraft = entity.isDraft;
        response.applicantDate = momentTz(entity.applicantDate).tz(config.get('timezone')).format(DateTimeFormatString);
        response.expireAt = momentTz(entity.approvalExpireAt).tz(config.get('timezone')).format(DateTimeFormatString);

        return response;
    }
}
