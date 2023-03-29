/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsDefined, IsNumber, IsOptional, IsString, Equals, IsEmpty, ValidateNested } from "class-validator";
import { UpdateSetType } from "../../common/UpdateSet";
/* eslint-enable */

export class CatalogItem {
    @IsOptional()
    @IsString()
    ns: string = null;

    @IsOptional()
    @IsString()
    name: string = null;

    @IsOptional()
    @IsString()
    description: string = null;

    @IsEmpty()
    _code: number = null;

    @IsOptional()
    inherit: {} = null;

    /**
     * コンストラクタ
     * @param info
     */
    public constructor (info: {}) {
        if (info) {
            this.ns = info['ns'] ? info['ns'] : null;
            this.name = info['name'] ? info['name'] : null;
            this.description = info['description'] ? info['description'] : null;
            this._code = info['_code'] ? info['_code'] : null;
            this.inherit = info['inherit'] ? info['inherit'] : null;
        }
    }
}

export class Catalog {
    @IsOptional()
    @Transform(catalogItem => catalogItem ? new CatalogItem(catalogItem) : null)
    catalogItem: CatalogItem = null;

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

export class CatalogObject {
    @IsOptional()
    @IsNumber()
    @Equals(UpdateSetType.ADD)
    type: number = null;

    @IsEmpty()
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

/**
 * Region開始終了申請DTO
 */
export default class RegionReqDto {
    /** ID */
    @IsOptional()
    @IsNumber()
    id: number;

    /** 名称 */
    @IsDefined()
    @IsString()
    name: string = null;

    /** 説明 */
    @IsOptional()
    @IsString()
    description: string = null;

    /** カタログリスト */
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Transform(catalogList => {
        let list: CatalogObject[] = null;
        if (catalogList && Array.isArray(catalogList)) {
            list = [];
            for (let index = 0; index < catalogList.length; index++) {
                list.push(new CatalogObject(catalogList[index]));
            }
        } else {
            return catalogList;
        }
        return list;
    })
    catalogObject: CatalogObject[] = null;

    /** その他 */
    @IsOptional()
    appendix: {} = null;

    /** 下書きフラグ */
    @IsDefined()
    @IsBoolean()
    isDraft: boolean = null;
}
