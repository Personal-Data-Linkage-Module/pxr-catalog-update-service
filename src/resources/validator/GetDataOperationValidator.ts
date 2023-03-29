/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response, NextFunction } from 'express';
import { Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import GetDataOperationReqDto from '../dto/GetDataOperationReqDto';
/* eslint-enable */
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
const message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class GetDataOperationValidator {
    async use (req: Request, res: Response, next: NextFunction) {
        const dto = await transformAndValidate(GetDataOperationReqDto, req.query);
        if (Array.isArray(dto)) {
            // req.queryが配列の場合はありえないので通らない分岐
            throw new AppError(message.UNEXPECTED_ARRAY_REQUEST, ResponseCode.BAD_REQUEST);
        }

        next();
    }
}
