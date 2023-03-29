/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsBoolean,
    IsDefined,
    IsNumber,
    IsString,
    IsOptional,
    IsNotEmpty,
    ValidateNested,
    ValidateIf
} from 'class-validator';
import { Type } from 'class-transformer';
import ActorType from '../../domains/ActorType';
import { Transform } from 'class-transformer';
import { transformToBooleanFromString, transformToNumber } from '../../common/Transform';
/* eslint-enable */

export class Template {
    @Type(() => null)
    @IsOptional()
    prop: null;

    @Type(() => null)
    @IsOptional()
    value: null;
}

export class CodeObject {
    @Transform(transformToNumber)
    @IsOptional()
    @IsNumber()
    _value: number;

    @Transform(transformToNumber)
    @IsOptional()
    @IsNumber()
    _ver: number;
}

export class CatalogItem {
    @IsNotEmpty()
    @IsString()
    ns: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    description: any;

    @Type(() => CodeObject)
    @ValidateNested()
    @IsOptional()
    _code: CodeObject;

    @Type(() => CodeObject)
    @ValidateNested()
    @IsDefined()
    inherit: CodeObject;

    @Type(() => null)
    @IsOptional()
    inner: null;

    @Type(() => null)
    @IsOptional()
    attribute: null;
}

export class CatalogObject {
    @IsDefined()
    @Type(() => CatalogItem)
    @ValidateNested()
    catalogItem: CatalogItem;

    @IsDefined()
    @Type(() => Template)
    @ValidateNested()
    template: Template;
}

/**
 * アクター認定申請API リクエストDTO
 */
export default class ActorReqDto {
    /** ID */
    @Transform(transformToNumber)
    @IsNumber()
    @IsOptional()
    id?: number;

    /** アクターカタログ内容 */
    @Type(() => CatalogObject)
    @ValidateNested()
    @IsDefined()
    actorCatalog: CatalogObject;

    /** 承認アクター指定 */
    @Type(() => CodeObject)
    @ValidateNested()
    @ValidateIf(o =>
        o.actorCatalog &&
        o.actorCatalog.catalogItem &&
        (
            o.actorCatalog.catalogItem.ns + ''
        ).indexOf(ActorType.PXR_ROOT) < 0
    )
    approvalActor: CodeObject;

    /** 下書きフラグ */
    @Transform(transformToBooleanFromString)
    @IsDefined()
    @IsBoolean()
    isDraft: boolean;
}
