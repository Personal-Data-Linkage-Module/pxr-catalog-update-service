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
import { stat } from 'fs';
const Message = Config.ReadConfig('./config/message.json');
/** eslint-enable  */

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
            if (status === 200) {
                res.status(status).json(
                    {
                        catalogItem: {
                            ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                            name: '高齢者向け健康サポート',
                            description: '高齢者向け健康サポートのリージョンの定義です。',
                            _code: {
                                _value: 1000451,
                                _ver: 1
                            },
                            inherit: {
                                _value: 48,
                                _ver: null
                            }
                        },
                        template: {
                            prop: null,
                            statement: [
                                {
                                    title: 'リージョンステートメント',
                                    section: [
                                        {
                                            title: 'ステートメント',
                                            content: [
                                                {
                                                    sentence: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            'app-alliance': null,
                            'wf-alliance': null,
                            required_app: null,
                            required_wf: null,
                            'information-site': null,
                            'terms-of-use': null,
                            status: null,
                        },
                        inner: null,
                        attribute: null
                    }
                );
                return;
            }
            res.status(status).end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status).end();
        };
        const _listener3 = (req: express.Request, res: express.Response) => {
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
                } else if (code === 1000114) {
                    res.json({
                        "catalogItem": {
                            "ns": "catalog/ext/test-org/actor/consumer",
                            "name": "営利企業",
                            "_code": {
                                "_value": 1000114,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 37,
                                "_ver": 1
                            },
                            "description": "営利企業の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000114,
                                "_ver": 1
                            },
                            "category": null,
                            "main-block": {
                                "_value": 1000108,
                                "_ver": 1
                            },
                            "other-block": null,
                            "statement": [
                                {
                                    "title": "組織ステートメント",
                                    "section": [
                                        {
                                            "title": "ご挨拶",
                                            "content": [
                                                {
                                                    "sentence": "営利企業の組織ステートメントです。"
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

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/catalog/ext', _listener);
        this._app.put('/catalog/ext/:code', _listener2)
        this._app.get('/catalog/:code', _listener3);
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

let _operatorServer: _StubOperatorServer;
let _catalogServer: _StubCatalogServer;

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
        // 事前データ準備
        await common.executeSqlString(`
        DELETE FROM pxr_catalog_update.region_approval_manage;
        DELETE FROM pxr_catalog_update.region_manage;

        SELECT SETVAL('pxr_catalog_update.region_approval_manage_id_seq', 1, false);
        SELECT SETVAL('pxr_catalog_update.region_manage_id_seq', 1, false);
        ;`);
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
        }
        if (_catalogServer) {
            _catalogServer._server.close();
        }
    });

    /**
     * Region作成
     */
    describe('Region作成', () => {
        test('正常：Region作成を下書きで登録', async () => {
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify(
                    {
                        name: 'Region登録',
                        description: 'Region登録の理由等記載する説明。',
                        catalog: [
                            {
                                type: 1,
                                catalogCode: null,
                                comment: null,
                                template: {
                                    catalogItem: {
                                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                                        name: '高齢者向け健康サポート',
                                        description: '高齢者向け健康サポートのリージョンの定義です。',
                                        _code: {
                                            _value: 1000451,
                                            _ver: 1
                                        },
                                        inherit: {
                                            _value: 48,
                                            _ver: null
                                        }
                                    },
                                    template: {
                                        prop: null,
                                        value: [
                                            {
                                                key: 'statement',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'リージョンステートメント'
                                                    },
                                                    {
                                                        key: 'section',
                                                        value: [
                                                            {
                                                                key: 'title',
                                                                value: 'ステートメント'
                                                            },
                                                            {
                                                                key: 'content',
                                                                value: [
                                                                    {
                                                                        key: 'sentence',
                                                                        value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    inner: null,
                                    attribute: null
                                }
                            }
                        ],
                        appendix: null,
                        isDraft: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });

        test('正常：Region作成を本書きで登録', async () => {
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify(
                    {
                        name: 'Region登録',
                        description: 'Region登録の理由等記載する説明。',
                        catalog: [
                            {
                                type: 1,
                                catalogCode: null,
                                comment: null,
                                template: {
                                    catalogItem: {
                                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                                        name: '高齢者向け健康サポート',
                                        description: '高齢者向け健康サポートのリージョンの定義です。',
                                        _code: {
                                            _value: 1000451,
                                            _ver: 1
                                        },
                                        inherit: {
                                            _value: 48,
                                            _ver: null
                                        }
                                    },
                                    template: {
                                        prop: null,
                                        value: [
                                            {
                                                key: 'statement',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'リージョンステートメント'
                                                    },
                                                    {
                                                        key: 'section',
                                                        value: [
                                                            {
                                                                key: 'title',
                                                                value: 'ステートメント'
                                                            },
                                                            {
                                                                key: 'content',
                                                                value: [
                                                                    {
                                                                        key: 'sentence',
                                                                        value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    inner: null,
                                    attribute: null
                                }
                            }
                        ],
                        appendix: null,
                        isDraft: false
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
        });

        test('正常：Region作成の下書きを下書きで登録', async () => {
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify(
                    {
                        id: 1,
                        name: 'Region登録',
                        description: 'Region登録の理由等記載する説明。',
                        catalog: [
                            {
                                type: 1,
                                catalogCode: null,
                                comment: null,
                                template: {
                                    catalogItem: {
                                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                                        name: '高齢者向け健康サポート',
                                        description: '高齢者向け健康サポートのリージョンの定義です。',
                                        _code: {
                                            _value: 1000451,
                                            _ver: 1
                                        },
                                        inherit: {
                                            _value: 48,
                                            _ver: null
                                        }
                                    },
                                    template: {
                                        prop: null,
                                        value: [
                                            {
                                                key: 'statement',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'リージョンステートメント'
                                                    },
                                                    {
                                                        key: 'section',
                                                        value: [
                                                            {
                                                                key: 'title',
                                                                value: 'ステートメント'
                                                            },
                                                            {
                                                                key: 'content',
                                                                value: [
                                                                    {
                                                                        key: 'sentence',
                                                                        value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    inner: null,
                                    attribute: null
                                }
                            }
                        ],
                        appendix: null,
                        isDraft: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });
        test('正常：Region作成の下書きを本書きで登録', async () => {
            // データ準備(approval_expire_at 追加)
            await common.executeSqlString(`
            UPDATE pxr_catalog_update.region_manage
            SET approval_expire_at = '2030-04-01T00:00:00.000+0900'
            WHERE id = 1
            `);

            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify(
                    {
                        id: 1,
                        name: 'Region登録',
                        description: 'Region登録の理由等記載する説明。',
                        catalog: [
                            {
                                type: 1,
                                catalogCode: null,
                                comment: null,
                                template: {
                                    catalogItem: {
                                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                                        name: '高齢者向け健康サポート',
                                        description: '高齢者向け健康サポートのリージョンの定義です。',
                                        _code: {
                                            _value: 1000451,
                                            _ver: 1
                                        },
                                        inherit: {
                                            _value: 48,
                                            _ver: null
                                        }
                                    },
                                    template: {
                                        prop: null,
                                        value: [
                                            {
                                                key: 'statement',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'リージョンステートメント'
                                                    },
                                                    {
                                                        key: 'section',
                                                        value: [
                                                            {
                                                                key: 'title',
                                                                value: 'ステートメント'
                                                            },
                                                            {
                                                                key: 'content',
                                                                value: [
                                                                    {
                                                                        key: 'sentence',
                                                                        value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    inner: null,
                                    attribute: null
                                }
                            }
                        ],
                        appendix: null,
                        isDraft: false
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
        });

        test('異常：リクエストのidがRegion作成に存在しない', async () => {
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify(
                    {
                        id: 3,
                        name: 'Region登録',
                        description: 'Region登録の理由等記載する説明。',
                        catalog: [
                            {
                                type: 1,
                                catalogCode: null,
                                comment: null,
                                template: {
                                    catalogItem: {
                                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                                        name: '高齢者向け健康サポート',
                                        description: '高齢者向け健康サポートのリージョンの定義です。',
                                        _code: {
                                            _value: 1000451,
                                            _ver: 1
                                        },
                                        inherit: {
                                            _value: 48,
                                            _ver: null
                                        }
                                    },
                                    template: {
                                        prop: null,
                                        value: [
                                            {
                                                key: 'statement',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'リージョンステートメント'
                                                    },
                                                    {
                                                        key: 'section',
                                                        value: [
                                                            {
                                                                key: 'title',
                                                                value: 'ステートメント'
                                                            },
                                                            {
                                                                key: 'content',
                                                                value: [
                                                                    {
                                                                        key: 'sentence',
                                                                        value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    inner: null,
                                    attribute: null
                                }
                            }
                        ],
                        appendix: null,
                        isDraft: false
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_APPLICATION_OF_ID);
        });

        test('異常：リクエストのidがRegion作成に下書きで存在しない', async () => {
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify(
                    {
                        id: 1,
                        name: 'Region登録',
                        description: 'Region登録の理由等記載する説明。',
                        catalog: [
                            {
                                type: 1,
                                catalogCode: null,
                                comment: null,
                                template: {
                                    catalogItem: {
                                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/region-root/actor_1000432/region',
                                        name: '高齢者向け健康サポート',
                                        description: '高齢者向け健康サポートのリージョンの定義です。',
                                        _code: {
                                            _value: 1000451,
                                            _ver: 1
                                        },
                                        inherit: {
                                            _value: 48,
                                            _ver: null
                                        }
                                    },
                                    template: {
                                        prop: null,
                                        value: [
                                            {
                                                key: 'statement',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'リージョンステートメント'
                                                    },
                                                    {
                                                        key: 'section',
                                                        value: [
                                                            {
                                                                key: 'title',
                                                                value: 'ステートメント'
                                                            },
                                                            {
                                                                key: 'content',
                                                                value: [
                                                                    {
                                                                        key: 'sentence',
                                                                        value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    inner: null,
                                    attribute: null
                                }
                            }
                        ],
                        appendix: null,
                        isDraft: false
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_APPLICATION_OF_ID);
        });
    });
});
