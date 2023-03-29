/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Db from './Db';
import path = require('path');
import fs = require('fs');

// テスト用にlisten数を無制限に設定
require('events').EventEmitter.defaultMaxListeners = 0;

/**
 * URL
 */
export namespace Url {
    /**
     * ベースURL
     */
    export const baseURI: string = '/catalog-update';

    /**
     * 申請先取得URL
     */
    export const accreditorURI: string = baseURI + '/actor/accreditor';

    /**
     * アクター認定申請/アクター認定申請取得URL
     */
    export const actorURI: string = baseURI + '/actor';

    /**
     * アクター認定解除申請URL
     */
    export const actorRemoveURI: string = baseURI + '/actor/remove';

    /**
     * アクター認定承認結果登録URL
     */
    export const actorApprovalURI: string = baseURI + '/actor/approval';

    /**
     * 承認要求
     */
    export const baseURIJoin: string = '/catalog-update/join';

    /**
     * 離脱要求
     */
    export const baseURIJoinRemove: string = baseURIJoin + '/remove';

    /**
     * 承認結果登録
     */
    export const baseURIJoinApproval: string = baseURIJoin + '/approval';

    /**
     * Region参加
     */
    export const joinURI: string = baseURI + '/join';

    /**
     * 提携申請
     */
    export const allianceURI: string = baseURI + '/alliance';

    /**
     * PF利用規約同意更新
     */
    export const platformTermsOfUseURI: string = baseURI + '/platform-terms-of-use';

    /**
     * Region利用規約同意更新
     */
    export const regionTermsOfUseURI: string = baseURI + '/region-terms-of-use';

    /**
     * Region申請/承認管理
     */
    export const regionStatusURI: string = baseURI + '/region/status'

    /**
     * 蓄積イベント通知定義作成、更新
     */
    export const storeEvent: string = baseURI + '/store-event';

    /**
     * 共有トリガー定義作成、更新
     */
    export const shareTrigger: string = baseURI + '/share-trigger';
    
    /**
     * Region作成
     */
    export const regionURI: string = baseURI + '/region';

    /**
     * Region削除
     */
    export const regionDeleteURI: string = baseURI + '/region/delete';

    /**
     * データ操作定義
     */
    export const dataOperationURI: string = baseURI + '/data-operation';

    /**
     * 変更セット　
     */
    export const updateSetURI: string = baseURI + '/updateSet';
}

/**
 * テスト用共通クラス
 */
export default class Common {
    /**
     * DBオブジェクトを取得
     */
    private db: Db = null;

    /**
     * コンストラクタ
     */
    public constructor () {
        this.db = new Db();
    }

    /**
     * SQL実行
     * @param fileName
     */
    public async connect () {
        await this.db.Connect();
    }

    /**
     * SQL実行
     * @param fileName
     */
    public async disconnect () {
        // await this.db.Disconnect();
    }

    /**
     * SQLファイル実行
     * @param fileName
     */
    public async executeSqlFile (fileName: string) {
        // ファイルをオープン
        const fd: number = fs.openSync(path.join('./ddl/unit-test/', fileName), 'r');

        // ファイルからSQLを読込
        const sql: string = fs.readFileSync(fd, 'utf-8');

        // ファイルをクローズ
        fs.closeSync(fd);

        // DBを初期化
        await this.db.Query(sql);
    }

    /**
     * SQL実行
     * @param fileName
     */
    public async executeSqlString (sql: string) {
        // DBを初期化
        await this.db.Query(sql);
    }
}
