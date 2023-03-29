/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../domains/OperatorDomain';
import AppError from '../common/AppError';
import config = require('config');
import request = require('request');
import { doPostRequest } from '../common/DoRequest';
import { transformAndValidate } from 'class-transformer-validator';
import ConfigReader from '../common/Config';
import BookListElement from './dto/BookListElement';
import CooperateUser from './dto/CooperateUser';
import BookManageDto from './dto/BookManageDto';
/* eslint-enable */
const Message = ConfigReader.ReadConfig('./config/message.json');
const Configure = ConfigReader.ReadConfig('./config/config.json');

export default class {
    static async postSettingsUpdate (codes: any[], operator: OperatorDomain) {
        const url = 'http://localhost:3005/book-manage/settings/update';
        const body = JSON.stringify({
            codes: codes
        });
        const option: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(body),
                session: operator.encoded
            },
            body: body
        };

        try {
            await doPostRequest(url, option);
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.CANT_CONNECT_TO_BOOK_MANAGE, 500, err);
        }
    }

    /**
     * PF利用規約更新通知登録
     * @param code
     * @param version
     * @param type
     * @param operator
     */
    static async updatePlatformTermOfUsePlatform (code: number, version: number, operator: OperatorDomain) {
        const url = 'http://localhost:3005/book-manage/term_of_use/platform/update';
        const body = JSON.stringify({
            code: code,
            version: version
        });
        const option: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(body),
                session: operator.encoded
            },
            body: body
        };

        try {
            const result = await doPostRequest(url, option);
            if (result.response.statusCode !== 200) {
                throw new AppError(Message.FAILED_UPDATE_TERMS_OF_USE, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.CANT_CONNECT_TO_BOOK_MANAGE, 500, err);
        }
    }

    /**
     * Region利用規約更新通知登録
     * @param code
     * @param version
     * @param type
     * @param operator
     */
    static async updateRegionTermOfUsePlatform (code: number, version: number, operator: OperatorDomain) {
        const url = 'http://localhost:3005/book-manage/term_of_use/region/update';
        const body = JSON.stringify({
            code: code,
            version: version
        });
        const option: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(body),
                session: operator.encoded
            },
            body: body
        };

        try {
            const result = await doPostRequest(url, option);
            if (result.response.statusCode !== 200) {
                throw new AppError(Message.FAILED_UPDATE_TERMS_OF_USE, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.CANT_CONNECT_TO_BOOK_MANAGE, 500, err);
        }
    }

    /**
     * 蓄積イベント通知定義更新
     */
    static async updateStoreEvent (dto: BookManageDto) {
        const url = Configure['app']['book_manage']['base_url'] + '/store-event';
        const body = JSON.stringify({
            type: dto.getType(),
            notificateCatalog: {
                _value: dto.getNotificateCatalogCode(),
                _ver: dto.getNotificateCatalogVersion()
            },
            shareCode: {
                _value: dto.getShareCode(),
                _ver: dto.getShareVersion()
            },
            shareUUID: dto.getShareUuid()
        });
        const option: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(body),
                session: dto.getOperator().encoded
            },
            body: body
        };

        try {
            const result = await doPostRequest(url, option);
            if (result.response.statusCode !== 200) {
                throw new AppError(Message.FAILED_UPDATE_STORE_EVENT, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.CANT_CONNECT_TO_BOOK_MANAGE, 500, err);
        }
    }

    /**
     * Region終了対象追加
     */
    static async postRegionClose (dto: BookManageDto) {
        const url = Configure['app']['book_manage']['base_url'] + '/region/close';
        const body = JSON.stringify({
            actor: {
                _value: dto.getApplicantActorCode(),
                _ver: dto.getApplicantActorVersion()
            },
            region: {
                _value: dto.getRegionCatalogCode(),
                _ver: dto.getRegionCatalogVersion()
            },
            endDate: dto.getEndDate()
        });
        const option: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(body),
                session: dto.getOperator().encoded
            },
            body: body
        };
        try {
            const result = await doPostRequest(url, option);
            if (result.response.statusCode !== 200) {
                throw new AppError(Message.FAILED_ADD_REGION_CLOSE, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(Message.CANT_CONNECT_TO_BOOK_MANAGE, 500, err);
        }
    }
}
