/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CatalogUpdateServiceDto from './dto/CatalogUpdateServiceDto';
import OperatorDomain from '../domains/OperatorDomain';
/* eslint-enable */
import CatalogService from './CatalogService';
import Config from '../common/Config';
import AppError from '../common/AppError';
import BookManageService from './BookManageService';
import EntityOperation from '../repositories/EntityOperation';
import PlatformTermsOfUseManage from '../repositories/postgres/PlatformTermsOfUseManage';
import RegionTermsOfUseManage from '../repositories/postgres/RegionTermsOfUseManage';
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');
const moment = require('moment-timezone');

/**
 * カタログ更新サービス
 */
export default class CatalogUpdateService {
    readonly PLATFORM_TERM_OF_USE = 1;
    readonly REGION_TERM_OF_USE = 2;

    /**
     * PF利用規約作成
     * @param serviceDto
     */
    async addPlatformTermsOfUse (serviceDto: CatalogUpdateServiceDto) {
        const res = await this.addTermsOfUse(serviceDto, this.PLATFORM_TERM_OF_USE);
        return res;
    }

    /**
     * PF利用規約更新
     * @param serviceDto
     */
    async updatePlatformTermsOfUse (serviceDto: CatalogUpdateServiceDto) {
        const res = await this.updateTermsOfUse(serviceDto, this.PLATFORM_TERM_OF_USE);
        return res;
    }

    /**
     * Region利用規約作成
     * @param serviceDto
     */
    async addRegionTermsOfUse (serviceDto: CatalogUpdateServiceDto) {
        const res = await this.addTermsOfUse(serviceDto, this.REGION_TERM_OF_USE);
        return res;
    }

    /**
     * Region利用規約更新
     * @param serviceDto
     */
    async updateRegionTermsOfUse (serviceDto: CatalogUpdateServiceDto) {
        const res = await this.updateTermsOfUse(serviceDto, this.REGION_TERM_OF_USE);
        return res;
    }

    /**
     * 利用規約作成
     * @param serviceDto
     * @param termOfUseType
     * リファクタ履歴
     *  separate: checkParameter (複雑度緩和のため)
     */
    private async addTermsOfUse (serviceDto: CatalogUpdateServiceDto, termOfUseType: number) {
        const operator = serviceDto.getOperator();
        const requestBody = serviceDto.getRequestBody();
        const catalogList = serviceDto.getCatalogList();
        const isDraft = serviceDto.getIsDraft();
        const template = JSON.parse(JSON.stringify(requestBody));
        delete template['isDraft'];
        let catalogCode;
        let catalogVer;

        if (!isDraft) {
            // カタログのパラメータをチェック
            await this.checkParameter(operator, termOfUseType, catalogList, 'add');

            // カタログサービス 変更セット登録APIを呼び出す
            const updateSetRegisterRes = await CatalogService.postUpdateSetRegister(operator, template);

            // カタログサービス 変更セット申請APIを呼び出す
            const updateSetApplicationRes = await CatalogService.postUpdateSetRequest(operator, updateSetRegisterRes['id'], operator.actorCode);
            requestBody['catalog'][0]['template']['catalogItem']['_code'] = updateSetApplicationRes['catalog'][0]['template']['catalogItem']['_code'];
        } else {
            for (const catalog of catalogList) {
                if (catalog['catalogCode']) {
                    catalogCode = Number(catalog['catalogCode']);
                }
                if (catalog['template']['catalogItem'] && catalog['template']['catalogItem']['_code'] && catalog['template']['catalogItem']['_code']['_ver']) {
                    catalogVer = catalog['template']['catalogItem']['_code']['_ver'];
                }
            }
        }

        // 利用規約管理を登録する
        const entity = termOfUseType === this.PLATFORM_TERM_OF_USE ? new PlatformTermsOfUseManage() : new RegionTermsOfUseManage();
        entity.termsOfUseCode = catalogCode;
        entity.termsOfUseVersion = catalogVer;
        entity.template = JSON.stringify(template);
        entity.applicationActorCode = operator.actorCode;
        entity.applicationBlockCode = operator.blockCode;
        entity.applicationAt = new Date();
        entity.createdBy = operator.loginId;
        entity.updatedBy = operator.loginId;
        const ret = await EntityOperation.insertTermsOfUseManage(entity);
        // 登録されたレコードのidをリクエストに追加する
        requestBody['id'] = Number(ret.identifiers[0].id);

        // 生成したオブジェクトをレスポンスする
        return requestBody;
    }

    /**
     * 利用規約更新
     * @param serviceDto
     * @param termOfUseType
     * リファクタ履歴
     *  separate: checkParameter (複雑度緩和のため)
     *  separate: updateTermOfUsePlatform (複雑度緩和のため)
     */
    private async updateTermsOfUse (serviceDto: CatalogUpdateServiceDto, termOfUseType: number) {
        const operator = serviceDto.getOperator();
        const requestBody = serviceDto.getRequestBody();
        const catalogList = serviceDto.getCatalogList();
        const isDraft = serviceDto.getIsDraft();
        const template = JSON.parse(JSON.stringify(requestBody));
        delete template['isDraft'];
        let catalogCode;
        let catalogVer;

        // 本書きの場合
        if (!isDraft) {
            //  カタログのパラメータをチェック
            const checkedParam = await this.checkParameter(operator, termOfUseType, catalogList, 'update');
            catalogCode = checkedParam.catalogCode;
            catalogVer = checkedParam.catalogVer;

            // カタログサービス 取得API GET /{code}でカタログを取得する
            const termOfUseCatalog = await CatalogService.get(operator, Number(catalogCode));
            // 取得したカタログのネームスペースが正しい値であることを確認する
            if (!checkedParam.nsReg.test(termOfUseCatalog['rawData']['catalogItem']['ns'])) {
                throw new AppError(message.REQUEST_PARAMETER_INVALID, 400);
            }

            // グローバル設定を取得する
            const catalogDomain = await CatalogService.get(operator, null, config['app']['catalog']['requestGlobalCatalogNs']);
            const globalSettingCatalog = catalogDomain[0];

            // 利用規約の再同意フラグ
            const reConsentFlag = await ((vals) => {
                for (const val of vals) {
                    if (val['key'] === 're-consent-flag') {
                        return val['value'];
                    }
                }
            })(checkedParam.catalog['template']['template']['value']);
            // 再同意フラグがある場合、期限を確認して利用規約更新通知登録APIを呼び出す
            if (reConsentFlag) {
                await this.updateTermOfUsePlatform(checkedParam.catalog, termOfUseType, globalSettingCatalog, catalogCode, operator);
            }

            // カタログサービス 変更セット登録APIを呼び出す
            const updateSetRegisterRes = await CatalogService.postUpdateSetRegister(operator, template);

            // カタログサービス 変更セット申請APIを呼び出す
            await CatalogService.postUpdateSetRequest(operator, updateSetRegisterRes['id'], operator.actorCode);
        } else {
            for (const catalog of catalogList) {
                try {
                    catalogCode = catalog['catalogCode'];
                    catalogVer = catalog['template']['catalogItem']['_code']['_ver'];
                    if (!catalogCode || !catalogVer) {
                        throw new AppError(message.REQUEST_PARAMETER_INVALID, 400);
                    }
                } catch (e) {
                    throw new AppError(message.REQUEST_PARAMETER_INVALID, 400);
                }
            }
        }

        // 利用規約管理を登録する
        const entity = termOfUseType === this.PLATFORM_TERM_OF_USE ? new PlatformTermsOfUseManage() : new RegionTermsOfUseManage();
        entity.termsOfUseCode = catalogCode;
        entity.termsOfUseVersion = catalogVer;
        entity.template = JSON.stringify(template);
        entity.applicationActorCode = operator.actorCode;
        entity.applicationBlockCode = operator.blockCode;
        entity.applicationAt = new Date();
        entity.createdBy = operator.loginId;
        entity.updatedBy = operator.loginId;
        const ret = await EntityOperation.insertTermsOfUseManage(entity);
        // 登録されたレコードのidをリクエストに追加する
        requestBody['id'] = Number(ret.identifiers[0].id);

        // 生成したオブジェクトをレスポンスする
        return requestBody;
    }

    /**
     * カタログのパラメータをチェックし、更新の場合はカタログの各種情報を返す
     * @param operator
     * @param termOfUseType
     * @param catalogList
     * @param method add | update
     */
    private async checkParameter (operator: OperatorDomain, termOfUseType: number, catalogList: {}[], method: string) {
        // カタログサービス カタログ名称APIのGET /catalog/nameでext_nameを取得する
        const catalogName = await CatalogService.getName(operator);
        const extName = catalogName['ext_name'];

        const nsReg = termOfUseType === this.PLATFORM_TERM_OF_USE ? new RegExp(`^catalog/ext/${extName}/terms-of-use/platform$`) : new RegExp(`^catalog/ext/${extName}/terms-of-use/region/actor_${operator.actorCode}$`);
        let catalog;
        let catalogCode;
        let catalogVer;
        try {
            catalog = catalogList[0];
            const ns = catalog['template']['catalogItem']['ns'];
            catalogCode = method === 'update' ? catalog['catalogCode'] : null;
            catalogVer = method === 'update' ? catalog['template']['catalogItem']['_code']['_ver'] : null;
            if (method === 'update') {
                if (!catalogCode || !catalogVer || catalogList.length !== 1 || Number(catalog['type']) !== 2 || !nsReg.test(ns)) {
                    throw new AppError(message.REQUEST_PARAMETER_INVALID, 400);
                }
            } else {
                // method === 'add' の場合
                if (catalogList.length !== 1 || Number(catalog['type']) !== 1 || !nsReg.test(ns)) {
                    throw new AppError(message.REQUEST_PARAMETER_INVALID, 400);
                }
            }
        } catch (e) {
            throw new AppError(message.REQUEST_PARAMETER_INVALID, 400);
        }
        const resonse = {
            nsReg: nsReg,
            catalog: catalog,
            catalogCode: catalogCode,
            catalogVer: catalogVer
        };
        return resonse;
    }

    /**
     * 規約の同意期限を確認し、問題なければ利用規約更新通知登録APIを呼び出す
     * @param catalog
     * @param termOfUseType
     * @param globalSettingCatalog
     * @param catalogCode
     * @param operator
     */
    private async updateTermOfUsePlatform (catalog: {}, termOfUseType: number, globalSettingCatalog: any, catalogCode: any, operator: OperatorDomain) {
        const periodOfReConsent = ((vals) => {
            for (const val of vals) {
                if (val['key'] === 'period-of-re-consent') {
                    return new Date(val['value']);
                }
            }
        })(catalog['template']['template']['value']);
        if (termOfUseType === this.PLATFORM_TERM_OF_USE) {
            const amount = Number(globalSettingCatalog['rawData']['template']['min_period_for_platform-tou_re-consent']['value']);
            const unit = globalSettingCatalog['rawData']['template']['min_period_for_platform-tou_re-consent']['type'];
            const period = moment(new Date()).add(amount, unit).toDate();
            if (!periodOfReConsent || period >= periodOfReConsent) {
                // 現在時刻 + グローバル設定.規約の同意期限の最低期間 >= period-of-re-consent の場合はエラー
                throw new AppError(message.PERIOD_RE_CONSENT_INVALID, 400);
            }
            // ブック管理サービス PF利用規約更新通知登録APIを呼び出す
            await BookManageService.updatePlatformTermOfUsePlatform(Number(catalogCode), Number(catalog['template']['catalogItem']['_code']['_ver']), operator);
        } else if (termOfUseType === this.REGION_TERM_OF_USE) {
            const amount = Number(globalSettingCatalog['rawData']['template']['min_period_for_region-tou_re-consent']['value']);
            const unit = globalSettingCatalog['rawData']['template']['min_period_for_region-tou_re-consent']['type'];
            const period = moment(new Date()).add(amount, unit).toDate();
            if (!periodOfReConsent || period >= periodOfReConsent) {
                // 現在時刻 + グローバル設定.規約の同意期限の最低期間 >= period-of-re-consent の場合はエラー
                throw new AppError(message.PERIOD_RE_CONSENT_INVALID, 400);
            }
            // ブック管理サービス Region利用規約更新通知登録APIを呼び出す
            await BookManageService.updateRegionTermOfUsePlatform(Number(catalogCode), Number(catalog['template']['catalogItem']['_code']['_ver']), operator);
        }
        // (termOfUseTypeは1,2以外ありえないのでelseはない)
    }
}
