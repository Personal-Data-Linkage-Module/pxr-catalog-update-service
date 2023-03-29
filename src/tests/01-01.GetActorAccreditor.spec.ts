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
                    auth: {
                        member:{
                            add: true,
                            update: true,
                            delete: true    
                        }
                    },
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
                                _value: 1000090,
                                _ver: 1
                            }
                        }
                    });
                }
            } else if (method === 'get') {
                if (status === 200) {
                    let ns;
                    if (req.query.ns) {
                        ns = req.query.ns;
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
                            }
                          ]);
                    } else if (ns === 'catalog/ext/test-org/actor/region-root') {
                        res.json([
                            {
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
                            }
                          ]);
                    } else if (ns === 'catalog/ext/test-org/actor/data-trader') {
                        res.json([
                            {
                              "catalogItem": {
                                "ns": "catalog/ext/test-org/actor/data-trader",
                                "name": "データ取引組織",
                                "_code": {
                                  "_value": 1000020,
                                  "_ver": 1
                                },
                                "inherit": {
                                  "_value": 38,
                                  "_ver": 1
                                },
                                "description": "データ取引組織の定義です。"
                              },
                              "template": {
                                "_code": {
                                  "_value": 1000020,
                                  "_ver": 1
                                },
                                "category": null,
                                "consumer-alliance": [
                                  {
                                    "_value": 1000114,
                                    "_ver": 1
                                  }
                                ],
                                "main-block": {
                                  "_value": 1000109,
                                  "_ver": 1
                                },
                                "other-block": null,
                                "region-root-alliance": [
                                  {
                                    "_value": 1000002,
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
                                    "by": {
                                      "_value": 1000001,
                                      "_ver": 1
                                    },
                                    "at": "20200101T000000.000+0900"
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
                                  "key": "consumer-alliance",
                                  "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                      "ns": null,
                                      "_code": null,
                                      "base": {
                                        "_value": 37,
                                        "_ver": 1
                                      }
                                    }
                                  },
                                  "description": "提携しているデータコンシューマーコード配列"
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
                                  "key": "region-root-alliance",
                                  "type": {
                                    "of": "code[]",
                                    "cmatrix": null,
                                    "candidate": {
                                      "ns": null,
                                      "_code": null,
                                      "base": {
                                        "_value": 49,
                                        "_ver": 1
                                      }
                                    }
                                  },
                                  "description": "提携している領域運営サービスプロバイダーコード配列"
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
                                }
                              ],
                              "attribute": null
                            }
                          ]);
                    }
                    if (ns === 'catalog/ext/test-org/setting/actor/region-root/actor_1000002') {
                      res.json([
                        {
                          "catalogItem": {
                            "ns": "catalog/ext/test-org/setting/actor/region-root/actor_1000002",
                            "name": "organization：アクター個別設定",
                            "_code": {
                              "_value": 1000357,
                              "_ver": 1
                            },
                            "inherit": {
                              "_value": 132,
                              "_ver": 1
                            },
                            "description": "流通制御組織によるorganizationのアクター個別設定の定義です。"
                          },
                          "template": {
                            "_code": {
                              "_value": 1000357,
                              "_ver": 1
                            },
                            "auth": [
                              {
                                "_value": 139,
                                "_ver": 1
                              },
                              {
                                "_value": 140,
                                "_ver": 1
                              },
                              {
                                "_value": 141,
                                "_ver": 1
                              },
                              {
                                "_value": 144,
                                "_ver": 1
                              },
                              {
                                "_value": 147,
                                "_ver": 1
                              },
                              {
                                "_value": 150,
                                "_ver": 1
                              },
                              {
                                "_value": 151,
                                "_ver": 1
                              },
                              {
                                "_value": 152,
                                "_ver": 1
                              },
                              {
                                "_value": 153,
                                "_ver": 1
                              }
                            ],
                            "certify-app": true,
                            "certify-wf": false,
                            "information-site": "http://www.test.org/organization/index.html"
                          },
                          "prop": [
                            {
                              "key": "auth",
                              "type": {
                                "of": "code[]",
                                "cmatrix": null,
                                "candidate": {
                                  "ns": [
                                    "catalog/model/auth"
                                  ],
                                  "_code": null,
                                  "base": null
                                }
                              },
                              "description": "操作権の配列"
                            },
                            {
                              "key": "certify-app",
                              "type": {
                                "of": "boolean",
                                "cmatrix": null
                              },
                              "description": "APP認定権限有無"
                            },
                            {
                              "key": "certify-wf",
                              "type": {
                                "of": "boolean",
                                "cmatrix": null
                              },
                              "description": "WF認定権限有無"
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
                              "description": "流通制御サービスプロバイダーの情報サイト"
                            }
                          ],
                          "attribute": null
                        }
                      ]);
                    }
                    if (ns === 'catalog/ext/test-org/setting/actor/data-trader/actor_1000020') {
                      res.json([
                        {
                          "catalogItem": {
                            "ns": "catalog/ext/test-org/setting/actor/data-trader/actor_1000020",
                            "name": "データ取引組織：アクター個別設定",
                            "_code": {
                              "_value": 1000358,
                              "_ver": 1
                            },
                            "inherit": {
                              "_value": 115,
                              "_ver": 1
                            },
                            "description": "流通制御組織によるデータ取引組織のアクター個別設定の定義です。"
                          },
                          "template": {
                            "_code": {
                              "_value": 1000358,
                              "_ver": 1
                            },
                            "auth": [
                              {
                                "_value": 139,
                                "_ver": 1
                              },
                              {
                                "_value": 140,
                                "_ver": 1
                              },
                              {
                                "_value": 141,
                                "_ver": 1
                              },
                              {
                                "_value": 142,
                                "_ver": 1
                              },
                              {
                                "_value": 143,
                                "_ver": 1
                              },
                              {
                                "_value": 144,
                                "_ver": 1
                              },
                              {
                                "_value": 147,
                                "_ver": 1
                              },
                              {
                                "_value": 152,
                                "_ver": 1
                              },
                              {
                                "_value": 153,
                                "_ver": 1
                              }
                            ],
                            "certify-consumer": false,
                            "create-book": true
                          },
                          "prop": [
                            {
                              "key": "auth",
                              "type": {
                                "of": "code[]",
                                "cmatrix": null,
                                "candidate": {
                                  "ns": [
                                    "catalog/model/auth"
                                  ],
                                  "_code": null,
                                  "base": null
                                }
                              },
                              "description": "操作権の配列"
                            },
                            {
                              "key": "certify-consumer",
                              "type": {
                                "of": "boolean",
                                "cmatrix": null
                              },
                              "description": "Consumer認定権限有無"
                            },
                            {
                              "key": "create-book",
                              "type": {
                                "of": "boolean",
                                "cmatrix": null
                              },
                              "description": "Book開設権限有無"
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
        if (method === 'post') {
            this._app.post('/catalog/ext', _listener);
        } else if (method === 'get') {
            this._app.get('/catalog', _listener);
        }
        this._server = this._app.listen(3001);
    }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer2 {
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
                              _value: 1000090,
                              _ver: 1
                          }
                      }
                  });
              }
          } else if (method === 'get') {
              if (status === 200) {
                  let ns;
                  if (req.query.ns) {
                      ns = req.query.ns;
                  }

                  if (ns === 'catalog/ext/test-org/actor/pxr-root') {
                      res.json([
                          {
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/pxr-root",
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
                          }
                        ]);
                  } else if (ns === 'catalog/ext/test-org/actor/region-root') {
                      res.json([
                          {
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
                          }
                        ]);
                  } else if (ns === 'catalog/ext/test-org/actor/data-trader') {
                      res.json([
                          {
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/data-trader",
                              "_code": {
                                "_value": 1000020,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 38,
                                "_ver": 1
                              },
                              "description": "データ取引組織の定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000020,
                                "_ver": 1
                              },
                              "category": null,
                              "consumer-alliance": [
                                {
                                  "_value": 1000114,
                                  "_ver": 1
                                }
                              ],
                              "main-block": {
                                "_value": 1000109,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-root-alliance": [
                                {
                                  "_value": 1000002,
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
                                  "by": {
                                    "_value": 1000001,
                                    "_ver": 1
                                  },
                                  "at": "20200101T000000.000+0900"
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
                                "key": "consumer-alliance",
                                "type": {
                                  "of": "code[]",
                                  "cmatrix": null,
                                  "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                      "_value": 37,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "提携しているデータコンシューマーコード配列"
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
                                "key": "region-root-alliance",
                                "type": {
                                  "of": "code[]",
                                  "cmatrix": null,
                                  "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                      "_value": 49,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "提携している領域運営サービスプロバイダーコード配列"
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
      if (method === 'post') {
          this._app.post('/catalog/ext', _listener);
      } else if (method === 'get') {
          this._app.get('/catalog', _listener);
      }
      this._server = this._app.listen(3001);
  }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer3 {
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
                              _value: 1000090,
                              _ver: 1
                          }
                      }
                  });
              }
          } else if (method === 'get') {
              if (status === 200) {
                  let ns;
                  if (req.query.ns) {
                      ns = req.query.ns;
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
                              "app-cert": null,
                              "category": null,
                              "consumer-cert": null,
                              "data-trader-cert": null,
                              "main-block": {
                                "_value": 1000110,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-root-cert": null,
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
                              "wf-cert": null
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
                          }
                        ]);
                  } else if (ns === 'catalog/ext/test-org/actor/region-root') {
                      res.json([
                          {
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
                          }
                        ]);
                  } else if (ns === 'catalog/ext/test-org/actor/data-trader') {
                      res.json([
                          {
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/data-trader",
                              "name": "データ取引組織",
                              "_code": {
                                "_value": 1000020,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 38,
                                "_ver": 1
                              },
                              "description": "データ取引組織の定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000020,
                                "_ver": 1
                              },
                              "category": null,
                              "consumer-alliance": [
                                {
                                  "_value": 1000114,
                                  "_ver": 1
                                }
                              ],
                              "main-block": {
                                "_value": 1000109,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-root-alliance": [
                                {
                                  "_value": 1000002,
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
                                  "by": {
                                    "_value": 1000001,
                                    "_ver": 1
                                  },
                                  "at": "20200101T000000.000+0900"
                                }
                              ],
                              "certify-consumer":{
                                "cert": [
                                  {
                                    "title": "",
                                    "section": [
                                      {
                                        "title": "コンシューマの認定基準",
                                        "content": [
                                          {
                                            "sentence": "コンシューマの認定基準です。"
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ],
                              }
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
                                "key": "consumer-alliance",
                                "type": {
                                  "of": "code[]",
                                  "cmatrix": null,
                                  "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                      "_value": 37,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "提携しているデータコンシューマーコード配列"
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
                                "key": "region-root-alliance",
                                "type": {
                                  "of": "code[]",
                                  "cmatrix": null,
                                  "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                      "_value": 49,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "提携している領域運営サービスプロバイダーコード配列"
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
      if (method === 'post') {
          this._app.post('/catalog/ext', _listener);
      } else if (method === 'get') {
          this._app.get('/catalog', _listener);
      }
      this._server = this._app.listen(3001);
  }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer4 {
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
                              _value: 1000090,
                              _ver: 1
                          }
                      }
                  });
              }
          } else if (method === 'get') {
              if (status === 200) {
                  let ns;
                  if (req.query.ns) {
                      ns = req.query.ns;
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
                          }
                        ]);
                  } else if (ns === 'catalog/ext/test-org/actor/region-root') {
                      res.json([
                          {
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
                          }
                        ]);
                  } else if (ns === 'catalog/ext/test-org/actor/data-trader') {
                      res.json([
                          {
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/data-trader",
                              "name": "データ取引組織",
                              "_code": {
                                "_value": 1000020,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 38,
                                "_ver": 1
                              },
                              "description": "データ取引組織の定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000020,
                                "_ver": 1
                              },
                              "category": null,
                              "consumer-alliance": [
                                {
                                  "_value": 1000114,
                                  "_ver": 1
                                }
                              ],
                              "main-block": {
                                "_value": 1000109,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-root-alliance": [
                                {
                                  "_value": 1000002,
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
                                  "by": {
                                    "_value": 1000001,
                                    "_ver": 1
                                  },
                                  "at": "20200101T000000.000+0900"
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
                                "key": "consumer-alliance",
                                "type": {
                                  "of": "code[]",
                                  "cmatrix": null,
                                  "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                      "_value": 37,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "提携しているデータコンシューマーコード配列"
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
                                "key": "region-root-alliance",
                                "type": {
                                  "of": "code[]",
                                  "cmatrix": null,
                                  "candidate": {
                                    "ns": null,
                                    "_code": null,
                                    "base": {
                                      "_value": 49,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "提携している領域運営サービスプロバイダーコード配列"
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
      if (method === 'post') {
          this._app.post('/catalog/ext', _listener);
      } else if (method === 'get') {
          this._app.get('/catalog', _listener);
      }
      this._server = this._app.listen(3001);
  }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer5 {
  _app: express.Express;
  _server: Server;

  constructor (status: number) {
      this._app = express();

      // イベントハンドラー
      const _listener = (req: express.Request, res: express.Response) => {
          let ns;
          if (req.query.ns) {
              ns = req.query.ns;
          }

          if (ns === 'catalog/ext/test-org/actor/pxr-root') {
              res.status(status);
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
                  }
              ]);
          } else if (ns === 'catalog/ext/test-org/actor/region-root') {
            res.status(status);
            res.json([
              {
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
              }
            ]);
          } else if (ns === 'catalog/ext/test-org/actor/data-trader') {
              res.status(status);
              res.json([
                  {
                    "catalogItem": {
                      "ns": "catalog/ext/test-org/actor/data-trader",
                      "name": "データ取引組織",
                      "_code": {
                        "_value": 1000020,
                        "_ver": 1
                      },
                      "inherit": {
                        "_value": 38,
                        "_ver": 1
                      },
                      "description": "データ取引組織の定義です。"
                    },
                    "template": {
                      "_code": {
                        "_value": 1000020,
                        "_ver": 1
                      },
                      "category": null,
                      "consumer-alliance": [
                        {
                          "_value": 1000114,
                          "_ver": 1
                        }
                      ],
                      "main-block": {
                        "_value": 1000109,
                        "_ver": 1
                      },
                      "other-block": null,
                      "region-root-alliance": [
                        {
                          "_value": 1000002,
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
                          "by": {
                            "_value": 1000001,
                            "_ver": 1
                          },
                          "at": "20200101T000000.000+0900"
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
                        "key": "consumer-alliance",
                        "type": {
                          "of": "code[]",
                          "cmatrix": null,
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 37,
                              "_ver": 1
                            }
                          }
                        },
                        "description": "提携しているデータコンシューマーコード配列"
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
                        "key": "region-root-alliance",
                        "type": {
                          "of": "code[]",
                          "cmatrix": null,
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 49,
                              "_ver": 1
                            }
                          }
                        },
                        "description": "提携している領域運営サービスプロバイダーコード配列"
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
                      }
                    ],
                    "attribute": null
                  }
                ]);
          }
          if (ns === 'catalog/ext/test-org/setting/actor/region-root/actor_1000002') {
            res.status(404);
            res.json([]);
          }
          if (ns === 'catalog/ext/test-org/setting/actor/data-trader/actor_1000020') {
            res.status(404);
            res.json([]);
          }
          res.end();
      };

      // ハンドラーのイベントリスナーを追加、アプリケーションの起動
      this._app.get('/catalog', _listener);
      this._server = this._app.listen(3001);
  }
}

// スタブサーバー（カタログサービス）
class _StubCatalogServer6 {
  _app: express.Express;
  _server: Server;

  constructor (status: number) {
      this._app = express();

      // イベントハンドラー
      const _listener = (req: express.Request, res: express.Response) => {
          let ns;
          if (req.query.ns) {
              ns = req.query.ns;
          }

          if (ns === 'catalog/ext/test-org/actor/pxr-root') {
              res.status(status);
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
                  }
              ]);
          } else if (ns === 'catalog/ext/test-org/actor/region-root') {
            res.status(status);
            res.json([
              {
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
              }
            ]);
          } else if (ns === 'catalog/ext/test-org/actor/data-trader') {
              res.status(status);
              res.json([
                  {
                    "catalogItem": {
                      "ns": "catalog/ext/test-org/actor/data-trader",
                      "name": "データ取引組織",
                      "_code": {
                        "_value": 1000020,
                        "_ver": 1
                      },
                      "inherit": {
                        "_value": 38,
                        "_ver": 1
                      },
                      "description": "データ取引組織の定義です。"
                    },
                    "template": {
                      "_code": {
                        "_value": 1000020,
                        "_ver": 1
                      },
                      "category": null,
                      "consumer-alliance": [
                        {
                          "_value": 1000114,
                          "_ver": 1
                        }
                      ],
                      "main-block": {
                        "_value": 1000109,
                        "_ver": 1
                      },
                      "other-block": null,
                      "region-root-alliance": [
                        {
                          "_value": 1000002,
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
                          "by": {
                            "_value": 1000001,
                            "_ver": 1
                          },
                          "at": "20200101T000000.000+0900"
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
                        "key": "consumer-alliance",
                        "type": {
                          "of": "code[]",
                          "cmatrix": null,
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 37,
                              "_ver": 1
                            }
                          }
                        },
                        "description": "提携しているデータコンシューマーコード配列"
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
                        "key": "region-root-alliance",
                        "type": {
                          "of": "code[]",
                          "cmatrix": null,
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 49,
                              "_ver": 1
                            }
                          }
                        },
                        "description": "提携している領域運営サービスプロバイダーコード配列"
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
                      }
                    ],
                    "attribute": null
                  }
                ]);
          }
          if (ns === 'catalog/ext/test-org/setting/actor/region-root/actor_1000002') {
            res.status(400);
            res.json([]);
          }
          if (ns === 'catalog/ext/test-org/setting/actor/data-trader/actor_1000020') {
            res.status(400);
            res.json([]);
          }
          res.end();
      };

      // ハンドラーのイベントリスナーを追加、アプリケーションの起動
      this._app.get('/catalog', _listener);
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
     * 申請先取得
     */
    describe('申請先取得', () => {
        test('パラメータ異常　未設定（actorType）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('パラメータ異常　規定値以外（actorType）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=pxr-pxr')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('正常　actorTypeがpxr-root', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer('get', 200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=pxr-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常　actorTypeがregion-root', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer('get', 200);
            
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=region-root')
            .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActors[0].approvalActor._value).toBe(1000001);
            expect(response.body.approvalActors[0].approvalActor._ver).toBe(1);
        });
        test('正常　actorTypeがapplication', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer('get', 200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=app')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.approvalActors[0].approvalActor._value).toBe(1000001);
            expect(response.body.approvalActors[0].approvalActor._ver).toBe(1);
        });
        test('正常　nameが無い', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200);
          _catalogServer = new _StubCatalogServer2('get', 200);

          // 対象APIに送信
          const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=app')
              .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

          // レスポンスチェック
          expect(response.status).toBe(200);
        });
        test('正常　○○-certが無い', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200);
          _catalogServer = new _StubCatalogServer3('get', 200);

          // 対象APIに送信
          const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=app')
              .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

          // レスポンスチェック
          expect(response.status).toBe(200);
        });
        test('正常　○○-certにcertが無い', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200);
          _catalogServer = new _StubCatalogServer4('get', 200);

          // 対象APIに送信
          const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=app')
              .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

          // レスポンスチェック
          expect(response.status).toBe(200);
        });
        test('正常　actorTypeがapp（region-rootの個別設定無し）', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200);
          _catalogServer = new _StubCatalogServer5(200);
          
          // 対象APIに送信
          const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=app')
          .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

          // レスポンスチェック
          expect(response.status).toBe(200);
          expect(response.body.approvalActors[0].approvalActor._value).toBe(1000001);
          expect(response.body.approvalActors[0].approvalActor._ver).toBe(1);
        });
    });
    describe('申請先取得', () => {
        test('サーバー異常　カタログサービスからのレスポンスが200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);
            _catalogServer = new _StubCatalogServer('get', 400);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })    
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('サーバー異常　カタログサービスからのレスポンスが200以外', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200);
          _catalogServer = new _StubCatalogServer6(200);
          
          // 対象APIに送信
          const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=app')
          .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

          // レスポンスチェック
          expect(response.status).toBe(500);
        });
    });
    describe('申請先取得', () => {
        test('サーバー異常　カタログサービスに接続できない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.accreditorURI + '?actorType=region-root')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11']);

            // レスポンスチェック
            expect(response.status).toBe(500);
        });
    });
});
