/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsString,
    IsNumber,
    ValidateNested,
    IsBoolean,
    IsOptional,
    IsNotEmpty,
    IsArray,
    Min,
    Max,
    IsDefined
} from 'class-validator';
/* eslint-enable */
import { Transform, Type } from 'class-transformer';
import { UpdateSetType } from '../../common/UpdateSet';
import { transformToNumber } from '../../common/Transform';

export class CodeObject {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _value: number;

    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _ver: number;
}

export class CodeValueObj {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _value: number;
}

export class CatalogItem {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    ns: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @Type(() => CodeValueObj)
    @ValidateNested()
    _code: CodeValueObj;

    @IsOptional()
    @Type(() => CodeValueObj)
    @ValidateNested()
    inherit: CodeValueObj;
}

export class Template {
    @IsDefined()
    @IsArray()
    value: [];
}

export class Catalog {
    @IsDefined()
    @IsNotEmpty()
    @Type(() => CatalogItem)
    @ValidateNested()
    catalogItem: CatalogItem;

    @IsDefined()
    @Type(() => Template)
    @ValidateNested()
    template: Template;
}

export class CatalogType {
    @IsOptional()
    @IsNotEmpty()
    @Transform(type => parseInt(type))
    @IsNumber()
    @Min(UpdateSetType.ADD)
    @Max(UpdateSetType.DELETE)
    type: number;

    @IsOptional()
    @IsNumber()
    catalogCode: number;

    @IsDefined()
    @Type(() => Catalog)
    @ValidateNested()
    template: Catalog;
}

export default class PostStoreEventReq {
    /**
     * 名称
     */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    /**
     * 説明
     */
    @IsOptional()
    @IsString()
    description: string;

    /**
     * カタログリスト
     */
    @IsOptional()
    @IsArray()
    @Type(() => CatalogType)
    @ValidateNested({ each: true })
    catalog: CatalogType[];

    /**
     * その他
     */
    @IsOptional()
    appendix: any;

    /**
     * 下書き
     */
    @IsOptional()
    @IsBoolean()
    isDraft: boolean;
}
