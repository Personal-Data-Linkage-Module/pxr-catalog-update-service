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
const DESCRIPTION = 'アクター認定';

const type3Session = '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11';
let actorRequestId: number = 0;
let pxrRequestId: number = 0;

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
                    auth: '{"member":{"add": true, "update": true, "delete": true}}',
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

    constructor (method: string, status: number, code?: number) {
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
                                _value: 1000090,
                                _ver: 1
                            }
                        }
                    });
                }
            } else if (method === 'get') {
                if (status === 200) {
                    res.json({
                        catalogItem: {
                            name: 'test',
                            ns: '',
                            _code: {
                                _value: 1000090,
                                _ver: 1
                            }
                        },
                        template: {
                            'main-block': {
                                '_value': 1000111,
                                '_ver': 1
                            },
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
                    });
                }
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        if (method === 'post') {
            this._app.post('/catalog/ext', _listener);
        } else if (method === 'get') {
            this._app.get('/catalog/' + code, _listener);
        }
        this._server = this._app.listen(3001);
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
            _operatorServer._server.close();
        }
        if (_catalogServer) {
            _catalogServer._server.close();
        }
        if (_noticeServer) {
            _noticeServer._server.close();
        }
        if (_caServer) {
            _caServer._server.close();
        }
    });

    /**
     * アクター認定申請
     */
    describe('アクター認定申請', () => {
        test('異常：セッションが無い', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：セッションが有効ではない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(204);

            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);   
        });
        test('異常：セッションが有効ではない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(500);

            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION); 
        });
        test('異常：オペレーターサービスへの接続に失敗', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR); 
        });
        test('正常：下書き登録（cookie）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            actorRequestId = response.body['id'];

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(actorRequestId);
            expect(response.body.approvalActor._value).toBe(10002);
            expect(response.body.isDraft).toBe(true);
        });
        test('正常：下書き登録（header）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActor._value).toBe(10002);
            expect(response.body.isDraft).toBe(true);
        });
        test('正常：下書き登録（pxr-root）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            pxrRequestId = response.body.id;

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActor).toBe(null);
            expect(response.body.isDraft).toBe(true);
        });
        test('正常：下書きを下書きで更新（pxr-root）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: pxrRequestId,
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActor).toBe(null);
            expect(response.body.isDraft).toBe(true);
        });
        test('異常：pxr-root素通り登録（証明書URL取得に失敗）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(500);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.body.message).toBe(Message.FAILED_CLIENT_CERTIFICATE); 
            expect(response.status).toBe(500);
            
        });
        test('異常：pxr-root素通り登録（認証局への接続に失敗）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY); 
        });
        test('異常：pxr-root素通り登録（カタログ追加に失敗）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(500);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.CATALOG_UPDATE_FAILED); 
        });
        test('異常：pxr-root素通り登録（カタログへの接続に失敗）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG); 
        });
        test('異常：pxr-root素通り登録（通知に失敗）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(500);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE); 
        });
        test('正常：pxr-root素通り登録', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new _StubCertificationAuthServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.callerBlock._value).toBe(1000110);
            expect(response.body.callerBlock._ver).toBe(1);
        });
        test('異常：存在しないidを指定', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer('post', 200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: 999999,
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_ACTOR_ENTITY); 
        });
        test('異常：申請登録（通知への接続に失敗）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: actorRequestId,
                approvalActor: {
                    _value: 1000001,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 49,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE); 
        });
        test('正常：下書きを下書きで更新', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: actorRequestId,
                approvalActor: {
                    _value: 1000001,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 49,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActor._value).toBe(1000001);
            expect(response.body.isDraft).toBe(true);
        });
        test('正常：申請登録（承認用）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: actorRequestId,
                approvalActor: {
                    _value: 1000001,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 49,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActor._value).toBe(1000001);
            expect(response.body.approvalActor._ver).toBe(1);
            expect(response.body.isDraft).toBe(false);
        });
        test('正常：申請登録（否認用）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer2(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 1000001,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActor._value).toBe(1000001);
            expect(response.body.approvalActor._ver).toBe(1);
            expect(response.body.isDraft).toBe(false);
        });
        test('パラメータ異常：id（数字以外）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                id: 'a',
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber); 
        });
        test('パラメータ異常：approvalActor（空）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ異常：approvalActor（_valueがない）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ異常：approvalActor（_verがない）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ異常：approvalActor._value（数字以外）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 'a',
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber); 
        });
        test('パラメータ異常：approvalActor._ver（数字以外）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 'a'
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber); 
        });
        test('パラメータ異常：pxr-rootの申請なのにapprovalActorが存在する', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/pxr-root',
                        name: '流通制御サービスプロバイダー',
                        description: '流通制御サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_REQUIRED_WHEN_PXR_ROOT_ACTOR_APPLICATION); 
        });
        test('パラメータ異常：actorCatalog（空）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {},
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined); 
        });
        test('パラメータ不足：catalogItem', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined); 
        });
        test('パラメータ不足：catalogItem.ns', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString); 
        });
        test('パラメータ不足：catalogItem.name', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString); 
        });
        // discription文字列以外に対応するため削除
        // test('パラメータ不足：catalogItem.description', async () => {
        //     // 送信データを生成
        //     var json = JSON.stringify({
        //         approvalActor: {
        //             _value: 10002,
        //             _ver: 1
        //         },
        //         actorCatalog: {
        //             catalogItem: {
        //                 ns: 'catalog/ext/test-org/actor/region-root',
        //                 name: '領域運営サービスプロバイダー',
        //                 _code: null,
        //                 inherit: {
        //                     _value: 50,
        //                     _ver: 1
        //                 }
        //             },
        //             template: {
        //                 prop: null,
        //                 value: null
        //             },
        //             inner: null,
        //             attribute: null
        //         },
        //         isDraft: false
        //     });

        //     // 対象APIに送信
        //     const response = await supertest(expressApp).post(Url.actorURI)
        //         .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        //         .set('Cookie', ['operator_type3_session=' + type3Session])
        //         .send(json);

        //     // レスポンスチェック
        //     expect(response.status).toBe(400);
        //     expect(response.body.reasons[0].message).toBe(Message.validation.isString); 
        // });
        test('パラメータ異常：catalogItem._code（null以外）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: 1,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：catalogItem.ns（extが含まれていない）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/model/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ異常：catalogItem.ns（actorが含まれていない）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/book',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ不足：template', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：inner', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ不足：attribute', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ不足：template.prop', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ不足：template.value', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID); 
        });
        test('パラメータ異常：isDraft（boolean以外）', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                approvalActor: {
                    _value: 10002,
                    _ver: 1
                },
                actorCatalog: {
                    catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        name: '領域運営サービスプロバイダー',
                        description: '領域運営サービスプロバイダーの定義です。',
                        _code: null,
                        inherit: {
                            _value: 50,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    },
                    inner: null,
                    attribute: null
                },
                isDraft: 1
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：リクエストが空', async () => {
            // 送信データを生成
            var json = JSON.stringify({});

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
    });
});
