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
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// サーバをlisten

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';
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
    _value: 1000002,
    _ver: 1
  }
});

// スタブサーバー（カタログサービス1）actor.codeでカタログを取得
// 参加中でないことをカタログサービスで確認し、参加中であればエラーとする
// region-allianceの配列内オブジェクトの_valueにregion.codeが存在するか確認、存在するのでエラー
class _StubCatalogServerEr {
  _app: express.Express;
  _server: Server;

  constructor (status: number) {
    this._app = express();

    // イベントハンドラー
    const _listener = (req: express.Request, res: express.Response) => {
      res.status(status);
      let code: number;
      if (req.params.code) {
        code = Number(req.params.code);
      }
      if (status === 200) {
        if (code === 1000117) {
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
        } else if (code === 1000004) {
          res.json([{
            "catalogItem": {
              "ns": "catalog/ext/test-org/actor/region-root",
              "name": "テスト用リージョンルート",
              "_code": {
                "_value": 1000004,
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
          }]);
        } else if (code === 1000005) {
          res.json({
            "catalogItem": {
              "ns": null,
              "name": "テスト用カタログ",
              "_code": {
                "_value": 1000005,
                "_ver": 1
              },
              "inherit": {
                "_value": 47,
                "_ver": 1
              },
              "description": "テスト用カタログです"
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
                          "sentence": "テスト用カタログのステートメントです。"
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
      }
      res.end();
    };

    // ハンドラーのイベントリスナーを追加、アプリケーションの起動
    this._app.get('/catalog/:code', _listener);
    this._server = this._app.listen(3001);
  }
}

// オペレータサーバー
class OperatorServer {
  _app: express.Express;
  _server: Server;

  constructor (status: number, actorCode: number) {
    this._app = express();

    // イベントハンドラー
    const _listener = (req: express.Request, res: express.Response) => {
      res.status(status);
      if (status === 200) {
        return res.json({
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
      }
      return res.end();
    };

    // ハンドラーのイベントリスナーを追加、アプリケーションの起動
    this._app.post('/operator/session', _listener);
    this._server = this._app.listen(3000);
  }
}

let _operatorServer: any;
let _catalogServer: any;

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
  });
  /**
   * 全テスト実行後の後処理
  */
  afterAll(async () => {
    // サーバ停止
    Application.stop();
    _catalogServer._server.close();
    _operatorServer._server.close();
  });

  /**
   * Region参加申請
   */
  describe('Region参加申請' + Url.baseURIJoin, () => {
    test('異常　Region-Rootが参加要求を登録(下書き)NG すでに参加中', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServerEr(200);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.ALREADY_CONTRACTED);
    });
    test('異常　Cookieが存在するが空', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', null)
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常　Cookie使用、オペレータサービス応答204', async () => {
      _operatorServer = new OperatorServer(204, 1000002);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常　Cookie使用、オペレータサービス応答400', async () => {
      _operatorServer = new OperatorServer(400, 1000002);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常　Cookie使用、オペレータサービス応答500', async () => {
      _operatorServer = new OperatorServer(500, 1000002);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
    });
    test('異常　セッション(オペレータサービス未起動)', async () => {
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
    });
    test('異常　セッションなし', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ 'Content-Type': 'application/json' })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常　セッション(カタログサービス エラー応答204)', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServerEr(204);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000117));
    });
    test('異常　セッション(カタログサービス エラー応答400)', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServerEr(400);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(sprintf(Message.NOT_EXISTS_CATALOG, 1000117));
    });
    test('異常　セッション(カタログサービス エラー応答500)', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServerEr(500);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_CATALOG_SERVICE);
    });
    test('異常　セッション(カタログサービス未起動)', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
    });
    test('異常　セッション(カタログサービス コード指定 複数取得)', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServerEr(200);
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
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(503);
    });
    test('異常　セッション(カタログサービス 取得アクターカタログnsなし)', async () => {
      _operatorServer = new OperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServerEr(200);
      // 送信データを生成
      var json = {
        region: {
          code: 1000003,
          version: 1
        },
        actor: {
          code: 1000005,
          version: 1,
          app: [
            {
              code: 1000005,
              version: 1
            }
          ]
        },
        isDraft: true
      };

      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.baseURIJoin)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(JSON.stringify(json));

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(sprintf(Message.THIS_IS_NOT_ACTOR_CATALOG, 1000005));
    });
  });
});
