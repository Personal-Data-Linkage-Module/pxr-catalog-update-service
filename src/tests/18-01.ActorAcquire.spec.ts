/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import { Session } from './10-00.GetAlliance.TestData';
import * as express from 'express';
import { Server } from 'net';
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
/** eslint-enable  */

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';



/**
 * オペレータサービス
 */
export class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                    _operatorServerId: 1,
                    type: 0,
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
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

let _operatorServer: _StubOperatorServer;

/**
 * データ処理定義取得 API のユニットテスト
 */
describe('データ処理定義取得 API', () => {
    /**
     * 全テスト実行前の処理
     */
    beforeAll(async () => {
        await Application.start()
        // DB接続
        await common.connect();
        // 事前データ準備
        await common.executeSqlString(`
        DELETE FROM pxr_catalog_update.data_operation_manage;

        SELECT SETVAL('pxr_catalog_update.data_operation_manage_id_seq', 1, false);

        INSERT INTO pxr_catalog_update.data_operation_manage
        (
            template,
            application_actor_code,
            application_block_code,
            application_at,
            is_draft,
            is_disabled, created_by, created_at, updated_by, updated_at
        )
        VALUES
        (
            '{"name":"ストアカタログ","description":null,"type":null,"callerActorCode":1000438,"approvalActorCode":1000438,"approver":"tongulltest00002","approvalAt":"2022-05-11T11:54:54.619+0900","comment":null,"status":1,"registerActorCode":1000438,"register":"tongulltest00002","registAt":"2022-05-11T11:54:54.199+0900","ns":null,"catalog":[{"type":1,"catalogCode":null,"comment":null,"template":{"catalogItem":{"ns":"catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store","name":"テスト金","_code":{"_value":1001665,"_ver":1},"inherit":{"_value":44,"_ver":1},"description":"N区総合病院が蓄積可能なデータ定義です。"},"attribute":null,"inner":null,"template":{"prop":null,"value":[{"key":"_code","value":null},{"key":"store","value":[{"key":"id","value":"180b10a7254319"}]}]}}}],"appendix":[],"attribute":null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            false,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{"name":"ストアカタログ","description":null,"type":null,"callerActorCode":1000438,"approvalActorCode":1000438,"approver":"tongulltest00002","approvalAt":"2022-05-11T11:54:54.619+0900","comment":null,"status":1,"registerActorCode":1000438,"register":"tongulltest00002","registAt":"2022-05-11T11:54:54.199+0900","ns":null,"catalog":[{"type":1,"catalogCode":null,"comment":null,"template":{"catalogItem":{"ns":"catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store","name":"テスト金","_code":{"_value":1001665,"_ver":1},"inherit":{"_value":44,"_ver":1},"description":"N区総合病院が蓄積可能なデータ定義です。"},"attribute":null,"inner":null,"template":{"prop":null,"value":[{"key":"_code","value":null},{"key":"store","value":[{"key":"id","value":"180b10a7254319"}]}]}}}],"appendix":[],"attribute":null}',
            1000436,
            1000010,
            '2025-12-31 23:59:59.000',
            false,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{"name":"ストアカタログ","description":null,"type":null,"callerActorCode":1000438,"approvalActorCode":1000438,"approver":"tongulltest00002","approvalAt":"2022-05-11T11:54:54.619+0900","comment":null,"status":1,"registerActorCode":1000438,"register":"tongulltest00002","registAt":"2022-05-11T11:54:54.199+0900","ns":null,"catalog":[{"type":1,"catalogCode":null,"comment":null,"template":{"catalogItem":{"ns":"catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store","name":"テスト金","_code":{"_value":1001665,"_ver":1},"inherit":{"_value":44,"_ver":1},"description":"N区総合病院が蓄積可能なデータ定義です。"},"attribute":null,"inner":null,"template":{"prop":null,"value":[{"key":"_code","value":null},{"key":"store","value":[{"key":"id","value":"180b10a7254319"}]}]}}}],"appendix":[],"attribute":null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            true,
            false, 'test_user', NOW(), 'test_user', NOW()
        );
        `);
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
        if (_operatorServer) {
            _operatorServer._server.close();
        }
    });

    /**
     * データ処理定義取得
     */
    describe('データ処理定義取得', () => {
        test('正常：自分が申請したもののみ', async () => {
            
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=true&approved=true')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(3);
            expect(response.body[1].id).toBe(1);
        });

        test('正常：他人の申請を含む', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=false&approved=true')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(3);
            expect(response.body[1].id).toBe(2);
            expect(response.body[2].id).toBe(1);
        });

        test('正常：他人の申請を含む、未承認のみ', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=false&approved=false')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(3);
            expect(response.body.length).toBe(1);
        });

        test('パラメータ異常：approvalRequest、boolean以外', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=test')
                .set({ session: encodeURIComponent(Session.PXR_ROOT) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('approvalRequest');
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);

        });

        test('異常：Cookieが存在するが空', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });

        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            _operatorServer = new _StubOperatorServer(204, 1000002);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });

        test('異常：Cookie使用、オペレータサービス応答400', async () => {
            _operatorServer = new _StubOperatorServer(400, 1000002);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session]);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });

        test('異常：Cookie使用、オペレータサービス応答500', async () => {
            _operatorServer = new _StubOperatorServer(500, 1000002);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session]);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });

        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.dataOperationURI + '?approval_request=true');

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
    });
});
