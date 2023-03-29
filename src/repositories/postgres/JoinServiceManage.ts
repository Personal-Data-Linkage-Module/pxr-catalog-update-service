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
    ManyToOne
} from 'typeorm';
import JoinManage from './JoinManage';

/**
 * Region参加承認管理テーブル エンティティクラス
 */
@Entity('join_service_manage')
export default class JoinServiceManage extends BaseEntity {
    /** 承認 */
    static readonly TYPE_WF = 1;

    /** 否認 */
    static readonly TYPE_APP = 2;

    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** Region参加申請管理ID */
    @Column({ type: 'bigint', name: 'join_manage_id', nullable: false })
    joinManageId: number;

    /** ステータス */
    @Column({ type: 'smallint', nullable: false })
    type: number;

    /** 承認アクターコード */
    @Column({ type: 'bigint', nullable: false, name: 'service_code' })
    serviceCode: number;

    /** 承認アクターバージョン */
    @Column({ type: 'bigint', nullable: false, name: 'service_version' })
    serviceVersion: number;

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

    @ManyToOne(type => JoinManage, joinManage => joinManage.joinServiceManages)
    @JoinColumn({ name: 'join_manage_id', referencedColumnName: 'id' })
    joinManage: JoinManage;
}
