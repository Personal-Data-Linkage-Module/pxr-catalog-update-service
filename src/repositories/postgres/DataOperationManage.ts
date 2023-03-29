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
 * データ処理定義管理テーブル エンティティクラス
 */
@Entity('data_operation_manage')
export default class DataOperationManage extends BaseEntity {
    /** id */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    /** template */
    @Column({ type: 'text' })
    template: string;

    /** 呼出元アクターコード */
    @Column({ type: 'bigint', nullable: false, name: 'application_actor_code' })
    applicationActorCode: number;

    /** 呼出元ブロックコード */
    @Column({ type: 'bigint', nullable: false, name: 'application_block_code' })
    applicationBlockCode: number;

    /** 申請日時 */
    @Column({ type: 'timestamp without time zone', name: 'application_at' })
    applicationAt: Date;

    /** 下書きフラグ */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_draft' })
    isDraft: boolean;

    /** 無効フラグ */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean;

    /** 登録者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string;

    /** 登録日時 */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'created_at' })
    createdAt: Date;

    /** 更新者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string;

    /** 更新日時 */
    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', onUpdate: 'NOW()', name: 'updated_at' })
    updatedAt: Date;
}
