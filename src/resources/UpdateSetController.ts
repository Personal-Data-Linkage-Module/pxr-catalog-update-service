/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response } from 'express';
import {
    JsonController,
    Post,
    UseBefore,
    Header,
    Req,
    Res
} from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import UpdateSetRequestPostValidator from './validator/UpdateSetRequestPostValidator';
import UpdateSetApprovalPostValidator from './validator/UpdateSetApprovalPostValidator';
import UpdateSetRequestPostReqDto from './dto/UpdateSetRequestPostReqDto';
import UpdateSetApprovalPostReqDto from './dto/UpdateSetApprovalPostReqDto';
/* eslint-enable */
import UpdateSetService from '../services/UpdateSetService';
import UpdateSetServiceDto from '../services/dto/UpdateSetServiceDto';

@JsonController('/catalog-update/updateSet')
export default class UpdateSetController {
    /**
     * 変更セット申請
     * @param req
     * @param res
     */
    @Post('/request')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetRequestPostValidator)
    async requestUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetRequestPostReqDto, req.body);
        dto = <UpdateSetRequestPostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);
        serviceDto.setApprovalActor(dto.approvalActor);

        // サービス層の処理を実行
        const ret = await new UpdateSetService().requestUpdateSet(serviceDto);
        return ret.getAsJson();
    }

    /**
     * 変更セット承認
     * @param req
     * @param res
     */
    @Post('/approval/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(UpdateSetApprovalPostValidator)
    async approvalUpdateSet (@Req() req: Request, @Res() res: Response): Promise<any> {
        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(UpdateSetApprovalPostReqDto, data);
        dto = <UpdateSetApprovalPostReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // サービス層のDTOを生成
        const serviceDto = new UpdateSetServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setUpdateSetId(dto.id);
        serviceDto.setStatus(dto.status);
        serviceDto.setComment(dto.comment);

        // サービス層の処理を実行
        const ret = await new UpdateSetService().approvalUpdateSet(serviceDto);
        return ret.getAsJson();
    }
}
