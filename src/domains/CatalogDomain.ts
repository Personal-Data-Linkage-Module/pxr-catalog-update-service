/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
/* eslint-enable */

/**
 * カタログ ドメインオブジェクト
 */
export default class CatalogDomain {
    /** Block名称 */
    blockName: string;

    /** カタログコード */
    code: number;

    /** カタログバージョン */
    version: number;

    /** ドメイン */
    domain: string;

    /** アクター種別 */
    actorName: string;

    /** ブロックコード */
    mainBlockCode: number;

    /** ブロックバージョン */
    mainBlockVersion: number;

    /** レスポンスデータ */
    rawData: any;

    /**
     * レスポンスをパース、自身を生成する
     * @param data カタログサービスからのレスポンス
     */
    static parseRawData (data: any): CatalogDomain {
        const domain = new CatalogDomain();
        domain.blockName = data.catalogItem.name;
        domain.code = data.catalogItem._code._value;
        domain.version = data.catalogItem._code._ver;
        domain.domain = data.template['base-url'];
        domain.rawData = data;
        return domain;
    }
}
