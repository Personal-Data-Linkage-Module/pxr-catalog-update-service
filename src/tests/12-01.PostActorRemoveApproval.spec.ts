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

// スタブサーバー（オペレーターサービス）
class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actor: number, block: number) {
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
            if (req.method === 'GET') {
                if (status === 200) {
                    let code;
                    if (req.params.code) {
                        code = Number(req.params.code);
                    }
                    if (code === 1000117) {
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
                    if (code === 1000003) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/region-root/actor_1000002/region",
                              "name": "テスト用リージョン",
                              "_code": {
                                "_value": 1000003,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 48,
                                "_ver": 1
                              },
                              "description": "テスト用リージョンの定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000003,
                                "_ver": 1
                              },
                              "app-alliance": null,
                              "statement": [
                                {
                                  "title": "リージョンステートメント",
                                  "section": [
                                    {
                                      "title": "テスト用リージョンステートメントD",
                                      "content": [
                                        {
                                          "sentence": "テスト用リージョンステートメントDの概要です。"
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ],
                              "wf-alliance": [
                                {
                                  "_value": 1000004,
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
                                      "_value": 42,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "Regionメンバー(アプリケーションプロバイダー)のコード配列"
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
                                "description": "Regionステートメント"
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
                                      "_value": 47,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "Regionメンバー(ワークフロープロバイダー)のコード配列"
                              }
                            ],
                            "attribute": null
                          });
                    }
                    if (code === 1000002) {
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
                    if (code === 1000004) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/wf",
                              "name": "テスト用ワークフロー",
                              "_code": {
                                "_value": 1000004,
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
                                "_value": 1000004,
                                "_ver": 1
                              },
                              "category": null,
                              "main-block": {
                                "_value": 1000112,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region-alliance": null,
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
                                  "_value": 1000007,
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
                    if (code === 1000020) {
                        res.json({
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
                                  "at": "20200201T000000.000+0900"
                                },
                                {
                                    "status": "certified2",
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
                          });
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
                    if (code === 1000114) {
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
                    }
                    if (code === 1000999) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/consumer",
                              "name": "営利企業",
                              "_code": {
                                "_value": 1000999,
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
                                "_value": 1000999,
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
                              "status": null,
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
                    }
                    if (code === 1000998) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/app",
                              "name": "app",
                              "_code": {
                                "_value": 1000998,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 37,
                                "_ver": 1
                              },
                              "description": "appの定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000998,
                                "_ver": 1
                              },
                              "category": null,
                              "main-block": {
                                "_value": 1000115,
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
                                },
                                {
                                    "status": "certified2",
                                    "by": {
                                      "_value": 1000001,
                                      "_ver": 1
                                    },
                                    "at": "20200201T000000.000+0900"
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
                    }
                    if (code === 1000997) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/region-root",
                              "name": "organization",
                              "_code": {
                                "_value": 1000997,
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
                                "_value": 1000997,
                                "_ver": 1
                              },
                              "category": null,
                              "main-block": {
                                "_value": 1000996,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region": [
                                {
                                  "_value": 1000995,
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
                              "trader-alliance": null
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
                    if (code === 1000995) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/region-root/actor_1000997/region",
                              "name": "テスト用リージョン",
                              "_code": {
                                "_value": 1000995,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 48,
                                "_ver": 1
                              },
                              "description": "テスト用リージョンの定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000995,
                                "_ver": 1
                              },
                              "app-alliance": null,
                              "statement": [
                                {
                                  "title": "リージョンステートメント",
                                  "section": [
                                    {
                                      "title": "テスト用リージョンステートメントD",
                                      "content": [
                                        {
                                          "sentence": "テスト用リージョンステートメントDの概要です。"
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ],
                              "wf-alliance": [
                                {
                                  "_value": 1000004,
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
                                      "_value": 42,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "Regionメンバー(アプリケーションプロバイダー)のコード配列"
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
                                "description": "Regionステートメント"
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
                                      "_value": 47,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "Regionメンバー(ワークフロープロバイダー)のコード配列"
                              }
                            ],
                            "attribute": null
                          });
                    }
                    if (code === 1000994) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/region-root",
                              "name": "organization",
                              "_code": {
                                "_value": 1000994,
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
                                "_value": 1000994,
                                "_ver": 1
                              },
                              "category": null,
                              "main-block": {
                                "_value": 1000993,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region": [
                                {
                                  "_value": 1000992,
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
                              "trader-alliance": null
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
                    if (code === 1000992) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/region-root/actor_1000997/region",
                              "name": "テスト用リージョン",
                              "_code": {
                                "_value": 1000992,
                                "_ver": 1
                              },
                              "inherit": {
                                "_value": 48,
                                "_ver": 1
                              },
                              "description": "テスト用リージョンの定義です。"
                            },
                            "template": {
                              "_code": {
                                "_value": 1000992,
                                "_ver": 1
                              },
                              "app-alliance": null,
                              "statement": [
                                {
                                  "title": "リージョンステートメント",
                                  "section": [
                                    {
                                      "title": "テスト用リージョンステートメントD",
                                      "content": [
                                        {
                                          "sentence": "テスト用リージョンステートメントDの概要です。"
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ],
                              "wf-alliance": null
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
                                      "_value": 42,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "Regionメンバー(アプリケーションプロバイダー)のコード配列"
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
                                "description": "Regionステートメント"
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
                                      "_value": 47,
                                      "_ver": 1
                                    }
                                  }
                                },
                                "description": "Regionメンバー(ワークフロープロバイダー)のコード配列"
                              }
                            ],
                            "attribute": null
                          });
                    }
                    if (code === 1000991) {
                        res.json({
                            "catalogItem": {
                              "ns": "catalog/ext/test-org/actor/region-root",
                              "name": "organization",
                              "_code": {
                                "_value": 1000991,
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
                                "_value": 1000991,
                                "_ver": 1
                              },
                              "category": null,
                              "main-block": {
                                "_value": 1000990,
                                "_ver": 1
                              },
                              "other-block": null,
                              "region": null,
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
                              "trader-alliance": null
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
                }
            } else {
                if (status === 200) {
                    res.json({
                    });
                }
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/:code', _listener);
        this._app.put('/catalog/ext/:code', _listener);
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
                        expirationAt: '2020-10-01T10:00:00.000+0900'
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

class RevokeCAServer {
  _app: express.Express;
  _server: Server;

  constructor (status1: number, status2: number, actorCode: number) {
      this._app = express();
      this._server = this._app.listen(3012);
      this._app.delete('/certification-authority/client/:serialNo/:fingerPrint', (req, res) => {
          res.status(status1).json().end();
      });
      this._app.get('/certification-authority/list/:actorCode', (req, res) => {
        if (status2 === 200) {
          res.status(status2).json([
            {
              "certType": "server",
              "subject": {
                "C": "JP",
                "ST": "Tokyo",
                "L": "Minato-ku",
                "O": "test-org",
                "OU": actorCode,
                "CN": "*.---.co.jp"
              },
              "serialNo": "45151289C1666E440E9DA5D3A9D011949E24C78B",
              "fingerPrint": "B6:79:A5:0B:5A:78:B4:01:F5:47:5E:BD:A1:E5:F8:81:D2:27:32:D0",
              "validPeriodStart": "2020-08-21T10:53:52.000+0900",
              "validPeriodEnd": "2120-07-28T10:53:52.000+0900"
            },
            {
              "subject": {
                "C": "JP",
                "ST": "Tokyo",
                "L": "Minato-ku",
                "O": "test-org",
                "OU": actorCode,
                "CN": "*.---.co.jp"
              },
              "serialNo": "31680245A46C043C60FD9A840BB8213E8FCA3C9F",
              "fingerPrint": "6F:8F:54:1B:07:F5:8F:BB:0A:95:5C:58:2A:9B:BF:68:43:D7:76:CC",
              "validPeriodStart": "2020-08-21T10:53:52.000+0900",
              "validPeriodEnd": "2120-07-28T10:53:52.000+0900"
            },
            {
              "certType": "client",
              "subject": {
                "C": "JP",
                "ST": "Tokyo",
                "L": "Minato-ku",
                "O": "test-org",
                "OU": actorCode,
                "CN": "*.---.co.jp"
              },
              "fingerPrint": "AE:6B:89:96:03:FC:C2:36:0D:DF:9E:65:09:3E:65:2A:A6:B7:6E:EA",
              "validPeriodStart": "2020-08-18T17:54:45.000+0900",
              "validPeriodEnd": "2120-07-25T17:54:45.000+0900"
            },
            {
              "certType": "client",
              "subject": {
                "C": "JP",
                "ST": "Tokyo",
                "L": "Minato-ku",
                "O": "test-org",
                "OU": actorCode,
                "CN": "*.---.co.jp"
              },
              "serialNo": "2392804964B340965A5BD7E81860F3B9C3AED83B",
              "validPeriodStart": "2020-08-18T17:54:45.000+0900",
              "validPeriodEnd": "2120-07-25T17:54:45.000+0900"
            },
            {
              "certType": "client",
              "subject": {
                "C": "JP",
                "ST": "Tokyo",
                "L": "Minato-ku",
                "O": "test-org",
                "OU": actorCode,
                "CN": "*.---.co.jp"
              },
              "serialNo": "744F3454B1BA1065B6B26235ED314D9B043B1FE5",
              "fingerPrint": "D5:FE:87:96:64:6F:57:62:23:7F:2D:CF:1B:CE:D4:12:84:03:2C:43",
              "validPeriodStart": "2020-08-13T20:57:22.000+0900",
              "validPeriodEnd": "2120-07-20T20:57:22.000+0900"
            }
          ]).end();
        } else {
          res.status(status2).json().end();
        }

    });
  }
}

class RevokeCAServer2 {
  _app: express.Express;
  _server: Server;

  constructor (status: number, actorCode: number) {
      this._app = express();
      this._server = this._app.listen(3012);
      this._app.delete('/certification-authority/client/:serialNo/:fingerPrint', (req, res) => {
        res.destroy();
      });
      this._app.get('/certification-authority/list/:actorCode', (req, res) => {
          if (status === 200) {
            res.status(status).json([
              {
                "certType": "server",
                "subject": {
                  "C": "JP",
                  "ST": "Tokyo",
                  "L": "Minato-ku",
                  "O": "test-org",
                  "OU": actorCode,
                  "CN": "*.---.co.jp"
                },
                "serialNo": "45151289C1666E440E9DA5D3A9D011949E24C78B",
                "fingerPrint": "B6:79:A5:0B:5A:78:B4:01:F5:47:5E:BD:A1:E5:F8:81:D2:27:32:D0",
                "validPeriodStart": "2020-08-21T10:53:52.000+0900",
                "validPeriodEnd": "2120-07-28T10:53:52.000+0900"
              },
              {
                "subject": {
                  "C": "JP",
                  "ST": "Tokyo",
                  "L": "Minato-ku",
                  "O": "test-org",
                  "OU": actorCode,
                  "CN": "*.---.co.jp"
                },
                "serialNo": "31680245A46C043C60FD9A840BB8213E8FCA3C9F",
                "fingerPrint": "6F:8F:54:1B:07:F5:8F:BB:0A:95:5C:58:2A:9B:BF:68:43:D7:76:CC",
                "validPeriodStart": "2020-08-21T10:53:52.000+0900",
                "validPeriodEnd": "2120-07-28T10:53:52.000+0900"
              },
              {
                "certType": "client",
                "subject": {
                  "C": "JP",
                  "ST": "Tokyo",
                  "L": "Minato-ku",
                  "O": "test-org",
                  "OU": actorCode,
                  "CN": "*.---.co.jp"
                },
                "fingerPrint": "AE:6B:89:96:03:FC:C2:36:0D:DF:9E:65:09:3E:65:2A:A6:B7:6E:EA",
                "validPeriodStart": "2020-08-18T17:54:45.000+0900",
                "validPeriodEnd": "2120-07-25T17:54:45.000+0900"
              },
              {
                "certType": "client",
                "subject": {
                  "C": "JP",
                  "ST": "Tokyo",
                  "L": "Minato-ku",
                  "O": "test-org",
                  "OU": actorCode,
                  "CN": "*.---.co.jp"
                },
                "serialNo": "2392804964B340965A5BD7E81860F3B9C3AED83B",
                "validPeriodStart": "2020-08-18T17:54:45.000+0900",
                "validPeriodEnd": "2120-07-25T17:54:45.000+0900"
              },
              {
                "certType": "client",
                "subject": {
                  "C": "JP",
                  "ST": "Tokyo",
                  "L": "Minato-ku",
                  "O": "test-org",
                  "OU": actorCode,
                  "CN": "*.---.co.jp"
                },
                "serialNo": "744F3454B1BA1065B6B26235ED314D9B043B1FE5",
                "fingerPrint": "D5:FE:87:96:64:6F:57:62:23:7F:2D:CF:1B:CE:D4:12:84:03:2C:43",
                "validPeriodStart": "2020-08-13T20:57:22.000+0900",
                "validPeriodEnd": "2120-07-20T20:57:22.000+0900"
              }
            ]).end();
          } else {
            res.status(status).json().end();
          }

      });
  }
}

class CertificationManageServer {
  _app: express.Express;
  _server: Server;

  constructor (status: number) {
      this._app = express();
      this._server = this._app.listen(3013);
      this._app.delete('/certificate-manage/:serialNo/:fingerPrint', (req, res) => {
          res.status(status).json().end();
      });
  }
}

let _operatorServer: any;
let _catalogServer: any;
let _noticeServer: any;
let _caServer: any;
let _cmServer: any;

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
        if (_cmServer) {
          await _cmServer._server.close();
        }
    });

    /**
     * アクター認定承認結果登録
     */
    describe('アクター認定承認結果登録', () => {
        beforeAll(async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.actor_manage
                (
                    id, caller_actor_code, caller_actor_version, caller_block_code, caller_block_version,
                    approval_expire_at, type, applicant_date, is_draft,                     
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 1000004, 1, 1000112, 1,
                    '2121-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, 1000994, 1, 1000993, 1,
                    '2121-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 1000991, 1, 1000990, 1,
                    '2121-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, 1000991, 1, 1000990, 1,
                    '2121-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    5, 1000991, 1, 1000990, 1,
                    '2020-02-01 00:00:00.000', 2, '2020-01-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    6, 1000991, 1, 1000990, 1,
                    '2121-02-01 00:00:00.000', 2, '2020-01-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    7, 1000991, 1, 1000990, 1,
                    '2121-02-01 00:00:00.000', 2, '2020-01-01 00:00:00.000', false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.actor_approval_manage
                (
                    id, actor_manage_id, auth_code, status,
                    comment,
                    migration_actor_code, migration_actor_version,
                    migration_comment, migragtion_approver, migration_approval_at,
                    approval_actor_code, approval_actor_version,
                    approver, approval_at, 
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 1, 'abcd1234', 0,
                    NULL, 
                    1000117, 1,
                    NULL, NULL, NULL,
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, 2, 'abcd5678', 0,
                    NULL, 
                    1000002, 1,
                    NULL, NULL, NULL,
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 3, 'efgh1234', 3,
                    NULL, 
                    1000002, 1,
                    NULL, 'mng_menber01', '2020-07-02 00:00:00.000',
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, 4, 'efgh5678', 0,
                    NULL, 
                    NULL, NULL,
                    NULL, NULL, NULL,
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    5, 5, 'ijkl1234', 0,
                    NULL, 
                    NULL, NULL,
                    NULL, NULL, NULL,
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    6, 6, 'ijkl5678', 0,
                    NULL, 
                    1000997, 1,
                    NULL, NULL, NULL,
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    7, 7, 'mnop1234', 3,
                    NULL, 
                    1000997, 1,
                    NULL, 'mng_menber01', '2020-07-02 00:00:00.000',
                    1000001, 1,
                    NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);
        });

        test('異常：存在しないauthCode', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000117, 1000115);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=a1a1a1a1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_AUTH_CODE);
        });
        test('正常：移行先が承認', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000117, 1000115);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=abcd1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe(2);
            expect(response.body.status).toBe(3);
            expect(response.body.migration.actor._value).toBe(1000117);
            expect(response.body.migration.comment).toBe(null);
            expect(response.body.migration.approver).toBe('mng_menber01');
            expect(response.body.approval.actor._value).toBe(1000001);
            expect(response.body.approval.comment).toBe(null);
            expect(response.body.approval.approver).toBe(null);
            expect(response.body.isDraft).toBe(false);
        });
        test('正常：最終承認者が承認', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new RevokeCAServer(200, 200, 1000004);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=abcd1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.type).toBe(2);
            expect(response.body.status).toBe(1);
            expect(response.body.migration.actor._value).toBe(1000117);
            expect(response.body.migration.comment).toBe(null);
            expect(response.body.migration.approver).toBe('mng_menber01');
            expect(response.body.approval.actor._value).toBe(1000001);
            expect(response.body.approval.comment).toBe(null);
            expect(response.body.approval.approver).toBe('mng_menber01');
            expect(response.body.isDraft).toBe(false);
        });
        test('正常：移行先が否認', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002, 1000111);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 2,
                comment: 'テストのため、否認とします'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=abcd5678')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.type).toBe(2);
            expect(response.body.status).toBe(2);
            expect(response.body.migration.actor._value).toBe(1000002);
            expect(response.body.migration.comment).toBe('テストのため、否認とします');
            expect(response.body.migration.approver).toBe('mng_menber01');
            expect(response.body.approval.actor._value).toBe(1000001);
            expect(response.body.approval.comment).toBe(null);
            expect(response.body.approval.approver).toBe(null);
            expect(response.body.isDraft).toBe(false);
        });
        test('正常：移行先が承認後、最終承認者が否認', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 2,
                comment: 'テストのため、否認とします'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=efgh1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(3);
            expect(response.body.type).toBe(2);
            expect(response.body.status).toBe(2);
            expect(response.body.migration.actor._value).toBe(1000002);
            expect(response.body.migration.comment).toBe(null);
            expect(response.body.migration.approver).toBe('mng_menber01');
            expect(response.body.approval.actor._value).toBe(1000001);
            expect(response.body.approval.comment).toBe('テストのため、否認とします');
            expect(response.body.approval.approver).toBe('mng_menber01');
            expect(response.body.isDraft).toBe(false);
        });
        test('正常：最終承認者が承認（移行先無し）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new RevokeCAServer(200, 200, 1000991);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=efgh5678')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(4);
            expect(response.body.type).toBe(2);
            expect(response.body.status).toBe(1);
            expect(response.body.approval.actor._value).toBe(1000001);
            expect(response.body.approval.comment).toBe(null);
            expect(response.body.approval.approver).toBe('mng_menber01');
            expect(response.body.isDraft).toBe(false);
        });
        test('異常：対象の申請が既に承認または否認済み', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=abcd1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ALREADY_APPROVED);
        });
        test('異常：有効期限が切れている', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=ijkl1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EXPIRE_APPROVAL_AT);
        });
        test('異常：承認アクターが一致しない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002, 1000111);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=ijkl5678')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_MATCH_APPROVAL_ACTOR);
        });
        test('異常：承認アクターが一致しない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002, 1000111);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_MATCH_APPROVAL_ACTOR);
        });
        test('異常：オペレーターサービスからのレスポンスが400', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(400, 1000001, 1000111);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：オペレーターサービスからのレスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(500, 1000001, 1000111);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレーターサービスとの接続に失敗', async () => {
            // スタブを起動
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：カタログサービスからのレスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(500);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
        });
        test('異常：カタログサービスとの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：通知サービスからのレスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(500);
            _caServer = new RevokeCAServer(200, 200, 1000991);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：通知サービスとの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _caServer = new RevokeCAServer(200, 200, 1000991);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：証明書管理サービスからのレスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _caServer = new RevokeCAServer(500, 200, 1000991);
            _noticeServer = new _StubNotificationServer(200);
            _cmServer = new CertificationManageServer(500);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_REVODE_CERTIFICATE);
        });
        test('異常：証明書管理サービスへの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _caServer = new RevokeCAServer(200, 200, 1000991);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CERTIFICATE_MANAGE);
        });
        test('異常：認証局サービスからのレスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _caServer = new RevokeCAServer(500, 200, 1000991);
            _noticeServer = new _StubNotificationServer(200);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_REVODE_CLIENT_CERTIFICATE);
        });
        test('異常：認証局サービスからのレスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _caServer = new RevokeCAServer(200, 500, 1000991);
            _noticeServer = new _StubNotificationServer(200);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_GET_CERTIFICATE);
        });
        test('異常：認証局サービスとの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY);
        });
        test('異常：認証局サービスとの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);
            _caServer = new RevokeCAServer2(200, 1000991);
            _cmServer = new CertificationManageServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                status: 1,
                comment: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorApprovalURI + '?code=mnop1234')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY);
        });
    });
});
