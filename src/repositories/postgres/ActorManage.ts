/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import ActorApprovalManage from './ActorApprovalManage';

/**
 * アクター申請管理テーブル エンティティクラス
 */
@Entity('actor_manage')
export default class ActorManage extends BaseEntity {
    /** 提携要求 */
    static readonly APPLYING_AUTHORIZATION_TYPE = 1;

    /** 離脱要求 */
    static readonly APPLYING_DECERTIFICATION_TYPE = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** 呼出元アクタカタログーコード */
    @Column({ type: 'bigint', name: 'caller_actor_code' })
    callerActorCode: number;

    /** 呼出元アクターカタログバージョン */
    @Column({ type: 'bigint', name: 'caller_actor_version' })
    callerActorVersion: number;

    /** 呼出元ブロックカタログコード */
    @Column({ type: 'bigint', name: 'caller_block_code', nullable: false })
    callerBlockCode: number;

    /** 呼出元ブロックカタログバージョン */
    @Column({ type: 'bigint', name: 'caller_block_version', nullable: false })
    callerBlockVersion: number;

    /** テンプレート */
    @Column({ type: 'text' })
    template: string;

    /** 有効期限 */
    @Column({ type: 'timestamp without time zone', name: 'approval_expire_at', nullable: false })
    approvalExpireAt: Date;

    /** 種別 */
    @Column({ type: 'smallint', nullable: false })
    type: number;

    /** 申請日時 */
    @Column({ type: 'timestamp without time zone', name: 'applicant_date' })
    applicantDate: Date;

    /** 下書きフラグ */
    @Column({ type: 'boolean', name: 'is_draft', nullable: false, default: false })
    isDraft: boolean;

    /** その他属性 */
    @Column({ type: 'text' })
    attributes: string;

    /** 無効フラグ */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /** 登録者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string = '';

    /** 登録日時 */
    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
    readonly createdAt!: Date;

    /** 更新者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string = '';

    /** 更新日時 */
    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at', onUpdate: 'now()' })
    readonly updatedAt!: Date;

    /** アクター申請承認管理テーブルのレコード */
    @OneToOne(type => ActorApprovalManage, actorApprovalManage => actorApprovalManage.actorManage)
    @JoinColumn({ name: 'id', referencedColumnName: 'actorManageId' })
    actorApprovalManage: ActorApprovalManage;
}
