/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from "../common/AppError";
import Config from '../common/Config';
import StoreEventServiceDto from "./dto/StoreEventServiceDto";
import CatalogService from "./CatalogService";
import BookManageDto from "./dto/BookManageDto";
import BookManageService from "./BookManageService";
import OperatorDomain from "../domains/OperatorDomain";
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */
const message = Config.ReadConfig('./config/message.json');

export default class StoreEventService {
    /**
     * 蓄積イベント通知定義作成
     */
    public static async createStoreEvent (dto: StoreEventServiceDto) {
        await this.storeEventProcess(dto, false);
        return { response: 'success' };
    }

    /**
     * 蓄積イベント通知定義更新
     */
    public static async updateStoreEvent (dto: StoreEventServiceDto) {
        await this.storeEventProcess(dto, true);
        return { response: 'success' };
    }

    /**
     * 蓄積イベント通知定義
     * リファクタ履歴
     * separate: getShareCatalog (複雑度緩和のため)
     */
    private static async storeEventProcess (dto: StoreEventServiceDto, isUpdate: boolean) {
        const operator = dto.getOperator();
        const catalog = dto.getCatalog();
        // ext_name取得
        const catalogName = await CatalogService.getName(operator);
        const extName = catalogName['ext_name'];
        const regExp = new RegExp(`^catalog/ext/${extName}/actor/app/actor_${operator.actorCode}/share/notification$`);
        if (!regExp.test(catalog['template']['catalogItem']['ns'])) {
            // 蓄積イベントのnsチェック
            throw new AppError(message.INVALID_NOTIFICATE_CATALOG, 400);
        }
        if (isUpdate) {
            // 蓄積イベント通知定義カタログを取得
            const notificateCatalogDomain = await CatalogService.getCatalogByCode(operator, dto.getNotificateCatalogCode());
            const notificateCatalog = notificateCatalogDomain.rawData;
            if (notificateCatalog && notificateCatalog['catalogItem'] && notificateCatalog['catalogItem']['ns']) {
                if (!regExp.test(notificateCatalog['catalogItem']['ns'])) {
                    throw new AppError(message.INVALID_NOTIFICATE_CATALOG, 400);
                }
            } else {
                throw new AppError(message.INVALID_NOTIFICATE_CATALOG, 400);
            }
        }
        const shareList = catalog['template']['template']['value'];
        let shareCodeList: any = [];
        let shareUUIDList: any = [];
        for (const index in shareList) {
            const share = shareList[index];
            if (share['key'] !== 'notification') {
                continue;
            }

            // 状態共有機能定義カタログを取得する
            const res = await this.getShareCatalog(share, shareCodeList, shareUUIDList, operator);
            shareCodeList = res.shareCodeList;
            shareUUIDList = res.shareUUIDList;

            if (res.shareCatalog['template'] && res.shareCatalog['template']['share']) {
                // 共有機能定義カタログのUUIDチェック
                if (!res.shareCatalog['template']['share'].some((ele: any) =>
                    res.shareUUID.includes(ele['id'])
                )) {
                    throw new AppError(message.NOT_UUID_SHARE_CATALOG, 400);
                }
            } else {
                throw new AppError(message.NOT_UUID_SHARE_CATALOG, 400);
            }
        }
        if (shareCodeList.length === 0) {
            throw new AppError(message.INVALID_NOTIFICATE_CATALOG, 400);
        }

        // 変更セット登録
        const template = JSON.parse(JSON.stringify(dto.getRequestBody()));
        delete template['isDraft'];
        const updateSetRegisterRes = await CatalogService.postUpdateSetRegister(operator, template);
        // 変更セット申請
        const updateSetRequestRes = await CatalogService.postUpdateSetRequest(operator, updateSetRegisterRes['id'], operator.actorCode);
        let notificateCode: number = null;
        let notificateVersion: number = null;
        const udpateCatalog = updateSetRequestRes['catalog'][0];
        if (udpateCatalog['template'] && udpateCatalog['template']['catalogItem'] && udpateCatalog['template']['catalogItem']['_code']) {
            notificateCode = Number(udpateCatalog['template']['catalogItem']['_code']['_value']);
            notificateVersion = Number(udpateCatalog['template']['catalogItem']['_code']['_ver']);
        } else {
            throw new AppError(message.INVALID_NOTIFICATE_CATALOG, 400);
        }

        for (const index in shareCodeList) {
            // Book管理サービス.蓄積イベント通知定義更新 API
            const bookManageDto = new BookManageDto();
            bookManageDto.setType('store-event');
            bookManageDto.setOperator(operator);
            bookManageDto.setNotificateCatalogCode(notificateCode);
            bookManageDto.setNotificateCatalogVersion(notificateVersion);
            bookManageDto.setShareCode(Number(shareCodeList[index]['_value']));
            bookManageDto.setShareVersion(Number(shareCodeList[index]['_ver']));
            bookManageDto.setShreUuid(shareUUIDList[index]);
            await BookManageService.updateStoreEvent(bookManageDto);
        }
    }

    /**
     * catalog.template.template.value[].share から状態共有機能定義カタログを取得する
     * @param share
     * @param shareCodeList
     * @param shareUUIDList
     * @param operator
     */
    private static async getShareCatalog (share: any, shareCodeList: any, shareUUIDList: any, operator: OperatorDomain) {
        const shareCode = {
            _value: 0,
            _ver: 0
        };
        let shareUUID: string[] = [];
        for (const value of share['value']) {
            if (value['key'] === 'share') {
                value['value'].forEach((ele: any) => {
                    shareCode[ele['key']] = Number(ele['value']);
                });
                shareCodeList.push(shareCode);
            }
            if (value['key'] === 'id') {
                shareUUID = value['value'];
                shareUUIDList.push(shareUUID);
            }
        }
        if (!shareCode['_value'] || !shareCode['_ver'] || shareUUID.length === 0) {
            throw new AppError(message.INVALID_NOTIFICATE_CATALOG, 400);
        }
        // 状態共有機能定義カタログを取得
        const shareCatalogDomain = await CatalogService.getCatalogByCode(operator, shareCode['_value'], shareCode['_ver']);
        const shareCatalog = shareCatalogDomain.rawData;

        // レスポンスを生成
        const response = {
            shareCatalog: shareCatalog,
            shareUUID: shareUUID,
            shareCode: shareCode,
            shareUUIDList: shareUUIDList,
            shareCodeList: shareCodeList
        };
        return response;
    }
}
