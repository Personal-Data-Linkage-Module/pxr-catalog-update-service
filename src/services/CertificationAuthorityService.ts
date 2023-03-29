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
 * 認証局サービスへのリクエスト
 */
export default class CertificationAuthorityService {
    /**
     * クライアント証明書を発行する
     * @param actorName
     * @param actorCode
     * @param actorVersion
     * @param blockCode
     * @param blockVersion
     * @param operator
     */
    static async createClient (
        actorName: string,
        actorCode: number,
        actorVersion: number,
        blockCode: number,
        blockVersion: number,
        operator: OperatorDomain
    ): Promise<ClientCertificate> {
        const data = JSON.stringify({
            certType: 'client',
            actorName: actorName,
            actor: {
                value: actorCode,
                ver: actorVersion
            },
            block: {
                value: blockCode,
                ver: blockVersion
            }
        });
        try {
            const result = await doRequest(
                config.get('certificationAuthorityService.clientIssuance'),
                data,
                operator,
                'post'
            );
            const { statusCode } = result.response;
            if (statusCode !== 200) {
                throw new AppError(Message.FAILED_CLIENT_CERTIFICATE, 500);
            }
            const info = new ClientCertificate();
            info.serialNo = result.body.serialNo;
            info.fingerPrint = result.body.fingerPrint;
            return info;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY, 500, err);
        }
    }

    /**
     * クライアント証明書を失効させる
     * @param serialNo
     * @param fingerPrint
     * @param operator
     */
    static async revokeClientCertificate (serialNo: string, fingerPrint: string, operator: OperatorDomain) {
        try {
            const url = sprintf(config.get('certificationAuthorityService.clientRevoke'), serialNo, fingerPrint);

            const result = await doRequest(
                url, '', operator, 'delete'
            );
            const { statusCode } = result.response;
            if (statusCode !== 200) {
                throw new AppError(Message.FAILED_REVODE_CLIENT_CERTIFICATE, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY, 500, err);
        }
    }

    /**
     * アクターコードを指定して証明書リストを取得
     * @param actorCode
     * @param operator
     */
    static async getCertByActorCode (actorCode: number, operator: OperatorDomain) {
        try {
            const url = sprintf(config.get('certificationAuthorityService.certListByActorCode'), actorCode);

            const result = await doRequest(
                url, '', operator, 'get'
            );
            const { statusCode } = result.response;
            if (statusCode !== 200) {
                throw new AppError(Message.FAILED_GET_CERTIFICATE, 500);
            }
            return result.body;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.FAILED_CONNECT_TO_CERTIFICATION_AUTHORITY, 500, err);
        }
    }
}
