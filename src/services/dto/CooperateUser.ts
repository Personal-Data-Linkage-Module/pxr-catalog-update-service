/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */
export class User {
    @IsString()
    @IsDefined()
        pxrId: string;

    @IsString()
    @IsOptional()
        UserId: string;
}

export default class {
    @IsNumber()
    @IsDefined()
    @Transform(({ value }) => { return transformToNumber(value); })
        actor: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => { return transformToNumber(value); })
        app: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => { return transformToNumber(value); })
        wf: number;

    @IsOptional()
    @IsArray()
    @Type(type => User)
    @ValidateNested()
        users: User[];
}
