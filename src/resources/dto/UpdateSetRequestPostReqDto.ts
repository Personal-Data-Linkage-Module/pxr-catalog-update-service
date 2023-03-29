/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsNumber,
    IsNotEmpty,
    Min
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-enable */

export default class UpdateSetRequestPostReqDto {
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
     * 承認アクターコードオブジェクト
     */
    @IsDefined()
    @IsNotEmpty()
    @Transform(approvalActor => parseInt(approvalActor))
    @IsNumber()
    @Min(1)
    approvalActor: number = null;
}
