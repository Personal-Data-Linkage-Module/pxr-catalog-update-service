/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import * as express from 'express';
import { Server } from 'net';
import { sprintf } from 'sprintf-js';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// サーバをlisten

// 対象URLを設定
const type3Session: string = '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e11';
const session = JSON.stringify({
  sessionId: type3Session,
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
    _value: 1000007,
    _ver: 1
  }
});

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
                  code: 1000300,
                  version: 1
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

          if (code === 1000117 || code === 1000007) {
            res.json({
              "catalogItem": {
                "ns": "catalog/ext/test-org/actor/region-root",
                "name": "テスト用リージョンルート",
                "_code": {
                  "_value": 1000117,
                  "_ver": 1
                },
                "inherit": {
                  "_value": 47,
                  "_ver": 1
                },
                "description": "テスト用リージョンルートです"
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
                            "sentence": "テスト用リージョンルートのステートメントです。"
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
          if (code === 1000006) {
            res.json({
              "catalogItem": {
                "ns": "catalog/ext/test-org/actor/wf",
                "name": "テスト用ワークフロー",
                "_code": {
                  "_value": 1000006,
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
                  "_value": 1000006,
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
          if (ns === 'catalog/ext/test-org/actor/region-root') {
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
              },
              {
                "catalogItem": {
                  "ns": "catalog/ext/test-org/actor/region-root",
                  "name": "organization02",
                  "_code": {
                    "_value": 1000371,
                    "_ver": 1
                  },
                  "inherit": {
                    "_value": 49,
                    "_ver": 1
                  },
                  "description": "organization02の定義です。"
                },
                "template": {
                  "_code": {
                    "_value": 1000371,
                    "_ver": 1
                  },
                  "category": null,
                  "main-block": null,
                  "other-block": null,
                  "region": null,
                  "statement": null,
                  "status": null,
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
            _value: 1000115,
            _ver: 1
          },
          actor: {
            _value: 1000117,
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

let _operatorServer: any;
let _catalogServer: any;
let _notification: any;
/**
 * カタログ更新 API のユニットテスト
 */
describe('CatalogUpdate API', () => {
  /**
   * 全テスト実行後の前処理
   */
  beforeAll(async () => {
    await Application.start()
    // DB接続
    await common.connect();
    // DB初期化
    await common.executeSqlFile('initialData.sql');
    // 事前データ準備
    await common.executeSqlString(`
            INSERT INTO pxr_catalog_update.join_manage
            (
                join_actor_code,
                join_actor_version,
                join_region_code,
                join_region_version,
                applicant_actor_code,
                applicant_actor_version,
                approval_expire_at,
                type,
                is_draft,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
              1000117, 1,
              1000003, 1,
              1000117, 1,
              '2025-12-31 23:59:59.999', 1, true,
              false, 'test_user', NOW(), 'test_user', NOW()
            ),
            (
              1000004, 1,
              1000003, 1,
              1000004, 1,
              '2025-12-31 23:59:59.999', 1, false,
              false, 'test_user', NOW(), 'test_user', NOW()
            ),
            (
              1000006, 1,
              1000003, 1,
              1000006, 1,
              '2025-12-31 23:59:59.999', 1, false,
              false, 'test_user', NOW(), 'test_user', NOW()
            ),
            (
              1000007, 1,
              1000003, 1,
              1000007, 1,
              '2025-12-31 23:59:59.999', 2, true,
              false, 'test_user', NOW(), 'test_user', NOW()
            );
            INSERT INTO pxr_catalog_update.join_approval_manage
            (
              join_manage_id,
              auth_code, status, comment,
              approval_actor_code, approval_actor_version,
              approver, approval_at,
              is_disabled, created_by, created_at, updated_by, updated_at
            ) VALUES (
              2,
              'abcd1234', 0, NULL,
              1000002, 1,
              NULL, NULL,
              false, 'test_user', NOW(), 'test_user', NOW()
            ),
            (
              3,
              '1234abcd', 1, NULL,
              1000002, 1,
              NULL, NULL,
              false, 'test_user', NOW(), 'test_user', NOW()
            );
            INSERT INTO pxr_catalog_update.join_service_manage
            (
              join_manage_id, type,
              service_code, service_version,
              is_disabled, created_by, created_at, updated_by, updated_at
            ) VALUES (
              1, 1,
              1000117, 1,
              false, 'test_user', NOW(), 'test_user', NOW()
            ), (
              2, 1,
              1000004, 1,
              false, 'test_user', NOW(), 'test_user', NOW()
            ), (
              3, 1,
              1000006, 1,
              false, 'test_user', NOW(), 'test_user', NOW()
            );
        `);
  });
  /**
   * 各テスト実行の後処理
   */
  afterEach(async () => {
    // スタブサーバー停止
    if (_catalogServer) {
      _catalogServer._server.close();
      _catalogServer = null;
    }
    if (_operatorServer) {
      _operatorServer._server.close();
      _operatorServer = null;
    }
    if (_notification) {
      _notification._server.close();
      _notification = null;
    }
  });
  /**
   * 全テスト実行後の後処理
   */
  afterAll(async () => {
    // サーバ停止
    Application.stop();
    _operatorServer._server.close();
    _catalogServer._server.close();
    _notification._server.close();
  });

  /**
   * Region参加申請
   */
  describe('Region参加申請' + Url.baseURIJoin, () => {
    test('異常　存在しないIDを指定', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(200);
      // 送信データを生成
      var json = {
        id: 2,
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000117,
          version: 1,
          app: [
            {
              code: 1000117,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.NOT_EXISTS_APPLICATION_OF_ID);
    });
    test('異常　同様の下書きが存在する', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(200);
      // 送信データを生成
      var json = {
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000117,
          version: 1,
          app: [
            {
              code: 1000117,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(sprintf(Message.EXISTS_IS_REQUESTED_AS_DRAFT, 1));
    });
    test('異常　同じ内容の清書が存在する', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(200);
      // 送信データを生成
      var json = {
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000004,
          version: 1,
          app: [
            {
              code: 1000004,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.ALREADY_IS_AS_REQUESTED);
    });
    test('正常　同じ内容の清書が存在するが、承認または否認済み', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(200);
      // 送信データを生成
      var json = {
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000006,
          version: 1,
          app: [
            {
              code: 1000006,
              version: 1
            }
          ]
        },
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(200);
    });
    test('正常　Region-Rootが参加要求下書きを更新', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(200);
      // 送信データを生成
      var json = {
        id: 1,
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000117,
          version: 1,
          app: [
            {
              code: 1000117,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(200);
    });
    test('異常　セッション(通知サービス エラー応答204)', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(204);
      // 送信データを生成
      var json = {
        id: 4,
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000007,
          version: 1,
          app: [
            {
              code: 1000007,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
    });
    test('異常　セッション(通知サービス エラー応答400)', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(400);
      // 送信データを生成
      var json = {
        id: 4,
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000007,
          version: 1,
          app: [
            {
              code: 1000007,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
    });
    test('異常　セッション(通知サービス エラー応答500)', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      _notification = new _StubNotificationServer(500);
      // 送信データを生成
      var json = {
        id: 4,
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000007,
          version: 1,
          app: [
            {
              code: 1000007,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
    });
    test('異常　セッション(通知サービス未起動)', async () => {
      _operatorServer = new _StubOperatorServer(200);
      _catalogServer = new _StubCatalogServer(200);
      // 送信データを生成
      var json = {
        id: 4,
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000007,
          version: 1,
          app: [
            {
              code: 1000007,
              version: 1
            }
          ]
        },
        isDraft: false
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE);
    });
  });
});
