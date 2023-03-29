/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from "../../domains/OperatorDomain";
/* eslint-enable */

export default class StoreEventServiceDto {
    /**
     * operator
     */
    private operator: OperatorDomain;

    /**
     * 蓄積イベント通知カタログコード
     */
    private notificateCatalogCode: number;

    /**
     * catalog
     */
    private catalog: any;

    /**
     * requestBody
     */
    private requestBody: any;

    /**
     * オペレーター取得
     */
    public getOperator (): OperatorDomain {
        return this.operator;
    }

    /**
     * オペレーター設定
     */
    public setOperator (operator: OperatorDomain) {
        this.operator = operator;
    }

    /**
     * 蓄積イベント通知カタログコード取得
     */
    public getNotificateCatalogCode (): number {
        return this.notificateCatalogCode;
    }

    /**
     * 蓄積イベント通知カタログコード設定
     */
    public setNotificateCatalogCode (notificateCatalogCode: number) {
        this.notificateCatalogCode = notificateCatalogCode;
    }

    /**
     * カタログ取得
     */
    public getCatalog (): any {
        return this.catalog;
    }

    /**
     * カタログ設定
     */
    public setCatalog (catalog: any) {
        this.catalog = catalog;
    }

    /**
     * リクエストボディ取得
     */
    public getRequestBody (): any {
        return this.requestBody;
    }

    /**
     * リクエストボディ設定
     */
    public setRequestBody (requestBody: any) {
        this.requestBody = requestBody;
    }
}
