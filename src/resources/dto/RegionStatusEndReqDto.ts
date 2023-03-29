/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNumber, IsString, ValidateNested } from "class-validator";
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

export class CodeObject {
    @Transform(transformToNumber)
    @IsDefined()
    @IsNumber()
    _value: number;

    @Transform(transformToNumber)
    @IsDefined()
    @IsNumber()
    _ver: number;
}

/**
 * Region開始申請DTO
 */
export default class RegionStatusEndReqDto {
    @Type(() => CodeObject)
    @ValidateNested()
    @IsDefined()
    regionCode: CodeObject;

    @IsString()
    @IsDefined()
    requestComment: string;

    @IsString()
    @IsDefined()
    endDate: string;
}
