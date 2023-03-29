/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    Request,
    Response,
    NextFunction
} from 'express';
import { Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import ApprovalReqDto from '../dto/ApprovalReqDto';
import AppError from '../../common/AppError';
import * as config from 'config';
import ActorApprovalManage from '../../repositories/postgres/ActorApprovalManage';
/* eslint-enable */
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class ActorApprovalValidator {
    async use (
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        await transformAndValidate(
            ApprovalReqDto,
            request.body
        );

        const authCode = request.query.code ? request.query.code : null;
        const status = request.body.status;

        if (authCode == null) {
            throw new AppError(Message.REQUEST_PARAMETER_INVALID, 400);
        }
        // 認証コードの文字数が一致しない場合
        if (authCode.length !== Number(config.get('authCodeLength'))) {
            throw new AppError(Message.REQUEST_PARAMETER_INVALID, 400);
        }
        // 認定ステータスが規定値ではなない場合
        if (status !== ActorApprovalManage.APPROVAL_STATUS &&
            status !== ActorApprovalManage.UN_APPROVAL_STATUS
        ) {
            throw new AppError(Message.REQUEST_PARAMETER_INVALID, 400);
        }

        next();
    }
}
