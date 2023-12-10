/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Expose } from 'class-transformer';
import {
    IsOptional,
    IsBoolean,
    IsNumber,
    Min,
    Max
} from 'class-validator';
import { transformToBooleanFromString } from '../../common/Transform';
/* eslint-enable */

/**
 * アクター認定申請API リクエストDTO
 */
export default class GetDataOperationReqDto {
    // 承認依頼
    @Transform(({ value }) => { return transformToBooleanFromString(value); })
    @IsOptional()
    @IsBoolean()
    @Expose({ name: 'approval_request' })
        approvalRequest: boolean = false;

    // 承認済を含むかどうか
    @Transform(({ value }) => { return transformToBooleanFromString(value); })
    @IsOptional()
    @IsBoolean()
        approved: boolean = false;

    // 取得開始位置
    @IsOptional()
    @IsNumber()
    @Min(0)
        offset: number = 0;

    // 取得件数
    @IsOptional()
    @IsNumber()
    @Max(50)
        limit: number = 10;
}
