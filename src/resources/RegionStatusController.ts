/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response } from "express";
import { Body, Get, Header, JsonController, Post, QueryParams, Req, Res, UseBefore } from "routing-controllers";
import Config from "../common/Config";
import BookManageService from '../services/BookManageService';
import BookManageDto from '../services/dto/BookManageDto';
import OperatorService from "../services/OperatorService";
import RegionStatusService from "../services/RegionStatusService";
import EnableSimpleBackPressure from "./backpressure/EnableSimpleBackPressure";
import ApprovalReqDto from "./dto/ApprovalReqDto";
import ApprovalResDto from "./dto/ApprovalResDto";
import RegionAcquireReqDto from "./dto/RegionAcquireReqDto";
import RegionStatusEndReqDto from "./dto/RegionStatusEndReqDto";
import RegionStatusStartReqDto from "./dto/RegionStatusStartReqDto";
import ApprovalValidator from "./validator/ApprovalValidator";
import RegionAcquireValidator from "./validator/RegionAcquireValidator";
import RegionStatusEndValidator from "./validator/RegionStatusEndValidator";
import RegionStatusStartValidator from "./validator/RegionStatusStartValidator";
import config = require('config');
import { transformFromDateTimeToString } from '../common/Transform';
import RegionApprovalManage from '../repositories/postgres/RegionApprovalManage';
import RegionStatusManage from '../repositories/postgres/RegionStatusManage';
const momentTz = require('moment-timezone');
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@JsonController('/catalog-update/region/status')
export default class RegionStatusController {
    @Get('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(RegionAcquireValidator)
    async regionAcquire (
        @Req() req: Request,
        @QueryParams() dto: RegionAcquireReqDto,
        @Res() res: Response
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // dtoにクエリパラムをセット
        dto = await RegionStatusService.convertReqQuery(dto, req.query);

        // オペレーター情報を元にRegion開始終了申請を取得
        const response = await RegionStatusService.aquire(dto, operator);

        // レスポンスを返す
        return response;
    }

    @Post('/start')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(RegionStatusStartValidator)
    async region (
        @Req() req: Request,
        @Body() dto: RegionStatusStartReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // Region開始要求の呼び出し
        const entity = await RegionStatusService.start(dto, operator);

        // レスポンスを生成
        return RegionStatusService.applicationResponse(entity);
    }

    @Post('/end')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(RegionStatusEndValidator)
    async removal (
        @Req() req: Request,
        @Body() dto: RegionStatusEndReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // Region終了要求を呼び出し
        const entity = await RegionStatusService.end(dto, operator);

        // レスポンスを生成
        return RegionStatusService.applicationResponse(entity);
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
        const entity = await RegionStatusService.getApprovalTarget(req.params.code, dto);

        // 承認内容をカタログへ反映させる
        await RegionStatusService.updateRegionStatus(entity, operator);

        // 承認情報を保存
        await RegionStatusService.saveApprovalInfo(entity, operator);

        // 承認の場合 かつ 終了要求の場合
        if (entity.regionStatusApprovalManage.status === RegionApprovalManage.APPROVAL_STATUS &&
            entity.type === RegionStatusManage.END_TYPE) {
            // Book管理.Region終了対象追加APIでRegionの終了情報を登録する
            const bookManageDto = new BookManageDto();
            bookManageDto.setOperator(operator);
            bookManageDto.setApplicantActorCode(entity.applicantActorCode);
            bookManageDto.setApplicantActorVersion(entity.applicantActorVersion);
            bookManageDto.setRegionCatalogCode(entity.regionCode);
            bookManageDto.setRegionCatalogVersion(entity.regionVersion);
            bookManageDto.setEndDate(transformFromDateTimeToString(config.get('timezone'), entity.endDate));
            await BookManageService.postRegionClose(bookManageDto);
        }

        // 承認されたことを通知サービスへ連携する
        await RegionStatusService.noticeLinkage(entity, operator);

        // 結果を返却
        return new ApprovalResDto();
    }
}
