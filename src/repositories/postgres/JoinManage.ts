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
    JoinColumn,
    OneToMany
} from 'typeorm';
import JoinApprovalManage from './JoinApprovalManage';
import JoinServiceManage from './JoinServiceManage';

/**
 * Region参加管理テーブル エンティティクラス
 */
@Entity('join_manage')
export default class JoinManage extends BaseEntity {
    /** 参加要求 */
    static readonly APPLYING_JOIN_TYPE = 1;

    /** 離脱要求 */
    static readonly APPLYING_DEFECTION_TYPE = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** 参加アクターコード */
    @Column({ type: 'bigint', name: 'join_actor_code', nullable: false })
    joinActorCode: number;

    /** 参加アクターバージョン */
    @Column({ type: 'bigint', name: 'join_actor_version', nullable: false })
    joinActorVersion: number;

    /** 参加Regionコード */
    @Column({ type: 'bigint', name: 'join_region_code', nullable: false })
    joinRegionCode: number;

    /** 参加Regionバージョン */
    @Column({ type: 'bigint', name: 'join_region_version', nullable: false })
    joinRegionVersion: number;

    /** 申請アクターコード */
    @Column({ type: 'bigint', name: 'applicant_actor_code' })
    applicantActorCode: number;

    /** 申請アクターバージョン */
    @Column({ type: 'bigint', name: 'applicant_actor_version' })
    applicantActorVersion: number;

    /** 承認 */
    @Column({ type: 'timestamp without time zone', name: 'approval_expire_at' })
    approvalExpireAt: Date;

    /** 申請種別 */
    @Column({ type: 'smallint', nullable: false })
    type: number;

    /** 申請日時 */
    @Column({ type: 'timestamp without time zone', name: 'applicant_date', default: null })
    applicantDate: Date;

    /** 下書きフラグ */
    @Column({ type: 'boolean', name: 'is_draft', nullable: false, default: false })
    isDraft: boolean;

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

    /** Region参加承認管理テーブルのレコード */
    @OneToOne(type => JoinApprovalManage, joinApprovalManage => joinApprovalManage.joinManage)
    @JoinColumn({ name: 'id', referencedColumnName: 'joinManageId' })
    joinApprovalManage: JoinApprovalManage;

    /** Region参加承認管理テーブルのレコード */
    @OneToMany(type => JoinServiceManage, joinServiceManage => joinServiceManage.joinManage)
    @JoinColumn({ name: 'id', referencedColumnName: 'joinManageId' })
    joinServiceManages: JoinServiceManage[];
}
