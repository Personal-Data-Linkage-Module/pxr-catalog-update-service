/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import { Session } from './09-00.GetJoin.TestData';
// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import { Server } from 'net';
import { sprintf } from 'sprintf-js';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

/**
 * カタログサービス（申請取得用）
 */
export class CatalogServer4Get {
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
                } else if (code === 1000020) {
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
                } else if (code === 1000118) {
                    res.json({
                        catalogItem: {
                            ns: 'catalog/ext/test-org/actor/app',
                            _code: {
                              _value: 1000118,
                              _ver: 1
                          }
                        },
                        template: {
                            _code: {
                                _value: 1000118,
                                _ver: 1
                            },
                            'main-block': {
                                _value: 1000106,
                                _ver: 1
                            }
                        }
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
                            },
                            {
                              "_value": 1000007,
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
                } else if (code === 1000004) {
                    res.json({
                        catalogItem: {
                            ns: 'catalog/ext/test-org/actor/region-root',
                            _code: {
                              _value: 1000004,
                              _ver: 1
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000004,
                                _ver: 1
                            },
                            'main-block': {
                                _value: 1000111,
                                _ver: 1
                            },
                            region: []
                        }
                    });
                } else if (code === 1000005) {
                    res.json({
                        catalogItem: {
                          ns: 'catalog/ext/test-org/actor/region-root',
                          _code: {
                            _value: 1000005,
                            _ver: 1
                          }
                        },
                        template: {
                            _code: {
                                _value: 1000005,
                                _ver: 1
                            },
                            'main-block': {
                                _value: 1000111,
                                _ver: 1
                            }
                        }
                    });
                }
            } else {
                res.status(status);
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/:code', _listener);
        this._server = this._app.listen(3001);
    }
}

export class CatalogServer4Get2 {
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
              } else if (code === 1000020) {
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
              } else if (code === 1000118) {
                  res.json({
                      catalogItem: {
                          ns: 'catalog/ext/test-org/actor/app',
                          _code: {
                            _value: 1000118,
                            _ver: 1
                        }
                      },
                      template: {
                          _code: {
                              _value: 1000118,
                              _ver: 1
                          },
                          'main-block': {
                              _value: 1000106,
                              _ver: 1
                          }
                      }
                  });
              } else if (code === 1000117) {
                  res.json({
                      "catalogItem": {
                        "ns": "catalog/ext/test-org/tests/wf",
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
              } else if (code === 1000004) {
                  res.json({
                      catalogItem: {
                          ns: 'catalog/ext/test-org/actor/region-root',
                          _code: {
                            _value: 1000004,
                            _ver: 1
                          }
                      },
                      template: {
                          _code: {
                              _value: 1000004,
                              _ver: 1
                          },
                          'main-block': {
                              _value: 1000111,
                              _ver: 1
                          },
                          region: []
                      }
                  });
              } else if (code === 1000005) {
                  res.json({
                      catalogItem: {
                        ns: 'catalog/ext/test-org/actor/region-root',
                        _code: {
                          _value: 1000005,
                          _ver: 1
                        }
                      },
                      template: {
                          _code: {
                              _value: 1000005,
                              _ver: 1
                          },
                          'main-block': {
                              _value: 1000111,
                              _ver: 1
                          }
                      }
                  });
              }
          } else {
              res.status(status);
          }

          res.end();
      };

      // ハンドラーのイベントリスナーを追加、アプリケーションの起動
      this._app.get('/catalog/:code', _listener);
      this._server = this._app.listen(3001);
  }
}

// オペレータサーバー（申請取得用）
export class OperatorServer4Get {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (status === 200) {
                return res.status(status).json({
                    sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
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
                        _value: actorCode,
                        _ver: 1
                    }
                });
            } else {
                res.status(status);
            }
            return res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

let operator: any;
let catalog: any;

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
        if (operator) {
            operator._server.close();
        }
        if (catalog) {
            catalog._server.close();
        }
    });

    /**
     * Region参加申請取得
     */
    describe('Region参加申請取得', () => {
        test('正常：Region-Root（true, false）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_catalog_update.join_manage
                VALUES
                (
                    1, 1000117, 1,
                    1000003, 1,
                    1000117, 1,
                    '2021-05-30 10:00:00', 1, NOW(), false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, 1000118, 1,
                    1000003, 1,
                    1000002, 1,
                    '2021-05-30 10:00:00', 1, NOW(), false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 1000117, 1,
                    1000007, 1,
                    1000002, 1,
                    '2021-05-30 10:00:00', 1, NOW(),false,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    4, 1000118, 1,
                    1000007, 1,
                    1000118, 1,
                    NULL, 1, NULL,true,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.join_approval_manage
                VALUES
                (
                    1, 1, 'aaaaaa', 0, NULL,
                    NULL, NULL, NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, 2, 'bbbbbb', 0, NULL,
                    NULL, NULL, NULL, NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    3, 3, 'cccccc', 1, '承認',
                    1000002, 1, 'test_user', '2020-04-05 10:00:00',
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_catalog_update.join_service_manage
                VALUES
                (
                    1, 1, 2,
                    1000010, 1,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    2, 2, 2,
                    1000020, 1,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);

            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true')
                .set({ session: encodeURIComponent(Session.REGION_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(2);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000002);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000003);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000118);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[0].isDraft).toBe(false);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('正常：Region-Root（true, true）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true&in_approved=true')
                .set({ session: encodeURIComponent(Session.REGION_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[1].id).toBe(3);
            expect(response.body[1].type).toBe(1);
            expect(response.body[1].caller.code).toBe(1000002);
            expect(response.body[1].caller.version).toBe(1);
            expect(response.body[1].region.code).toBe(1000007);
            expect(response.body[1].region.version).toBe(1);
            expect(response.body[1].actor.code).toBe(1000117);
            expect(response.body[1].actor.version).toBe(1);
            expect(response.body[1].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[1].isDraft).toBe(false);
            expect(response.body[1].status).toBe(1);
            expect(response.body[1].comment).toBe('承認');
            expect(response.body[1].approver).toBe('test_user');
            expect(response.body[1].approvalAt).toBe('2020-04-05T10:00:00.000+0900');
        });
        test('正常：Region-Root（false, false）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=false&in_approved=false')
                .set({ session: encodeURIComponent(Session.REGION_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000117);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000003);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000117);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[0].isDraft).toBe(false);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('正常：Region-Root（false, true）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=false&in_approved=true')
                .set({ session: encodeURIComponent(Session.REGION_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000117);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000003);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000117);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[0].isDraft).toBe(false);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('正常：Region-Root（省略, false）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI)
                .set({ session: encodeURIComponent(Session.REGION_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000117);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000003);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000117);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[0].isDraft).toBe(false);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('正常：Region-Root（省略, true）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?in_approved=true')
                .set({ session: encodeURIComponent(Session.REGION_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[1].id).toBe(2);
            expect(response.body[1].type).toBe(1);
            expect(response.body[1].caller.code).toBe(1000002);
            expect(response.body[1].caller.version).toBe(1);
            expect(response.body[1].region.code).toBe(1000003);
            expect(response.body[1].region.version).toBe(1);
            expect(response.body[1].actor.code).toBe(1000118);
            expect(response.body[1].actor.version).toBe(1);
            expect(response.body[1].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[1].isDraft).toBe(false);
            expect(response.body[1].status).toBe(0);
            expect(response.body[1].comment).toBe(null);
            expect(response.body[1].approver).toBe(null);
            expect(response.body[1].approvalAt).toBe(null);
        });
        test('正常：APP', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=false')
                .set({ session: encodeURIComponent(Session.APP) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(2);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000002);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000003);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000118);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[0].isDraft).toBe(false);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('正常：APP', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true')
                .set({ session: encodeURIComponent(Session.APP) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(4);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000118);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000007);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000118);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe(null);
            expect(response.body[0].isDraft).toBe(true);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('正常：Cookieからログイン情報を取得', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);
            operator = new OperatorServer4Get(200, 1000117);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true')
                .set('Cookie', ['operator_type3_session=' + 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(1);
            expect(response.body[0].type).toBe(1);
            expect(response.body[0].caller.code).toBe(1000117);
            expect(response.body[0].caller.version).toBe(1);
            expect(response.body[0].region.code).toBe(1000003);
            expect(response.body[0].region.version).toBe(1);
            expect(response.body[0].actor.code).toBe(1000117);
            expect(response.body[0].actor.version).toBe(1);
            expect(response.body[0].expireAt).toBe('2021-05-30T10:00:00.000+0900');
            expect(response.body[0].isDraft).toBe(false);
            expect(response.body[0].status).toBe(0);
            expect(response.body[0].comment).toBe(null);
            expect(response.body[0].approver).toBe(null);
            expect(response.body[0].approvalAt).toBe(null);
        });
        test('異常：運営メンバー以外', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true&in_approved=false')
                .set({ session: encodeURIComponent(Session.NOT_OPE_TYPE3) });

            // レスポンスチェック
            expect(response.status).toBe(401);
        });
        test('異常：PXR-Root', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true&in_approved=false')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(401);
        });
        test('異常：Reion-Root（template.regionが空）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI)
                .set({ session: encodeURIComponent(Session.EMPTY_REGION) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual([]);
        });
        test('異常：Reion-Root（template.regionが無い）', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=false')
                .set({ session: encodeURIComponent(Session.NOTHING_REGION) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual([]);
        });
        test('異常：カタログの取得に失敗', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(500);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true&in_approved=false')
                .set({ session: encodeURIComponent(Session.WF) });

            // レスポンスチェック
            expect(response.status).toBe(500);
        });
        test('異常：カタログサービスへの接続に失敗', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true&in_approved=false')
                .set({ session: encodeURIComponent(Session.WF) });

            // レスポンスチェック
            expect(response.status).toBe(500);
        });
        test('異常：セッション確認が400', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);
            operator = new OperatorServer4Get(400, 1000117);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true')
                .set('Cookie', ['operator_type3_session=' + 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc']);

            // レスポンスチェック
            expect(response.status).toBe(401);
        });
        test('異常：セッション確認が500', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);
            operator = new OperatorServer4Get(500, 1000117);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true')
                .set('Cookie', ['operator_type3_session=' + 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc']);

            // レスポンスチェック
            expect(response.status).toBe(500);
        });
        test('異常：オペレーターサービスへの接続に失敗', async () => {
            // スタブを起動
            catalog = new CatalogServer4Get(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=true')
                .set('Cookie', ['operator_type3_session=' + 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc']);

            // レスポンスチェック
            expect(response.status).toBe(500);
        });
        test('パラメータ異常：is_request（boolean以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?is_request=a')
                .set({ session: encodeURIComponent(Session.WF) });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：in_approved（boolean以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.joinURI + '?in_approved=a')
                .set({ session: encodeURIComponent(Session.WF) });

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('異常：nsがアクター以外', async () => {
          // スタブを起動
          catalog = new CatalogServer4Get2(200);

          // 対象APIに送信
          const response = await supertest(expressApp).get(Url.joinURI + '?in_approved=true')
              .set({ session: encodeURIComponent(Session.WF) });

          // レスポンスチェック
          expect(response.status).toBe(400);
          expect(response.body.message).toBe(sprintf(Message.THIS_IS_NOT_ACTOR_CATALOG, 1000117));
      });
    });
});
