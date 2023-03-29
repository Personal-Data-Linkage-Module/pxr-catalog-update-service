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
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1,
                    catalogItem: {
                        ns: "catalog/ext/test-org/actor/region-root",
                        _code: {
                            _value: 1000003,
                            _ver: 1
                        }
                    },
                    template: {
                        'app-alliance': [{
                            _value: 1000002,
                            _ver: 1
                        }]
                    }
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1,
                    catalogItem: {
                        ns: "catalog/ext/test-org/actor/region-root",
                        _code: {
                            _value: 1000002,
                            _ver: 1
                        }
                    },
                    template: {
                        'region-alliance': [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                });
            }
            res.end();
        };

        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    "catalogItem": {
                        "ns": "catalog/ext/test-org/actor/wf",
                        "name": "テスト用ワークフロー",
                        "_code": {
                            "_value": 1000117,
                            "_ver": 1
                        },
                        "inherit": {
                            "_value": 47,
                            "_ver": 1
                        },
                        "description": "テスト用ワークフローです"
                    },
                    "template": {
                        "_code": {
                            "_value": 1000117,
                            "_ver": 1
                        },
                        "category": null,
                        "main-block": {
                            "_value": 1000115,
                            "_ver": 1
                        },
                        "other-block": null,
                        "region-alliance": [
                            {
                                "_value": 1000003,
                                "_ver": 1
                            }
                        ],
                        "statement": [
                            {
                                "title": "組織ステートメント",
                                "section": [
                                    {
                                        "title": "ご挨拶",
                                        "content": [
                                            {
                                                "sentence": "テスト用ワークフローのステートメントです。"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "status": [
                            {
                                "status": "certified",
                                "by": {
                                    "_value": 1000001,
                                    "_ver": 1
                                },
                                "at": "20200101T000000.000+0900"
                            }
                        ],
                        "workflow": [
                            {
                                "_value": 1000200,
                                "_ver": 1
                            }
                        ]
                    },
                    "prop": [
                        {
                            "key": "category",
                            "type": {
                                "of": "code[]",
                                "cmatrix": null,
                                "candidate": {
                                    "ns": [
                                        "catalog/model/category/share/actor",
                                        "catalog/built_in/category/share/actor",
                                        "catalog/ext/test-org/category/share/actor",
                                        "catalog/model/category/supply/actor",
                                        "catalog/built_in/category/supply/actor",
                                        "catalog/ext/test-org/category/supply/actor"
                                    ],
                                    "_code": null,
                                    "base": null
                                }
                            },
                            "description": null
                        },
                        {
                            "key": "main-block",
                            "type": {
                                "of": "code",
                                "cmatrix": null,
                                "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                        "_value": 29,
                                        "_ver": 1
                                    }
                                }
                            },
                            "description": "アクター参加時に割り当てられたPXR-Block"
                        },
                        {
                            "key": "other-block",
                            "type": {
                                "of": "code[]",
                                "cmatrix": null,
                                "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                        "_value": 29,
                                        "_ver": 1
                                    }
                                }
                            },
                            "description": "他アクターから引き継いだPXR-Blockの配列"
                        },
                        {
                            "key": "region-alliance",
                            "type": {
                                "of": "code[]",
                                "cmatrix": null,
                                "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                        "_value": 48,
                                        "_ver": 1
                                    }
                                }
                            },
                            "description": "参加している領域運営サービスプロバイダーコード配列"
                        },
                        {
                            "key": "statement",
                            "type": {
                                "of": "item[]",
                                "cmatrix": null,
                                "candidate": {
                                    "ns": null,
                                    "_code": [
                                        {
                                            "_value": 61,
                                            "_ver": 1
                                        }
                                    ],
                                    "base": null
                                }
                            },
                            "description": "組織ステートメント"
                        },
                        {
                            "key": "status",
                            "type": {
                                "of": "inner[]",
                                "inner": "CertStatus",
                                "cmatrix": null,
                                "candidate": null
                            },
                            "description": "認定の履歴"
                        },
                        {
                            "key": "workflow",
                            "type": {
                                "of": "code[]",
                                "cmatrix": null,
                                "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                        "_value": 46,
                                        "_ver": 1
                                    }
                                }
                            },
                            "description": "ワークフロー定義の配列"
                        }
                    ],
                    "attribute": null
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/1000002', _listener2);
        this._app.get('/catalog/1000003', _listener);
        this._app.get('/catalog/1000117', _listener3)
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
        _catalogServer = new _StubCatalogServerOk(200);
    });
    /**
     * 全テスト実行後の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
        _catalogServer._server.close();
        _operatorServer._server.close();
    });

    /**
     * Region離脱要求
     */
    describe('Region離脱要求' + Url.baseURIJoin, () => {
        test('Region-Rootが離脱要求を登録(下書き)', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000003,
                    version: 1
                },
                actor: {
                    code: 1000002,
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
            expect(response.status).toBe(200);
        });
    });
});
