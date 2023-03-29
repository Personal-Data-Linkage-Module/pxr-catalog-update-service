/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import * as express from 'express';
// eslint-disable-next-line no-unused-vars
import { Server } from 'net';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// サーバをlisten

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

// スタブサーバー（カタログサービス1）actor.codeでカタログを取得
// 参加中でないことをカタログサービスで確認し、参加中であればエラーとする
// region-allianceの配列内オブジェクトの_valueにregion.codeが存在するか確認、存在するのでエラー
class _StubCatalogServerOk {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 0
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1,
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: 'organization',
                        _code: {
                            _value: 1000002,
                            _ver: 1
                        }
                    },
                    template: {
                        'app-alliance': [{
                            _value: 100,
                            _ver: 1
                        }]
                    }
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/100', _listener2);
        this._app.get('/catalog/1000003', _listener);
        this._server = this._app.listen(3001);
    }
}

// オペレータサーバー
class OperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            // res.status(status);
            if (status === 200) {
                return res.status(status).json({
                    sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                    operatorId: 1,
                    type: 3,
                    loginId: 'mng_menber01',
                    name: '運営メンバー01',
                    auth: '{"add": true, "update": true, "delete": true}',
                    lastLoginAt: '2020-01-14 15:27:20.426',
                    block: {
                        _value: 1000111,
                        _ver: 1
                    },
                    actor: {
                        _value: actorCode,
                        _ver: 1
                    }
                });
            }
            return res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

let _operatorServer: any;
let _catalogServer: any;

/**
 * カタログ更新 API のユニットテスト
 */
describe('CatalogUpdate API', () => {
    /**
     * 全テスト実行後の前処理
     */
    beforeAll(async () => {
        await Application.start()
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
        // スタブを起動
        _operatorServer = new OperatorServer(200, 1000004);
        _catalogServer = new _StubCatalogServerOk(404);
    });
    /**
     * 全テスト実行後の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
        _operatorServer._server.close();
        _catalogServer._server.close();
    });

    /**
     * Region離脱要求
     */
    describe('Region離脱要求' + Url.baseURIJoin, () => {
        test('Region-Rootが離脱要求を登録アクターカタログデータなし', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000003,
                    version: 1
                },
                actor: {
                    code: 100,
                    version: 1,
                    app: [
                        {
                            code: 1000117,
                            version: 1
                        }
                    ]
                },
                isDraft: true
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinRemove)
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
        });
    });
});
