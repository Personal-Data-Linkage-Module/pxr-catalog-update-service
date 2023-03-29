/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * アクター申請承認APIのレスポンス
 */
export default class ActorApprovalResDto {
    /**
     * アクター申請承認ID
     */
    private id: number;

    /**
     * アクター申請ID
     */
    private actorManageId: number;

    /**
     * ステータス
     */
    private status: number;

    /**
     * コメント
     */
    private comment: string;

    /**
     * 承認アクター
     */
    private actor: any;

    /**
     * 承認者
     */
    private approver: string;

    /**
     * 承認日時
     */
    private approvalAt: string;

    /**
     * その他属性
     */
    private attributes: string;

    public setId (id: number) {
        this.id = id;
    }

    public getId () {
        return this.id;
    }

    public setActorManageId (actorManageId: number) {
        this.actorManageId = actorManageId;
    }

    public getActorManageId () {
        return this.actorManageId;
    }

    public setStatus (status: number) {
        this.status = status;
    }

    public getStatus () {
        return this.status;
    }

    public setComment (comment: string) {
        this.comment = comment;
    }

    public getComment () {
        return this.comment;
    }

    public setActor (actor: any) {
        this.actor = actor;
    }

    public getActor () {
        return this.actor;
    }

    public setApprover (approver: string) {
        this.approver = approver;
    }

    public getApprover () {
        return this.approver;
    }

    public setApprovalAt (approvalAt: string) {
        this.approvalAt = approvalAt;
    }

    public getApprovalAt () {
        return this.approvalAt;
    }

    public setAttributes (attributes: string) {
        this.attributes = attributes;
    }

    public getAttributes () {
        return this.attributes;
    }
}
