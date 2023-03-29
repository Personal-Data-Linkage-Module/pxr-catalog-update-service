/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Application from '../index';
import Common, { Url } from './Common';
import * as supertest from 'supertest';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
import express = require('express');
import { Server } from 'net';
import { PostTestRequest, PostTestTemplate } from './13-00.TermsOfUse.TestData';

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// オペレータサーバー
class _StubOperatorServer {
  _app: express.Express;
  _server: Server;

  constructor(status: number, actorCode: number) {
    this._app = express();

    // イベントハンドラー
    const _listener = (req: express.Request, res: express.Response) => {
      res.status(status).json({
        sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
        operatorId: 1,
        type: 3,
        loginId: 'menber01',
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
      }).end();
    };

    // ハンドラーのイベントリスナーを追加、アプリケーションの起動
    this._app.post('/operator/session', _listener);
    this._server = this._app.listen(3000);
  }
}

// カタログサーバー
class _StubCatalogServer {
  _app: express.Express;
  _server: Server;
  _template: any;

  constructor(status: number, template?: any) {
    this._app = express();
    this._template = template;
    // イベントハンドラー１
    // カタログ名称を取得
    const _listener = (req: express.Request, res: express.Response) => {
      res.status(status).json(
        {
          id: '301c4aaa-3d11-4efb-82e7-a35cba034b6d',
          name: 'PXRカタログ',
          description: 'aaa地区が運営するPXR基盤が提供するデータカタログです。',
          ext_name: 'aaa-healthcare-consortium'
        }
      ).end();
    }

    // イベントハンドラー2 カタログ変更セット登録 申請 API
    const _listener2 = (req: express.Request, res: express.Response) => {
      res.status(status).json(this._template).end();
    };

    // ハンドラーのイベントリスナーを追加、アプリケーションの起動
    this._app.get('/catalog/name', _listener);
    this._app.post('/catalog/updateSet/register', _listener2);
    this._app.post('/catalog/updateSet/request', _listener2);
    this._server = this._app.listen(3001);
  }
}

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

let _operatorServer: any;
let _catalogServer: any;

/**
 * CatalogUpdate API のユニットテスト
 */
describe('CatalogUpdate API', () => {
  /**
   * 全テスト実行後の前処理
   */
  beforeAll(async () => {
    await Application.start()
    // DB接続
    await common.connect();
    // 事前データ準備
    await common.executeSqlString(`
        DELETE FROM pxr_catalog_update.platform_terms_of_use_manage;
        DELETE FROM pxr_catalog_update.region_terms_of_use_manage;
        SELECT SETVAL('pxr_catalog_update.platform_terms_of_use_manage_id_seq', 1, false);
        SELECT SETVAL('pxr_catalog_update.region_terms_of_use_manage_id_seq', 1, false);
      `);
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
   * 各テスト実行の後処理
   */
  afterEach(async () => {
    // スタブを停止
    if (_operatorServer) {
      _operatorServer._server.close();
    }
    if (_catalogServer) {
      _catalogServer._server.close();
    }
  });

  describe('PF利用規約作成API', () => {
    test('正常：下書き（isDraft:true）', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_TRUE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                name: 'PF利用規約',
                description: 'PF利用規約の定義です。',
                _code: {
                  _value: 9999999,
                  _ver: 1
                },
                inherit: {
                  _value: 203,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'プラットフォーム利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: true
                  },
                  {
                    key: 'returning-data-flag',
                    value: true
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 1
      }));
    });
    test('正常：本書き（isDraft:false）', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200, JSON.parse(PostTestTemplate.PLATFORM_IS_DRAFT_FALSE));

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_FALSE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                name: 'PF利用規約',
                description: 'PF利用規約の定義です。',
                _code: {
                  _value: 9999999,
                  _ver: 1
                },
                inherit: {
                  _value: 203,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'プラットフォーム利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: true
                  },
                  {
                    key: 'returning-data-flag',
                    value: true
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: false,
        id: 2
      }));
    });
    test('正常：catalog.catalogItemなしで登録', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(PostTestRequest.MISSING_CATALOG_ITEM);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            comment: null,
            template: {
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'プラットフォーム利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: true
                  },
                  {
                    key: 'returning-data-flag',
                    value: true
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 3
      }));
    });
    test('正常：カタログコードなしで登録', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(PostTestRequest.MISSING_CATALOG_CODE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                name: 'PF利用規約',
                description: 'PF利用規約の定義です。',
                inherit: {
                  _value: 203,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'プラットフォーム利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: true
                  },
                  {
                    key: 'returning-data-flag',
                    value: true
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 4
      }));
    });
    test('正常：カタログバージョンなしで登録', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(PostTestRequest.MISSING_CATALOG_VER);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                name: 'PF利用規約',
                description: 'PF利用規約の定義です。',
                _code: {
                  _value: 9999999
                },
                inherit: {
                  _value: 203,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'プラットフォーム利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: true
                  },
                  {
                    key: 'returning-data-flag',
                    value: true
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 5
      }));
    });
    test('正常：CookieからセッションIDを取得して作成', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(PostTestRequest.PLATFORM_IS_DRAFT_TRUE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                name: 'PF利用規約',
                description: 'PF利用規約の定義です。',
                _code: {
                  _value: 9999999,
                  _ver: 1
                },
                inherit: {
                  _value: 203,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'プラットフォーム利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: true
                  },
                  {
                    key: 'returning-data-flag',
                    value: true
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 6
      }));
    });
    test('パラメータ異常：データがない', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send('{}');

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
    });
    test('パラメータ異常：name（空）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.EMPTY_NAME);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('パラメータ異常：catalog（Array以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_ARRAY_CATALOG);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
    });
    test('パラメータ異常：isDraft（Boolean以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_BOOLEAN_IS_DRAFT);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
    });
    test('パラメータ異常：catalog.type（数字以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_NUMBER_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.max);
      expect(response.body.reasons[1].message).toBe(Message.validation.min);
      expect(response.body.reasons[2].message).toBe(Message.validation.isNumber);
    });
    test('パラメータ異常：catalog.type（数字範囲外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.ZERO_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.min);
    });
    test('パラメータ異常：catalog.type（数字範囲外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.FOUR_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.max);
    });
    test('パラメータ異常：catalog.catalogCode（数字以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_NUMBER_CATALOG_CATALOG_CODE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
    });
    test('異常：Cookieおよびセッション情報がない', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_TRUE);

      // レスポンスチェック
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常：カタログサービスレスポンス異常400', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(400);

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
          _value: 1000432,
          _ver: 1
        }
      });

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_FALSE);

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.GET_CATALOG_NAME_FAILED);
    });
    test('異常：カタログサービスレスポンス異常200以外', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(204);

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
          _value: 1000432,
          _ver: 1
        }
      });

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_FALSE);

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.GET_CATALOG_NAME_FAILED);
    });
    test('異常：カタログサービス接続エラー', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);

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
          _value: 1000432,
          _ver: 1
        }
      });

      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_FALSE);

      // レスポンスチェック
      expect(response.status).toBe(500);
      expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
    });
    test('異常：catalogの配列の要素数が１以外', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200, JSON.parse(PostTestTemplate.PLATFORM_IS_DRAFT_FALSE));

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.EMPTY_CATALOG);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
    });
    test('異常：catalog[].typeが1（作成）以外', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200, JSON.parse(PostTestTemplate.PLATFORM_IS_DRAFT_FALSE));

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.NOT_ADD_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
    });
    test('異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/platform と一致しない', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.platformTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.INVALID_PLATFORM_NS);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
    });
  });

  describe('Region利用規約作成API', () => {
    test('正常：下書き（isDraft:true）', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.REGION_IS_DRAFT_TRUE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                name: '高齢者向け健康サポート利用規約',
                description: '高齢者向け健康サポートの利用規約です。',
                _code: {
                  _value: 9999999,
                  _ver: 1
                },
                inherit: {
                  _value: 204,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'リージョン利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: false
                  },
                  {
                    key: 'returning-data-flag',
                    value: false
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 1
      }));
    });
    test('正常：本書き（isDraft:false）', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200, JSON.parse(PostTestTemplate.REGION_IS_DRAFT_FALSE));

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.REGION_IS_DRAFT_FALSE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                name: '高齢者向け健康サポート利用規約',
                description: '高齢者向け健康サポートの利用規約です。',
                _code: {
                  _value: 9999999,
                  _ver: 1
                },
                inherit: {
                  _value: 204,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'リージョン利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: false
                  },
                  {
                    key: 'returning-data-flag',
                    value: false
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: false,
        id: 2
      }));
    });
    test('正常：CookieからセッションIDを取得して作成', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set('Cookie', ['operator_type3_session=' + type3Session])
        .send(PostTestRequest.REGION_IS_DRAFT_TRUE);

      // レスポンスチェック
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toBe(JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
          {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
              catalogItem: {
                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                name: '高齢者向け健康サポート利用規約',
                description: '高齢者向け健康サポートの利用規約です。',
                _code: {
                  _value: 9999999,
                  _ver: 1
                },
                inherit: {
                  _value: 204,
                  _ver: null
                }
              },
              template: {
                prop: null,
                value: [
                  {
                    key: 'terms-of-use',
                    value: [
                      {
                        key: 'title',
                        value: 'リージョン利用規約'
                      },
                      {
                        key: 'section',
                        value: [
                          {
                            key: 'title',
                            value: '第1項'
                          },
                          {
                            key: 'content',
                            value: [
                              {
                                key: 'sentence',
                                value: '規約～～～。'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    key: 're-consent-flag',
                    value: false
                  },
                  {
                    key: 'period-of-re-consent',
                    value: null
                  },
                  {
                    key: 'deleting-data-flag',
                    value: false
                  },
                  {
                    key: 'returning-data-flag',
                    value: false
                  }
                ]
              },
              inner: null,
              attribute: null
            }
          }
        ],
        appendix: null,
        isDraft: true,
        id: 3
      }));
    });
    test('パラメータ異常：データがない', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send('{}');

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
    });
    test('パラメータ異常：name（空）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.EMPTY_NAME);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('パラメータ異常：catalog（Array以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_ARRAY_CATALOG);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
    });
    test('パラメータ異常：isDraft（Boolean以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_BOOLEAN_IS_DRAFT);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
    });
    test('パラメータ異常：catalog.type（数字以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_NUMBER_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.max);
      expect(response.body.reasons[1].message).toBe(Message.validation.min);
      expect(response.body.reasons[2].message).toBe(Message.validation.isNumber);
    });
    test('パラメータ異常：catalog.type（数字範囲外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.ZERO_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.min);
    });
    test('パラメータ異常：catalog.type（数字範囲外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.FOUR_CATALOG_TYPE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.max);
    });
    test('パラメータ異常：catalog.catalogCode（数字以外）', async () => {
      // 対象APIに送信
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.NOT_NUMBER_CATALOG_CATALOG_CODE);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
    });
    test('異常：Cookieおよびセッション情報がない', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .send(PostTestRequest.PLATFORM_IS_DRAFT_TRUE);

      // レスポンスチェック
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.INVALID_REGION_NS);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
    });
    test('異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない', async () => {
      // スタブを起動
      _operatorServer = new _StubOperatorServer(200, 1000002);
      _catalogServer = new _StubCatalogServer(200);

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
          _value: 1000432,
          _ver: 1
        }
      });
      const response = await supertest(expressApp).post(Url.regionTermsOfUseURI)
        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
        .set({ session: encodeURIComponent(session) })
        .send(PostTestRequest.INVALID_ACTOR_REGION_NS);

      // レスポンスチェック
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
    });
  });
});
