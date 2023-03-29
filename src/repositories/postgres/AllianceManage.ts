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
import AllianceApprovalManage from './AllianceApprovalManage';

@Entity('alliance_manage')
export default class AllianceManage extends BaseEntity {
    /** 提携要求 */
    static readonly APPLYING_ALLIANCE_TYPE = 1;

    /** 離脱要求 */
    static readonly APPLYING_LEAVE_TYPE = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** 提携トレーダーコード */
    @Column({ type: 'bigint', name: 'alliance_trader_code' })
    allianceTraderCode: number;

    /** 提携トレーダーバージョン */
    @Column({ type: 'bigint', name: 'alliance_trader_version' })
    allianceTraderVersion: number;

    /** 提携コンシューマーコード */
    @Column({ type: 'bigint', name: 'alliance_consumer_code' })
    allianceConsumerCode: number;

    /** 提携コンシューマーバージョン */
    @Column({ type: 'bigint', name: 'alliance_consumer_version' })
    allianceConsumerVersion: number;

    /** 提携Regionコード */
    @Column({ type: 'bigint', name: 'alliance_region_code' })
    allianceRegionCode: number;

    /** 提携Regionバージョン */
    @Column({ type: 'bigint', name: 'alliance_region_version' })
    allianceRegionVersion: number;

    /** 申請アクターコード */
    @Column({ type: 'bigint', name: 'applicant_actor_code' })
    applicantActorCode: number;

    /** 申請アクターバージョン */
    @Column({ type: 'bigint', name: 'applicant_actor_version' })
    applicantActorVersion: number;

    /** 承認有効期限 */
    @Column({ type: 'timestamp without time zone', name: 'approval_expire_at' })
    approvalExpireAt: Date;

    /** 種別 */
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

    /** 提携承認管理テーブルのレコード */
    @OneToOne(type => AllianceApprovalManage, allianceApprovalManage => allianceApprovalManage.allianceManage)
    @JoinColumn({ name: 'id', referencedColumnName: 'allianceManageId' })
    allianceApprovalManage: AllianceApprovalManage;
}
