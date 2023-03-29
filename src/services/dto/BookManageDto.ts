/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from "../../domains/OperatorDomain";
/* eslint-enable */

export default class BookManageDto {
    /**
     * オペレーター
     */
    private operator: OperatorDomain;

    /**
     * イベントタイプ
     */
    private type: 'store-event';

    /**
     * 蓄積イベント通知カタログコード
     */
    private notificateCatalogCode: number;

    /**
     * 蓄積イベント通知カタログバージョン
     */
    private notificateCatalogVersion: number;

    /**
     * 共有定義カタログコード
     */
    private shareCode: number;

    /**
     * 共有定義カタログバージョン
     */
    private shareVersion: number;

    /**
     * 共有定義UUID
     */
    private shareUuid: string[];

    /**
     * 申請元アクターコード
     */
    private applicantActorCode: number;

    /**
     * 申請元アクターバージョン
     */
    private applicantActorVersion: number;

    /**
     * 開始終了Regionカタログコード
     */
    private regionCatalogCode: number;

    /**
     * 開始終了Regionカタログバージョン
     */
    private regionCatalogVersion: number;

    /**
     * 終了予定日
     */
    private endDate: string;

    /**
     * オペレーター取得
     */
    public getOperator (): OperatorDomain {
        return this.operator;
    }

    /**
     * オペレーター設定
     */
    public setOperator (operator: OperatorDomain) {
        this.operator = operator;
    }

    /**
     * イベントタイプ取得
     */
    public getType (): string {
        return this.type;
    }

    /**
     * イベントタイプ設定
     */
    public setType (type: 'store-event') {
        this.type = type;
    }

    /**
     * 蓄積イベント通知カタログコード取得
     */
    public getNotificateCatalogCode (): number {
        return this.notificateCatalogCode;
    }

    /**
     * 蓄積イベント通知カタログコード設定
     */
    public setNotificateCatalogCode (notificateCatalogCode: number) {
        this.notificateCatalogCode = notificateCatalogCode;
    }

    /**
     * 蓄積イベント通知カタログバージョン取得
     */
    public getNotificateCatalogVersion (): number {
        return this.notificateCatalogVersion;
    }

    /**
     * 蓄積イベント通知カタログバージョン設定
     */
    public setNotificateCatalogVersion (notificateCatalogVersion: number) {
        this.notificateCatalogVersion = notificateCatalogVersion;
    }

    /**
     * 共有定義カタログコード取得
     */
    public getShareCode (): number {
        return this.shareCode;
    }

    /**
     * 共有定義カタログコード設定
     */
    public setShareCode (shareCode: number) {
        this.shareCode = shareCode;
    }

    /**
     * 共有定義カタログバージョン取得
     */
    public getShareVersion (): number {
        return this.shareVersion;
    }

    /**
     * 共有定義カタログバージョン設定
     */
    public setShareVersion (shareVersion: number) {
        this.shareVersion = shareVersion;
    }

    /**
     * 共有定義UUID取得
     */
    public getShareUuid (): string[] {
        return this.shareUuid;
    }

    /**
     * 共有定義UUID設定
     */
    public setShreUuid (shareUuid: string[]) {
        this.shareUuid = shareUuid;
    }

    /**
     * 申請元アクターコード取得
     */
    public getApplicantActorCode (): number {
        return this.applicantActorCode;
    }

    /**
     * 申請元アクターコード設定
     */
    public setApplicantActorCode (applicantActorCode: number) {
        this.applicantActorCode = applicantActorCode;
    }

    /**
     * 申請元アクターバージョン取得
     */
    public getApplicantActorVersion (): number {
        return this.applicantActorVersion;
    }

    /**
     * 申請元アクターバージョン設定
     */
    public setApplicantActorVersion (applicantActorVersion: number) {
        this.applicantActorVersion = applicantActorVersion;
    }

    /**
     * 開始終了Regionカタログコード取得
     */
    public getRegionCatalogCode (): number {
        return this.regionCatalogCode;
    }

    /**
     * 開始終了Regionカタログコード設定
     */
    public setRegionCatalogCode (RegionCatalogCode: number) {
        this.regionCatalogCode = RegionCatalogCode;
    }

    /**
     * 開始終了Regionカタログバージョン取得
     */
    public getRegionCatalogVersion (): number {
        return this.regionCatalogVersion;
    }

    /**
     * 開始終了Regionカタログバージョン設定
     */
    public setRegionCatalogVersion (regionCatalogVersion: number) {
        this.regionCatalogVersion = regionCatalogVersion;
    }

    /**
     * 終了予定日取得
     */
    public getEndDate (): string {
        return this.endDate;
    }

    /**
     * 終了予定日設定
     */
    public setEndDate (endDate: string) {
        this.endDate = endDate;
    }
}
