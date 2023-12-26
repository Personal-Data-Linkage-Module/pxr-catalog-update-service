/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber
} from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToBooleanFromString, transformToNumber } from '../../common/Transform';
/* eslint-enable */

/**
 * アクター認定申請API リクエストDTO
 */
export default class ActorAcquireReqDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        code: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        ver: number;

    @IsString()
    @IsDefined()
        actorType: string;

    @Transform(({ value }) => { return transformToBooleanFromString(value); })
    @IsBoolean()
    @IsOptional()
        approved: boolean;
}
