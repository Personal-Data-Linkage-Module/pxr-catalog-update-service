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
import { transformAndValidate } from 'class-transformer-validator';
import ActorRemoveReqDto from '../dto/ActorRemoveReqDto';
import { Middleware } from 'routing-controllers';
import AppError from '../../common/AppError';
/* eslint-enable */
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class ActorRemoveValidator {
    async use (
        request: Request, response: Response, next: NextFunction
    ) {
        await transformAndValidate(
            ActorRemoveReqDto, request.body
        );

        if (request.body['migrationActorCode'] === undefined) {
            throw new AppError(Message.REQUEST_PARAMETER_INVALID, 400);
        }

        next();
    }
}
