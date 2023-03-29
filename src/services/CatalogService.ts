/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { sprintf } from 'sprintf-js';
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../common/AppError';
import Config from '../common/Config';
import { doPostRequest, doGetRequest, doRequest, doDeleteRequest } from '../common/DoRequest';
import ActorType from '../domains/ActorType';
import CatalogDomain from '../domains/CatalogDomain';
import NsDomain from '../domains/NsDomain';
import OperatorDomain from '../domains/OperatorDomain';
import UpdateSetRequestPostResDto from '../resources/dto/UpdateSetRequestPostResDto';
import UpdateSetApprovalPostResDto from '../resources/dto/UpdateSetApprovalPostResDto';
import configYaml = require('config');
import request = require('request');
/* eslint-enable */
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

/**
 * カタログサービスとの連携クラス
 */
export default class CatalogService {
    /** アクター名の正規表現 */
    static ACTOR_NAME_SPACE = /^catalog\/.*\/actor\/(.*)$/;

    /** アクター名の正規表現 */
    static BLOCK_NAME_SPACE = /^catalog\/.*\/block\/(.*)$/;

    static async takeActorType (ns: string) {
        return ns.match(this.ACTOR_NAME_SPACE)[1];
    }

    /**
     * アクターコードのメインブロックコードのみ取得する
     * @param code コード
     */
    static async searchBlockCatalogWithActorCode (
        operator: OperatorDomain,
        code: number
    ) {
        const catalog = await this.searchActorCatalog(operator, code);
        return catalog.mainBlockCode;
    }

    /**
     * ネームスペース指定でPXR-ROOTのアクターカタログを取得する
     */
    static async getPxrRootCatalog (operator: OperatorDomain) {
        const ns = sprintf(
            configYaml.get('catalog.ns'),
            configYaml.get('catalog.extName'),
            ActorType.PXR_ROOT
        );
        const d = (await this.get(operator, null, ns)) as CatalogDomain[];
        return d;
    }

    /**
     * Regionの管理カタログを取得する
     * @param region
     */
    static async getRegionRoot (
        region: CatalogDomain,
        operator: OperatorDomain
    ) {
        const str = region.rawData.catalogItem.ns.match(/.*\/region-root\/actor_(\d+)\/.*/);
        if (!Array.isArray(str) || !str[1]) {
            throw new AppError(message.NOT_REGION_CATALOG, 400);
        }
        const catalog = await this.get(operator, Number(str[1]), null) as CatalogDomain;
        return catalog.rawData.template['main-block']._value;
    }

    /**
     * カタログ更新を実行する
     * @param code
     * @param data
     * @param operator
     */
    static async update (
        code: number | string,
        data: any,
        operator: OperatorDomain
    ) {
        const result = await doRequest(
            configYaml.get('catalogService.get') + `ext/${code}`,
            JSON.stringify(data), operator, 'put'
        );
        if (result.response.statusCode !== 200) {
            throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
        }
        return result.body;
    }

    /**
     * アクター種別のカタログを検索する
     * @param code コード
     */
    static async searchActorCatalog (operator: OperatorDomain, code: number) {
        const catalog = (await this.get(operator, code)) as CatalogDomain;
        const ns = (catalog.rawData.catalogItem.ns + '')
            .match(this.ACTOR_NAME_SPACE);
        if (!ns) {
            throw new AppError(sprintf(message.THIS_IS_NOT_ACTOR_CATALOG, code), 400);
        }
        catalog.actorName = ns[1];
        catalog.mainBlockCode = parseInt(
            catalog.rawData.template['main-block']
                ? catalog.rawData.template['main-block']._value
                : 0
        );
        catalog.mainBlockVersion = parseInt(
            catalog.rawData.template['main-block']
                ? catalog.rawData.template['main-block']._ver
                : 0
        );
        return catalog;
    }

    /**
     * カタログコードから、カタログサービスよりカタログ情報を取得する
     * @param code カタログコード
     */
    static async get (operator: OperatorDomain, code: number, ns?: string) {
        const url = configYaml.get('catalogService.get') + '' + (code || `?ns=${ns}`);
        try {
            const result = await doGetRequest(url, {
                headers: {
                    accept: 'application/json',
                    session: operator.encoded
                }
            });
            const { statusCode } = result.response;
            if (statusCode === 204 || statusCode === 400) {
                throw new AppError(sprintf(message.NOT_EXISTS_CATALOG, code), 400);
            } else if (statusCode !== 200) {
                throw new AppError(message.FAILED_CATALOG_SERVICE, 500);
            }
            // nsで取得の場合
            if (Array.isArray(result.body)) {
                const domains: CatalogDomain[] = [];
                for (const elem of result.body) {
                    domains.push(CatalogDomain.parseRawData(elem));
                }
                return domains;
            }
            // codeで取得の場合
            const domain = CatalogDomain.parseRawData(result.body);
            return domain;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * カタログ情報取得
     */
    static async getCatalogByCode (operator: OperatorDomain, code: number, version?: number): Promise<CatalogDomain> {
        const url = configYaml.get('catalogService.get') + '' + code + (version ? '/' + version : '');
        try {
            const result = await doGetRequest(url, {
                headers: {
                    accept: 'application/json',
                    session: operator.encoded
                }
            });
            const { statusCode } = result.response;
            if (statusCode === 204 || statusCode === 400) {
                throw new AppError(sprintf(message.NOT_EXISTS_CATALOG, code), 400);
            } else if (statusCode !== 200) {
                throw new AppError(message.FAILED_CATALOG_SERVICE, 500);
            }
            const domain = CatalogDomain.parseRawData(result.body);
            return domain;
        } catch (err) {
            // エラー時の分岐はUTでは通らない(CatalogService内の別メソッドで先にエラー送出するため)
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * カタログ複数取得
     * @param catalogDto
     */
    static async getCatalogInfos (codes: any[], operator: OperatorDomain): Promise<any> {
        // URLを生成
        const url = configYaml.get('catalogService.get') + '';
        const body = JSON.stringify(codes);
        const options = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                session: operator.encoded
            },
            body: body
        };

        try {
            // カタログサービスからカタログを取得
            const result = await doPostRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === 400) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_SERVICE, 400);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_SERVICE, 500);
            } else if (result.response.statusCode !== 200) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_SERVICE, 401);
            }
            // カタログ情報を戻す
            return result.body;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * カタログ登録を実行する
     * @param data
     * @param operator
     */
    static async extAdd (
        data: any,
        operator: OperatorDomain
    ) {
        const url = configYaml.get('catalogService.ext') + '';
        const body = JSON.stringify(data);
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            },
            body: body
        };
        options.headers.session = operator.encoded;

        try {
            // POST実行
            const result = await doPostRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
            }
            return result.body;
        } catch (err) {
            // エラー時の分岐はUTでは通らない(CatalogService内の別メソッドで先にエラー送出するため)
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * カタログ更新を実行する
     * @param code
     * @param operator
     */
    static async extDelete (
        code: number,
        operator: OperatorDomain
    ) {
        const url = configYaml.get('catalogService.ext') + '/' + code;
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        options.headers.session = operator.encoded;

        try {
            // POST実行
            const result = await doDeleteRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
            }
            return result.body;
        } catch (err) {
            // エラー時の分岐はUTでは通らない(CatalogService内の別メソッドで先にエラー送出するため)
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * 拡張ネームスペース登録
     * @param ns
     * @param operator
     */
    static async addExtNs (ns: NsDomain, operator: OperatorDomain) {
        try {
            const url = configYaml.get('catalogService.addExtNs') + '';
            const data = JSON.stringify(ns.toJson());
            const options: request.CoreOptions = {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                },
                body: data
            };
            options.headers.session = operator.encoded;

            // POST実行
            const result = await doPostRequest(url, options);
            // ステータスコードにより、ハンドリング
            const { statusCode } = result.response;
            if (statusCode === 204 || statusCode === 400) {
                throw new AppError(sprintf(message.FAILED_TO_ADD_NS, ns.ns), 400);
            } else if (statusCode !== 200) {
                throw new AppError(message.FAILED_CATALOG_SERVICE, 500);
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * カタログ更新を実行する
     * @param code
     * @param data
     * @param operator
     */
    static async actorUpdate (
        data: any,
        operator: OperatorDomain
    ) {
        const url = configYaml.get('catalogService.ext') + '';
        const body = JSON.stringify(data);
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            },
            body: body
        };
        options.headers.session = operator.encoded;

        try {
            // POST実行
            const result = await doPostRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
            }
            return result.body;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * アクター個別設定を取得する
     * @param operator
     * @param actorType
     * @param actorCode
     */
    static async getActorSettings (operator: OperatorDomain, actorType: string, actorCode: number) {
        try {
            // ネームスペースを生成
            const ns = sprintf(
                configYaml.get('catalog.actorSettingNs'),
                configYaml.get('catalog.extName'),
                actorType,
                actorCode
            );

            const url = configYaml.get('catalogService.get') + `?ns=${ns}`;
            const result = await doGetRequest(url, {
                headers: {
                    accept: 'application/json',
                    session: operator.encoded
                }
            });
            const { statusCode } = result.response;
            const domains: CatalogDomain[] = [];
            // 設定カタログが無い場合は空で返す
            if (statusCode === 404) {
                return domains;
            } else if (statusCode !== 200) {
                throw new AppError(message.FAILED_CATALOG_SERVICE, 500);
            }
            for (const index in result.body) {
                const elem = result.body[index];
                domains.push(CatalogDomain.parseRawData(elem));
            }
            return domains;
        } catch (err) {
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * カタログ取得
     * @param operator オペレーター
     */
    static async getName (operator: OperatorDomain): Promise<any> {
        const url = config['app']['catalog']['getName'];
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        options.headers.session = operator.encoded;

        try {
            // GET実行
            const result = await doGetRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.GET_CATALOG_NAME_FAILED, 500);
            }
            return result.body;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * 変更セット登録
     * @param operator オペレーター
     * @param requestBody リクエストボディ
     */
    static async postUpdateSetRegister (operator: OperatorDomain, requestBody: any): Promise<UpdateSetRequestPostResDto> {
        const url = config['app']['catalog']['postUpdateSetRegister'];
        const body = JSON.stringify(requestBody);
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            },
            body: body
        };
        options.headers.session = operator.encoded;

        try {
            // POST実行
            const result = await doPostRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
            }
            // レスポンスクラスに変換
            const dto = (await transformAndValidate(UpdateSetRequestPostResDto, result.body)) as UpdateSetRequestPostResDto;
            return dto;
        } catch (err) {
            // エラー時の分岐はUTでは通らない(CatalogService内の別メソッドで先にエラー送出するため)
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * 変更セット申請
     * @param operator オペレーター
     * @param id 変更セットid
     * @param approvalActor 承認アクターコード
     */
    static async postUpdateSetRequest (operator: OperatorDomain, id: number, approvalActor: number): Promise<UpdateSetRequestPostResDto> {
        const url = config['app']['catalog']['postUpdateSetRequest'];
        const body = JSON.stringify({
            id: id,
            approvalActor: approvalActor
        });
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            },
            body: body
        };
        options.headers.session = operator.encoded;

        try {
            // POST実行
            const result = await doPostRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
            }
            // レスポンスクラスに変換
            const dto = (await transformAndValidate(UpdateSetRequestPostResDto, result.body)) as UpdateSetRequestPostResDto;
            return dto;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }

    /**
     * 変更セット承認
     * @param operator オペレーター
     * @param id 変更セットid
     * @param approvalActor 承認アクターコード
     */
    static async postUpdateSetApproval (operator: OperatorDomain, id: number, status: number, comment: string): Promise<UpdateSetApprovalPostResDto> {
        const url = config['app']['catalog']['postUpdateSetApproval'] + id;
        const body = JSON.stringify({
            status: status,
            comment: comment
        });
        const options: request.CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            },
            body: body
        };
        options.headers.session = operator.encoded;

        try {
            // POST実行
            const result = await doPostRequest(url, options);
            if (result.response.statusCode !== 200) {
                throw new AppError(message.CATALOG_UPDATE_FAILED, 500);
            }
            // レスポンスクラスに変換
            const dto = (await transformAndValidate(UpdateSetApprovalPostResDto, result.body)) as UpdateSetApprovalPostResDto;
            return dto;
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            // この分岐はUTでは通らない(CatalogService内の別メソッドで先にエラー送出するため)
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, 500, err);
        }
    }
}
