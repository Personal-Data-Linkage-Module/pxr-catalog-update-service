/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController,
    Get,
    Post,
    UseBefore,
    QueryParams,
    Header,
    Req,
    Body
} from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import EntityOperation from '../repositories/EntityOperation';
import ActorAccreditsValidator from './validator/ActorAccreditsValidator';
import ActorAccreditsReqDto from './dto/ActorAccreditsReqDto';
import ActorAcquireReqDto from './dto/ActorAcquireReqDto';
import ActorAcquireValidator from './validator/ActorAcquireValidator';
import ActorReqDto from './dto/ActorReqDto';
import ActorValidator from './validator/ActorValidator';
import ActorApprovalValidator from './validator/ActorApprovalValidator';
import ActorRemoveValidator from './validator/ActorRemoveValidator';
import ApprovalReqDto from './dto/ApprovalReqDto';
import ActorRemoveReqDto from './dto/ActorRemoveReqDto';
import ActorService from '../services/ActorService';
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-enable */

@JsonController('/catalog-update/actor')
export default class ActorController {
    @Get('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ActorAcquireValidator)
    async actorAcquire (
        @Req() req: Request
    ) {
        const dto = await transformAndValidate(
            ActorAcquireReqDto,
            req.query
        ) as ActorAcquireReqDto;

        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // オペレーター情報を元に、アクター認定情報を取得、それをレスポンスとする
        const data = await ActorService.acquire(dto, operator);
        return data;
    }

    @Post('/')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ActorValidator)
    async actor (
        @Req() req: Request
    ) {
        const dto = await transformAndValidate(
            ActorReqDto,
            req.body
        ) as ActorReqDto;

        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // エンティティを生成
        let entity = await ActorService.convert(dto, operator);

        // 承認要求を送る（下書きまたはPXR-Root以外の場合）
        await ActorService.approvalLinkage(entity, operator, dto);

        // PXR-Rootの場合、承認と同等の操作を行う
        await ActorService.approval(entity, operator);

        // 申請情報を保存
        entity = await EntityOperation.saveActorEntity(entity);

        // レスポンスを生成
        const response = await ActorService.applicantResponse(entity, dto);
        return response;
    }

    @Post('/remove')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ActorRemoveValidator)
    async remove (
        @Req() req: Request,
        @Body() dto: ActorRemoveReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // 同等の申請の存在確認
        let entity = await ActorService.isExists(dto, 2, operator);

        // 離脱可否チェック
        entity = await ActorService.checkRemovePossible(operator, dto, entity);

        // 承認要求を送る（下書きの場合は送らない）
        await ActorService.approvalLinkageForRemove(entity, operator);

        // 申請情報を保存
        entity = await EntityOperation.saveActorRemoveEntity(entity);

        // レスポンスを生成
        const response = await ActorService.removeApplicantResponse(entity);
        return response;
    }

    @Get('/accreditor')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ActorAccreditsValidator)
    async accredits (
        @Req() req: Request,
        @QueryParams() dto: ActorAccreditsReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // アクター種別を確認、必要があればデータを取得する
        const data = await ActorService.accredits(
            dto.actorType,
            operator
        );
        return data;
    }

    @Post('/approval')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ActorApprovalValidator)
    async approval (
        @Req() req: Request,
        @Body() dto: ApprovalReqDto
    ) {
        // オペレーター情報を取得する
        const operator = await OperatorService.authMe(req);

        // 承認コードからエンティティを取得
        const entity = await ActorService.getApprovalTarget(req.query.code as string, dto);

        // 認定申請の場合
        let response = null;
        if (entity.type === 1) {
            // 承認内容をカタログへ反映させる
            await ActorService.updateActorDetails(entity, operator);

            // 承認されたことを通知サービスへ連携する
            await ActorService.noticeLinkage(entity, operator);

            // 承認情報を保存
            response = await ActorService.saveApprovalInfo(entity, operator);
        } else {
            // 認定解除の場合
            // 解除を実行
            const approvalType = await ActorService.removeExcute(entity, operator, dto);

            // 結果を通知サービスへ連携する
            await ActorService.noticeLinkageForRemove(entity, operator);

            // 承認結果を保存
            await EntityOperation.saveActorRemoveEntity(entity);

            // レスポンスを生成
            response = await ActorService.removeApprovalResponse(entity, approvalType);
        }

        // 結果を返却
        return response;
    }
}
