/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import Config from '../../common/Config';
import express = require('express');
import { Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import ActorAccreditsReqDto from '../dto/ActorAccreditsReqDto';
import ActorType from '../../domains/ActorType';
import AppError from '../../common/AppError';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

/**
 * 申請先取得
 */
@Middleware({ type: 'before' })
export default class ActorAccreditsValidator {
    async use (
        request: express.Request, response: express.Response, next: express.NextFunction
    ) {
        const dto = await transformAndValidate(
            ActorAccreditsReqDto, request.query
        ) as ActorAccreditsReqDto;
        const { actorType } = dto;
        if (!ActorType.TYPE_ARRAY.includes(actorType)) {
            throw new AppError(
                Message.NOT_CONTAINS_ACTOR_TYPE, 400);
        }
        next();
    }
}
