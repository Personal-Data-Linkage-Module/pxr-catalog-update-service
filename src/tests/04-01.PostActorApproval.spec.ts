/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import * as express from 'express';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

const type3Session = '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11';

// サーバをlisten

// スタブサーバー（オペレーターサービス）
class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    sessionId: '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11',
                    operatorId: 1,
                    type: 3,
                    loginId: 'mng_menber01',
                    name: '運営メンバー01',
                    auth: '{"add": true, "update": true, "delete": true}',
                    lastLoginAt: '2020-01-14 15:27:20.426',
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
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

// スタブサーバー（カタログサービス）
class _StubCatalogServer {
    _app: express.Express;
    _server: Server;

    constructor (method: string, status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (method === 'post') {
                if (status === 200) {
                    res.json({
                        id: 1,
                        catalogItem: {
                            _code: {
                                _value: 1000120,
                                _ver: 1
                            }
                        }
                    });
                }
            } else if (method === 'get') {
                if (status === 200) {
                    res.json([{
                        id: 1,
                        catalogItem: {
                            name: 'test',
                            _code: {
                                _value: 1000001,
                                _ver: 1
                            }
                        },
                        template: {
                            'app-cert': [
                                {
                                    cert: '認定基準'
                                }
                            ],
                            'consumer-cert': [
                                {
                                    cert: '認定基準'
                                }
                            ],
                            'data-trader-cert': [
                                {
                                    cert: '認定基準'
                                }
                            ],
                            'region-root-cert': [
                                {
                                    cert: '認定基準'
                                }
                            ],
                            'wf-cert': [
                                {
                                    cert: '認定基準'
                                }
                            ],
                            'certify-app': true,
                            'certify-wf': true,
                            'certify-consumer': true
                        }
                    }]);
                }
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        if (method === 'post') {
            this._app.post('/catalog/ext', _listener);
        } else if (method === 'get') {
            this._app.get('/catalog', _listener);
        }
        this._server = this._app.listen(3001);
    }
}

// スタブサーバー（通知サービス）
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
                    id: 1
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/notification', _listener);
        this._server = this._app.listen(3004);
    }
}

// スタブサーバー（認証局サービス）
class _StubCertificationAuthServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    certType: 'client',
                    subject: {
                        C: 'JP',
                        ST: 'Tokyo',
                        L: 'Minato-ku',
                        O: 'test-org',
                        OU: 'test-unit',
                        CN: '*.---.co.jp'
                    },
                    serialNo: 'XXXXXXXX',
                    fingerPrint: 'XX:XX:XX:XX:XX:XX:XX:XX',
                    validPeriodStart: '2019-01-01T00:00:00',
                    validPeriodEnd: '2024-12-31T23:59:59',
                    certificate: '-----BEGIN RSA PRIVATE KEY-----\r\nMIGrAgEAAiEAvnrd8LBnzAGxCW+i7KtVQSiTsssMtbwcs5styeKsn2kCAwEAAQIh\r\nAKBF8glb5Xqa0cQG0ygg4hIFdipmvEJhiCuhX93krDCBAhEA51bAM0gFPvxyk9Xe\r\nioIOBQIRANLJEv4Xw7MwT7EEEARL5RUCEBa8bu1bUbCsDPK8nT+NoqUCEQCIzFCU\r\nMY4j7BW8N3vBnhPlAhBgs4tSfe6RbpertixmCygk\r\n-----END RSA PRIVATE KEY-----\r\n-----BEGIN CERTIFICATE-----\r\nMIGrAgEAAiEAvnrd8LBnzAGxCW+i7KtVQSiTsssMtbwcs5styeKsn2kCAwEAAQIh\r\nAKBF8glb5Xqa0cQG0ygg4hIFdipmvEJhiCuhX93krDCBAhEA51bAM0gFPvxyk9Xe\r\nioIOBQIRANLJEv4Xw7MwT7EEEARL5RUCEBa8bu1bUbCsDPK8nT+NoqUCEQCIzFCU\r\nMY4j7BW8N3vBnhPlAhBgs4tSfe6RbpertixmCygk\r\n-----END CERTIFICATE-----'
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/certification-authority/client', _listener);
        this._server = this._app.listen(3012);
    }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer2 {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (req.method === 'POST') {
                if (req.path === '/catalog/ext') {
                    if (status === 200) {
                        res.json({
                            id: 1,
                            catalogItem: {
                                _code: {
                                    _value: 1000300,
                                    _ver: 1
                                },
                                name: 'test',
                                ns: 'catalog/ext/test-org/actor/pxr-root'
                            }
                        });
                    }
                } else {
                    if (status === 200) {
                        res.json({
                            id: 1,
                            ns: 'catalog/model/unit/si/length',
                            description: '国際単位系の長さの単位'
                        });
                    }
                }

            } else if (req.method === 'GET') {
                if (status === 200) {
                    let code;
                    if (req.params.code) {
                        code = Number(req.params.code);
                    }

                    let ns;
                    if (req.query.ns) {
                        ns = req.query.ns;
                    }

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
                                                "catalog/model/category/share/actor/*",
                                                "catalog/built_in/category/share/actor/*",
                                                "catalog/ext/test-org/category/share/actor/*",
                                                "catalog/model/category/supply/actor/*",
                                                "catalog/built_in/category/supply/actor/*",
                                                "catalog/ext/test-org/category/supply/actor/*"
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

                    if (ns === 'catalog/ext/test-org/actor/pxr-root') {
                        res.json([
                            {
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
                                        "catalog/model/category/share/actor/*",
                                        "catalog/built_in/category/share/actor/*",
                                        "catalog/ext/test-org/category/share/actor/*",
                                        "catalog/model/category/supply/actor/*",
                                        "catalog/built_in/category/supply/actor/*",
                                        "catalog/ext/test-org/category/supply/actor/*"
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
                            }
                        ]);
                    }

                }
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/catalog/ext', _listener);
        this._app.post('/catalog/ns/ext', _listener);
        this._app.get('/catalog/:code', _listener);
        this._app.get('/catalog/', _listener);
        this._server = this._app.listen(3001);
    }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer3 {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (req.method === 'POST') {
                if (req.path === '/catalog/ext') {
                    res.status(200);
                    res.json({
                        id: 1,
                        catalogItem: {
                            _code: {
                                _value: 1000300,
                                _ver: 1
                            },
                            name: 'test',
                            ns: 'catalog/ext/test-org/actor/pxr-root'
                        }
                    });
                } else {
                    res.status(status);
                    if (status === 200) {
                        res.json({
                            id: 1,
                            ns: 'catalog/model/unit/si/length',
                            description: '国際単位系の長さの単位'
                        });
                    }
                }

            } else if (req.method === 'GET') {
                res.status(200);
                let code;
                if (req.params.code) {
                    code = Number(req.params.code);
                }

                let ns;
                if (req.query.ns) {
                    ns = req.query.ns;
                }

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
                                            "catalog/model/category/share/actor/*",
                                            "catalog/built_in/category/share/actor/*",
                                            "catalog/ext/test-org/category/share/actor/*",
                                            "catalog/model/category/supply/actor/*",
                                            "catalog/built_in/category/supply/actor/*",
                                            "catalog/ext/test-org/category/supply/actor/*"
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

                if (ns === 'catalog/ext/test-org/actor/pxr-root') {
                    res.json([
                        {
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
                                    "catalog/model/category/share/actor/*",
                                    "catalog/built_in/category/share/actor/*",
                                    "catalog/ext/test-org/category/share/actor/*",
                                    "catalog/model/category/supply/actor/*",
                                    "catalog/built_in/category/supply/actor/*",
                                    "catalog/ext/test-org/category/supply/actor/*"
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
                        }
                    ]);
                }
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/catalog/ext', _listener);
        this._app.post('/catalog/ns/ext', _listener);
        this._app.get('/catalog/:code', _listener);
        this._app.get('/catalog/', _listener);
        this._server = this._app.listen(3001);
    }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer4 {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (req.method === 'POST') {
                if (req.path === '/catalog/ext') {
                    res.status(200);
                    res.json({
                        id: 1,
                        catalogItem: {
                            _code: {
                                _value: 1000300,
                                _ver: 1
                            },
                            name: 'test',
                            ns: 'catalog/ext/test-org/actor/pxr-root'
                        }
                    });
                } else {
                    this._server.close();
                }

            } else if (req.method === 'GET') {
                res.status(200);
                let code;
                if (req.params.code) {
                    code = Number(req.params.code);
                }

                let ns;
                if (req.query.ns) {
                    ns = req.query.ns;
                }

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
                                            "catalog/model/category/share/actor/*",
                                            "catalog/built_in/category/share/actor/*",
                                            "catalog/ext/test-org/category/share/actor/*",
                                            "catalog/model/category/supply/actor/*",
                                            "catalog/built_in/category/supply/actor/*",
                                            "catalog/ext/test-org/category/supply/actor/*"
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

                if (ns === 'catalog/ext/test-org/actor/pxr-root') {
                    res.json([
                        {
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
                                    "catalog/model/category/share/actor/*",
                                    "catalog/built_in/category/share/actor/*",
                                    "catalog/ext/test-org/category/share/actor/*",
                                    "catalog/model/category/supply/actor/*",
                                    "catalog/built_in/category/supply/actor/*",
                                    "catalog/ext/test-org/category/supply/actor/*"
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
                        }
                    ]);
                }
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/catalog/ext', _listener);
        this._app.post('/catalog/ns/ext', _listener);
        this._app.get('/catalog/:code', _listener);
        this._app.get('/catalog/', _listener);
        this._server = this._app.listen(3001);
    }
}

let _operatorServer: any;
let _catalogServer: any;
let _noticeServer: any;
let _caServer: any;

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
     * 全テスト実行後の処理
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
            await _operatorServer._server.close();
        }
        if (_catalogServer) {
            await _catalogServer._server.close();
        }
        if (_noticeServer) {
            await _noticeServer._server.close();
        }
        if (_caServer) {
            await _caServer._server.close();
        }
    });

    /**
     * アクター認定承認結果登録
     */
    describe('アクター認定承認結果登録', () => {
        test('authCodeが空', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI)
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('authCodeの桁数が不一致', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=aaaa')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('statusがnull', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                status: null,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=3CoiDbGG')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('statusが数字以外', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                status: 'a',
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=3CoiDbGG')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('statusが規定値以外', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                status: 3,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=3CoiDbGG')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('存在しないauthCode', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer('post', 200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=a1a1a1a1')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_AUTH_CODE);
        });
        test('正常（承認）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": {"_value": null,"_ver": null},"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 1, 'abcd1234', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=abcd1234')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.status).toBe(1);
        });
        test('正常（否認）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    2, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": {"_value": null,"_ver": null},"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    2, 2, 'defg4567', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 2,
                comment: '否認します'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=defg4567')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.status).toBe(2);
            expect(response.body.comment).toBe('否認します');
        });
        test('承認　カタログへの接続に失敗', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": {"_value": null,"_ver": null},"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3, 3, '1234abcd', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=1234abcd')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('承認　通知への接続に失敗', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    4, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    4, 4, '4567defg', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=4567defg')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('承認　認証局への接続に失敗', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    5, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    5, 5, 'a1b2c3d4', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=a1b2c3d4')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY);
        });
        test('否認　通知への接続に失敗', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    6, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    6, 6, 'd4e5f6g7', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 2,
                comment: '否認します'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=d4e5f6g7')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常 既に承認済み', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    8, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": {"_value": null,"_ver": null},"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    8, 8, 'bgfd7532', 1,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer3(400);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=bgfd7532')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ALREADY_APPROVED);
        });
        test('異常 有効期限が切れている', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    9, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": {"_value": null,"_ver": null},"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2000-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    9, 9, 'nhgf1596', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer3(400);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=nhgf1596')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EXPIRE_APPROVAL_AT);
        });
        test('異常 ネームスペース追加に失敗（400）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": {"_value": null,"_ver": null},"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7, 7, 'poiu7894', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer3(400);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=poiu7894')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_TO_ADD_NS);
        });
        test('異常 ネームスペース追加に失敗（500）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer3(500);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=poiu7894')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
        });
        test('異常 ネームスペース追加に失敗（500）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer4(500);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=poiu7894')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
    });
});
