/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsNumber,
    ArrayNotEmpty,
    IsArray,
    IsOptional,
    IsDefined,
    ValidateNested,
    IsBoolean
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToBooleanFromString } from '../../common/Transform';
/* eslint-enable */

export class CodeObject {
    @IsNumber()
    @IsDefined()
    code: number;

    @IsNumber()
    @IsDefined()
    version: number;
}

export class Actor extends CodeObject {
    @IsOptional()
    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CodeObject)
    app: CodeObject[];

    @IsOptional()
    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CodeObject)
    wf: CodeObject[];
}

export default class JoinReqDto {
    @IsNumber()
    @IsOptional()
    id: number;

    @Type(() => CodeObject)
    @ValidateNested()
    @IsDefined()
    region: CodeObject;

    @Type(() => Actor)
    @ValidateNested()
    @IsDefined()
    actor: Actor;

    @IsBoolean()
    @IsDefined()
    @Transform(transformToBooleanFromString)
    isDraft: boolean;
}
