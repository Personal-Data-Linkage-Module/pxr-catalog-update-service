/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { transformAndValidate } from 'class-transformer-validator';
import { NextFunction } from 'express';
import { Middleware } from 'routing-controllers';
import { sprintf } from 'sprintf-js';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
import { UpdateSetType } from '../../common/UpdateSet';
import PutStoreEventReqDto from '../dto/PutStoreEventReqDto';
const message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class PutStroeEventValidator {
    async use (req: Request, res: Response, next: NextFunction) {
        // 空の場合エラーとする
        if (!req.body || JSON.stringify(req.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        if (Array.isArray(req.body)) {
            // 配列であればエラー
            throw new AppError(message.UNEXPECTED_ARRAY_REQUEST, ResponseCode.BAD_REQUEST);
        }
        const dto = await transformAndValidate(PutStoreEventReqDto, req.body) as PutStoreEventReqDto;

        if (dto.catalog.length !== 1) {
            throw new AppError(message.INVALID_CATALOG_ITEMS, ResponseCode.BAD_REQUEST);
        }
        if (dto.catalog[0].type !== UpdateSetType.UPDATE) {
            // typeが2:更新以外の場合
            throw new AppError(sprintf(message.INVALID_VALUE, 'catalog.type', dto.catalog[0].type), ResponseCode.BAD_REQUEST);
        }
        next();
    }
}
