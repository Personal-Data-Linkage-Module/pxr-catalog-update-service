/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsOptional,
    IsNotEmpty,
    IsArray,
    IsString,
    IsNumber,
    IsBoolean,
    Min,
    Max,
    ValidateNested
} from 'class-validator';
import { UpdateSetType } from '../../common/UpdateSet';

// カタログコード
export class CodeVersionObject {
    @IsDefined()
    @IsNumber()
    _value: number;

    @IsOptional()
    @IsNumber()
    _ver?: number;
}

// カタログ項目
export class CatalogItem {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    ns: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description?: any;

    @IsDefined()
    @ValidateNested()
    _code: CodeVersionObject;

    @IsOptional()
    @ValidateNested()
    inherit?: CodeVersionObject;
}

// カタログ
export class Catalog {
    @IsDefined()
    @ValidateNested()
    catalogItem: CatalogItem;

    @IsOptional()
    template?: any;

    @IsOptional()
    inner?: any;

    @IsOptional()
    attribute?: any;
}

// 変更セット_カタログ
export class CatalogType {
    @IsDefined()
    @IsNumber()
    @Min(UpdateSetType.ADD)
    @Max(UpdateSetType.DELETE)
    type: number;

    @IsOptional()
    @IsNumber()
    catalogCode?: number;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsDefined()
    @ValidateNested()
    template: Catalog;
}

/* eslint-enable */

// データ処理定義申請
export default class PostDataOperationReqDto {
    // ID
    @IsOptional()
    @IsNumber()
    id?: number;

    // 名称
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    // 説明
    @IsOptional()
    @IsString()
    description?: string;

    // カタログリスト
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    catalog?: CatalogType[];

    // その他
    @IsOptional()
    appendix?: any;

    // 下書きフラグ
    @IsOptional()
    @IsBoolean()
    isDraft?: boolean = false;
}
