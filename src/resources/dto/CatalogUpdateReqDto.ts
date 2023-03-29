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
    Max
} from 'class-validator';
/* eslint-enable */
import { Transform } from 'class-transformer';
import { UpdateSetType } from '../../common/UpdateSet';
import { transformToNumber } from '../../common/Transform';

/**
 * PUT: 利用規約更新
 */
export class CodeVersionObject {
    @Transform(transformToNumber)
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    _value: number;

    @Transform(transformToNumber)
    @IsNumber()
    @IsOptional()
    _ver: number;
}

export class NameSpace {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    ns: string = null;

    @IsOptional()
    @IsString()
    description: string = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.ns = info['ns'] ? info['ns'] : null;
            this.description = info['description'] ? info['description'] : null;
        }
    }
}

export class NameSpaceType {
    @IsOptional()
    @IsNotEmpty()
    @Transform(type => parseInt(type))
    @IsNumber()
    @Min(UpdateSetType.ADD)
    @Max(UpdateSetType.DELETE)
    type: number = null;

    @IsOptional()
    @IsNumber()
    nsId: number = null;

    @IsOptional()
    @IsString()
    comment: string = null;

    @IsOptional()
    @ValidateNested()
    @Transform(template => template ? new NameSpace(template) : null)
    template: NameSpace = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.type = info['type'] || info['type'] === 0 ? info['type'] : null;
            this.nsId = info['nsId'] || info['nsId'] === 0 ? info['nsId'] : null;
            this.comment = info['comment'] ? info['comment'] : null;
            this.template = info['template'] ? info['template'] : null;
        }
    }
}

export class Catalog {
    @IsOptional()
    @IsNotEmpty()
    catalogItem: {} = null;

    @IsOptional()
    template: {} = null;

    @IsOptional()
    inner: {} = null;

    @IsOptional()
    attribute: {} = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.catalogItem = info['catalogItem'] ? info['catalogItem'] : null;
            this.template = info['template'] ? info['template'] : null;
            this.inner = info['inner'] ? info['inner'] : null;
            this.attribute = info['attribute'] ? info['attribute'] : null;
        }
    }
}
export class CatalogType {
    @IsOptional()
    @IsNotEmpty()
    @Transform(type => parseInt(type))
    @IsNumber()
    @Min(UpdateSetType.ADD)
    @Max(UpdateSetType.DELETE)
    type: number = null;

    @IsOptional()
    @IsNumber()
    catalogCode: number = null;

    @IsOptional()
    @IsString()
    comment: string = null;

    @IsOptional()
    @ValidateNested()
    @Transform(template => template ? new Catalog(template) : null)
    template: Catalog = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.type = info['type'] || info['type'] === 0 ? info['type'] : null;
            this.catalogCode = info['catalogCode'] || info['catalogCode'] === 0 ? info['catalogCode'] : null;
            this.comment = info['comment'] ? info['comment'] : null;
            this.template = info['template'] ? info['template'] : null;
        }
    }
}

export default class CatalogUpdateReqDto {
    /**
     * 名称
     */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string = null;

    /**
     * 説明
     */
    @IsOptional()
    @IsString()
    description: string = null;

    /**
     * カタログリスト
     */
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Transform(catalogList => {
        let list: CatalogType[] = null;
        if (catalogList && Array.isArray(catalogList)) {
            list = [];
            for (let index = 0; index < catalogList.length; index++) {
                list.push(new CatalogType(catalogList[index]));
            }
        } else {
            return catalogList;
        }
        return list;
    })
    catalog: CatalogType[] = null;

    /**
     * その他
     */
    @IsOptional()
    appendix: {} = null;

    /**
     * 下書き
     */
    @IsOptional()
    @IsBoolean()
    isDraft: boolean = null;
}
