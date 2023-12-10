/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsBoolean,
    IsDefined,
    IsNumber,
    IsOptional,
    IsNotEmpty
} from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToBooleanFromString, transformToNumber } from '../../common/Transform';
/* eslint-enable */

/**
 * アクター認定解除申請API リクエストDTO
 */
export default class ActorRemoveReqDto {
    /** ID */
    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsOptional()
        id?: number;

    /** 移行先アクター */
    @Transform(({ value }) => { return transformToNumber(value); })
    @IsNumber()
    @IsOptional()
        migrationActorCode: number | null;

    /** 下書きフラグ */
    @Transform(({ value }) => { return transformToBooleanFromString(value); })
    @IsDefined()
    @IsNotEmpty()
    @IsBoolean()
        isDraft: boolean;
}
