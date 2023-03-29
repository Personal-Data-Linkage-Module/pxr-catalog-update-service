/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */
/* eslint-disable */
import OperatorDomain from '../../domains/OperatorDomain';
/* eslint-enable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。

/**
 * カタログ操作データ
 */
export default class CatalogUpdateServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * リクエスト
     */
    private requestBody: {} = null;

    /**
     * 名称
     */
    private name: string = null;

    /**
     * 説明
     */
    private description: string = null;

    /**
     * カタログリスト
     */
    private catalogList: {}[] = null;

    /**
     * その他
     */
    private appendix: {} = null;

    /**
     * 下書き
     */
    private isDraft: boolean = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getRequestBody (): {} {
        return this.requestBody;
    }

    public setRequestBody (requestBody: {}): void {
        this.requestBody = requestBody;
    }

    public getName (): string {
        return this.name;
    }

    public setName (name: string): void {
        this.name = name;
    }

    public getDescription (): string {
        return this.description;
    }

    public setDescription (description: string): void {
        this.description = description;
    }

    public getCatalogList (): {}[] {
        return this.catalogList;
    }

    public setCatalogList (catalogList: {}[]): void {
        this.catalogList = catalogList;
    }

    public getAppendix (): {} {
        return this.appendix;
    }

    public setAppendix (appendix: {}): void {
        this.appendix = appendix;
    }

    public getIsDraft (): boolean {
        return this.isDraft;
    }

    public setIsDraft (isDraft: boolean): void {
        this.isDraft = isDraft;
    }
}
