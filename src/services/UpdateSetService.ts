/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { sprintf } from 'sprintf-js';
import Config from '../common/Config';
import NotificationType from '../domains/NotificationType';
import OperatorDomain from '../domains/OperatorDomain';
import OperatorType from '../domains/OperatorType';
import NotificationDomain from '../domains/NotificationDomain';
import UpdateSetRequestPostResDto from '../resources/dto/UpdateSetRequestPostResDto';
import UpdateSetApprovalPostResDto from '../resources/dto/UpdateSetApprovalPostResDto';
import UpdateSetServiceDto from './dto/UpdateSetServiceDto';
import CatalogService from './CatalogService';
import NotificationService from './NotificationService';
/* eslint-enable */
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

export default class UpdateSetService {
    // 通知
    // ステータス: 承認済
    readonly APPROVAL: number = 1;
    // ステータス: 否認済
    readonly DENY: number = 2;

    /**
     * 変更セット申請
     * @param dto
     */
    public async requestUpdateSet (dto: UpdateSetServiceDto): Promise<UpdateSetRequestPostResDto> {
        // カタログサービスへリクエスト
        const res = await CatalogService.postUpdateSetRequest(dto.getOperator(), dto.getUpdateSetId(), dto.getApprovalActor());

        // 承認依頼を送付する
        await this.approvalLinkage(dto.getOperator(), res);

        // 変更セット情報を返す
        return res;
    }

    /**
     * 変更セット承認
     * @param dto
     */
    public async approvalUpdateSet (dto: UpdateSetServiceDto): Promise<UpdateSetApprovalPostResDto> {
        // カタログサービスへリクエスト
        const res = await CatalogService.postUpdateSetApproval(dto.getOperator(), dto.getUpdateSetId(), dto.getStatus(), dto.getComment());

        // 通知を送付する
        await this.noticeLinkage(dto.getOperator(), res, dto.getComment());

        // 変更セット情報を返す
        return res;
    }

    /**
     * 承認要求を通知サービスへ連携する
     * @param operator
     * @param response
     */
    private async approvalLinkage (operator: OperatorDomain, response: UpdateSetRequestPostResDto) {
        // 申請者と承認者が同じアクターの場合は承認要求は送らない
        if (Number(operator.actorCode) === Number(response.approvalActorCode)) {
            return;
        }

        // アクターコードを基にカタログからブロックコードを取得する
        const blockCode = await CatalogService.searchBlockCatalogWithActorCode(operator, response.approvalActorCode);

        // 承認要求を通知する
        const detail: NotificationDomain = new NotificationDomain();
        detail.type = NotificationType.APPROVAL;
        detail.title = message['notification']['catalog']['updateSet']['applying']['title'];
        detail.content = sprintf(message['notification']['catalog']['updateSet']['applying']['content'], response.name);
        detail.category = {
            _value: Number(config['app']['catalog']['notice']['updateSet']['applying']['category']),
            _ver: undefined
        };
        detail.destination = {
            blockCode: blockCode,
            isSendAll: true,
            operatorType: OperatorType.TYPE_MANAGE_MEMBER
        };
        detail.approval = {
            noticeBlockCode: Number(config['app']['approval_block']),
            noticeUrl: sprintf(config['app']['catalog']['notice']['updateSet']['applying']['url'], response.id)
        };
        await NotificationService.linkage([detail], operator);
    }

    /**
     * 通知サービスへ承認結果を連携する
     * @param operator
     * @param response
     * @param comment
     */
    private async noticeLinkage (operator: OperatorDomain, response: UpdateSetApprovalPostResDto, comment: string) {
        // アクターコードを基にカタログからブロックコードを取得する
        const blockCode = await CatalogService.searchBlockCatalogWithActorCode(operator, response.callerActorCode);

        const detail: NotificationDomain = new NotificationDomain();
        detail.type = NotificationType.NOTICE;
        detail.destination = {
            blockCode: blockCode,
            isSendAll: true,
            operatorType: OperatorType.TYPE_MANAGE_MEMBER
        };
        if (Number(response.status) === this.APPROVAL) {
            detail.title = message['notification']['catalog']['updateSet']['approval']['title'];
            detail.content = sprintf(message['notification']['catalog']['updateSet']['approval']['content'], response.name);
            detail.category = {
                _value: Number(config['app']['catalog']['notice']['updateSet']['approval']['category']),
                _ver: null
            };
        } else {
            detail.title = message['notification']['catalog']['updateSet']['deny']['title'];
            detail.content = sprintf(message['notification']['catalog']['updateSet']['deny']['content'], response.name, comment);
            detail.category = {
                _value: Number(config['app']['catalog']['notice']['updateSet']['deny']['category']),
                _ver: null
            };
        }
        await NotificationService.linkage([detail], operator);
    }
}
