/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import NotificationType from "./NotificationType";
import OperatorType from "./OperatorType";
/* eslint-enable */

/**
 * 通知サービス呼び出し用 ドメインオブジェクト
 */
export default class NotificationDomain {
    type: 0 | 1 | NotificationType;

    title: string;

    content: string;

    attribute?: object;

    category: {
        _value: number;

        _ver: number;
    }

    destination: {
        blockCode: number;

        operatorType: 0 | 1 | 2 | 3 | OperatorType;

        isSendAll: boolean;

        operatorId?: number[];

        userId?: string[];
    }

    approval?: {
        noticeBlockCode: number;

        noticeUrl: string;

        expirationAt?: Date;
    }
}
