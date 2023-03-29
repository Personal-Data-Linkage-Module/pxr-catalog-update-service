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
    UpdateDateColumn
} from 'typeorm';

/**
 * 監査レポート管理テーブル エンティティクラス
 */
@Entity('audit_report_manage')
export default class AuditReportManage extends BaseEntity {
    /** ID */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id!: number;

    /** 監査対象のアクターコード */
    @Column({ type: 'bigint', name: 'target_actor_code', nullable: false })
    targetActorCode: number;

    /** 監査対象のアクターバージョン */
    @Column({ type: 'bigint', name: 'target_actor_version', nullable: false })
    targetActorVersion: number;

    /** 監査アクターコード */
    @Column({ type: 'bigint', name: 'audit_actor_code', nullable: false })
    auditActorCode: number;

    /** 監査アクターバージョン */
    @Column({ type: 'bigint', name: 'audit_actor_version', nullable: false })
    auditActorVersion: number;

    /** 監査者 */
    @Column({ type: 'varchar', length: 255, nullable: false })
    auditor: string;

    /** レポートテンプレート */
    @Column({ type: 'text', name: 'report_template' })
    reportTemplate: string;

    /** レポート登録日 */
    @Column({ type: 'timestamp without time zone', name: 'report_created_at', nullable: false })
    reportCreatedAt: Date;

    /** 下書きフラグ */
    @Column({ type: 'boolean', nullable: false, default: false })
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
}
