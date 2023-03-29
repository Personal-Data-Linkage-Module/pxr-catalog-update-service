/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
// eslint-disable-next-line no-unused-vars
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// サーバをlisten

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

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
     * 全テスト実行後の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
    });

    /**
     * Region参加申請
     */
    describe('Region参加申請' + Url.baseURIJoin, () => {
        test('データがない', async () => {
            // 送信データを生成
            var json = {
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoin)
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('idが数字ではない', async () => {
            // 送信データを生成
            var json = {
                id: 'a',
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('region_codeがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('region_versionがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('region_codeが数字ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 'a',
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('region_versionが数字ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 'a'
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('actor_codeがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('actor_versionがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('actor_codeが数字ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 'a',
                    version: 1,
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('actor_versionが数字ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 'a',
                    app: [
                        {
                            code: 1000021,
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('actor_applicationが配列ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: {
                        code: 1000021,
                        version: 1
                    },
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });

        test('actor_applicationが空の配列', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [] as any[],
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
            expect(response.body.reasons[0].message).toBe(Message.validation.arrayNotEmpty);
        });

        test('actor_application_codeがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('actor_application_versionがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('actor_application_codeが数字ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 'a',
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('actor_application_versionが数字ではない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
                            version: 'a'
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
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('下書きフラグがない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
                            version: 1
                        }
                    ]
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoin)
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('下書きフラグが論理値でない', async () => {
            // 送信データを生成
            var json = {
                region: {
                    code: 1000011,
                    version: 1
                },
                actor: {
                    code: 1000021,
                    version: 1,
                    app: [
                        {
                            code: 1000021,
                            version: 1
                        }
                    ]
                },
                isDraft: 'a'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoin)
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
        });
    });
});
