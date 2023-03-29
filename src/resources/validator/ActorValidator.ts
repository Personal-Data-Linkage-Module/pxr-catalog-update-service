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
import ActorReqDto from '..//dto/ActorReqDto';
import ActorType from '../../domains/ActorType';
import AppError from '../../common/AppError';
import { Middleware } from 'routing-controllers';
/* eslint-enable */
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class ActorValidator {
    async use (
        request: Request, response: Response, next: NextFunction
    ) {
        const dto = await transformAndValidate(
            ActorReqDto, request.body
        ) as ActorReqDto;

        // ext以外のnsが指定された場合
        if (dto.actorCatalog['catalogItem']['ns'] && dto.actorCatalog['catalogItem']['ns'].indexOf('ext') < 0) {
            throw new AppError(
                Message.REQUEST_PARAMETER_INVALID, 400);
        }
        // nsにactorが含まれていない場合
        if (dto.actorCatalog['catalogItem']['ns'] && dto.actorCatalog['catalogItem']['ns'].indexOf('actor') < 0) {
            throw new AppError(
                Message.REQUEST_PARAMETER_INVALID, 400);
        }

        // 各項目が存在しない場合、エラーとする
        if (dto.actorCatalog['template'] === undefined ||
            dto.actorCatalog['inner'] === undefined ||
            dto.actorCatalog['attribute'] === undefined
        ) {
            throw new AppError(
                Message.REQUEST_PARAMETER_INVALID, 400);
        }

        // テンプレート内に項目が存在しない場合、エラーとする
        if (dto.actorCatalog['template']['prop'] === undefined ||
            dto.actorCatalog['template']['value'] === undefined
        ) {
            throw new AppError(
                Message.REQUEST_PARAMETER_INVALID, 400);
        }

        // PXR-Rootの場合、approvalActorがあるとエラー
        const { ns } = dto.actorCatalog.catalogItem;
        if (ns.indexOf(ActorType.PXR_ROOT) > 0 && dto.approvalActor) {
            throw new AppError(
                Message.NOT_REQUIRED_WHEN_PXR_ROOT_ACTOR_APPLICATION, 400);
        }

        // PXR-Root以外でapprovalActorが無いとエラー
        if (ns.indexOf(ActorType.PXR_ROOT) <= 0) {
            if (!dto.approvalActor) {
                throw new AppError(
                    Message.REQUEST_PARAMETER_INVALID, 400);
            }

            // _valueもしくは_verが無い、または_valueもしくは_verが数字ではない場合、エラーとする
            if (!dto.approvalActor._value ||
                !dto.approvalActor._ver ||
                isNaN(Number(dto.approvalActor._value)) ||
                isNaN(Number(dto.approvalActor._ver))
            ) {
                throw new AppError(
                    Message.REQUEST_PARAMETER_INVALID, 400);
            }
        }

        next();
    }
}
