/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as crypto from 'crypto';
import EntityOperation from '../repositories/EntityOperation';
import config = require('config');

/**
 * UUID生成
 */
export default class Generator {
    /**
     * 認証コードを生成
     * 1: 認定
     * 2: 参加
     * 3: 提携
     * @param type
     */
    static async authCode (type: number) {
        // 文字数
        const acl = parseInt(config.get('authCodeLength'));
        // 候補
        const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        let authCode: string = null;
        do {
            // 認証コードを生成
            authCode = Array.from(crypto.randomFillSync(new Uint8Array(acl))).map((n) => c[n % c.length]).join('');

            // 存在確認
            const exists = await EntityOperation.isAuthCodeExists(type, authCode);
            if (exists > 0) {
                authCode = null;
            }
        } while (authCode == null);

        return authCode;
    }
}
