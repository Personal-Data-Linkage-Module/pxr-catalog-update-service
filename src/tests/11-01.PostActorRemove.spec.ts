/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import * as express from 'express';
import { sprintf } from 'sprintf-js';
// eslint-disable-next-line no-unused-vars
import { Server } from 'net';
import Config from '../common/Config';
import { BookManageServer } from './StubServer';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const bookManageServer = new BookManageServer();
const common = new Common();

const type3Session = '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11';
let actorRequestId: number = 0;

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

// スタブサーバー（オペレーターサービス）
class _StubOperatorServer2 {
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
                    type: 1,
                    loginId: 'wf_staff01',
                    name: 'スタッフ01',
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
            if (status === 200) {
                let code;
                if (req.params.code) {
                    code = Number(req.params.code);
                }
                if (code === 1000117) {
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
                if (code === 1000021) {
                  res.json({
                      "catalogItem": {
                        "ns": "catalog/ext/test-org/actor/data-trader",
                        "name": "データ取引組織",
                        "_code": {
                          "_value": 1000021,
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
                          "_value": 1000021,
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
                        "region-root-alliance": null,
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
                if (code === 1000022) {
                  res.json({
                      "catalogItem": {
                        "ns": "catalog/ext/test-org/actor/data-trader",
                        "name": "データ取引組織",
                        "_code": {
                          "_value": 1000022,
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
                          "_value": 1000022,
                          "_ver": 1
                        },
                        "category": null,
                        "consumer-alliance": null,
                        "main-block": {
                          "_value": 1000109,
                          "_ver": 1
                        },
                        "other-block": null,
                        "region-root-alliance": null,
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
                          "ns": "catalog/ext/test-org/actor/app",
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
                          "wf-alliance": null,
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
                          "app-alliance": [
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
                if (code === 1000989) {
                  res.json({
                      "catalogItem": {
                        "ns": "catalog/ext/test-org/actor/region-root",
                        "name": "organization",
                        "_code": {
                          "_value": 1000989,
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
                          "_value": 1000989,
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
                            "_value": 1000988,
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
                        "trader-alliance": null,
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
                  if (code === 1000988) {
                    res.json({
                        "catalogItem": {
                          "ns": "catalog/ext/test-org/actor/region-root/actor_1000997/region",
                          "name": "テスト用リージョン",
                          "_code": {
                            "_value": 1000988,
                            "_ver": 1
                          },
                          "inherit": {
                            "_value": 48,
                            "_ver": 1
                          },
                          "description": "テスト用リージョンのリージョンの定義です。"
                        },
                        "template": {
                          "_code": {
                            "_value": 1000988,
                            "_ver": 1
                          },
                          "app-alliance": [],
                          "statement": [
                            {
                              "title": "リージョンステートメント",
                              "section": [
                                {
                                  "title": "テスト用プロジェクト概要",
                                  "content": [
                                    {
                                      "sentence": "「テスト用リージョンプロジェクト」では、大阪大学の学生や教職員、地域住民が楽しんでスポーツ活動、安心した生活が送れるためのIoTセンシング技術の開発と、センシングにより得られたPLRをもとにした高度なマイニング技術を創出することを目指します。\r\nそのために、「スポーツの怪我の予防や予知のための知的基盤の創出研究」と「熱中症の予兆検知と改善のための知的基盤の創出研究」、の2つのサブプロジェクトを実施します。"
                                    }
                                  ]
                                }
                              ]
                            }
                          ],
                          "wf-alliance": []
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
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/:code', _listener);
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

let _operatorServer: any;
let _catalogServer: any;
let _noticeServer: any;

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
        await bookManageServer.start();
    });
    /**
     * 全テスト実行後の処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
        await bookManageServer.stop();
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
    });

    /**
     * アクター認定解除申請
     */
    describe('アクター認定解除申請', () => {
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
                  999, 1000004, 1, 1000112, 1,
                  '2025-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
                  false, 'test_user', NOW(), 'test_user', NOW()
              ),
              (
                998, 1000991, 1, 1000990, 1,
                '2025-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
                false, 'test_user', NOW(), 'test_user', NOW()
              ),
              (
                997, 1010004, 1, 1000112, 1,
                '2025-07-07 00:00:00.000', 2, '2020-07-01 00:00:00.000', false,
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
                  999, 999, 'abcd1234', 1,
                  NULL, 
                  1000117, 1,
                  NULL, 'member', '2020-07-01 10:00:00.000',
                  1000001, 1,
                  'member', '2020-07-01 11:00:00.000',
                  false, 'test_user', NOW(), 'test_user', NOW()
              ),
              (
                  998, 998, 'abcd5678', 2,
                  NULL, 
                  NULL, NULL,
                  NULL, 'member', '2020-07-01 10:00:00.000',
                  1000001, 2,
                  'member', '2020-07-01 11:00:00.000',
                  false, 'test_user', NOW(), 'test_user', NOW()
              ),
              (
                  997, 997, 'abcd1111', 0,
                  NULL, 
                  1010117, 1,
                  NULL, NULL, NULL,
                  NULL, NULL,
                  'member', '2020-07-01 11:00:00.000',
                  false, 'test_user', NOW(), 'test_user', NOW()
              );
          `);
        });
        test('パラメータ異常：id（数字以外）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: 'a',
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：migrationActorCode（数字以外）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 'a',
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：migrationActorCode', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
          _catalogServer = new _StubCatalogServer(200);

          // 送信データを生成
          var json = JSON.stringify({
              isDraft: true
          });

          // 対象APIに送信
          const response = await supertest(expressApp).post(Url.actorRemoveURI)
              .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + type3Session])
              .send(json);

          // レスポンスチェック
          expect(response.status).toBe(400);
          expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：isDraft（真偽値以外）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: 1
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
        });
        test('パラメータ不足：isDraft', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('異常：セッションが無い', async () => {
            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：セッションが有効ではない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(204, 1000004, 1000112);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);   
        });
        test('異常：セッションが有効ではない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(500, 1000004, 1000112);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
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
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR); 
        });
        test('異常：運営メンバー以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer2(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: 1,
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED_OPERATOR);
        });
        test('異常：下書きが無いのにIDを指定', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: 1,
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_APPLICATION_OF_ID);
        });
        test('異常：カタログサービスからのレスポンスが200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(204);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000004));
        });
        test('異常：カタログサービスからのレスポンスが200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(500);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
        });
        test('異常：カタログサービスへの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('正常：app（下書き登録）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            actorRequestId = response.body['id'];

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.actorCode).toBe(1000004);
            expect(response.body.migrationActorCode).toBe(1000117);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(true);
            expect(response.body.expireAt).toBe(null);
            expect(response.body.applicantDate).toBe(null);
        });
        test('正常：app（下書きを下書きで更新）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: actorRequestId,
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.actorCode).toBe(1000004);
            expect(response.body.migrationActorCode).toBe(1000117);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(true);
            expect(response.body.expireAt).toBe(null);
            expect(response.body.applicantDate).toBe(null);
        });
        test('異常：同等の下書きが存在する', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EXISTS_IS_REQUESTED_AS_DRAFT, actorRequestId));
        });
        test('異常：Region-Rootの時、提携が解除されていない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002, 1000111);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: true
            });

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000111,
                    _ver: 1
                },
                actor: {
                    _value: 1000002,
                    _ver: 1
                }
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：pxr-rootが離脱', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000001, 1000110);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_REMOVE);
        });
        test('正常：appの時、移行先アクターが未指定', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000117, 1000115);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actorCode).toBe(1000117);
            expect(response.body.migrationActorCode).toBe(null);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(true);
            expect(response.body.expireAt).toBe(null);
            expect(response.body.applicantDate).toBe(null);
        });
        test('異常：statusが設定されていない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000999, 1000108);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_HAS_NOT_STATUS);
        });
        test('異常：移行先アクターにアクター以外のカタログコードが指定されている', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000998, 1000115);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000003,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THIS_IS_NOT_ACTOR_CATALOG, 1000003));
        });
        test('正常：APP', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000998, 1000115);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actorCode).toBe(1000998);
            expect(response.body.migrationActorCode).toBe(null);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(false);
            expect(response.body.expireAt).toBe('2020-10-01T10:00:00.000+0900');
        });
        test('正常：app（下書きを清書に更新）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000004, 1000112);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                id: actorRequestId,
                migrationActorCode: 1000117,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.actorCode).toBe(1000004);
            expect(response.body.migrationActorCode).toBe(1000117);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(false);
            expect(response.body.expireAt).toBe('2020-10-01T10:00:00.000+0900');
        });
        test('異常：同等の清書（未承認）が存在する', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1010004, 1000112);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1010117,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ALREADY_IS_AS_REQUESTED);
        });
        test('異常：Region-Rootの時、移行先アクターが指定されている', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000997, 1000996);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: 1000117,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.MIGRATION_ACTOR_IS_NOT_REQUIRED);
        });
        test('異常：Region-Rootの時に管理しているRegionにAPPが参加している', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000997, 1000996);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.ACTOR_JOIN_IN_REGION);
        });
        test('異常：通知サービスのレスポンスが200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000994, 1000993);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(500);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('異常：通知サービスへの接続に失敗', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000994, 1000993);
            _catalogServer = new _StubCatalogServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
        });
        test('正常：Region-Root（管理しているRegion有）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000994, 1000993);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: false
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actorCode).toBe(1000994);
            expect(response.body.migrationActorCode).toBe(null);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(false);
        });
        test('正常：Region-Root（管理しているRegion有 WF/APPが空配列）', async () => {
          // スタブを起動
          _operatorServer = new _StubOperatorServer(200, 1000989, 1000993);
          _catalogServer = new _StubCatalogServer(200);
          _noticeServer = new _StubNotificationServer(200);

          // 送信データを生成
          var json = JSON.stringify({
              migrationActorCode: null,
              isDraft: false
          });

          // 対象APIに送信
          const response = await supertest(expressApp).post(Url.actorRemoveURI)
              .set({ accept: 'application/json', 'Content-Type': 'application/json' })
              .set('Cookie', ['operator_type3_session=' + type3Session])
              .send(json);

          // レスポンスチェック
          expect(response.status).toBe(200);
          expect(response.body.actorCode).toBe(1000989);
          expect(response.body.migrationActorCode).toBe(null);
          expect(response.body.approvalActorCode).toBe(1000001);
          expect(response.body.isDraft).toBe(false);
      });
        test('正常：Region-Root（管理しているRegion無）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000991, 1000990);
            _catalogServer = new _StubCatalogServer(200);
            _noticeServer = new _StubNotificationServer(200);

            // 送信データを生成
            var json = JSON.stringify({
                migrationActorCode: null,
                isDraft: true
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.actorRemoveURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actorCode).toBe(1000991);
            expect(response.body.migrationActorCode).toBe(null);
            expect(response.body.approvalActorCode).toBe(1000001);
            expect(response.body.isDraft).toBe(true);
        });
    });
});
