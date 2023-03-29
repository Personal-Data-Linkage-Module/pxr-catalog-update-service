/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { IsBoolean, IsDefined, IsNumber, IsOptional } from "class-validator";
/* eslint-enable */

export default class RegionDeleteReqDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsDefined()
    @IsNumber()
    regionCode: number;

    @IsOptional()
    comment: string;

    @IsDefined()
    @IsBoolean()
    isDraft: boolean;
}
