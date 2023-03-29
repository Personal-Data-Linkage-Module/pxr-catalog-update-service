/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import ActorAcquireReqDto from '../dto/ActorAcquireReqDto';
import ActorType from '../../domains/ActorType';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import express = require('express');
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

/**
 * アクター認定申請取得API
 */
@Middleware({ type: 'before' })
export default class ActorAcquireValidator {
    async use (
        request: express.Request, response: express.Response, next: express.NextFunction
    ) {
        const dto = await transformAndValidate(
            ActorAcquireReqDto,
            request.query
        ) as ActorAcquireReqDto;
        if (!ActorType.TYPE_ARRAY.includes(dto.actorType)) {
            throw new AppError(Message.NOT_CONTAINS_ACTOR_TYPE, 400);
        }
        next();
    }
}
