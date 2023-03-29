/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Brackets, EntityManager, InsertResult, UpdateResult } from 'typeorm';
import AppError from '../common/AppError';
import { connectDatabase } from '../common/Connection';
import ActorApprovalManage from './postgres/ActorApprovalManage';
import AllianceApprovalManage from './postgres/AllianceApprovalManage';
import JoinApprovalManage from './postgres/JoinApprovalManage';
import ActorManage from './postgres/ActorManage';
import AllianceManage from './postgres/AllianceManage';
import JoinManage from './postgres/JoinManage';
import JoinServiceManage from './postgres/JoinServiceManage';
import DataOperationManage from './postgres/DataOperationManage';
import PlatformTermsOfUseManage from './postgres/PlatformTermsOfUseManage';
import RegionTermsOfUseManage from './postgres/RegionTermsOfUseManage';
import JoinAcquireReqDto from '../resources/dto/JoinAcquireReqDto';
import CatalogDomain from '../domains/CatalogDomain';
import ActorType from '../domains/ActorType';
import OperatorDomain from '../domains/OperatorDomain';
import Config from '../common/Config';
import { ResponseCode } from '../common/ResponseCode';
import RegionManage from './postgres/RegionManage';
import RegionApprovalManage from './postgres/RegionApprovalManage';
import RegionStatusManage from './postgres/RegionStatusManage';
import RegionStatusApprovalManage from './postgres/RegionStatusApprovalManage';
import { CodeObject } from '../resources/dto/JoinReqDto';
/* eslint-enable */
const message = Config.ReadConfig('./config/message.json');

/**
 * 各エンティティ操作クラス
 */
export default class EntityOperation {
    /**
     * リクエストの承認コードからエンティティを取得する
     * @param classType ActorApprovalManage | AllianceApprovalManage | JoinApprovalManage
     * @param authCode 承認コード
     */
    static async getApprovalManageWithAuthCode<
        T extends ActorApprovalManage | AllianceApprovalManage | JoinApprovalManage | RegionApprovalManage | RegionStatusApprovalManage
    > (
        ClassType: { new(): T },
        authCode: string
    ) {
        const t = new ClassType();
        const connection = await connectDatabase();
        let repository = null;
        let joinTableName = null;
        if (t instanceof ActorApprovalManage) {
            repository = connection.getRepository(ActorManage);
            joinTableName = 'actorApprovalManage';
        } else if (t instanceof AllianceApprovalManage) {
            repository = connection.getRepository(AllianceManage);
            joinTableName = 'allianceApprovalManage';
        } else if (t instanceof JoinApprovalManage) {
            repository = connection.getRepository(JoinManage);
            joinTableName = 'joinApprovalManage';
        /* 未使用につきコメントアウト
        } else if (t instanceof RegionApprovalManage) {
            repository = connection.getRepository(RegionManage);
            joinTableName = 'regionApprovalManage';
        */
        } else if (t instanceof RegionStatusApprovalManage) {
            repository = connection.getRepository(RegionStatusManage);
            joinTableName = 'regionStatusApprovalManage';
        }
        const entity = await repository.createQueryBuilder(repository.metadata.name)
            .innerJoinAndSelect(
                repository.metadata.name + '.' + joinTableName,
                joinTableName,
                joinTableName + '.isDisabled = false AND ' +
                joinTableName + `.authCode = '${authCode}'`
            )
            .andWhere(repository.metadata.name + '.isDisabled = false')
            .getOne();

        // 一致する対象がない場合
        if (!entity) {
            throw new AppError(message.NOT_EXISTS_AUTH_CODE, 400);
        }

        // 既に承認操作済みの場合
        if (Number(entity[joinTableName].status) === 1 ||
            Number(entity[joinTableName].status) === 2
        ) {
            throw new AppError(message.ALREADY_APPROVED, 400);
        }

        // 承認期限をすぎている場合
        if (entity.approvalExpireAt < new Date()) {
            throw new AppError(message.EXPIRE_APPROVAL_AT, 400);
        }

        return entity;
    }

    /**
     * 申請を取得する
     * @param blockCode
     * @param actorCode
     * @param approved
     */
    static async getActorApplications (
        blockCode: number,
        actorCode: number,
        approved: boolean
    ) {
        const connection = await connectDatabase();
        try {
            const query = connection.getRepository(ActorManage)
                .createQueryBuilder('actorManage')
                .leftJoinAndSelect(
                    'actorManage.actorApprovalManage',
                    'actorApprovalManage',
                    'actorApprovalManage.isDisabled = false'
                )
                .andWhere('actorManage.isDisabled = false')
                .orderBy(
                    'actorManage.id', 'DESC'
                );
            if (actorCode === null) {
                query.andWhere('actorManage.callerBlockCode = :code', { code: blockCode });
            } else {
                query.andWhere('(actorManage.callerActorCode = :code OR actorApprovalManage.approvalActorCode = :code)', { code: actorCode });
            }
            if (!approved) {
                query.andWhere(
                    `(
                        actorApprovalManage.status IS NULL OR
                        actorApprovalManage.status = 0 OR
                        actorApprovalManage.status = 3
                    )`
                );
            }
            const entities = await query.getMany();
            return entities;
        } finally {
            // await connection.close();
        }
    }

    /**
     * 参加申請の取得
     * @param dto
     * @param actorCode
     * @param actorVersion
     * @param actorCatalog
     */
    static async getJoinApplications (
        dto: JoinAcquireReqDto,
        actorCode: number,
        actorVersion: number,
        actorCatalog: CatalogDomain
    ) {
        const regionArray =
            Array.isArray(actorCatalog.rawData.template.region)
                ? actorCatalog.rawData.template.region : [];
        const connection = await connectDatabase();
        let statusPrefix = '';
        if (!dto.inApproved) {
            statusPrefix = 'AND (joinApprovalManage.status = 0 OR joinApprovalManage.status IS NULL)';
        }
        let prefix = '';
        if (dto.isRequest === true) {
            prefix += `AND joinManage.applicantActorCode = ${actorCode} `;
        } else if (dto.isRequest === false) {
            prefix += `AND joinManage.applicantActorCode != ${actorCode} `;
            if (actorCatalog.actorName === ActorType.REGION_ROOT) {
                if (regionArray.length > 0) {
                    prefix += 'AND (joinManage.joinRegionCode) IN (';
                    for (const index in regionArray) {
                        const code = regionArray[index]._value;
                        if (parseInt(index) > 0) {
                            prefix += ',';
                        }
                        prefix += `${code}`;
                    }
                    prefix += ')';
                } else {
                    prefix += 'AND joinManage.joinRegionCode = 0';
                }
            } else {
                prefix += `AND joinManage.joinActorCode = ${actorCode} `;
            }
        } else {
            if (actorCatalog.actorName === ActorType.REGION_ROOT) {
                if (regionArray.length > 0) {
                    prefix += 'AND (joinManage.joinRegionCode) IN (';
                    for (const index in regionArray) {
                        const code = regionArray[index]._value;
                        if (parseInt(index) > 0) {
                            prefix += ',';
                        }
                        prefix += `${code}`;
                    }
                    prefix += ')';
                } else {
                    prefix += 'AND joinManage.joinRegionCode = 0';
                }
            } else {
                prefix += `AND joinManage.joinActorCode = ${actorCode} `;
            }
        }
        const repository = connection.getRepository(JoinManage);
        const entities = await repository.createQueryBuilder('joinManage')
            .leftJoinAndSelect(
                'joinManage.joinServiceManages',
                'joinServiceManage',
                'joinServiceManage.isDisabled = false'
            )
            .leftJoinAndSelect(
                'joinManage.joinApprovalManage',
                'joinApprovalManage',
                'joinApprovalManage.isDisabled = false'
            )
            .andWhere('joinManage.isDisabled = false ' + prefix + statusPrefix)
            .orderBy('joinManage.id')
            .getMany();
        return entities;
    }

    /**
     * 参加サービスの取得
     * @param id
     * @returns
     */
    static async getJoinServiceManagesWithJoinManageId (
        id: number
    ) {
        const connection = await connectDatabase();
        const entities = connection.getRepository(JoinServiceManage)
            .createQueryBuilder()
            .where('is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('join_manage_id = :id', { id: id })
            .orderBy('id')
            .getMany();
        return entities;
    }

    /**
     * 既に存在しているアクターエンティティを取得する
     * @param id
     * @param operator
     */
    static async searchExistsActor (
        id: number,
        operator: OperatorDomain
    ) {
        const connection = await connectDatabase();
        try {
            const entity = await connection.getRepository(ActorManage)
                .createQueryBuilder('actorManage')
                .leftJoinAndSelect(
                    'actorManage.actorApprovalManage',
                    'actorApprovalManage',
                    'actorApprovalManage.isDisabled = false'
                )
                .andWhere('actorManage.id = :id', { id: id })
                .andWhere('actorManage.callerBlockCode = :code', { code: operator.blockCode })
                .andWhere('actorManage.type = 1')
                .andWhere('actorManage.isDraft = true')
                .andWhere('actorManage.isDisabled = false')
                .getOne();
            return entity;
        } finally {
            // await connection.close();
        }
    }

    /**
     * 既に存在しているアクターエンティティを取得する
     * @param id
     * @param operator
     */
    static async searchExistsActorRemove (
        id: number | undefined,
        type: number,
        actorCode: number
    ) {
        const connection = await connectDatabase();
        try {
            if (id) {
                const entity = await connection.getRepository(ActorManage)
                    .createQueryBuilder('actorManage')
                    .leftJoinAndSelect(
                        'actorManage.actorApprovalManage',
                        'actorApprovalManage',
                        'actorApprovalManage.isDisabled = false'
                    )
                    .andWhere('actorManage.id = :id', { id: id })
                    .andWhere('actorManage.callerActorCode = :code', { code: actorCode })
                    .andWhere('actorManage.type = :type', { type: type })
                    .andWhere('actorManage.isDisabled = false')
                    .andWhere('(actorManage.approvalExpireAt IS NULL OR actorManage.approvalExpireAt >= :expire)', { expire: new Date() })
                    .getOne();
                return entity;
            } else {
                const entity = await connection.getRepository(ActorManage)
                    .createQueryBuilder('actorManage')
                    .leftJoinAndSelect(
                        'actorManage.actorApprovalManage',
                        'actorApprovalManage',
                        'actorApprovalManage.isDisabled = false'
                    )
                    .andWhere('actorManage.callerActorCode = :code', { code: actorCode })
                    .andWhere('actorManage.type = :type', { type: type })
                    .andWhere('actorManage.isDisabled = false')
                    .andWhere('(actorManage.approvalExpireAt IS NULL OR actorManage.approvalExpireAt >= :expire)', { expire: new Date() })
                    .orderBy('actorApprovalManage.status', 'ASC')
                    .getOne();
                return entity;
            }
        } finally {
            // await connection.close();
        }
    }

    /**
     * 申請の存在を確認する
     * @param id
     * @param actorCode
     * @param regionCode
     */
    static async searchExistsJoin (
        id: number,
        actor: object,
        region: object,
        serviceCodes: CodeObject[],
        operator: OperatorDomain
    ) {
        const connection = await connectDatabase();
        try {
            const actorCode = actor['code'];
            const actorVersion = actor['version'];
            const regionCode = region['code'];
            const regionVersion = region['version'];
            if (id) {
                const entity = await connection.getRepository(JoinManage)
                    .createQueryBuilder('joinManage')
                    .leftJoinAndSelect(
                        'joinManage.joinApprovalManage',
                        'joinApprovalManage',
                        'joinApprovalManage.isDisabled = false'
                    )
                    .andWhere('joinManage.id = :id', { id: id })
                    .andWhere('joinManage.applicantActorCode = :c', { c: operator.actorCode })
                    .andWhere('joinManage.applicantActorVersion = :d', { d: operator.actorVersion })
                    .andWhere('joinManage.isDraft = true')
                    .andWhere('joinManage.isDisabled = false')
                    .andWhere('(joinManage.approvalExpireAt IS NULL OR joinManage.approvalExpireAt >= :expire)', { expire: new Date() })
                    .getOne();
                return entity;
            } else {
                let sql = connection.getRepository(JoinManage)
                    .createQueryBuilder('joinManage')
                    .leftJoinAndSelect(
                        'joinManage.joinApprovalManage',
                        'joinApprovalManage',
                        'joinApprovalManage.isDisabled = false'
                    )
                    .leftJoinAndSelect(
                        'joinManage.joinServiceManages',
                        'joinServiceManage',
                        'joinServiceManage.isDisabled = false'
                    )
                    .andWhere('joinManage.joinActorCode = :c', { c: actorCode })
                    .andWhere('joinManage.joinActorVersion = :d', { d: actorVersion })
                    .andWhere('joinManage.joinRegionCode = :e', { e: regionCode })
                    .andWhere('joinManage.joinRegionVersion = :f', { f: regionVersion })
                    .andWhere('joinManage.isDisabled = false')
                    .andWhere('(joinManage.approvalExpireAt IS NULL OR joinManage.approvalExpireAt >= :expire)', { expire: new Date() });
                if (serviceCodes && serviceCodes.length > 0) {
                    // (serviceCodesはjoinReqDtoで空配列が禁止されているためelse分岐は通らない)
                    sql = sql.andWhere(
                        new Brackets(subQb => {
                            for (const serviceCode of serviceCodes) {
                                subQb.orWhere(
                                    new Brackets(orSubQb => {
                                        orSubQb.andWhere('joinServiceManage.serviceCode = :serviceCode', { serviceCode: Number(serviceCode.code) });
                                        orSubQb.andWhere('joinServiceManage.serviceVersion = :serviceVersion', { serviceVersion: Number(serviceCode.version) });
                                    })
                                );
                            }
                        })
                    );
                }
                const entity = await sql
                    .orderBy('joinManage.id', 'DESC')
                    .addOrderBy('joinApprovalManage.updatedAt', 'DESC')
                    .getOne();
                return entity;
            }
        } finally {
            // await connection.close();
        }
    }

    /**
     * 提携申請情報の保存
     * @param entity
     */
    static async saveAllianceEntity (entity: AllianceManage) {
        const connection = await connectDatabase();
        try {
            const approvalManage = entity.allianceApprovalManage;
            entity.allianceApprovalManage = null;
            let result;
            if (entity.id) {
                if (entity.allianceConsumerCode) {
                    await connection
                        .createQueryBuilder()
                        .update(AllianceManage)
                        .set({
                            allianceTraderCode: entity.allianceTraderCode,
                            allianceTraderVersion: entity.allianceTraderVersion,
                            allianceConsumerCode: entity.allianceConsumerCode,
                            allianceConsumerVersion: entity.allianceConsumerVersion,
                            applicantActorCode: entity.applicantActorCode,
                            applicantActorVersion: entity.applicantActorVersion,
                            approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                            applicantDate: entity.applicantDate ? entity.applicantDate : null,
                            type: entity.type,
                            isDraft: entity.isDraft,
                            updatedBy: entity.updatedBy
                        })
                        .where('id = :id', { id: Number(entity.id) })
                        .andWhere('is_disabled = false')
                        .execute();
                } else {
                    await connection
                        .createQueryBuilder()
                        .update(AllianceManage)
                        .set({
                            allianceTraderCode: entity.allianceTraderCode,
                            allianceTraderVersion: entity.allianceTraderVersion,
                            allianceRegionCode: entity.allianceRegionCode,
                            allianceRegionVersion: entity.allianceRegionVersion,
                            applicantActorCode: entity.applicantActorCode,
                            applicantActorVersion: entity.applicantActorVersion,
                            approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                            applicantDate: entity.applicantDate ? entity.applicantDate : null,
                            type: entity.type,
                            isDraft: entity.isDraft,
                            updatedBy: entity.updatedBy
                        })
                        .where('id = :id', { id: Number(entity.id) })
                        .andWhere('is_disabled = false')
                        .execute();
                }
                if (approvalManage) {
                    approvalManage.allianceManageId = Number(entity.id);
                    entity.allianceApprovalManage = await connection
                        .getRepository(AllianceApprovalManage)
                        .save(approvalManage);
                }
                result = entity;
            } else {
                result = await connection
                    .getRepository(AllianceManage)
                    .save(entity);
                if (approvalManage) {
                    approvalManage.allianceManageId = result.id;
                    result.allianceApprovalManage = await connection
                        .getRepository(AllianceApprovalManage)
                        .save(approvalManage);
                }
            }
            return result;
        } finally {
            // await connection.close();
        }
    }

    /**
     * アクター申請情報の保存
     * @param entity
     */
    static async saveActorEntity (entity: ActorManage) {
        const connection = await connectDatabase();
        try {
            const approvalManage = entity.actorApprovalManage;
            entity.actorApprovalManage = null;
            let result;
            if (entity.id) {
                await connection
                    .createQueryBuilder()
                    .update(ActorManage)
                    .set({
                        callerActorCode: entity.callerActorCode,
                        callerActorVersion: entity.callerActorVersion,
                        callerBlockCode: entity.callerBlockCode,
                        callerBlockVersion: entity.callerBlockVersion,
                        template: entity.template,
                        approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                        applicantDate: entity.applicantDate ? entity.applicantDate : null,
                        type: entity.type,
                        isDraft: entity.isDraft,
                        attributes: entity.attributes,
                        updatedBy: entity.updatedBy
                    })
                    .where('id = :id', { id: Number(entity.id) })
                    .andWhere('is_disabled = false')
                    .execute();

                approvalManage.actorManageId = Number(entity.id);
                await connection
                    .createQueryBuilder()
                    .update(ActorApprovalManage)
                    .set({
                        authCode: approvalManage.authCode ? approvalManage.authCode : null,
                        status: approvalManage.status,
                        comment: approvalManage.comment,
                        approvalActorCode: approvalManage.approvalActorCode ? approvalManage.approvalActorCode : null,
                        approvalActorVersion: approvalManage.approvalActorVersion ? approvalManage.approvalActorVersion : null,
                        approver: approvalManage.approver,
                        approvalAt: approvalManage.approvalAt,
                        updatedBy: approvalManage.updatedBy
                    })
                    .where('actor_manage_id = :amid', { amid: approvalManage.actorManageId })
                    .andWhere('is_disabled = false')
                    .execute();
                entity.actorApprovalManage = approvalManage;
                result = entity;
            } else {
                result = await connection
                    .getRepository(ActorManage)
                    .save(entity);
                approvalManage.actorManageId = result.id;
                result.actorApprovalManage = await connection
                    .getRepository(ActorApprovalManage)
                    .save(approvalManage);
            }
            return result;
        } finally {
            // await connection.close();
        }
    }

    /**
     * アクター申請情報の保存
     * @param entity
     */
    static async saveActorRemoveEntity (entity: ActorManage) {
        const connection = await connectDatabase();
        try {
            const approvalManage = entity.actorApprovalManage;
            entity.actorApprovalManage = null;
            let result;
            if (entity.id) {
                await connection
                    .createQueryBuilder()
                    .update(ActorManage)
                    .set({
                        callerActorCode: entity.callerActorCode,
                        callerActorVersion: entity.callerActorVersion,
                        callerBlockCode: entity.callerBlockCode,
                        callerBlockVersion: entity.callerBlockVersion,
                        approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                        applicantDate: entity.applicantDate ? entity.applicantDate : null,
                        isDraft: entity.isDraft,
                        updatedBy: entity.updatedBy
                    })
                    .where('id = :id', { id: Number(entity.id) })
                    .andWhere('is_disabled = false')
                    .execute();
                approvalManage.actorManageId = Number(entity.id);
                entity.actorApprovalManage = await connection
                    .getRepository(ActorApprovalManage)
                    .save(approvalManage);
                result = entity;
            } else {
                result = await connection
                    .getRepository(ActorManage)
                    .save(entity);
                approvalManage.actorManageId = result.id;
                result.actorApprovalManage = await connection
                    .getRepository(ActorApprovalManage)
                    .save(approvalManage);
            }
            return result;
        } finally {
            // await connection.close();
        }
    }

    /**
     * 参加申請情報の保存
     * @param entity
     */
    static async saveJoinEntity (entity: JoinManage) {
        const connection = await connectDatabase();
        const approvalManage = entity.joinApprovalManage;
        const serviceManages = entity.joinServiceManages;
        entity.joinApprovalManage = null;
        let result;
        await connection.transaction(async em => {
            if (entity.id) {
                await em
                    .createQueryBuilder()
                    .update(JoinManage)
                    .set({
                        joinActorCode: entity.joinActorCode,
                        joinActorVersion: entity.joinActorVersion,
                        joinRegionCode: entity.joinRegionCode,
                        joinRegionVersion: entity.joinRegionVersion,
                        applicantActorCode: entity.applicantActorCode,
                        applicantActorVersion: entity.applicantActorVersion,
                        approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                        applicantDate: entity.applicantDate ? entity.applicantDate : null,
                        type: entity.type,
                        isDraft: entity.isDraft,
                        updatedBy: entity.updatedBy
                    })
                    .where('id = :id', { id: Number(entity.id) })
                    .andWhere('is_disabled = false')
                    .execute();
                if (approvalManage) {
                    approvalManage.joinManageId = Number(entity.id);
                    entity.joinApprovalManage = await em
                        .getRepository(JoinApprovalManage)
                        .save(approvalManage);
                }
                for (let serviceManage of serviceManages) {
                    serviceManage.joinManageId = Number(entity.id);
                    serviceManage = await em.getRepository(JoinServiceManage).save(serviceManage);
                }
                result = entity;
            } else {
                result = await em
                    .getRepository(JoinManage)
                    .save(entity);
                if (approvalManage) {
                    approvalManage.joinManageId = result.id;
                    result.joinApprovalManage = await em
                        .getRepository(JoinApprovalManage)
                        .save(approvalManage);
                }
                for (let serviceManage of serviceManages) {
                    serviceManage.joinManageId = Number(entity.id);
                    serviceManage = await em.getRepository(JoinServiceManage).save(serviceManage);
                }
            }
        }).catch(err => {
            throw err;
        });
        return result;
    }

    /**
     * 認証コードの存在確認
     * @param type
     * @param code
     */
    static async isAuthCodeExists (type: number, code: string) {
        const connection = await connectDatabase();
        try {
            // 対象のテーブルを判別する
            let repository = null;
            let table = null;
            if (type === 1) {
                repository = ActorApprovalManage;
                table = 'actor_approval_manage';
            } else if (type === 2) {
                repository = JoinApprovalManage;
                table = 'join_approval_manage';
            } else if (type === 3) {
                repository = AllianceApprovalManage;
                table = 'alliance_approval_manage';
            } else if (type === 4) {
                repository = RegionApprovalManage;
                table = 'region_approval_manage';
            }

            // 対象のテーブルに生成した認証コードが存在するか確認
            const ret = await connection
                .createQueryBuilder()
                .from(repository, table)
                .where('is_disabled = :is_disabled', { is_disabled: false })
                .andWhere('auth_code = :auth_code', { auth_code: code })
                .getCount();

            return ret;
        } finally {
            // await connection.close();
        }
    }

    /**
     * データ処理定義管理レコード取得
     * @param id
     */
    static async getDataOperationManage (id: number, actorCode?: number, isDraft?: boolean) {
        const connection = await connectDatabase();
        let sql = connection.getRepository(DataOperationManage)
            .createQueryBuilder()
            .where('id = :id', { id: id })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false });
        if (actorCode) {
            // (actorCodeが無い場合手前の処理でエラーになるため呼ばれることはなく、else分岐は通らない)
            sql = sql.andWhere('application_actor_code = :actorCode', { actorCode: actorCode });
        }
        if (isDraft) {
            // (isDraft = falseで呼ばれることがないためelse分岐は通らない)
            sql = sql.andWhere('is_draft = :isDraft', { isDraft: isDraft });
        }
        const entity = await sql.getOne();
        return entity;
    }

    /**
     * データ処理定義管理レコード複数取得
     * @param approvalRequest
     * @param approved
     * @param offset
     * @param limit
     */
    static async getDataOperationManages (approvalRequest: boolean, approved: boolean, offset: number, limit: number, actorCode: number): Promise<DataOperationManage[]> {
        const connection = await connectDatabase();
        let sql = connection.getRepository(DataOperationManage)
            .createQueryBuilder()
            .where('is_disabled = :isDisabled', { isDisabled: false });
        if (approvalRequest) {
            sql = sql.andWhere('application_actor_code = :actorCode', { actorCode: actorCode });
        }
        if (!approved) {
            sql = sql.andWhere('is_draft = :isDraft', { isDraft: true });
        }
        sql = sql.orderBy('id', 'DESC').offset(offset).limit(limit);
        const entity = await sql.getMany();
        return entity;
    }

    /**
     * データ処理定義管理登録
     * @param entity
     */
    static async insertDataOperationManage (em: EntityManager, entity: DataOperationManage): Promise<InsertResult> {
        const result = await em.createQueryBuilder()
            .insert()
            .into(DataOperationManage)
            .values({
                template: entity.template,
                applicationActorCode: entity.applicationActorCode,
                applicationBlockCode: entity.applicationBlockCode,
                applicationAt: entity.applicationAt,
                isDraft: entity.isDraft,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return result;
    }

    /**
     * データ処理定義管理更新
     * @param entity
     */
    static async updateDataOperationManage (em: EntityManager, entity: DataOperationManage): Promise<UpdateResult> {
        /* entity.idが無い場合(更新用データ取得していない場合) は呼ばれないメソッドので不要
        if (!entity.id) {
            throw new AppError(message.NO_EXIST_ID, ResponseCode.INTERNAL_SERVER_ERROR);
        }
        */
        const result = await em.createQueryBuilder()
            .update(DataOperationManage)
            .set({
                template: entity.template,
                applicationActorCode: entity.applicationActorCode,
                applicationBlockCode: entity.applicationBlockCode,
                applicationAt: entity.applicationAt,
                isDraft: entity.isDraft,
                isDisabled: entity.isDisabled,
                updatedBy: entity.updatedBy
            })
            .where('id = :id', { id: Number(entity.id) })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
        return result;
    }

    /**
     * 利用規約更新
     * @param entity
     */
    static async insertTermsOfUseManage (entity: RegionTermsOfUseManage | PlatformTermsOfUseManage) {
        let repository;
        let targetTable;
        const connection = await connectDatabase();
        if (entity instanceof PlatformTermsOfUseManage) {
            repository = connection.getRepository(PlatformTermsOfUseManage);
            targetTable = PlatformTermsOfUseManage;
        /* entityの型が定義されているためif文は不要
        } else if (entity instanceof RegionTermsOfUseManage) {
            repository = connection.getRepository(RegionTermsOfUseManage);
            targetTable = RegionTermsOfUseManage;
        */
        } else {
            repository = connection.getRepository(RegionTermsOfUseManage);
            targetTable = RegionTermsOfUseManage;
        }
        const result = await repository
            .createQueryBuilder(repository.metadata.name)
            .insert()
            .into(targetTable)
            .values({
                termsOfUseCode: entity.termsOfUseCode,
                termsOfUseVersion: entity.termsOfUseVersion,
                template: entity.template,
                applicationActorCode: entity.applicationActorCode,
                applicationBlockCode: entity.applicationBlockCode,
                applicationAt: entity.applicationAt,
                isDisabled: entity.isDisabled,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return result;
    }

    /**
     * Region作成削除申請取得
     */
    static async getRegionApplications (
        inApproved: boolean,
        isRegionRoot: boolean,
        operator: OperatorDomain
    ) {
        const connection = await connectDatabase();
        let statusPrefix = '';
        if (!inApproved) {
            statusPrefix += 'AND (regionApprovalManage.status = 0 OR regionApprovalManage.status IS NULL)';
        }
        const repository = connection.getRepository(RegionManage);
        let sql = repository.createQueryBuilder('regionManage')
            .leftJoinAndSelect(
                'regionManage.regionApprovalManage',
                'regionApprovalManage',
                'regionApprovalManage.isDisabled = false'
            )
            .andWhere('regionManage.isDisabled = false ' + statusPrefix);
        if (isRegionRoot) {
            sql = sql.andWhere('regionManage.applicantActorCode = :actorCode', { actorCode: operator.actorCode });
        }
        sql = sql.orderBy('regionManage.id');
        const entities = await sql.getMany();
        return entities;
    }

    static async searchExistsRegion (
        id: number,
        actorCode: number,
        type: number
    ) {
        const connection = await connectDatabase();
        const entity = await connection.getRepository(RegionManage)
            .createQueryBuilder()
            .andWhere('applicant_actor_code = :actorCode', { actorCode: actorCode })
            .andWhere('id = :id', { id: id })
            .andWhere('type = :type', { type: type })
            .andWhere('is_disabled = false')
            .getOne();
        return entity;
    }

    static async searchExistsRegions (
        actorCode: number,
        type: number,
        regionCode: number
    ) {
        const status = 0;
        const connection = await connectDatabase();
        const entities = await connection.getRepository(RegionManage)
            .createQueryBuilder('regionManage')
            .leftJoinAndSelect(
                'regionManage.regionApprovalManage',
                'regionApprovalManage',
                'regionApprovalManage.isDisabled = false'
            )
            .andWhere('regionManage.applicantActorCode = :actorCode', { actorCode: actorCode })
            .andWhere('regionManage.type = :type', { type: type })
            .andWhere('regionApprovalManage.status = :status', { status: status })
            .andWhere('regionManage.isDisabled = :isDisabled', { isDisabled: false })
            .andWhere('regionManage.regionCode = :regionCode', { regionCode: regionCode })
            .orderBy('regionManage.id')
            .getMany();
        return entities;
    }

    /**
     * Region開始終了申請取得
     */
    static async getRegionStatusApplications (
        inApproved: boolean,
        isRegionRoot: boolean,
        operator: OperatorDomain
    ) {
        const connection = await connectDatabase();
        let statusPrefix = '';
        if (!inApproved) {
            statusPrefix += 'AND (regionStatusApprovalManage.status = 0 OR regionStatusApprovalManage.status IS NULL)';
        }
        const repository = connection.getRepository(RegionStatusManage);
        let sql = repository.createQueryBuilder('regionStatusManage')
            .leftJoinAndSelect(
                'regionStatusManage.regionStatusApprovalManage',
                'regionStatusApprovalManage',
                'regionStatusApprovalManage.isDisabled = false'
            )
            .andWhere('regionStatusManage.isDisabled = false ' + statusPrefix);
        if (isRegionRoot) {
            sql = sql.andWhere('regionStatusManage.applicantActorCode = :actorCode', { actorCode: operator.actorCode });
        }
        sql = sql.orderBy('regionStatusManage.id');
        const entities = await sql.getMany();
        return entities;
    }

    /**
     * Region開始終了申請の取得
     * @param id
     * @param actorCode
     * @param type
     * @returns
     */
    static async searchExistsRegionStatus (
        regionCode: number,
        type: number
    ) {
        const connection = await connectDatabase();
        const entities = await connection.getRepository(RegionStatusManage)
            .createQueryBuilder('regionStatusManage')
            .leftJoinAndSelect(
                'regionStatusManage.regionStatusApprovalManage',
                'regionStatusApprovalManage',
                'regionStatusApprovalManage.isDisabled = false'
            )
            .where('regionStatusManage.regionCode = :regionCode', { regionCode: regionCode })
            .andWhere('regionStatusManage.type = :type', { type: type })
            .andWhere('regionStatusManage.isDisabled = :isDisabled', { isDisabled: false })
            .andWhere('regionStatusApprovalManage.status = :status', { status: RegionStatusApprovalManage.APPLYING_STATUS })
            .getMany();
        return entities;
    }

    /**
     * 参加申請情報の保存
     * @param entity
     */
    static async saveRegionEntity (entity: RegionManage) {
        const connection = await connectDatabase();
        const approvalManage = entity.regionApprovalManage;
        entity.regionApprovalManage = null;
        let result;
        if (entity.id) {
            await connection
                .createQueryBuilder()
                .update(RegionManage)
                .set({
                    regionCode: entity.regionCode,
                    regionVersion: entity.regionVersion,
                    callerBlockCode: entity.callerBlockCode,
                    callerBlockVersion: entity.callerBlockVersion,
                    applicantActorCode: entity.applicantActorCode,
                    applicantActorVersion: entity.applicantActorVersion,
                    approvalActorCode: entity.applicantActorCode,
                    approvalActorVersion: entity.applicantActorVersion,
                    template: entity.template,
                    approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                    type: entity.type,
                    isDraft: entity.isDraft,
                    createdBy: entity.createdBy,
                    updatedBy: entity.updatedBy
                })
                .where('id = :id', { id: Number(entity.id) })
                .andWhere('is_disabled = false')
                .execute();
            if (approvalManage) {
                approvalManage.regionManageId = Number(entity.id);
                entity.regionApprovalManage = await connection
                    .getRepository(RegionApprovalManage)
                    .save(approvalManage);
            }
            result = entity;
        } else {
            result = await connection
                .getRepository(RegionManage)
                .save(entity);
            if (approvalManage) {
                approvalManage.regionManageId = result.id;
                result.regionApprovalManage = await connection
                    .getRepository(RegionApprovalManage)
                    .save(approvalManage);
            }
        }

        return result;
    }

    static async updateExpireAtRegionStatusEntity (entity: RegionStatusManage) {
        const connection = await connectDatabase();
        await connection
            .createQueryBuilder()
            .update(RegionStatusManage)
            .set({
                approvalExpireAt: entity.approvalExpireAt
            })
            .where('id = :id', { id: entity.id })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /* どこからも呼ばれていないメソッドにつきコメントアウト
    static async searchRegion (regionCode: number) {
        const connection = await connectDatabase();
        let result;
        try {
            result = await connection
                .getRepository(RegionManage)
                .createQueryBuilder('regionManage')
                .leftJoinAndSelect(
                    'regionManage.regionApprovalManage',
                    'regionApprovalManage',
                    'regionApprovalManage.isDisabled = false'
                )
                .andWhere('regionManage.regionCode = :regionCode', { regionCode: regionCode })
                .getOne();
            return result;
        } finally {
            // await connection.close();
        }
    }
    */

    /**
     * 開始終了申請の保存
     * @param entity
     */
    static async saveRegionStatusEntity (entity: RegionStatusManage) {
        const connection = await connectDatabase();
        const approvalManage = entity.regionStatusApprovalManage;
        entity.regionStatusApprovalManage = null;
        let result;
        if (entity.id) {
            await connection
                .createQueryBuilder()
                .update(RegionStatusManage)
                .set({
                    regionCode: entity.regionCode,
                    regionVersion: entity.regionVersion,
                    callerBlockCode: entity.callerBlockCode,
                    callerBlockVersion: entity.callerBlockVersion,
                    applicantActorCode: entity.applicantActorCode,
                    applicantActorVersion: entity.applicantActorVersion,
                    approvalActorCode: entity.applicantActorCode,
                    approvalActorVersion: entity.applicantActorVersion,
                    requestComment: entity.requestComment,
                    // entity.approvalExpireAtが無い場合は手前の処理でエラーになるためelse分岐は通らない
                    approvalExpireAt: entity.approvalExpireAt ? entity.approvalExpireAt : null,
                    type: entity.type,
                    createdBy: entity.createdBy,
                    updatedBy: entity.updatedBy
                })
                .where('id = :id', { id: Number(entity.id) })
                .andWhere('is_disabled = false')
                .execute();
            if (approvalManage) {
                // entity.regionStatusApprovalManageが無い場合は手前の処理でエラーになるためelse分岐は通らない
                approvalManage.regionStatusManageId = Number(entity.id);
                entity.regionStatusApprovalManage = await connection
                    .getRepository(RegionStatusApprovalManage)
                    .save(approvalManage);
            }
            result = entity;
        } else {
            result = await connection
                .getRepository(RegionStatusManage)
                .save(entity);
            if (approvalManage) {
                // RegionStatusService.createRegionStatusで生成しており必ず存在するためelse分岐は通らない
                approvalManage.regionStatusManageId = result.id;
                result.regionStatusApprovalManage = await connection
                    .getRepository(RegionStatusApprovalManage)
                    .save(approvalManage);
            }
        }
        return result;
    }
}
