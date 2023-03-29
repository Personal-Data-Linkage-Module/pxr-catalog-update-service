/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    Min,
    Max
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UpdateSetDomain } from '../../domains/UpdateSetDomain';
/* eslint-enable */

/**
 * POST: 変更セット承認リクエストDTO
 */
export default class UpdateSetApprovalPostReqDto {
    /**
     * ID
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    @IsNumber()
    @Min(1)
    id: number = null;

    /**
     * ステータス
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(id => parseInt(id))
    @IsNumber()
    @Min(UpdateSetDomain.APPROVAL)
    @Max(UpdateSetDomain.DENY)
    status: number = null;

    /**
     * 承認コメント
     */
    @IsDefined()
    @IsString()
    @IsOptional()
    comment: string = null;
}
