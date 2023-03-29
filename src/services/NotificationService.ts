/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import NotificationDomain from '../domains/NotificationDomain';
import OperatorDomain from '../domains/OperatorDomain';
import { doRequest } from '../common/DoRequest';
import AppError from '../common/AppError';
import { DateTimeFormatString } from '../common/Transform';
/* eslint-enable */
import Config from '../common/Config';
import config = require('config');
import moment = require('moment');
const Message = Config.ReadConfig('./config/message.json');

export default class NotificationService {
    /**
     * 通知サービスへの連携を行う
     * @param details 通知データ
     * @param operator
     */
    static async linkage (
        details: NotificationDomain[], operator: OperatorDomain
    ) {
        try {
            for (const detail of details) {
                const data = JSON.stringify(detail);
                const result = await doRequest(
                    config.get('notificationService.add'),
                    data,
                    operator,
                    'post'
                );
                const { statusCode } = result.response;
                if (statusCode !== 200) {
                    throw new AppError(
                        Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE,
                        500
                    );
                }
                if (detail.type === 1) {
                    return moment(
                        result.body.approval.expirationAt,
                        DateTimeFormatString
                    ).toDate();
                }
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.FAILED_LINKAGE_TO_NOTIFICATION_SERVICE, 500, err);
        }
    }
}
