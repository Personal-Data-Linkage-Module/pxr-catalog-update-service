/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * 変更セットステータス
 */
export namespace UpdateSetDomain {
    /**
     * 登録(0)
     */
    export const REGIST: number = 0;

    /**
     * 承認済み(1)
     */
    export const APPROVAL: number = 1;

    /**
     * 否認済み(2)
     */
    export const DENY: number = 2;

    /**
     * 申請中(3)
     */
    export const REQUEST: number = 3;

    /**
     * 申請キャンセル(4)
     */
    export const CANCEL: number = 4;
}
