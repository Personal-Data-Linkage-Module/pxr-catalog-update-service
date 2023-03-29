/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * オペレーター ドメインオブジェクト
 */
export default class OperatorDomain {
    /** 個人メンバーのセッションキー */
    public static readonly TYPE_PERSONAL_KEY = 'operator_type0_session';

    /** アプリケーションメンバーのセッションキー */
    public static readonly TYPE_APPLICATION_KEY = 'operator_type2_session';

    /** 運営メンバーのセッションキー */
    public static readonly TYPE_MANAGER_KEY = 'operator_type3_session';

    /** 個人メンバーの種別ナンバー */
    public static readonly TYPE_PERSONAL_NUMBER = 0;

    /** アプリケーションメンバーの種別メンバー */
    public static readonly TYPE_APPLICATION_NUMBER = 2;

    /** 運営メンバーの種別メンバー */
    public static readonly TYPE_MANAGER_NUMBER = 3;

    /** セッションID    */
    sessionId?: string;

    /** オペレーターID */
    operatorId: number;

    /** オペレーター種別 */
    type: number;

    /** ログインID */
    loginId: string;

    /** オペレーター名 */
    name: string;

    /** 権限情報 */
    auth?: any;

    /** ブロックカタログコード */
    blockCode?: number;

    /** ブロックカタログバージョン */
    blockVersion?: number;

    /** アクターカタログコード */
    actorCode?: number;

    /** アクターカタログバージョン */
    actorVersion?: number;

    /** PXR-ID */
    pxrId?: string;

    /** レスポンスをURIエンコードした結果 */
    encoded: string;

    constructor (obj: any, rawData?: string) {
        this.sessionId = obj.sessionId;
        this.operatorId = parseInt(obj.operatorId);
        this.type = parseInt(obj.type);
        this.loginId = obj.loginId;
        this.name = obj.name;
        this.auth = obj.auth;
        if (obj.block && typeof obj.block === 'object') {
            this.blockCode = obj.block._value ? parseInt(obj.block._value) : null;
            this.blockVersion = obj.block._ver ? parseInt(obj.block._ver) : null;
        }
        if (obj.actor && typeof obj.actor === 'object') {
            this.actorCode = obj.actor._value ? parseInt(obj.actor._value) : null;
            this.actorVersion = obj.actor._ver ? parseInt(obj.actor._ver) : null;
        }
        this.pxrId = obj.pxrId;

        this.encoded = rawData || encodeURIComponent(JSON.stringify(obj));
    }
}
