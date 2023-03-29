/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController,
    Post,
    Put,
    Header,
    Req,
    UseBefore
} from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import CatalogUpdateService from '../services/CatalogUpdateService';
import CatalogUpdatePutValidator from './validator/CatalogUpdatePutValidator';
import CatalogUpdateServiceDto from '../services/dto/CatalogUpdateServiceDto';
import CatalogUpdateReqDto from './dto/CatalogUpdateReqDto';
/* eslint-enable */

@JsonController('/catalog-update')
export default class CatalogUpdateController {
    /**
     * PF利用規約作成API
     * @param req
     * @returns
     */
    @Post('/platform-terms-of-use')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogUpdatePutValidator)
    async addPlatformTermsOfUse (@Req() req: Request) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);
        let dto = await transformAndValidate(CatalogUpdateReqDto, req.body);
        dto = <CatalogUpdateReqDto>dto;

        const serviceDto = new CatalogUpdateServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setRequestBody(req.body);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setCatalogList(dto.catalog);
        serviceDto.setAppendix(dto.appendix);
        serviceDto.setIsDraft(dto.isDraft);

        // オペレーター情報を元に、提携関係の情報を取得、それをレスポンスとする
        const data = await new CatalogUpdateService().addPlatformTermsOfUse(serviceDto);
        return data;
    }

    /**
     * PF利用規約更新API
     * @param req
     * @returns
     */
    @Put('/platform-terms-of-use')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogUpdatePutValidator)
    async updatePlatformTermsOfUse (@Req() req: Request) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);
        let dto = await transformAndValidate(CatalogUpdateReqDto, req.body);
        dto = <CatalogUpdateReqDto>dto;

        const serviceDto = new CatalogUpdateServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setRequestBody(req.body);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setCatalogList(dto.catalog);
        serviceDto.setAppendix(dto.appendix);
        serviceDto.setIsDraft(dto.isDraft);

        // オペレーター情報を元に、提携関係の情報を取得、それをレスポンスとする
        const data = await new CatalogUpdateService().updatePlatformTermsOfUse(serviceDto);
        return data;
    }

    /**
     * リージョン規約作成API
     * @param req
     * @returns
     */
    @Post('/region-terms-of-use')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogUpdatePutValidator)
    async addRegionTermsOfUse (@Req() req: Request) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);
        let dto = await transformAndValidate(CatalogUpdateReqDto, req.body);
        dto = <CatalogUpdateReqDto>dto;

        const serviceDto = new CatalogUpdateServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setRequestBody(req.body);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setCatalogList(dto.catalog);
        serviceDto.setAppendix(dto.appendix);
        serviceDto.setIsDraft(dto.isDraft);

        // オペレーター情報を元に、提携関係の情報を取得、それをレスポンスとする
        const data = await new CatalogUpdateService().addRegionTermsOfUse(serviceDto);
        return data;
    }

    /**
     * リージョン規約更新API
     * @param req
     * @returns
     */
    @Put('/region-terms-of-use')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CatalogUpdatePutValidator)
    async updateRegionTermsOfUse (@Req() req: Request) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);
        let dto = await transformAndValidate(CatalogUpdateReqDto, req.body);
        dto = <CatalogUpdateReqDto>dto;

        const serviceDto = new CatalogUpdateServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setRequestBody(req.body);
        serviceDto.setName(dto.name);
        serviceDto.setDescription(dto.description);
        serviceDto.setCatalogList(dto.catalog);
        serviceDto.setAppendix(dto.appendix);
        serviceDto.setIsDraft(dto.isDraft);

        // オペレーター情報を元に、提携関係の情報を取得、それをレスポンスとする
        const data = await new CatalogUpdateService().updateRegionTermsOfUse(serviceDto);
        return data;
    }
}
