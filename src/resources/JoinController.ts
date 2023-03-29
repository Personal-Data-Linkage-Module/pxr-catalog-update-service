/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response } from 'express';
import { JsonController, Get, Header, UseBefore, Req, Res, QueryParams, Post, Body } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import EntityOperation from '../repositories/EntityOperation';
import ApprovalValidator from './validator/ApprovalValidator';
import ApprovalReqDto from './dto/ApprovalReqDto';
import JoinValidator from './validator/JoinValidator';
import JoinReqDto from './dto/JoinReqDto';
import JoinAcquireReqDto from './dto/JoinAcquireReqDto';
import JoinAcquireValidator from './validator/JoinAcquireValidator';
import JoinService from '../services/JoinService';
import ApprovalResDto from './dto/ApprovalResDto';
/* eslint-enable */

@JsonController('/catalog-update/join')
export default class JoinController {
    @Get('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(JoinAcquireValidator)
    async joinAcquire (
        @Req() req: Request,
        @QueryParams() dto: JoinAcquireReqDto,
        @Res() res: Response
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        dto = await JoinService.convertReqQuery(dto, req.query);

        // オペレーター情報を元に、Region参加情報を取得、それをレスポンスとする
        const response = await JoinService.acquire(dto, operator);

        return response;
    }

    @Post('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(JoinValidator)
    async join (
        @Req() req: Request,
        @Body() dto: JoinReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // リクエストされた内容が既に、締結済み | 申請中で存在するか
        const exists = await JoinService.isExists(dto, 1, operator);

        // 各種データを揃え、エンティティを構成
        let entity = await JoinService.acquireInfo(dto, operator, exists, 1);

        // 下書きフラグが無効（清書）の場合、通知サービスへの通知登録を実行する
        await JoinService.approvalLinkage(entity, operator);

        // データベースに申請として登録
        entity = await EntityOperation.saveJoinEntity(entity);

        // レスポンスを生成
        const result = await JoinService.applicationResponse(entity);
        return result;
    }

    @Post('/remove')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(JoinValidator)
    async removal (
        @Req() req: Request,
        @Body() dto: JoinReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // リクエストされた内容が既に、締結済み | 申請中で存在するか
        const exists = await JoinService.isExists(dto, 2, operator);

        // 各種データを揃え、エンティティを構成
        let entity = await JoinService.acquireInfo(dto, operator, exists, 2);

        // 下書きフラグが無効（清書）の場合、通知サービスへの通知登録を実行する
        await JoinService.approvalLinkage(entity, operator);

        // データベースに申請として登録
        entity = await EntityOperation.saveJoinEntity(entity);

        // レスポンスを生成
        const result = await JoinService.applicationResponse(entity);
        return result;
    }

    @Post('/approval/:code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ApprovalValidator)
    async approval (
        @Req() req: Request,
        @Body() dto: ApprovalReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // 承認コードからエンティティを取得
        const entity = await JoinService.getApprovalTarget(req.params.code, dto);

        // 承認内容をカタログへ反映させる
        await JoinService.updateJoinDetails(entity, operator);

        // 承認情報を保存
        await JoinService.saveApprovalInfo(entity, operator);

        // 承認されたことを通知サービスへ連携する
        await JoinService.noticeLinkage(entity, operator);

        // 結果を返却
        return new ApprovalResDto();
    }
}
