/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Application from '../index';
import { Url } from './Common';
import * as supertest from 'supertest';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
import express = require('express');
import { Server } from 'net';
import bodyParser = require('body-parser');
import { PutTestRequest, TestTemplate } from './14-00.StoreEvent.TestData';
import { sprintf } from 'sprintf-js';

// 対象アプリケーションを取得
const expressApp = Application.express.app;

// オペレータサーバー
class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status).json({
                type3Session: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                operatorId: 1,
                type: 3,
                loginId: 'menber01',
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
            }).end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

// カタログサーバー
class _StubCatalogServer {
    _app: express.Express;
    _server: Server;
    _template: any;

    constructor (status: number, _template?: any) {
        this._template = _template || null;
        this._app = express();
        // イベントハンドラー１
        // カタログ名称を取得
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status).json(
                {
                    id: '301c4aaa-3d11-4efb-82e7-a35cba034b6d',
                    name: 'PXRカタログ',
                    description: 'PXR基盤が提供するデータカタログです。',
                    ext_name: 'aaa-healthcare-consortium'
                }
            ).end();
        }

        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                const code = Number(req.params.code);
                if (code === 1000100) {
                    res.json(JSON.stringify({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share",
                            "name": "【利用申込】医療・健康サービスの利用申込機能",
                            "_code": {
                                "_value": 1000100,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 40,
                                "_ver": 1
                            },
                            "description": "【利用申込】医療・健康サービスの利用申込機能です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000100,
                                "_ver": 1
                            },
                            "share": [
                                {
                                    "id": "507bff6c-4842-c3d2-a288-df88698d446e",
                                    "event": [
                                        {
                                            "code": {
                                                "_value": 1000802,
                                                "_ver": 1
                                            },
                                            "requireConsent": true,
                                            "thing": [
                                                {
                                                    "code": {
                                                        "_value": 1000803,
                                                        "_ver": 1
                                                    },
                                                    "requireConsent": true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "share",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "Share",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "状態共有機能定義",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }));
                } else if (code === 1000101) {
                    res.json(JSON.stringify({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share",
                            "name": "【利用申込】医療・健康サービスの利用申込機能",
                            "_code": {
                                "_value": 1000100,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 40,
                                "_ver": 1
                            },
                            "description": "【利用申込】医療・健康サービスの利用申込機能です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000100,
                                "_ver": 1
                            }
                        },
                        "prop": [
                            {
                                "key": "share",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "Share",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "状態共有機能定義",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }));
                } else if (code === 1001010) {
                    res.json(JSON.stringify({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                            "name": "蓄積イベント通知定義",
                            "_code": {
                                "_value": 1001010,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 211,
                                "_ver": 1
                            },
                            "description": "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1001050,
                                "_ver": 1
                            },
                            "notification": [
                                {
                                    "share": {
                                        "_value": 1000100,
                                        "_ver": 1
                                    },
                                    "id": [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "notification",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "Notification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "蓄積イベント通知",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }));
                } else if (code === 1001011) {
                    res.json(JSON.stringify({
                        "catalogItem": {
                            "name": "蓄積イベント通知定義",
                            "_code": {
                                "_value": 1001011,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 211,
                                "_ver": 1
                            },
                            "description": "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1001050,
                                "_ver": 1
                            },
                            "notification": [
                                {
                                    "share": {
                                        "_value": 1000100,
                                        "_ver": 1
                                    },
                                    "id": [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "notification",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "Notification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "蓄積イベント通知",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }));
                } else if (code === 1001012) {
                    res.json(JSON.stringify({
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/actor/wf/actor/share/notification",
                            "name": "蓄積イベント通知定義",
                            "_code": {
                                "_value": 1001012,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 211,
                                "_ver": 1
                            },
                            "description": "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1001050,
                                "_ver": 1
                            },
                            "notification": [
                                {
                                    "share": {
                                        "_value": 1000100,
                                        "_ver": 1
                                    },
                                    "id": [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        },
                        "prop": [
                            {
                                "key": "notification",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "Notification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "蓄積イベント通知",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }));
                }
            }
            res.end();
        };

        // イベントハンドラー2 カタログ変更セット登録 申請 API
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json(JSON.stringify(this._template));
            }
            res.end();
        };

        const _listener4 = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json(JSON.stringify(this._template));
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.use(bodyParser.json());
        this._app.get('/catalog/name', _listener);
        this._app.get('/catalog/:code', _listener2);
        this._app.get('/catalog/:code/:ver', _listener2);
        this._app.post('/catalog/updateSet/register', _listener3);
        this._app.post('/catalog/updateSet/request', _listener4);
        this._server = this._app.listen(3001);
    }
}

// Book管理サーバー
class _StubBookManageServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({ result: 'success' });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/book-manage/store-event', _listener);
        this._server = this._app.listen(3005);
    }
}

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

let _operatorServer: any;
let _catalogServer: any;
let _bookManageServer: any;

const session = JSON.stringify({
    operatorId: 2,
    loginId: 'member01',
    type: 3,
    type3Session: type3Session,
    block: {
        _value: 1000010,
        _ver: 1
    },
    actor: {
        _value: 1000004,
        _ver: 1
    }
});

/**
 * CatalogUpdate API のユニットテスト
 */
describe('CatalogUpdate API', () => {
    /**
     * 全テスト実行後の前処理
     */
    beforeAll(async () => {
        await Application.start()
    });

    /**
     * 全テスト実行後の処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
    });

    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブを停止
        if (_operatorServer) {
            _operatorServer._server.close();
        }
        if (_catalogServer) {
            _catalogServer._server.close();
        }
        if (_bookManageServer) {
            _bookManageServer._server.close();
        }
    });

    describe('蓄積イベント通知定義更新API', () => {
        test('正常：アプリケーション', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000004);
            _catalogServer = new _StubCatalogServer(200, TestTemplate.APPLICATION_TEMPLATE);
            _bookManageServer = new _StubBookManageServer(200);

            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.APPLICATION);

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('パラメータ異常：全体が空', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_REQUEST);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：全体が配列', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.ARRAY_REQUEST);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('パラメータ異常：name、空', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_NAME);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
            expect(response.body.reasons[0].property).toBe('name');
        });
        test('パラメータ異常：name、文字列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_STRING_NAME);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            expect(response.body.reasons[0].property).toBe('name');
        });
        test('パラメータ異常：description、文字列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_STRING_DESCRIPTION);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            expect(response.body.reasons[0].property).toBe('description');
        });
        test('パラメータ異常：catalog、配列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_ARRAY_CATALOG);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            expect(response.body.reasons[0].property).toBe('catalog');
        });
        test('パラメータ異常：catalog、空の配列', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMTPY_ARRAY_CATALOG);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_CATALOG_ITEMS);
        });
        test('パラメータ異常：catalog、配列の要素が１より多い', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MANY_CATALOG);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_CATALOG_ITEMS);
        });
        test('パラメータ異常：catalog[].type、null', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[1].message).toBe(Message.validation.min);
            expect(response.body.reasons[1].property).toBe('type');
            expect(response.body.reasons[2].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[2].property).toBe('type');
        });
        test('パラメータ異常：catalog[].type、数値以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_NUMBER_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[1].message).toBe(Message.validation.min);
            expect(response.body.reasons[1].property).toBe('type');
            expect(response.body.reasons[2].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[2].property).toBe('type');
        });
        test('パラメータ異常：catalog[].type、2以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.ADD_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.INVALID_VALUE, 'catalog.type', 1));
        });
        test('パラメータ異常：catalog[].catalogCode、数値以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_NUMBER_CATALOG_CODE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[0].property).toBe('catalogCode');
        });
        test('パラメータ不足：catalog[].template', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_TEMPLATE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('template');
        });
        test('パラメータ異常：catalog[].template、null', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_TEMPLATE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('template');
        });
        test('パラメータ不足：catalog[].template.catalogItem', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CATALOG_ITEM);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('catalogItem');
        });
        test('パラメータ異常：catalog[].template.catalogItem、null', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_CATALOG_ITEM);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('catalogItem');
        });
        test('パラメータ不足：catalog[].template.catalogItem.ns', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_NS);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('ns');
        });
        test('パラメータ異常：catalog[].template.catalogItem.ns、null', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_NS);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('ns');
        });
        test('パラメータ異常：catalog[].template.catalogItem.ns、空', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_NS);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
            expect(response.body.reasons[0].property).toBe('ns');
        });
        test('パラメータ異常：catalog[].template.catalogItem.ns、文字列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_STRING_NS);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            expect(response.body.reasons[0].property).toBe('ns');
        });
        test('パラメータ異常：catalog[].tempalte.catalogItem.name、文字列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_STRING_CATALOG_NAME);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            expect(response.body.reasons[0].property).toBe('name');
        });
        test('パラメータ異常：catalog[].template.catalogItem.description、文字列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_STRING_CATALOG_DESCRIPTION);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            expect(response.body.reasons[0].property).toBe('description');
        });
        test('パラメータ不足：catalog[].template.catalogItem._code', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CODE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_code');
        });
        test('パラメータ不足：catalog[].template.catalogItem._code._value', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CODE_VALUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ異常：catalog[].template.catalogItem._code._value、数値以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_NUMBER_CODE_VALUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ不足：catalog[].template.catalogItem.inherit._value', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_INHERIT_VALUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ異常：catalog[].template.catalogItem.inherit._value、数値以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_NUMBER_INHERIT_VALUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ不足：catalog[].template.template', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_TEMPLATE_TEMPLATE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('template');
        });
        test('パラメータ不足：catalog[].template.template、null', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_TEMPLATE_TEMPLATE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('template');
        });
        test('パラメータ不足：catalog[].template.template.value', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_TEMPLATE_VALUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('value');
        });
        test('パラメータ異常：catalog[].template.template.value、配列以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_ARRAY_TEMPLATE_VALUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            expect(response.body.reasons[0].property).toBe('value');
        });
        test('パラメータ異常：isDraft、boolean以外', async () => {
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_BOOLEAN_IS_DRAFT);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
            expect(response.body.reasons[0].property).toBe('isDraft');
        });
        test('異常：Cookieが存在するが空', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000004);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(PutTestRequest.APPLICATION);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            _operatorServer = new _StubOperatorServer(204, 1000004);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(PutTestRequest.APPLICATION);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答400', async () => {
            _operatorServer = new _StubOperatorServer(400, 1000004);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(PutTestRequest.APPLICATION);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答500', async () => {
            _operatorServer = new _StubOperatorServer(500, 1000004);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(PutTestRequest.APPLICATION);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(PutTestRequest.APPLICATION);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            _operatorServer = new _StubOperatorServer(500, 1000004);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.APPLICATION);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：更新対象カタログにcatalogItem.nsがない', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000004);
            _catalogServer = new _StubCatalogServer(200, TestTemplate.APPLICATION_TEMPLATE);
            _bookManageServer = new _StubBookManageServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_UPDATE_CATALOG_NS);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NOTIFICATE_CATALOG);
        });
        test('異常：更新対象カタログのnsが一致しない', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000004);
            _catalogServer = new _StubCatalogServer(200, TestTemplate.APPLICATION_TEMPLATE);
            _bookManageServer = new _StubBookManageServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.storeEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.INVALID_UPDATE_CATALOG_NS);

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_NOTIFICATE_CATALOG);
        });
    });
});
