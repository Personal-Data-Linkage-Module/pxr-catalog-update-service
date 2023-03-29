/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import { Session } from './10-00.GetAlliance.TestData';
import * as express from 'express';
import { Server } from 'net';
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
/** eslint-enable  */

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

/**
 * オペレータサービス
 */
export class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor(status: number, actorCode: number) {
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
                    auth: '{add: true, update: true, delete: true}',
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
 * カタログサービス
 */
export class _StubCatalogServer {
    _app: express.Express;
    _server: Server;

    constructor(status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                if (type === 1000010) {
                    res.json({
                        "catalogItem": {
                            "ns": "catalog/ext/test-org/block/region-root",
                            "name": "Region-Root-Block",
                            "_code": {
                                "_value": "1000111",
                                "_ver": "1"
                            },
                            "inherit": {
                                "_value": "34",
                                "_ver": null
                            },
                            "description": "領域運営サービスプロバイダー用PXR-Blockの定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": "1000111",
                                "_ver": "1"
                            },
                            "actor-type": "region-root",
                            "assigned-organization": "organization",
                            "assignment-status": "assigned",
                            "base-url": "localhost",
                            "id": "Region-Root-01"
                        },
                        "prop": [
                            {
                                "key": "actor-type",
                                "type": {
                                    "of": "string",
                                    "format": null,
                                    "unit": null,
                                    "candidata": {
                                        "value": [
                                            "pxr-root",
                                            "region-root",
                                            "app",
                                            "wf",
                                            "data-trader",
                                            "consumer"
                                        ]
                                    }
                                },
                                "description": "このPXR-Blockを保有する組織の種別"
                            },
                            {
                                "key": "assigned-organization",
                                "type": {
                                    "of": "string",
                                    "format": null,
                                    "unit": null
                                },
                                "description": "割当アクター名"
                            },
                            {
                                "key": "assignment-status",
                                "type": {
                                    "of": "string",
                                    "format": null,
                                    "unit": null,
                                    "candidata": {
                                        "value": [
                                            "assigned",
                                            "unassigned"
                                        ]
                                    }
                                },
                                "description": "割当状態"
                            },
                            {
                                "key": "base-url",
                                "type": {
                                    "of": "string",
                                    "format": null,
                                    "unit": null
                                },
                                "description": "PXR-BlockのベースURL"
                            },
                            {
                                "key": "id",
                                "type": {
                                    "of": "string",
                                    "format": null,
                                    "unit": null
                                },
                                "description": "PXR-Block識別子"
                            }
                        ],
                        "attribute": null
                    });
                } else {
                    res.json({
                        "catalogItem": {
                            "ns": "catalog/ext/test-org/actor/pxr-root",
                            "name": "流通制御組織",
                            "_code": {
                                "_value": 1000001,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 50,
                                "_ver": 1
                            },
                            "description": "流通制御組織の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000001,
                                "_ver": 1
                            },
                            "app-cert": {
                                "cert": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "アプリケーションプロバイダーの認定基準",
                                                "content": [
                                                    {
                                                        "sentence": "アプリケーションプロバイダーの認定基準です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "audit": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "アプリケーションプロバイダーの監査手順",
                                                "content": [
                                                    {
                                                        "sentence": "アプリケーションプロバイダーの監査手順です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "category": null,
                            "consumer-cert": {
                                "cert": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "データコンシューマーの認定基準",
                                                "content": [
                                                    {
                                                        "sentence": "データコンシューマーの認定基準です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "audit": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "データコンシューマーの監査手順",
                                                "content": [
                                                    {
                                                        "sentence": "データコンシューマーの監査手順です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "data-trader-cert": {
                                "cert": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "データ取引サービスプロバイダーの認定基準",
                                                "content": [
                                                    {
                                                        "sentence": "データ取引サービスプロバイダーの認定基準です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "audit": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "データ取引サービスプロバイダーの監査手順",
                                                "content": [
                                                    {
                                                        "sentence": "データ取引サービスプロバイダーの監査手順です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "main-block": {
                                "_value": 1000110,
                                "_ver": 1
                            },
                            "other-block": null,
                            "region-root-cert": {
                                "cert": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "領域運営サービスプロバイダーの認定基準",
                                                "content": [
                                                    {
                                                        "sentence": "領域運営サービスプロバイダーの認定基準です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "audit": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "領域運営サービスプロバイダーの監査手順",
                                                "content": [
                                                    {
                                                        "sentence": "領域運営サービスプロバイダーの監査手順です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "statement": [
                                {
                                    "title": "組織ステートメント",
                                    "section": [
                                        {
                                            "title": "ご挨拶",
                                            "content": [
                                                {
                                                    "sentence": "データ取引組織のステートメントです。"
                                                }
                                            ]
                                        },
                                        {
                                            "title": "事業概要",
                                            "content": [
                                                {
                                                    "sentence": "データ取引組織の事業概要です。"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "status": [
                                {
                                    "status": "certified",
                                    "by": null,
                                    "at": "20200101T000000.000+0900"
                                }
                            ],
                            "wf-cert": {
                                "cert": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "ワークフロープロバイダーの認定基準",
                                                "content": [
                                                    {
                                                        "sentence": "ワークフロープロバイダーの認定基準です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "audit": [
                                    {
                                        "title": "",
                                        "section": [
                                            {
                                                "title": "ワークフロープロバイダーの監査手順",
                                                "content": [
                                                    {
                                                        "sentence": "ワークフロープロバイダーの監査手順です。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        "prop": [
                            {
                                "key": "app-cert",
                                "type": {
                                    "of": "inner",
                                    "inner": "Certification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "アプリケーションプロバイダー認定"
                            },
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
                                "key": "consumer-cert",
                                "type": {
                                    "of": "inner",
                                    "inner": "Certification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "データコンシューマー認定"
                            },
                            {
                                "key": "data-trader-cert",
                                "type": {
                                    "of": "inner",
                                    "inner": "Certification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "データ取引サービスプロバイダー認定"
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
                                "key": "region-root-cert",
                                "type": {
                                    "of": "inner",
                                    "inner": "Certification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "領域運営サービスプロバイダー認定"
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
                                "key": "wf-cert",
                                "type": {
                                    "of": "inner",
                                    "inner": "Certification",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "ワークフロープロバイダー認定"
                            }
                        ],
                        "attribute": null
                    });
                }
            }
            res.end();
        };

        // イベントハンドラー
        const _listener_approval = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1,
                    name: '名前',
                    description: '説明',
                    callerActorCode: 1,
                    approvalActorCode: 1000001,
                    approver: 'root_user',
                    approvalAt: '2021-12-31T23:59:59.999+09:00',
                    comment: 'コメント',
                    status: 1,
                    registerActorCode: 1,
                    register: 'root_user',
                    registAt: '2021-12-31T23:59:59.999+09:00',
                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000432/store',
                    catalog: [],
                    appendix: ''
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener_req = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                if (type === 1000011) {
                    res.status(400)
                } else if (type === 1000012) {
                    this._server.close();
                } else {
                    res.json({
                        id: 1,
                        name: '名前',
                        description: '説明',
                        callerActorCode: 1,
                        approvalActorCode: 1000001,
                        approver: 'root_user',
                        approvalAt: '2021-12-31T23:59:59.999+09:00',
                        comment: 'コメント',
                        status: 1,
                        registerActorCode: 1,
                        register: 'root_user',
                        registAt: '2021-12-31T23:59:59.999+09:00',
                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000432/store',
                        catalog: [],
                        appendix: ''
                    });
                }
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/catalog/updateSet/register', _listener_approval);
        this._app.post('/catalog/updateSet/request', _listener_req);
        this._app.get('/catalog/1', _listener);
        this._app.get('/catalog/1000002', _listener);
        this._app.get('/catalog/1000001', _listener);
        this._app.get('/catalog/1000010', _listener);
        this._server = this._app.listen(3001);
    }
}

/**
 * 通知サービス
 */
export class _StubNotificationServer {
    _app: express.Express;
    _server: Server;

    constructor(status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                approval: {
                    expirationAt: '2021-12-31T23:59:59.999+09:00'
                }
            })
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/notification/', _listener);
        this._server = this._app.listen(3004);
    }
}

let _operatorServer: _StubOperatorServer;
let _catalogServer: _StubCatalogServer;
let _notificationServer: _StubNotificationServer;

/**
 * 変更セット申請 API のユニットテスト
 */
describe('変更セット申請 API', () => {
    /**
     * 全テスト実行前の処理
     */
    beforeAll(async () => {
        await Application.start()
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
        }

        if (_catalogServer) {
            _catalogServer._server.close();
        }

        if (_notificationServer) {
            _notificationServer._server.close();
        }
    });

    /**
     * データ処理定義申請
     */
    describe('変更セット申請', () => {
        test('正常：申請者と承認者が同じ', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 100002);
            _notificationServer = new _StubNotificationServer(200, 1000001);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000001
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('正常：申請者と承認者が異なる', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _notificationServer = new _StubNotificationServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.REGION_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000002
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('異常：通知サービスからのレスポンスが200以外', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _notificationServer = new _StubNotificationServer(400, 1);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.REGION_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000002
                }));

            // レスポンスチェック
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
            expect(response.status).toBe(500);
        });

        test('異常：通知サービスへの接続に失敗', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.REGION_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000002
                }));

            // レスポンスチェック
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
            expect(response.status).toBe(500);
        });

        test('異常：アクターのコードではない', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000010);
            _notificationServer = new _StubNotificationServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.REGION_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000002
                }));

            // レスポンスチェック
            expect(response.body.message).toBe(sprintf(Message.THIS_IS_NOT_ACTOR_CATALOG, 1000001));
            expect(response.status).toBe(400);
        });

        test('異常：カタログサービスからのレスポンスが200以外', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000011);
            _notificationServer = new _StubNotificationServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.REGION_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000002
                }));

            // レスポンスチェック
            expect(response.body.message).toBe(Message.CATALOG_UPDATE_FAILED);
            expect(response.status).toBe(500);
        });

        test('異常：カタログサービスへの接続に失敗', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000012);
            _notificationServer = new _StubNotificationServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.REGION_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 1000002
                }));

            // レスポンスチェック
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
            expect(response.status).toBe(500);
        });

        test('異常：idが 1未満', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 100002);
            _notificationServer = new _StubNotificationServer(200, 1000001);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 0,
                    approvalActor: 1000001
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
            expect(response.status).toBe(400);
        });

        test('異常：idが 未定義', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 100002);
            _notificationServer = new _StubNotificationServer(200, 1000001);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    approvalActor: 1000001
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.status).toBe(400);
        });

        test('異常：approvalActorが 1未満', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 100002);
            _notificationServer = new _StubNotificationServer(200, 1000001);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    approvalActor: 0
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
            expect(response.status).toBe(400);
        });

        test('異常：approvalActorが 未定義', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 100002);
            _notificationServer = new _StubNotificationServer(200, 1000001);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.status).toBe(400);
        });

        test('異常：リクエストが空', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 100002);
            _notificationServer = new _StubNotificationServer(200, 1000001);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.updateSetURI + '/request')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
            expect(response.status).toBe(400);
        });
    });
});
