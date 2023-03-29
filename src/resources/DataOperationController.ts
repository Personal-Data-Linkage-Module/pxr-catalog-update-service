/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController,
    Get,
    Post,
    UseBefore,
    Header,
    Req,
    Body
} from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import PostDataOperationReqDto from './dto/PostDataOperationReqDto';
import GetDataOperationReqDto from './dto/GetDataOperationReqDto';
import PostDataOperationValidator from './validator/PostDataOperationValidator';
import GetDataOperationValidator from './validator/GetDataOperationValidator';
import DataOperationService from '../services/DataOperationService';
/* eslint-enable */

@JsonController('/catalog-update/data-operation')
export default class DataOperationController {
    /**
     * データ処理定義申請取得
     * @param req
     */
    @Get()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetDataOperationValidator)
    async actorAcquire (@Req() req: Request) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // パラメーターを取得する
        const dto = await transformAndValidate(GetDataOperationReqDto, req.query) as GetDataOperationReqDto;

        // サービスを呼出し、レスポンスを返却する
        const response = await new DataOperationService().getDataOperation(operator, dto);
        return response;
    }

    /**
     * データ処理定義申請
     * @param req
     * @param dto
     */
    @Post()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostDataOperationValidator)
    async postDataOperation (@Req() req: Request, @Body() dto: PostDataOperationReqDto) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // サービスを呼出し、レスポンスを返却する
        const response = new DataOperationService().postDataOperation(operator, dto);
        return response;
    }
}
