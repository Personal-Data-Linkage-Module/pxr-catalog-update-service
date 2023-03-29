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
import ActorManage from './ActorManage';

/**
 * アクター申請承認管理テーブル エンティティクラス
 */
@Entity('actor_approval_manage')
export default class ActorApprovalManage extends BaseEntity {
    /** 申請時初期ステータス */
    static APPLYING_STATUS = 0;

    /** 承認 */
    static APPROVAL_STATUS = 1;

    /** 否認 */
    static UN_APPROVAL_STATUS = 2;

    /** 最終承認待ち */
    static APPROVAL_PENDING_STATUS = 3;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** アクター管理ID */
    @Column({ type: 'bigint', name: 'actor_manage_id', nullable: false })
    actorManageId: number;

    /** 承認コード */
    @Column({ type: 'varchar', name: 'auth_code', nullable: false })
    authCode: string;

    /** ステータス */
    @Column({ type: 'smallint', nullable: false, default: 0 })
    status: number;

    /** コメント */
    @Column({ type: 'text' })
    comment: string;

    /** 移行先アクターコード */
    @Column({ type: 'bigint', name: 'migration_actor_code' })
    migrationActorCode: number;

    /** 移行先アクターバージョン */
    @Column({ type: 'bigint', name: 'migration_actor_version' })
    migrationActorVersion: number;

    /** 移行先コメント */
    @Column({ type: 'text', name: 'migration_comment' })
    migrationComment: string;

    /** 移行先承認操作者 */
    @Column({ type: 'varchar', name: 'migragtion_approver', length: 255 })
    migragtionApprover: string;

    /** 移行先承認操作日時 */
    @Column({ type: 'timestamp without time zone', name: 'migration_approval_at' })
    migrationApprovalAt: Date;

    /** 承認アクターコード */
    @Column({ type: 'bigint', name: 'approval_actor_code' })
    approvalActorCode: number;

    /** 承認アクターバージョン */
    @Column({ type: 'bigint', name: 'approval_actor_version' })
    approvalActorVersion: number;

    /** 承認操作者 */
    @Column({ type: 'varchar', length: 255 })
    approver: string;

    /** 承認操作日時 */
    @Column({ type: 'timestamp without time zone', name: 'approval_at' })
    approvalAt: Date;

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

    /** アクター管理テーブルのレコード */
    @OneToOne(type => ActorManage, actorManage => actorManage.actorApprovalManage)
    @JoinColumn({ name: 'actor_manage_id', referencedColumnName: 'id' })
    actorManage: ActorManage;
}
