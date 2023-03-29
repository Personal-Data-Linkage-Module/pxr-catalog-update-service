/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * ネームスペース ドメインオブジェクト
 */
export default class NsDomain {
    /**
     * ネームスペース
     */
    ns: string;

    /**
     * 説明
     */
    description: string;

    public toJson () {
        return {
            ns: this.ns,
            description: this.description
        };
    }
}
