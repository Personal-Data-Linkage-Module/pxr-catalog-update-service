/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;

    // _ver: number;
}

export class Cooperation {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @Type(type => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    // app: CodeObject;

    // userId: string;

    // startAt: string;

    // status: number;
}

export default class {
    @IsString()
    @IsNotEmpty()
    pxrId: string;

    // attributes: any;

    @IsOptional()
    @IsArray()
    @Type(type => Cooperation)
    @ValidateNested()
    cooperation: Cooperation[];
}
