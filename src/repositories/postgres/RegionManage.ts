/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import RegionApprovalManage from "./RegionApprovalManage";
/* eslint-enable */

/** Region管理申請管理テーブル */
@Entity('region_manage')
export default class RegionManage extends BaseEntity {
    /** 作成 */
    static readonly CREATE_TYPE = 1;

    /** 削除 */
    static readonly DELETE_TYPE = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number;

    /** 開始終了Regionカタログコード */
    @Column({ type: 'bigint', name: 'region_code' })
    regionCode: number;

    /** 開始終了Regionカタログバージョン */
    @Column({ type: 'bigint', name: 'region_version' })
    regionVersion: number;

    /** 申請元Blockカタログコード */
    @Column({ type: 'bigint', name: 'caller_block_code', nullable: false })
    callerBlockCode: number;

    /** 申請元Blockカタログバージョン */
    @Column({ type: 'bigint', name: 'caller_block_version', nullable: false })
    callerBlockVersion: number;

    /** 申請元アクターカタログコード */
    @Column({ type: 'bigint', name: 'applicant_actor_code' })
    applicantActorCode: number;

    /** 申請元アクターカタログバージョン */
    @Column({ type: 'bigint', name: 'applicant_actor_version' })
    applicantActorVersion: number;

    /** 申請先アクターカタログコード */
    @Column({ type: 'bigint', name: 'approval_actor_code' })
    approvalActorCode: number;

    /** 申請先アクターカタログバージョン */
    @Column({ type: 'bigint', name: 'approval_actor_version' })
    approvalActorVersion: number;

    /** テンプレート */
    @Column({ type: 'text' })
    template: string;

    /** 承認有効期限 */
    @Column({ type: 'timestamp without time zone', name: 'approval_expire_at' })
    approvalExpireAt: Date;

    /** 申請種別（開始: 1, 終了: 2） */
    @Column({ type: 'bigint', nullable: false })
    type: number;

    /** 下書きフラグ（下書き：true） */
    @Column({ type: 'boolean', name: 'is_draft', nullable: false, default: false })
    isDraft: boolean;

    /** 削除フラグ（削除済：true） */
    @Column({ type: 'boolean', name: 'is_disabled', nullable: false, default: false })
    isDisabled: boolean;

    /** 登録者 */
    @Column({ type: 'bigint', name: 'created_by', nullable: false })
    createdBy: string;

    /** 登録日時 */
    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at', nullable: false })
    readonly createdAt!: Date;

    /** 更新者 */
    @Column({ type: 'bigint', name: 'updated_by', nullable: false })
    updatedBy: string;

    /** 更新日時 */
    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at', nullable: false })
    updatedAt: Date;

    /** Region開始終了申請承認管理テーブルのレコード */
    @OneToOne(type => RegionApprovalManage, regionApprovalManage => regionApprovalManage.regionManage)
    @JoinColumn({ name: 'id', referencedColumnName: 'regionManageId' })
    regionApprovalManage: RegionApprovalManage;
}
