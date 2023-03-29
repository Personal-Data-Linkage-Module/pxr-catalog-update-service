/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { Server } from 'net';
import bodyParser = require('body-parser');
import moment = require('moment');
import { DateTimeFormatString } from '../common/Transform';
/* eslint-enable */

export class BaseStubServer {
    app: express.Express;
    server: Server;
    port: number;

    constructor () {
        this.app = express();
    }

    async start () {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.port, () => { resolve(); });
        });
    }

    async stop () {
        return new Promise((resolve, reject) => {
            this.server.close(() => { resolve(); });
        });
    }
}

export class OperatorServer extends BaseStubServer {
    constructor () {
        super();
        this.port = 3000;
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.post('/operator/session', (req, res) => {
            const id = req.body.sessionId;
            if (id === 'manager') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 3,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000111,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000114,
                        "_ver": 1
                    }
                }).end();
            } else if (id === 'workflow-manager') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 3,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000112,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000004,
                        "_ver": 1
                    }
                }).end();
            } else if (id === 'personal') {
                res.status(200).json({
                    "sessionId": "dfb97effad14e3c99d5fb32cdce61137bb440ea4f6b490fb65696b2725e147f3",
                    "operatorId": 1,
                    "type": 0,
                    "loginId": "root_member01",
                    "name": "流通制御運営メンバー01",
                    "auth": {
                        "member": {
                            "add": true,
                            "update": true,
                            "delete": true
                        },
                        "book": {
                            "create": true
                        }
                    },
                    "lastLoginAt": "2020-05-26T17:15:60.604+09:00",
                    "passwordChangedFlg": false,
                    "attributes": {},
                    "roles": [
                        {
                            "_value": "1",
                            "_ver": "1"
                        }
                    ],
                    "block": {
                        "_value": 1000112,
                        "_ver": 1
                    },
                    "actor": {
                        "_value": 1000004,
                        "_ver": 1
                    }
                }).end();
            }
        });
    }
}

export class CatalogServer extends BaseStubServer {
    constructor () {
        super();
        this.port = 3001;
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.get('/catalog', (req, res) => {
            const ns = decodeURIComponent(req.query.ns as string);
            if (ns === 'catalog/ext/test-org/actor/pxr-root') {
                res.status(200).json([
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
                        "cert": {
                          "title": "",
                          "section": {
                            "title": "アプリケーションプロバイダーの認定基準",
                            "content": [
                              {
                                "sentence": "アプリケーションプロバイダーの認定基準です。"
                              }
                            ]
                          }
                        },
                        "audit": {
                          "title": "",
                          "section": {
                            "title": "アプリケーションプロバイダーの監査手順",
                            "content": [
                              {
                                "sentence": "アプリケーションプロバイダーの監査手順です。"
                              }
                            ]
                          }
                        }
                      },
                      "category": [
                        null
                      ],
                      "consumer-cert": {
                        "cert": {
                          "title": "",
                          "section": {
                            "title": "データコンシューマーの認定基準",
                            "content": [
                              {
                                "sentence": "データコンシューマーの認定基準です。"
                              }
                            ]
                          }
                        },
                        "audit": {
                          "title": "",
                          "section": {
                            "title": "データコンシューマーの監査手順",
                            "content": [
                              {
                                "sentence": "データコンシューマーの監査手順です。"
                              }
                            ]
                          }
                        }
                      },
                      "data-trader-cert": {
                        "cert": {
                          "title": "",
                          "section": {
                            "title": "データ取引サービスプロバイダーの認定基準",
                            "content": [
                              {
                                "sentence": "データ取引サービスプロバイダーの認定基準です。"
                              }
                            ]
                          }
                        },
                        "audit": {
                          "title": "",
                          "section": {
                            "title": "データ取引サービスプロバイダーの監査手順",
                            "content": [
                              {
                                "sentence": "データ取引サービスプロバイダーの監査手順です。"
                              }
                            ]
                          }
                        }
                      },
                      "main-block": {
                        "_value": 1000110,
                        "_ver": 1
                      },
                      "other-block": [
                        null
                      ],
                      "region-root-cert": {
                        "cert": {
                          "title": "",
                          "section": {
                            "title": "領域運営サービスプロバイダーの認定基準",
                            "content": [
                              {
                                "sentence": "領域運営サービスプロバイダーの認定基準です。"
                              }
                            ]
                          }
                        },
                        "audit": {
                          "title": "",
                          "section": {
                            "title": "領域運営サービスプロバイダーの監査手順",
                            "content": [
                              {
                                "sentence": "領域運営サービスプロバイダーの監査手順です。"
                              }
                            ]
                          }
                        }
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
                        "cert": {
                          "title": "",
                          "section": {
                            "title": "ワークフロープロバイダーの認定基準",
                            "content": [
                              {
                                "sentence": "ワークフロープロバイダーの認定基準です。"
                              }
                            ]
                          }
                        },
                        "audit": {
                          "title": "",
                          "section": {
                            "title": "ワークフロープロバイダーの監査手順",
                            "content": [
                              {
                                "sentence": "ワークフロープロバイダーの監査手順です。"
                              }
                            ]
                          }
                        }
                      }
                    },
                    "prop": [
                      {
                        "key": "app-cert",
                        "type": {
                          "of": "inner",
                          "inner": "Certification"
                        },
                        "description": "アプリケーションプロバイダー認定"
                      },
                      {
                        "key": "category",
                        "type": {
                          "of": "code[]",
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
                          "inner": "Certification"
                        },
                        "description": "データコンシューマー認定"
                      },
                      {
                        "key": "data-trader-cert",
                        "type": {
                          "of": "inner",
                          "inner": "Certification"
                        },
                        "description": "データ取引サービスプロバイダー認定"
                      },
                      {
                        "key": "main-block",
                        "type": {
                          "of": "code",
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 29,
                              "_ver": null
                            }
                          }
                        },
                        "description": "アクター参加時に割り当てられたPXR-Block"
                      },
                      {
                        "key": "other-block",
                        "type": {
                          "of": "code[]",
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 29,
                              "_ver": null
                            }
                          }
                        },
                        "description": "他アクターから引き継いだPXR-Blockの配列"
                      },
                      {
                        "key": "region-root-cert",
                        "type": {
                          "of": "inner",
                          "inner": "Certification"
                        },
                        "description": "領域運営サービスプロバイダー認定"
                      },
                      {
                        "key": "statement",
                        "type": {
                          "of": "item[]",
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
                          "inner": "CertStatus"
                        },
                        "description": "認定の履歴"
                      },
                      {
                        "key": "wf-cert",
                        "type": {
                          "of": "inner",
                          "inner": "Certification"
                        },
                        "description": "ワークフロープロバイダー認定"
                      }
                    ],
                    "attribute": null
                  }
                ]).end();
            } else {
                res.status(204).end();
            }
        });
        this.app.get('/catalog/:code', (req, res) => {
            const code = parseInt(req.params.code);
            if (code === 1000114) {
                res.status(200).json({
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
                      "category": [
                        null
                      ],
                      "main-block": {
                        "_value": 1000108,
                        "_ver": 1
                      },
                      "other-block": [
                        null
                      ],
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
                          "by": [
                            {
                              "_value": 1000001,
                              "_ver": 1
                            }
                          ],
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
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 29,
                              "_ver": null
                            }
                          }
                        },
                        "description": "アクター参加時に割り当てられたPXR-Block"
                      },
                      {
                        "key": "other-block",
                        "type": {
                          "of": "code[]",
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 29,
                              "_ver": null
                            }
                          }
                        },
                        "description": "他アクターから引き継いだPXR-Blockの配列"
                      },
                      {
                        "key": "statement",
                        "type": {
                          "of": "item[]",
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
                          "inner": "CertStatus"
                        },
                        "description": "認定の履歴"
                      },
                      {
                        "key": "trader-alliance",
                        "type": {
                          "of": "code[]",
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
                }).end();
            } else if (code === 1000004) {
                res.status(200).json({
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
                      "category": [
                        null
                      ],
                      "main-block": {
                        "_value": 1000112,
                        "_ver": 1
                      },
                      "other-block": [
                        null
                      ],
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
                          "by": [
                            {
                              "_value": 1000001,
                              "_ver": 1
                            }
                          ],
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
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 29,
                              "_ver": null
                            }
                          }
                        },
                        "description": "アクター参加時に割り当てられたPXR-Block"
                      },
                      {
                        "key": "other-block",
                        "type": {
                          "of": "code[]",
                          "candidate": {
                            "ns": null,
                            "_code": null,
                            "base": {
                              "_value": 29,
                              "_ver": null
                            }
                          }
                        },
                        "description": "他アクターから引き継いだPXR-Blockの配列"
                      },
                      {
                        "key": "region-alliance",
                        "type": {
                          "of": "code[]",
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
                          "inner": "CertStatus"
                        },
                        "description": "認定の履歴"
                      },
                      {
                        "key": "workflow",
                        "type": {
                          "of": "code[]",
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
                }).end();
            } else if (code === 1000112) {
                res.status(200).json({
                    "catalogItem": {
                      "ns": "catalog/ext/test-org/block/wf",
                      "name": "WF-Block",
                      "_code": {
                        "_value": 1000112,
                        "_ver": 1
                      },
                      "inherit": {
                        "_value": 35,
                        "_ver": null
                      },
                      "description": "ワークフロープロバイダー用PXR-Blockの定義です。"
                    },
                    "template": {
                      "_code": {
                        "_value": 1000112,
                        "_ver": 1
                      },
                      "actor-type": "wf",
                      "assigned-organization": "テスト用ワークフロー",
                      "assignment-status": "assigned",
                      "base-url": "workflow-pj2-2.test.org",
                      "first-login-url": "https://www.test.org/login",
                      "id": "WF-01",
                      "service-name": "workflow-pj2-2-service"
                    },
                    "prop": [
                      {
                        "key": "actor-type",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null,
                          "candidata": {
                            "value": [
                              "pxr-root",
                              "region-root",
                              "app",
                              "wf",
                              "data-trader",
                              "consumer"
                            ]
                          }
                        },
                        "description": "このPXR-Blockを保有する組織の種別"
                      },
                      {
                        "key": "assigned-organization",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null
                        },
                        "description": "割当アクター名"
                      },
                      {
                        "key": "assignment-status",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null,
                          "candidata": {
                            "value": [
                              "assigned",
                              "unassigned"
                            ]
                          }
                        },
                        "description": "割当状態"
                      },
                      {
                        "key": "base-url",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null
                        },
                        "description": "PXR-BlockのベースURL"
                      },
                      {
                        "key": "first-login-url",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null
                        },
                        "description": "初回ログインURL"
                      },
                      {
                        "key": "id",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null
                        },
                        "description": "PXR-Block識別子"
                      },
                      {
                        "key": "service-name",
                        "type": {
                          "of": "string",
                          "format": null,
                          "unit": null
                        },
                        "description": "PXR-Blockのサービス名"
                      }
                    ],
                    "attribute": null
                }).end()
            } else if (code === 1000117) {
              res.status(200).json({
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
                  "category": [
                    null
                  ],
                  "main-block": {
                    "_value": 1000115,
                    "_ver": 1
                  },
                  "other-block": [
                    null
                  ],
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
                      "by": [
                        {
                          "_value": 1000001,
                          "_ver": 1
                        }
                      ],
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
                      "candidate": {
                        "ns": null,
                        "_code": null,
                        "base": {
                          "_value": 29,
                          "_ver": null
                        }
                      }
                    },
                    "description": "アクター参加時に割り当てられたPXR-Block"
                  },
                  {
                    "key": "other-block",
                    "type": {
                      "of": "code[]",
                      "candidate": {
                        "ns": null,
                        "_code": null,
                        "base": {
                          "_value": 29,
                          "_ver": null
                        }
                      }
                    },
                    "description": "他アクターから引き継いだPXR-Blockの配列"
                  },
                  {
                    "key": "region-alliance",
                    "type": {
                      "of": "code[]",
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
                      "inner": "CertStatus"
                    },
                    "description": "認定の履歴"
                  },
                  {
                    "key": "workflow",
                    "type": {
                      "of": "code[]",
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
              }).end();
            } else if (code === 1000003) {
              res.status(200).json({
                "catalogItem": {
                  "ns": "catalog/ext/test-org/actor/region-root/organization/region",
                  "name": "テスト用リージョン",
                  "_code": {
                    "_value": 1000003,
                    "_ver": 1
                  },
                  "inherit": {
                    "_value": 48,
                    "_ver": null
                  },
                  "description": "テスト用リージョンの定義です。"
                },
                "template": {
                  "_code": {
                    "_value": 1000003,
                    "_ver": 1
                  },
                  "app-alliance": [
                    null
                  ],
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
              }).end();
            } else if (code === 1000004) {
              res.status(200).json({
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
                  "category": [
                    null
                  ],
                  "main-block": {
                    "_value": 1000112,
                    "_ver": 1
                  },
                  "other-block": [
                    null
                  ],
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
                      "by": [
                        {
                          "_value": 1000001,
                          "_ver": 1
                        }
                      ],
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
                      "candidate": {
                        "ns": null,
                        "_code": null,
                        "base": {
                          "_value": 29,
                          "_ver": null
                        }
                      }
                    },
                    "description": "アクター参加時に割り当てられたPXR-Block"
                  },
                  {
                    "key": "other-block",
                    "type": {
                      "of": "code[]",
                      "candidate": {
                        "ns": null,
                        "_code": null,
                        "base": {
                          "_value": 29,
                          "_ver": null
                        }
                      }
                    },
                    "description": "他アクターから引き継いだPXR-Blockの配列"
                  },
                  {
                    "key": "region-alliance",
                    "type": {
                      "of": "code[]",
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
                      "inner": "CertStatus"
                    },
                    "description": "認定の履歴"
                  },
                  {
                    "key": "workflow",
                    "type": {
                      "of": "code[]",
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
              }).end();
            } else if (code === 1000116) {
              res.status(200).json({
                "catalogItem": {
                  "ns": "catalog/ext/test-org/actor/region-root/organization/region",
                  "name": "テスト用のリージョン",
                  "_code": {
                    "_value": 1000116,
                    "_ver": 1
                  },
                  "inherit": {
                    "_value": 48,
                    "_ver": null
                  },
                  "description": "テスト用のリージョンの定義です。"
                },
                "template": {
                  "_code": {
                    "_value": 1000116,
                    "_ver": 1
                  },
                  "app-alliance": [
                    null
                  ],
                  "statement": [
                    {
                      "title": "リージョンステートメント",
                      "section": [
                        {
                          "title": "テスト用リージョンステートメントE",
                          "content": [
                            {
                              "sentence": "テスト用リージョンステートメントEの概要です。"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "wf-alliance": [
                    {
                      "_value": 1000117,
                      "_ver": 1
                    }
                  ]
                },
                "prop": [
                  {
                    "key": "app-alliance",
                    "type": {
                      "of": "code[]",
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
              }).end();
            }
        });
        this.app.post('/catalog/ext/', (req, res) => {
            const body = JSON.stringify(req.body);
            console.log(body);
            res.status(200).json({
                catalogItem: {
                    ns: 'catalog/test/actor/region-root',
                    name: 'テストカタログ',
                    _code: {
                        _value: 1000555,
                        _ver: 1
                    }
                }
            }).end();
        });
        this.app.post('/catalog/ns/ext', (req, res) => {
            res.status(200).json({}).end();
        });
    }
}

export class NotificationServer extends BaseStubServer {
    constructor () {
        super();
        this.port = 3004;
        this.app.use(bodyParser.json({ limit: '100mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.post('/notification', (req, res) => {
            if (parseInt(req.body.type) === 1) {
                res.status(200).json({approval: { expirationAt: moment(new Date)
                    .add(7, 'days')
                    .format(DateTimeFormatString)}
                }).end();
            } else {
                res.status(200).json().end();
            }
        });
    }
}
export class CertificateAuthorityServer extends BaseStubServer {
    constructor () {
        super();
        this.port = 3012;
        this.app.post('/certification-authority/client', (req, res) => {
            res.status(200).json({
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
            }).end();
        });
    }
}

export class BookManageServer extends BaseStubServer {
    constructor() {
        super();
        this.port = 3005;
        let i = 0;
        this.app.post('/book-manage/search/cooperate', (req, res) => {
            i++;
            if (i === 1) {
                res.status(200).json({
                    actor: 1000022,
                    app: 1001004,
                    wf: null,
                    users: [
                        {
                            pxrId: 'test_pxr_id00',
                            userId: 'test_pxr_id00'
                        }
                    ]
                }).end();
            } else if (i === 2) {
                res.status(200).json({
                    actor: null,
                    users: []
                }).end();
            } else if (i === 3) {
                res.status(400).json({
                    actor: 1000022,
                    app: 1001004,
                    wf: null,
                    users: [
                        {
                            pxrId: 'test_pxr_id00',
                            userId: 'test_pxr_id00'
                        }
                    ]
                }).end();
            } else if (i === 4) {
                res.status(200).json({
                    actor: 1000022,
                    app: 1001004,
                    wf: null,
                    users: []
                }).end();
            }
        });
    }
}
