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
        // DB切断
        await common.disconnect();
    });
    /**
     * 全テスト実行後の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
    });

    /**
     * Region参加承認結果登録
     */
    describe('Region参加承認結果登録' + Url.baseURIJoinApproval, () => {
        test('データがない', async () => {
            // 送信データを生成
            var json = {
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinApproval + '/abcd1234')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('承認コードがない', async () => {
            // 送信データを生成
            var json = {
                status: 1,
                comment: 'null'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinApproval)
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('statusがない', async () => {
            // 送信データを生成
            var json = {
                comment: 'null'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinApproval + '/abcd1234')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('statusが数値でない', async () => {
            // 送信データを生成
            var json = {
                status: 'a',
                comment: 'null'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinApproval + '/abcd1234')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('statusが規定値でない', async () => {
            // 送信データを生成
            var json = {
                status: 3,
                comment: 'null'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.baseURIJoinApproval + '/abcd1234')
                .set({ 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
    });
});
