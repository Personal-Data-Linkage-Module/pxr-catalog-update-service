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
import JoinManage from './JoinManage';

/**
 * Region参加承認管理テーブル エンティティクラス
 */
@Entity('join_approval_manage')
export default class JoinApprovalManage extends BaseEntity {
    /** 申請初期ステータス */
    static readonly APPLYING_STATUS = 0;

    /** 承認 */
    static readonly APPROVAL_STATUS = 1;

    /** 否認 */
    static readonly UN_APPROVAL_STATUS = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** Region参加申請管理ID */
    @Column({ type: 'bigint', name: 'join_manage_id', nullable: false })
    joinManageId: number;

    /** 承認コード */
    @Column({ type: 'varchar', length: 255, name: 'auth_code' })
    authCode: string;

    /** ステータス */
    @Column({ type: 'smallint', nullable: false, default: 0 })
    status: number;

    /** コメント */
    @Column({ type: 'text' })
    comment: string;

    /** 承認アクターコード */
    @Column({ type: 'bigint', name: 'approval_actor_code' })
    approvalActorCode: number;

    /** 承認アクターバージョン */
    @Column({ type: 'bigint', name: 'approval_actor_version' })
    approvalActorVersion: number;

    /** 承認者 */
    @Column({ type: 'varchar', length: 255 })
    approver: string;

    /** 承認日時 */
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

    @OneToOne(type => JoinManage, joinManage => joinManage.joinApprovalManage)
    @JoinColumn({ name: 'join_manage_id', referencedColumnName: 'id' })
    joinManage: JoinManage;
}
