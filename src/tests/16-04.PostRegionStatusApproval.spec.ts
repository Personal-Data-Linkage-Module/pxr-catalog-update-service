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
                if (code === 1000001) {
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
                } else if (code === 1000002) {
                    res.json({
                        "catalogItem": {
                            "ns": "catalog/ext/test-org/actor/region-root",
                            "name": "organization",
                            "_code": {
                                "_value": 1000002,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 49,
                                "_ver": 1
                            },
                            "description": "organizationの定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000002,
                                "_ver": 1
                            },
                            "category": null,
                            "main-block": {
                                "_value": 1000111,
                                "_ver": 1
                            },
                            "other-block": null,
                            "region": [
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
                                                    "sentence": "organizationの組織ステートメントです。"
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
                            "trader-alliance": [
                                {
                                    "_value": 1000020,
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
                                "key": "region",
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
                                "description": "Region定義"
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
                                "key": "trader-alliance",
                                "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": null,
                                        "base": {
                                            "_value": 38,
                                            "_ver": 1
                                        }
                                    }
                                },
                                "description": "提携するデータ取引サービスプロバイダーのコード配列"
                            }
                        ],
                        "attribute": null
                    });
                }
            } else {
                res.status(status);
            }

            res.end();
        };

        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status).end();
        }

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/:code', _listener);
        this._app.put('/catalog/ext/:code', _listener2);
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

/**
 * Book管理サービス
 */
export class _StubBookManageServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/book-manage/region/close', _listener);
        this._server = this._app.listen(3005);
    }
}

let _operatorServer: _StubOperatorServer;
let _catalogServer: _StubCatalogServer;
let _notificationServer: _StubNotificationServer;
let _bookManageServer: _StubBookManageServer;

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
        if (_bookManageServer) {
            _bookManageServer._server.close();
            _bookManageServer = null;
        }
    });

    /**
     * Region開始終了承認結果登録
     */
    describe('Region開始終了承認結果登録', () => {
        test('正常：Region開始承認', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    1000010, 1,
                    '2099-12-31 23:59:59.000', 1, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 'cI1rdF7e', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });
            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：Region開始否認', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    null, null,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2099-12-31 23:59:59.000', 1, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    2, 'RqLSavnE', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/RqLSavnE')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 2,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：Region終了承認', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2099-12-31 23:59:59.000', 2, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3, 'YEErsIlL', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/YEErsIlL')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '終了承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：Region終了否認', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2099-12-31 23:59:59.000', 2, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    4, 'LfFjeOeF', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/LfFjeOeF')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 2,
                    comment: '終了承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('パラメータ不足：status', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('status');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined)
        });
        test('パラメータ異常：status、null', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: null,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('status');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：status、承認否認以外', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 0,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：status、数値以外', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 'a',
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('status');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：comment、文字列以外', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: true
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('comment');
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：code、文字数不一致', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7eaaaa')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(204, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答400', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(400, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(500, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(204);

            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2099-12-31 23:59:59.000', 1, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    5, 'jd6XI2f0', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/jd6XI2f0')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000002));
        });
        test('異常：セッション(カタログサービスエラー応答400)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/jd6XI2f0')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000002));
        });
        test('異常：セッション(カタログサービスエラー応答500)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(500);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/jd6XI2f0')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/jd6XI2f0')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
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
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/jd6XI2f0')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：セッション(通知サービス未起動)', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);

            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2099-12-31 23:59:59.000', 1, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    6, 'c6Wy4bOu', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/c6Wy4bOu')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：承認結果登録対象レコード無し', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/aaaaaaaa')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_AUTH_CODE);
        });
        test('異常：既に承認済みのレコードを対象にしている', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/cI1rdF7e')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ALREADY_APPROVED);
        });
        test('異常：承認有効期限が切れている', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2000-12-31 23:59:59.000', 2, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7, 'rf4LRtMD', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/rf4LRtMD')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '開始承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EXPIRE_APPROVAL_AT);
        });
        test('異常：Region終了承認 Book管理サービスから200以外', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);
            _bookManageServer = new _StubBookManageServer(400);

            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.region_status_manage
                (
                    region_code, region_version,
                    caller_block_code, caller_block_version,
                    applicant_actor_code, applicant_actor_version,
                    approval_actor_code, approval_actor_version,
                    approval_expire_at, type, request_comment,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1000002, 1,
                    1000109, 1,
                    1000002, 1,
                    null, null,
                    '2099-12-31 23:59:59.000', 2, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.region_status_approval_manage
                (
                    region_status_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    8, '9rnfgTPT', 0,
                    null, 1000010, 1,
                    null, null,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/9rnfgTPT')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '終了承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_ADD_REGION_CLOSE);
        });
        test('異常：Region終了承認 Book管理サービスが未起動', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _notificationServer = new _StubNotificationServer(200);

            await common.executeSqlString(`
            INSERT INTO pxr_catalog_update.region_status_manage
            (
                region_code, region_version,
                caller_block_code, caller_block_version,
                applicant_actor_code, applicant_actor_version,
                approval_actor_code, approval_actor_version,
                approval_expire_at, type, request_comment,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                1000002, 1,
                1000109, 1,
                1000002, 1,
                null, null,
                '2099-12-31 23:59:59.000', 2, null,
                false, 'test_user', NOW(), 'test_user', NOW()
            );
            INSERT INTO pxr_catalog_update.region_status_approval_manage
            (
                region_status_manage_id, auth_code, status,
                comment, approval_actor_code, approval_actor_version,
                approver, approval_at,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                9, 'ApCZmS8N', 0,
                null, 1000010, 1,
                null, null,
                false, 'test_user', NOW(), 'test_user', NOW()
            );
        `);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionStatusURI + '/approval/ApCZmS8N')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send({
                    status: 1,
                    comment: '終了承認結果'
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.CANT_CONNECT_TO_BOOK_MANAGE);
        });
    });
});
