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

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

// スタブサーバー（カタログサービス1）actor.codeでカタログを取得
// 参加中でないことをカタログサービスで確認し、参加中であればエラーとする
// region-allianceの配列内オブジェクトの_valueにregion.codeが存在するか確認、存在するのでエラー
class _StubCatalogServerOk {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                if (req.path === '/catalog/ext') {
                    res.json({
                        id: 1
                    });
                    res.end();
                }
                let code;
                if (req.params.code) {
                    code = Number(req.params.code);
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
                res.end();
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/:code', _listener);
        this._app.put('/catalog/ext/:code', _listener);
        this._server = this._app.listen(3001);
    }
}

// 通知サーバー
class _StubNoticeServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // 通知登録
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1
                });
            }
            res.end();
        };
        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/notification', _listener);
        this._server = this._app.listen(3004);
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
            // res.status(status);
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
let _noticeServer: any;

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
        // DB切断
        await common.disconnect();
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
                1000004, 1,
                1000003, 1,
                1000004, 1,
                '2025-12-31 23:59:59.999', 1, false,
                false, 'test_user', NOW(), 'test_user', NOW()
            );
            INSERT INTO pxr_catalog_update.join_approval_manage
            (
                join_manage_id, auth_code, status,
                comment, approval_actor_code, approval_actor_version,
                approver, approval_at, 
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                1, 'abcd1234', 0,
                NULL, 1000002, 1,
                NULL, NULL,
                false, 'test_user', NOW(), 'test_user', NOW()
            );
        `);

        // スタブを起動
        _operatorServer = new OperatorServer(200, 1000002);
        _catalogServer = new _StubCatalogServerOk(200);
        _noticeServer = new _StubNoticeServer(200);
    });
    /**
     * 全テスト実行後の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
        _operatorServer._server.close();
        _catalogServer._server.close();
        _noticeServer._server.close();
    });

    /**
     * 参加承認結果登録
     */
    describe('参加承認結果登録' + Url.baseURIJoinApproval, () => {
        test('参加承認結果登録(否認)Ap', async () => {
            // 送信データを生成
            var json = {
                status: 2,
                comment: '認定基準を満たしていないため'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinApproval + '/abcd1234')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
    });
});
