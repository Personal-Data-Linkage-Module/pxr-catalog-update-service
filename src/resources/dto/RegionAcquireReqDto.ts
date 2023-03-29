/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import {
    IsBoolean,
    IsOptional
} from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { transformToBooleanFromString } from '../../common/Transform';

export default class RegionAcquireReqDto {
    @IsOptional()
    @IsBoolean()
    @Transform(transformToBooleanFromString)
    @Expose({ name: 'in_approved' })
    inApproved: boolean;
}
