/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response } from "express";
import { Body, Get, Header, JsonController, Post, QueryParams, Req, Res, UseBefore } from "routing-controllers";
import OperatorService from "../services/OperatorService";
import RegionService from "../services/RegionService";
import EnableSimpleBackPressure from "./backpressure/EnableSimpleBackPressure";
import RegionAcquireReqDto from "./dto/RegionAcquireReqDto";
import RegionDeleteReqDto from "./dto/RegionDeleteReqDto";
import RegionReqDto from "./dto/RegionReqDto";
import RegionAcquireValidator from "./validator/RegionAcquireValidator";
import RegionDeleteValidator from "./validator/RegionDeleteValidator";
import RegionValidator from "./validator/RegionValidator";
/* eslint-enable */

@JsonController('/catalog-update/region')
export default class RegionController {
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
        dto = await RegionService.convertReqQuery(dto, req.query);

        // オペレーター情報を元にRegion開始終了申請を取得
        const response = await RegionService.aquire(dto, operator);

        // レスポンスを返す
        return response;
    }

    @Post('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(RegionValidator)
    async region (
        @Req() req: Request,
        @Body() dto: RegionReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // Region作成
        const entity = await RegionService.region(dto, operator);

        // レスポンスを生成
        const response = await RegionService.applicationStartResponse(dto, entity);
        return response;
    }

    @Post('/delete')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(RegionDeleteValidator)
    async removal (
        @Req() req: Request,
        @Body() dto: RegionDeleteReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // Region削除
        await RegionService.regionRemove(dto, operator);

        // レスポンスを生成
        const response = await RegionService.applicationEndResponse(dto);
        return response;
    }
}
