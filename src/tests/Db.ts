/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { PoolClient, Pool, QueryResult } from 'pg';
/* eslint-enable */
import Config from '../common/Config';
const config = Config.ReadConfig('./config/config.json');

/**
 * データベース操作クラス
 */
export default class Db {
    /**
     *  インスタンス
     */
    private static _instance: Db;

    /**
     * コネクション
     */
    private client: PoolClient = null;

    /**
     * コネクションプール
     */
    private pool: Pool = null;

    /**
     * 接続設定
     */
    private configure: any = null;

    /**
     * コンストラクタ
     */
    public constructor () {
        // 設定ファイルからDB設定情報を取得
        this.configure = config.db;

        // DB接続設定を設定
        this.pool = new Pool({
            host: this.configure.host,
            port: this.configure.port,
            database: this.configure.database,
            user: this.configure.user,
            password: this.configure.password,
            statement_timeout: this.configure.timeout
        });
    }

    /**
     * インスタンス取得
     */
    public static getInstance (): Db {
        if (!this._instance) {
            this._instance = new Db();
        }
        // 生成済みのインスタンスを返す
        return this._instance;
    }

    /**
     * スキーマ名取得
     */
    public GetSchemaName (): string {
        return this.configure.schema;
    }

    /**
     * コネクション設定
     */
    public SetClient (client: PoolClient): void {
        this.client = client;
    }

    /**
     * 接続
     * @param callback
     */
    public async Connect (callback?: (err: Error, client: PoolClient, done: (release?: any) => void) => void) {
        // データベースに接続
        if (!callback) {
            try {
                // コールバックが未設定の場合は、Promiseな関数をコールする
                this.client = await this.pool.connect();
            } catch (err) {
                // エラーが発生したら、オブジェクト名を変更して改めてスローする
                err.name = 'postgreError';
                throw err;
            }
        } else {
            this.pool.connect(callback);
        }
    }

    /**
     * 切断
     */
    public async Disconnect () {
        if (this.client) {
            this.client.release();
        }
    }

    /**
     * トランザクション開始
     * @param callback
     */
    public async BeginTransaction (callback?: (err: Error, result: QueryResult<any>) => void) {
        if (!callback) {
            if (this.client) {
                try {
                    // コールバックが未設定の場合は、Promiseな関数をコールする
                    await this.client.query('BEGIN');
                } catch (err) {
                    // エラーが発生したら、オブジェクト名を変更して改めてスローする
                    err.name = 'postgreError';
                    throw err;
                }
            }
        } else {
            if (this.client) {
                this.client.query('BEGIN', callback);
            }
        }
    }

    /**
     * コミット
     */
    public async Commit (callback?: (err: Error, result: QueryResult<any>) => void): Promise<void> {
        if (!callback) {
            if (this.client) {
                try {
                    // コールバックが未設定の場合は、Promiseな関数をコールする
                    await this.client.query('COMMIT');
                } catch (err) {
                    // エラーが発生したら、オブジェクト名を変更して改めてスローする
                    err.name = 'postgreError';
                    throw err;
                }
            }
        } else {
            this.client.query('COMMIT', callback);
        }
    }

    /**
     * ロールバック
     */
    public async Rollback (callback?: (err: Error, result: QueryResult<any>) => void) {
        if (!callback) {
            if (this.client) {
                try {
                    // コールバックが未設定の場合は、Promiseな関数をコールする
                    await this.client.query('ROLLBACK');
                } catch (err) {
                    // エラーが発生したら、オブジェクト名を変更して改めてスローする
                    err.name = 'postgreError';
                    throw err;
                }
            }
        } else {
            this.client.query('ROLLBACK', callback);
        }
    }

    /**
     * クエリ実行
     * @param query
     * @param parameters
     * @param callback
     */
    public async Query (query: string, parameters: any[] = [], callback?: (err: Error, result: QueryResult<any>) => void): Promise<QueryResult<any>> {
        if (!callback) {
            if (this.client) {
                try {
                    // コールバックが未設定の場合は、Promiseな関数をコールする
                    return await this.client.query(query, parameters);
                } catch (err) {
                    // エラーが発生したら、オブジェクト名を変更して改めてスローする
                    err.name = 'postgreError';
                    throw err;
                }
            }
        } else {
            if (this.client) {
                this.client.query(query, parameters, callback);
            }
        }
        return null;
    }
}
