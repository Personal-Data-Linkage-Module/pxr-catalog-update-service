/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import { JsonController, Put, Header, Post, UseBefore, Body, Req } from 'routing-controllers';
import EnableSimpleBackPressure from "./backpressure/EnableSimpleBackPressure";
import StoreEventServiceDto from '../services/dto/StoreEventServiceDto';
import OperatorService from '../services/OperatorService';
import StoreEventService from '../services/StoreEventService';
import PostStoreEventReq from './dto/PostStoreEventReqDto';
import PutStoreEventReq from './dto/PutStoreEventReqDto';
import PostStroeEventValidator from './validator/PostStoreEventValidator';
import PutStroeEventValidator from './validator/PutStoreEventValidator';
/* eslint-enable */

@JsonController('/catalog-update')
export default class StoreEventController {
    /**
     * 蓄積イベント通知定義作成
     */
    @Post('/store-event')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostStroeEventValidator)
    async createEventStore (@Req() req: Request, @Body() dto: PostStoreEventReq) {
        const operator = await OperatorService.authMe(req);

        const serviceDto = new StoreEventServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCatalog(dto.catalog[0]);
        serviceDto.setRequestBody(req.body);
        const response = await StoreEventService.createStoreEvent(serviceDto);
        return response;
    }

    /**
     * 蓄積イベント通知定義更新
     */
    @Put('/store-event')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PutStroeEventValidator)
    async updateEventStore (@Req() req: Request, @Body() dto: PutStoreEventReq) {
        const operator = await OperatorService.authMe(req);

        const targetCatalog = dto.catalog[0].template;
        const serviceDto = new StoreEventServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setCatalog(dto.catalog[0]);
        serviceDto.setNotificateCatalogCode(targetCatalog.catalogItem._code._value);
        serviceDto.setRequestBody(req.body);
        const response = await StoreEventService.updateStoreEvent(serviceDto);
        return response;
    }
}
