/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../domains/OperatorDomain';
import { doRequest } from '../common/DoRequest';
import ClientCertificate from './dto/ClientCertificate';
import AppError from '../common/AppError';
/* eslint-enable */
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
import config = require('config');
const Message = Config.ReadConfig('./config/message.json');

/**
 * 証明書管理サービスへのリクエスト
 */
export default class CertificateManageService {
    /**
     * 証明書を失効させる
     * @param serialNo
     * @param fingerPrint
     * @param operator
     */
    static async revokeCertificate (block: number, serialNo: string, fingerPrint: string, operator: OperatorDomain) {
        try {
            let path: string = config.get('certificateManageService.revokeCertificate');
            path = path.replace('{blockCode}', block.toString());
            const url = sprintf(path, serialNo, fingerPrint);

            const result = await doRequest(
                url, '', operator, 'delete'
            );
            const { statusCode } = result.response;
            if (statusCode !== 200) {
                throw new AppError(Message.FAILED_REVODE_CERTIFICATE, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.FAILED_CONNECT_TO_CERTIFICATE_MANAGE, 500, err);
        }
    }
}
