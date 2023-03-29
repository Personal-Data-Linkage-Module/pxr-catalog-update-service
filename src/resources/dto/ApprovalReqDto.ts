/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsNumber,
    IsString,
    IsOptional
} from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

export default class ApprovalReqDto {
    @Transform(transformToNumber)
    @IsDefined()
    @IsNumber()
    status: number;

    @IsOptional()
    @IsString()
    comment: string;
}
