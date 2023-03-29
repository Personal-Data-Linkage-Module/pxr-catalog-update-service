/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */
/* eslint-disable */
import OperatorDomain from '../../domains/OperatorDomain';
/* eslint-enable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。

/**
 * カタログ操作データ
 */
export default class UpdateSetServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * 変更セットID
     */
    private updateSetId: number = null;

    /**
     * 名称
     */
    private name: string = null;

    /**
     * 説明
     */
    private description: string = null;

    /**
     * ネームスペースリスト
     */
    private nsList: {}[] = null;

    /**
     * カタログリスト
     */
    private catalogList: {}[] = null;

    /**
     * その他
     */
    private appendix: {} = null;

    /**
     * ステータス
     */
    private status: number = null;

    /**
     * 承認コメント
     */
    private comment: string = null;

    /**
     * 承認アクター
     */
    private approvalActor: number = null;

    public getOperator (): OperatorDomain {
        return this.operator;
    }

    public setOperator (operator: OperatorDomain): void {
        this.operator = operator;
    }

    public getUpdateSetId (): number {
        return this.updateSetId;
    }

    public setUpdateSetId (updateSetId: number): void {
        this.updateSetId = updateSetId;
    }

    public getName (): string {
        return this.name;
    }

    public setName (name: string): void {
        this.name = name;
    }

    public getDescription (): string {
        return this.description;
    }

    public setDescription (description: string): void {
        this.description = description;
    }

    public getNsList (): {}[] {
        return this.nsList;
    }

    public setNsList (nsList: {}[]): void {
        this.nsList = nsList;
    }

    public getCatalogList (): {}[] {
        return this.catalogList;
    }

    public setCatalogList (catalogList: {}[]): void {
        this.catalogList = catalogList;
    }

    public getAppendix (): {} {
        return this.appendix;
    }

    public setAppendix (appendix: {}): void {
        this.appendix = appendix;
    }

    public getStatus (): number {
        return this.status;
    }

    public setStatus (status: number): void {
        this.status = status;
    }

    public getComment (): string {
        return this.comment;
    }

    public setComment (comment: string): void {
        this.comment = comment;
    }

    public getApprovalActor (): number {
        return this.approvalActor;
    }

    public setApprovalActor (approvalActor: number): void {
        this.approvalActor = approvalActor;
    }
}
