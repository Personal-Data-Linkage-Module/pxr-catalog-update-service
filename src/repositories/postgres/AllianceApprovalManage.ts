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
    JoinColumn,
    OneToOne
} from 'typeorm';
import AllianceManage from './AllianceManage';

@Entity('alliance_approval_manage')
export default class AllianceApprovalManage extends BaseEntity {
    /** 申請時初期ステータス */
    static APPLYING_STATUS = 0;

    /** 承認 */
    static APPROVAL_STATUS = 1;

    /** 否認 */
    static UN_APPROVAL_STATUS = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    @Column({ type: 'bigint', name: 'alliance_manage_id', nullable: false })
    allianceManageId: number;

    @Column({ type: 'varchar', length: 255, name: 'auth_code', nullable: false })
    authCode: string;

    @Column({ type: 'smallint', nullable: false, default: 0 })
    status: number;

    @Column({ type: 'text' })
    comment: string;

    @Column({ type: 'bigint', name: 'approval_actor_code' })
    approvalActorCode: number

    @Column({ type: 'bigint', name: 'approval_actor_version' })
    approvalActorVersion: number;

    @Column({ type: 'varchar', length: 255 })
    approver: string;

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

    /** 提携管理テーブルのレコード */
    @OneToOne(type => AllianceManage, allianceManage => allianceManage.allianceApprovalManage)
    @JoinColumn({ name: 'alliance_manage_id', referencedColumnName: 'id' })
    allianceManage: AllianceManage;
}
