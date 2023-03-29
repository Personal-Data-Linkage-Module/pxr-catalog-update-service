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
 * PF利用規約管理テーブル エンティティクラス
 */
@Entity('platform_terms_of_use_manage')
export default class DataOperationManage extends BaseEntity {
    /** id */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    /** 利用規約コード */
    @Column({ type: 'bigint', nullable: false, name: 'terms_of_use_code' })
    termsOfUseCode: number;

    /** 利用規約バージョン */
    @Column({ type: 'bigint', nullable: false, name: 'terms_of_use_version' })
    termsOfUseVersion: number;

    /** template */
    @Column({ type: 'text' })
    template: string;

    /** 申請アクターカタログコード */
    @Column({ type: 'bigint', nullable: false, name: 'application_actor_code' })
    applicationActorCode: number;

    /** 申請アクターブロックコード */
    @Column({ type: 'bigint', nullable: false, name: 'application_block_code' })
    applicationBlockCode: number;

    /** 申請日時 */
    @Column({ type: 'timestamp without time zone', nullable: false, default: false, name: 'application_at' })
    applicationAt: Date;

    /** 無効フラグ */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean;

    /** 登録者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string;

    /** 登録日時 */
    @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
    readonly createdAt!: Date;

    /** 更新者 */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string;

    /** 更新日時 */
    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at', onUpdate: 'now()' })
    readonly updatedAt!: Date;
}
