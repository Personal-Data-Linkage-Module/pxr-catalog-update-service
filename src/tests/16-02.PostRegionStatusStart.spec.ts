/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import { Session } from './10-00.GetAlliance.TestData';
import * as express from 'express';
import { Server } from 'net';
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
// eslint-disable-next-line no-unused-vars

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

/**
 * カタログサービス
 */
export class _StubCatalogServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            if (status === 200) {
                res.status(200);
                // アクター確認
                if (code === 1000200) {
                    res.status(status).json({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000001/region",
                            "name": "リージョン",
                            "_code": {
                                "_value": 1000200,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 48,
                                "_ver": 1
                            },
                            "description": "リージョンの定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000200,
                                "_ver": 1
                            },
                            "app-alliance": [
                                {
                                    "_value": 1000471,
                                    "_ver": 1
                                }
                            ],
                            "information-site": null,
                            "required_app": null,
                            "required_wf": null,
                            "statement": [
                                {
                                    "title": "リージョンステートメント",
                                    "section": [
                                        {
                                            "title": "リージョン",
                                            "content": [
                                                {
                                                    "sentence": "テスト用のリージョンです。"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "status": "close",
                            "terms-of-use": null,
                            "wf-alliance": [
                                {
                                    "_value": 1000481,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000511,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000531,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000551,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000581,
                                    "_ver": 1
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "app-alliance",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 41,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "Regionメンバー(アプリケーション)のコード配列",
                                "isInherit": true
                            },
                            {
                                "key": "information-site",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "Regionの情報サイト",
                                "isInherit": true
                            },
                            {
                                "key": "required_app",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 41,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "必須アプリケーションのコード配列",
                                "isInherit": true
                            },
                            {
                                "key": "required_wf",
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
                                "description": "必須ワークフローのコード配列",
                                "isInherit": true
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
                                "description": "Regionステートメント",
                                "isInherit": true
                            },
                            {
                                "key": "status",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": {
                                        "value": [
                                            "open",
                                            "close"
                                        ]
                                    }
                                },
                                "description": "サービス運用ステータス",
                                "isInherit": true
                            },
                            {
                                "key": "terms-of-use",
                                "type": {
                                    "of": "code",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": null
                                    }
                                },
                                "description": "Region利用規約のカタログコード",
                                "isInherit": true
                            },
                            {
                                "key": "wf-alliance",
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
                                "description": "Regionメンバー(ワークフロー)のコード配列",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }).end();
                } else if (code === 1000201) {
                    res.status(status).json({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000001/region",
                            "name": "リージョン",
                            "_code": {
                                "_value": 1000201,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 48,
                                "_ver": 1
                            },
                            "description": "リージョンの定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000201,
                                "_ver": 1
                            },
                            "app-alliance": [
                                {
                                    "_value": 1000471,
                                    "_ver": 1
                                }
                            ],
                            "information-site": null,
                            "required_app": null,
                            "required_wf": null,
                            "statement": [
                                {
                                    "title": "リージョンステートメント",
                                    "section": [
                                        {
                                            "title": "リージョン",
                                            "content": [
                                                {
                                                    "sentence": "テスト用のリージョンです。"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "status": "close",
                            "terms-of-use": null,
                            "wf-alliance": [
                                {
                                    "_value": 1000481,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000511,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000531,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000551,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000581,
                                    "_ver": 1
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "app-alliance",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 41,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "Regionメンバー(アプリケーション)のコード配列",
                                "isInherit": true
                            },
                            {
                                "key": "information-site",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "Regionの情報サイト",
                                "isInherit": true
                            },
                            {
                                "key": "required_app",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 41,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "必須アプリケーションのコード配列",
                                "isInherit": true
                            },
                            {
                                "key": "required_wf",
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
                                "description": "必須ワークフローのコード配列",
                                "isInherit": true
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
                                "description": "Regionステートメント",
                                "isInherit": true
                            },
                            {
                                "key": "status",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": {
                                        "value": [
                                            "open",
                                            "close"
                                        ]
                                    }
                                },
                                "description": "サービス運用ステータス",
                                "isInherit": true
                            },
                            {
                                "key": "terms-of-use",
                                "type": {
                                    "of": "code",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": null
                                    }
                                },
                                "description": "Region利用規約のカタログコード",
                                "isInherit": true
                            },
                            {
                                "key": "wf-alliance",
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
                                "description": "Regionメンバー(ワークフロー)のコード配列",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }).end();
                } else if (code === 1000202) {
                    res.status(status).json({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000001/region",
                            "name": "リージョン",
                            "_code": {
                                "_value": 1000202,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 48,
                                "_ver": 1
                            },
                            "description": "リージョンの定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000202,
                                "_ver": 1
                            },
                            "app-alliance": [
                                {
                                    "_value": 1000471,
                                    "_ver": 1
                                }
                            ],
                            "information-site": null,
                            "required_app": null,
                            "required_wf": null,
                            "statement": [
                                {
                                    "title": "リージョンステートメント",
                                    "section": [
                                        {
                                            "title": "リージョン",
                                            "content": [
                                                {
                                                    "sentence": "テスト用のリージョンです。"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "status": "close",
                            "terms-of-use": null,
                            "wf-alliance": [
                                {
                                    "_value": 1000481,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000511,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000531,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000551,
                                    "_ver": 1
                                },
                                {
                                    "_value": 1000581,
                                    "_ver": 1
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "app-alliance",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 41,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "Regionメンバー(アプリケーション)のコード配列",
                                "isInherit": true
                            },
                            {
                                "key": "information-site",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "Regionの情報サイト",
                                "isInherit": true
                            },
                            {
                                "key": "required_app",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 41,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "必須アプリケーションのコード配列",
                                "isInherit": true
                            },
                            {
                                "key": "required_wf",
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
                                "description": "必須ワークフローのコード配列",
                                "isInherit": true
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
                                "description": "Regionステートメント",
                                "isInherit": true
                            },
                            {
                                "key": "status",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": {
                                        "value": [
                                            "open",
                                            "close"
                                        ]
                                    }
                                },
                                "description": "サービス運用ステータス",
                                "isInherit": true
                            },
                            {
                                "key": "terms-of-use",
                                "type": {
                                    "of": "code",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": null
                                    }
                                },
                                "description": "Region利用規約のカタログコード",
                                "isInherit": true
                            },
                            {
                                "key": "wf-alliance",
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
                                "description": "Regionメンバー(ワークフロー)のコード配列",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }).end();
                }
            } else {
                res.status(status);
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/:code', _listener);
        this._server = this._app.listen(3001);
    }
}

/**
 * オペレータサービス
 */
export class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                    _operatorServerId: 1,
                    type: 0,
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
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

/**
 * 通知サービス
 */
class _StubNotificationServer {
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
                    approval: {
                        expirationAt: '2020-10-01T10:00:00.000'
                    }
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/notification', _listener);
        this._server = this._app.listen(3004);
    }
}

let _operatorServer: _StubOperatorServer;
let _catalogServer: _StubCatalogServer;
let _notificationServer: _StubNotificationServer;

/**
 * CatalogUpdate API のユニットテスト
 */
describe('CatalogUpdate API', () => {
    /**
     * 全テスト実行前の処理
     */
    beforeAll(async () => {
        await Application.start()
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
        // DB切断
        await common.disconnect();

    });
    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
    });

    /**
     * 各テスト実行後の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
        if (_notificationServer) {
            _notificationServer._server.close();
            _notificationServer = null;
        }
    });

    /**
     * Region開始要求
     */
    describe('Region開始要求', () => {
        test('正常：Region開始要求', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe(1);
            expect(response.body.approvalActor._value).toBe(null);
            expect(response.body.approvalActor._ver).toBe(null);
            expect(response.body.applicantActor._value).toBe(1000001);
            expect(response.body.applicantActor._ver).toBe(1);
            expect(response.body.regionCode._value).toBe(1000200);
            expect(response.body.regionCode._ver).toBe(1);
            expect(response.body.expireAt).toBe('2020-10-01T10:00:00.000+0900');
            expect(response.body.status).toBe(0);
            expect(response.body.approvalAt).toBe(null);
        });
        test('パラメータ異常：リクエストが空', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({});

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('regionCode');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：regionCode、空', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: ''
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('regionCode');
        });
        test('パラメータ不足：regionCode._value', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：regionCode._value、null', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: null,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：regionCode._value、数値以外', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 'a',
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：regionCode._ver', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：regionCode._ver、null', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: null
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：regionCode._ver、数値以外', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 'a'
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(204, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答400', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(400, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(500, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
            .send({
                regionCode: {
                    _value: 1000200,
                    _ver: 1
                }
            });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(204);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000200));
        });
        test('異常：セッション(カタログサービスエラー応答400)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000200));
        });
        test('異常：セッション(カタログサービスエラー応答500)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(500);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：セッション(通知サービスエラー応答400)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000201,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：セッション(通知サービス未起動)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000202,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：開始要求済Region申請が存在する', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/start')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    regionCode: {
                        _value: 1000200,
                        _ver: 1
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.APPLIED_REGIONS);
        });
    });
});
