/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {Request, Response, NextFunction} from 'express';
import { Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import PostDataOperationReqDto from '../dto/PostDataOperationReqDto';
/* eslint-enable */
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
import { UpdateSetType } from '../../common/UpdateSet';
const message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class PostDataOperationValidator {
    async use (req: Request, res: Response, next: NextFunction) {
        // 空の場合エラーとする
        if (!req.body || JSON.stringify(req.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }

        // バリデーションチェック
        let dto = await transformAndValidate(PostDataOperationReqDto, req.body);
        if (Array.isArray(dto)) {
            // 配列であればエラー
            throw new AppError(message.UNEXPECTED_ARRAY_REQUEST, ResponseCode.BAD_REQUEST);
        }
        dto = dto as PostDataOperationReqDto;

        if (!dto.catalog || dto.catalog.length < 1) {
            throw new AppError(message.REQUIRED_CATALOG, ResponseCode.BAD_REQUEST);
        }
        let isUpdateError = false;
        for (const catalog of dto.catalog) {
            if ((catalog.type === UpdateSetType.UPDATE || catalog.type === UpdateSetType.DELETE) && !catalog.catalogCode) {
                isUpdateError = true;
            }
        }
        if (isUpdateError) {
            throw new AppError(message.REQUIRED_CATALOG_CODE, ResponseCode.BAD_REQUEST);
        }

        next();
    }
}
