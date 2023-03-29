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
                        _value: 1000113,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000070,
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
class _StubOperatorServer2 {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    sessionId: '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12',
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
                        _value: 1000002,
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
class _StubOperatorServer3 {
    _app: express.Express;
    _server: Server;

    constructor (status: number, block: number, actor: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    sessionId: '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12',
                    operatorId: 1,
                    type: 3,
                    loginId: 'mng_menber01',
                    name: '運営メンバー01',
                    auth: '{"add": true, "update": true, "delete": true}',
                    lastLoginAt: '2020-01-14 15:27:20.426',
                    block: {
                        _value: block,
                        _ver: 1
                    },
                    actor: {
                        _value: actor,
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
                              "breakaway-flg": false,
                              "category": null,
                              "information-site": "http://www.test.org/organization/index.html",
                              "main-block": {
                                "_value": 1000111,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region": [
                                {
                                  "_value": 1000003,
                                  "_ver": 1
                                },
                                {
                                  "_value": 1000069,
                                  "_ver": 1
                                },
                                {
                                  "_value": 1000116,
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
                                  "at": "2020-01-01T00:00:00.000+0900"
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
                                "key": "breakaway-flg",
                                "type": {
                                  "of": "boolean",
                                  "cmatrix": null
                                },
                                "description": "離脱フラグ",
                                "isInherit": true
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
                                "description": null,
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
                                "description": "情報サイト",
                                "isInherit": true
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
                                "description": "アクター参加時に割り当てられたPXR-Block",
                                "isInherit": true
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
                                "description": "他アクターから引き継いだPXR-Blockの配列",
                                "isInherit": true
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
                                "description": "Region定義",
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
                                "description": "組織ステートメント",
                                "isInherit": true
                              },
                              {
                                "key": "status",
                                "type": {
                                  "of": "inner[]",
                                  "inner": "CertStatus",
                                  "cmatrix": null,
                                  "candidate": null
                                },
                                "description": "認定の履歴",
                                "isInherit": true
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
                                "description": "提携するデータ取引サービスプロバイダーのコード配列",
                                "isInherit": true
                              }
                            ],
                            "attribute": null
                          });
                    } else if (code === 1000004) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/app",
                              "name": "テスト用アプリケーション",
                              "_code": {
                                "_value": 1000004,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 47,
                                "_ver": 1
                              },
                              "description": "テスト用アプリケーションです"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000004,
                                "_ver": 1
                              },
                              "breakaway-flg": false,
                              "category": null,
                              "information-site": "",
                              "main-block": {
                                "_value": 1000112,
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
                                          "sentence": "テスト用アプリケーションのステートメントです。"
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
                                  "at": "2020-01-01T00:00:00.000+0900"
                                }
                              ],
                              "workflow": [
                                {
                                  "_value": 1000007,
                                  "_ver": 1
                                }
                              ]
                            },
                            "prop": [
                              {
                                "key": "breakaway-flg",
                                "type": {
                                  "of": "boolean",
                                  "cmatrix": null
                                },
                                "description": "離脱フラグ",
                                "isInherit": true
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
                                "description": null,
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
                                "description": "情報サイト",
                                "isInherit": true
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
                                "description": "アクター参加時に割り当てられたPXR-Block",
                                "isInherit": true
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
                                "description": "他アクターから引き継いだPXR-Blockの配列",
                                "isInherit": true
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
                                "description": "参加している領域運営サービスプロバイダーコード配列",
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
                                "description": "組織ステートメント",
                                "isInherit": true
                              },
                              {
                                "key": "status",
                                "type": {
                                  "of": "inner[]",
                                  "inner": "CertStatus",
                                  "cmatrix": null,
                                  "candidate": null
                                },
                                "description": "認定の履歴",
                                "isInherit": true
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
                                "description": "ワークフロー定義の配列",
                                "isInherit": true
                              }
                            ],
                            "attribute": null
                          });
                    } else if (code === 1000117) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/app",
                              "name": "テスト用アプリケーション",
                              "_code": {
                                "_value": 1000117,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 47,
                                "_ver": 1
                              },
                              "description": "テスト用アプリケーションです"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000117,
                                "_ver": 1
                              },
                              "breakaway-flg": false,
                              "category": null,
                              "information-site": "",
                              "main-block": {
                                "_value": 1000115,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-alliance": [
                                {
                                  "_value": 1000116,
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
                                          "sentence": "テスト用アプリケーションのステートメントです。"
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
                                  "at": "2020-01-01T00:00:00.000+0900"
                                }
                              ],
                              "workflow": [
                                {
                                  "_value": 1000120,
                                  "_ver": 1
                                }
                              ]
                            },
                            "prop": [
                              {
                                "key": "breakaway-flg",
                                "type": {
                                  "of": "boolean",
                                  "cmatrix": null
                                },
                                "description": "離脱フラグ",
                                "isInherit": true
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
                                "description": null,
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
                                "description": "情報サイト",
                                "isInherit": true
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
                                "description": "アクター参加時に割り当てられたPXR-Block",
                                "isInherit": true
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
                                "description": "他アクターから引き継いだPXR-Blockの配列",
                                "isInherit": true
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
                                "description": "参加している領域運営サービスプロバイダーコード配列",
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
                                "description": "組織ステートメント",
                                "isInherit": true
                              },
                              {
                                "key": "status",
                                "type": {
                                  "of": "inner[]",
                                  "inner": "CertStatus",
                                  "cmatrix": null,
                                  "candidate": null
                                },
                                "description": "認定の履歴",
                                "isInherit": true
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
                                "description": "ワークフロー定義の配列",
                                "isInherit": true
                              }
                            ],
                            "attribute": null
                          });
                    } else if (code === 1000070) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/app",
                              "name": "テスト用アプリケーション",
                              "_code": {
                                "_value": 1000070,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 47,
                                "_ver": 1
                              },
                              "description": "テスト用アプリケーションです"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000070,
                                "_ver": 1
                              },
                              "breakaway-flg": false,
                              "category": null,
                              "information-site": "",
                              "main-block": {
                                "_value": 1000113,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-alliance": [
                                {
                                  "_value": 1000069,
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
                                          "sentence": "テスト用アプリケーションのステートメントです。"
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
                                  "at": "2020-01-01T00:00:00.000+0900"
                                }
                              ],
                              "workflow": [
                                {
                                  "_value": 1000073,
                                  "_ver": 1
                                }
                              ]
                            },
                            "prop": [
                              {
                                "key": "breakaway-flg",
                                "type": {
                                  "of": "boolean",
                                  "cmatrix": null
                                },
                                "description": "離脱フラグ",
                                "isInherit": true
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
                                "description": null,
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
                                "description": "情報サイト",
                                "isInherit": true
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
                                "description": "アクター参加時に割り当てられたPXR-Block",
                                "isInherit": true
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
                                "description": "他アクターから引き継いだPXR-Blockの配列",
                                "isInherit": true
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
                                "description": "参加している領域運営サービスプロバイダーコード配列",
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
                                "description": "組織ステートメント",
                                "isInherit": true
                              },
                              {
                                "key": "status",
                                "type": {
                                  "of": "inner[]",
                                  "inner": "CertStatus",
                                  "cmatrix": null,
                                  "candidate": null
                                },
                                "description": "認定の履歴",
                                "isInherit": true
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
                                "description": "ワークフロー定義の配列",
                                "isInherit": true
                              }
                            ],
                            "attribute": null
                          });
                    } else {
                        console.log('not catalog:' + code);
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
let _operatorServer: any;
let _catalogServer: any;

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
    });

    /**
     * 申請取得
     */
    describe('申請取得', () => {
        test('actorTypeが空', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('actorTypeが規定値じゃない', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=pxr-pxr')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('approvedが設定されているのに規定値じゃない', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=pxr-root&approved=1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('codeが数値以外', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?code=test&ver=1&actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('verが数値以外', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?code=1&ver=test&actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常　対象の申請が1件もない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常　指定された申請元Blockの申請が1件もない', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,                   
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, null, true, '{"actorCode": 1000300, "serialNo": "xxxxxxx", "fingerPrint": "xx:xx:xx:xx"}',
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 1000300, 1, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/r","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    NULL, 1, NULL, true, NULL,
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
                ),
                (
                    2, 2, 'defg4567', 1,
                    NULL, 1000001, 1,
                    'root_member01', '2020-01-01 23:59:59.999',
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, null);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?code=1000114&ver=1&actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('申請元Block指定で正常に取得', async () => {
            // DB初期化
            await common.executeSqlFile('initialData.sql');
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,                   
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, NULL, NULL, 1000114, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, null, true, '{"actorCode": 1000300, "serialNo": "xxxxxxx", "fingerPrint": "xx:xx:xx:xx"}',
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 1000300, 1, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/r","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    NULL, 1, NULL, true, NULL,
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
                ),
                (
                    2, 2, 'defg4567', 1,
                    NULL, 1000001, 1,
                    'root_member01', '2020-01-01 23:59:59.999',
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);
            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?code=1000114&ver=1&actorType=region-root&approved=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(2);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得', async () => {
            // DB初期化
            await common.executeSqlFile('initialData.sql');
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,                   
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, null, true, '{"actorCode": 1000300, "serialNo": "xxxxxxx", "fingerPrint": "xx:xx:xx:xx"}',
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 1000300, 1, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/r","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    '2025-12-31 23:59:59.999', 1, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, NULL, NULL, 1000113, 1,
                    '{"catalogItem": {"ns": "catalog/ext/test-org/actor/region-root","name": "領域運営サービスプロバイダー","description": "領域運営サービスプロバイダーの定義です。","_code": null,"inherit": {"_value": 50,"_ver": 1}},"template": {"prop": null,"value": null},"inner": null,"attribute": null}',
                    NULL, 1, NULL, true, NULL,
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
                ),
                (
                    2, 2, 'defg4567', 1,
                    NULL, 1000001, 1,
                    'root_member01', '2020-01-01 23:59:59.999',
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, null);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(4);
                expect(response.body[1].id).toBe(1);
                expect(response.body[1].approvalActor._value).toBe(1000001);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（承認済含む）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, null);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root&approved=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(4);
                expect(response.body[1].id).toBe(2);
                expect(response.body[1].approvalActor._value).toBe(1000001);
                expect(response.body[2].id).toBe(1);
                expect(response.body[2].approvalActor._value).toBe(1000001);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（承認済含まない）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, null);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root&approved=false')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(4);
                expect(response.body[1].id).toBe(1);
                expect(response.body[1].approvalActor._value).toBe(1000001);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（認定解除）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    5, 1000002, 1, 1000111, 1,
                    NULL,
                    '2025-12-31 23:59:59.999', 2, '2020-06-01 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    6, 1000002, 1, 1000111, 1,
                    NULL,
                    NULL, 2, NULL, true, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    7, 1000002, 1, 1000111, 1,
                    NULL,
                    '2025-12-31 23:59:59.999', 2, '2020-06-01 23:59:59.999', false, '{"key": "value"}',
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
                    3, 5, 'abcd1234', 0,
                    NULL, 1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, 7, 'defg4567', 1,
                    NULL, 1000001, 1,
                    'root_member01', '2020-01-01 23:59:59.999',
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer2(200);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(2);
                expect(response.body[0].id).toBe(6);
                expect(response.body[1].id).toBe(5);
                expect(response.body[1].approval.actor._value).toBe(1000001);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（認定解除）（承認済含む）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer2(200);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root&approved=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(3);
                expect(response.body[0].id).toBe(7);
                expect(response.body[0].approval.actor._value).toBe(1000001);
                expect(response.body[1].id).toBe(6);
                expect(response.body[2].id).toBe(5);
                expect(response.body[2].approval.actor._value).toBe(1000001);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（認定解除）（承認済含まない）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer2(200);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root&approved=false')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(2);
                expect(response.body[0].id).toBe(6);
                expect(response.body[1].id).toBe(5);
                expect(response.body[1].approval.actor._value).toBe(1000001);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（認定解除）（移行先あり）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    8, 1000004, 1, 1000112, 1,
                    NULL,
                    '2025-12-31 23:59:59.999', 2, '2020-12-10 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    migration_actor_code, migration_actor_version,
                    migration_comment, migragtion_approver, migration_approval_at,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    8, 8, 'qazw1598', 0,
                    NULL, 1000001, 1,
                    1000004, 1,
                    NULL, NULL, NULL,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000112, 1000004);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=app')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(8);
                expect(response.body[0].type).toBe(2);
                expect(response.body[0].migration.actor._value).toBe(1000004);
                expect(response.body[0].migration.comment).toBe(null);
                expect(response.body[0].migration.approver).toBe(null);
                expect(response.body[0].migration.approvalAt).toBe(null);
                expect(response.body[0].approval.actor._value).toBe(1000001);
                expect(response.body[0].approval.comment).toBe(null);
                expect(response.body[0].approval.approver).toBe(null);
                expect(response.body[0].approval.approvalAt).toBe(null);
                expect(response.body[0].isDraft).toBe(false);
                expect(response.body[0].status).toBe(0);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（認定解除）（移行先あり/移行先承認済み）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    9, 1000117, 1, 1000115, 1,
                    NULL,
                    '2025-12-31 23:59:59.999', 2, '2020-12-10 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    migration_actor_code, migration_actor_version,
                    migration_comment, migragtion_approver, migration_approval_at,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    9, 9, 'qazw1598', 3,
                    NULL, 1000001, 1,
                    1000004, 1,
                    NULL, 'migration_member', '2025-12-11 23:59:59.999',
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000115, 1000117);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=app')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(9);
                expect(response.body[0].type).toBe(2);
                expect(response.body[0].migration.actor._value).toBe(1000004);
                expect(response.body[0].migration.comment).toBe(null);
                expect(response.body[0].migration.approver).toBe('migration_member');
                expect(response.body[0].migration.approvalAt).toBe('2025-12-11T23:59:59.999+0900');
                expect(response.body[0].approval.actor._value).toBe(1000001);
                expect(response.body[0].approval.comment).toBe(null);
                expect(response.body[0].approval.approver).toBe(null);
                expect(response.body[0].approval.approvalAt).toBe(null);
                expect(response.body[0].isDraft).toBe(false);
                expect(response.body[0].status).toBe(3);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（認定解除）（移行先あり/最終承認済み）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    template,
                    approval_expire_at, type, applicant_date, is_draft, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    10, 1000070, 1, 1000113, 1,
                    NULL,
                    '2025-12-31 23:59:59.999', 2, '2020-12-10 23:59:59.999', false, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment, approval_actor_code, approval_actor_version,
                    migration_actor_code, migration_actor_version,
                    migration_comment, migragtion_approver, migration_approval_at,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    10, 10, 'qazw1598', 1,
                    NULL, 1000001, 1,
                    1000004, 1,
                    NULL, 'migration_member', '2025-12-11 23:59:59.999',
                    'approval_member', '2025-12-12 23:59:59.999',
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, 1000070);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=app&approved=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].id).toBe(10);
                expect(response.body[0].type).toBe(2);
                expect(response.body[0].migration.actor._value).toBe(1000004);
                expect(response.body[0].migration.comment).toBe(null);
                expect(response.body[0].migration.approver).toBe('migration_member');
                expect(response.body[0].migration.approvalAt).toBe('2025-12-11T23:59:59.999+0900');
                expect(response.body[0].approval.actor._value).toBe(1000001);
                expect(response.body[0].approval.comment).toBe(null);
                expect(response.body[0].approval.approver).toBe('approval_member');
                expect(response.body[0].approval.approvalAt).toBe('2025-12-12T23:59:59.999+0900');
                expect(response.body[0].isDraft).toBe(false);
                expect(response.body[0].status).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常に取得（？）actor-type指定が異なる', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer3(200, 1000113, 1000070);
            _catalogServer = new _StubCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.actorURI + '?actorType=region-root&approved=true')
               .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e12']);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(JSON.stringify(response.body)).toBe('[]');
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
