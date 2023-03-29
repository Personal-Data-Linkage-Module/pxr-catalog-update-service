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
    @Transform(transformToNumber)
    code: number;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    ver: number;

    @IsString()
    @IsDefined()
    actorType: string;

    @Transform(transformToBooleanFromString)
    @IsBoolean()
    @IsOptional()
    approved: boolean;
}
