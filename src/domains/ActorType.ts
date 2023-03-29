/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * アクター種別用ドメインオブジェクト
 */
export default class ActorType {
    /** PXR-Root */
    static readonly PXR_ROOT = 'pxr-root';

    /** 流通制御 */
    static readonly REGION_ROOT = 'region-root';

    /** アプリケーション */
    static readonly APP = 'app';

    /** WF */
    static readonly WF = 'wf';

    /** データトレーダー */
    static readonly DATA_TRADER = 'data-trader';

    /** コンシューマー */
    static readonly CONSUMER = 'consumer';

    /** 配列 */
    static readonly TYPE_ARRAY = [
        ActorType.PXR_ROOT,
        ActorType.REGION_ROOT,
        ActorType.APP
    ];
}
