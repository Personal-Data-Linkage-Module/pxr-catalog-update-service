/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Application from '../index';
import Common, { Url } from './Common';
import * as supertest from 'supertest';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
import express = require('express');
import { Server } from 'net';
import { PutTestRequest, PutTestTemplate } from './13-00.TermsOfUse.TestData';

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// オペレータサーバー
class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor(status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status).json({
                sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                operatorId: 1,
                type: 3,
                loginId: 'menber01',
                name: '運営メンバー01',
                auth: '{"add": true, "update": true, "delete": true}',
                lastLoginAt: '2020-01-14 15:27:20.426',
                block: {
                    _value: 1000111,
                    _ver: 1
                },
                actor: {
                    _value: actorCode,
                    _ver: 1
                }
            }).end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

// カタログサーバー
class _StubCatalogServer {
    _app: express.Express;
    _server: Server;
    _template: any;

    constructor(status: number, template?: any) {
        this._app = express();
        this._template = template;
        // イベントハンドラー１
        // カタログ名称を取得
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status).json(
                {
                    id: '301c4aaa-3d11-4efb-82e7-a35cba034b6d',
                    name: 'PXRカタログ',
                    description: 'aaa地区が運営するPXR基盤が提供するデータカタログです。',
                    ext_name: 'aaa-healthcare-consortium'
                }
            ).end();
        }

        // イベントハンドラー2 カタログ変更セット登録API 申請API
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status).json(this._template).end();
        };

        const _listener3 = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            if (code === 9999999) {
                res.status(status).json({
                    "catalogItem": {
                        "ns": "catalog/ext/aaa-healthcare-consortium/terms-of-use/platform",
                        "name": "PF利用規約",
                        "description": "PF利用規約の定義です。",
                        "_code": {
                            "_value": 9999999,
                            "_ver": 1
                        },
                        "inherit": {
                            "_value": 203,
                            "_ver": 1
                        }
                    },
                    "template": {
                        "prop": null,
                        "value": [
                            {
                                "key": "terms-of-use",
                                "value": [
                                    {
                                        "key": "title",
                                        "value": "プラットフォーム利用規約"
                                    },
                                    {
                                        "key": "section",
                                        "value": [
                                            {
                                                "key": "title",
                                                "value": "第1項"
                                            },
                                            {
                                                "key": "content",
                                                "value": [
                                                    {
                                                        "key": "sentence",
                                                        "value": "規約～～～。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "re-consent-flag",
                                "value": false
                            },
                            {
                                "key": "period-of-re-consent",
                                "value": null
                            },
                            {
                                "key": "deleting-data-flag",
                                "value": true
                            },
                            {
                                "key": "returning-data-flag",
                                "value": true
                            }
                        ]
                    },
                    "inner": null,
                    "attribute": null
                }).end();
            } else if (code === 8888888) {
                res.status(status).json({
                    'catalogItem': {
                        'ns': 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                        'name': '高齢者向け健康サポート利用規約',
                        'description': '高齢者向け健康サポートの利用規約です。',
                        '_code': {
                            '_value': 8888888,
                            '_ver': 1
                        },
                        'inherit': {
                            '_value': 204,
                            '_ver': null
                        }
                    },
                    'template': {
                        'prop': null,
                        'value': [
                            {
                                'key': 'terms-of-use',
                                'value': [
                                    {
                                        'key': 'title',
                                        'value': 'リージョン利用規約'
                                    },
                                    {
                                        'key': 'section',
                                        'value': [
                                            {
                                                'key': 'title',
                                                'value': '第1項'
                                            },
                                            {
                                                'key': 'content',
                                                'value': [
                                                    {
                                                        'key': 'sentence',
                                                        'value': '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                'key': 're-consent-flag',
                                'value': false
                            },
                            {
                                'key': 'period-of-re-consent',
                                'value': null
                            },
                            {
                                'key': 'deleting-data-flag',
                                'value': false
                            },
                            {
                                'key': 'returning-data-flag',
                                'value': false
                            }
                        ]
                    },
                    'inner': null,
                    'attribute': null
                }).end();
            }
            res.end();
        };

        const _listener4 = (req: express.Request, res: express.Response) => {
            let ns = req.query.ns;
            if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.status(status).json([
                    {
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/setting/global",
                            "name": "PXR：グローバル設定",
                            "_code": {
                                "_value": 1000374,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 160,
                                "_ver": 1
                            },
                            "description": "PXR全体のグローバル設定の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000374,
                                "_ver": 1
                            },
                            "account-lock-count": 6,
                            "account-lock-release-time": {
                                "type": "minute",
                                "value": 30
                            },
                            "app-p-name": "アプリケーションプロバイダー",
                            "book-name": "ヘルスケアNOTE",
                            "book-open-code-expiration": {
                                "type": "minute",
                                "value": 10
                            },
                            "book-open-notification-interval": {
                                "type": "day",
                                "value": 1
                            },
                            "book_create_sms_message": "%s?ID=%s パスワード: %s",
                            "catalog-name": "PXRカタログ",
                            "coin-name": "PXRコイン",
                            "data-consumer-name": "データコンシューマー",
                            "data-trader-name": "データ取引サービスプロバイダー",
                            "help_contact": {
                                "title": "ヘルプ・問い合わせ",
                                "section": [
                                    {
                                        "title": "ヘルプ・問い合わせ",
                                        "content": [
                                            {
                                                "sentence": "ヘルプ・問い合わせです。"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "identity-verification-expiration": {
                                "type": "day",
                                "value": 7
                            },
                            "login_sms_message": "PXRポータルのワンタイムログインコードは %s です。",
                            "management_id_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                            "management_id_format_errormessage": "8桁以上かつアルファベットと数字混在で入力して下さい。",
                            "management_initial_login_description": {
                                "title": "初回ログインURL通知文書説明",
                                "section": [
                                    {
                                        "title": "初回ログインURL通知文書説明",
                                        "content": [
                                            {
                                                "sentence": "初回ログインURL通知文書説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "management_password_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$",
                            "management_password_format_errormessage": "12桁以上かつアルファベットと数字混在で入力して下さい。",
                            "management_password_similarity_check": true,
                            "min_period_for_platform-tou_re-consent": {
                                "type": "day",
                                "value": 7
                            },
                            "min_period_for_region-tou_re-consent": {
                                "type": "day",
                                "value": 7
                            },
                            "onboarding_start": {
                                "title": "Onboarding",
                                "section": [
                                    {
                                        "title": "PXRエコシステムとは",
                                        "content": [
                                            {
                                                "sentence": "PXRエコシステム説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "onboarding_store": {
                                "title": "データ蓄積設定",
                                "section": [
                                    {
                                        "title": "データ蓄積設定",
                                        "content": [
                                            {
                                                "sentence": "データ蓄積設定説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "one-time-login-code-expiration": null,
                            "open_book_automatically": true,
                            "password-expiration": {
                                "type": "day",
                                "value": 90
                            },
                            "password-generations-number": 4,
                            "personal_account_delete": false,
                            "personal_account_delete_ng_message": "アカウント削除をご希望の場合はお問合せ下さい。",
                            "personal_disassociation": true,
                            "personal_initial_login_description": {
                                "title": "Book開設時のQRコード通知文書説明",
                                "section": [
                                    {
                                        "title": "Book開設時のQRコード通知文書説明",
                                        "content": [
                                            {
                                                "sentence": "Book開設時のQRコード通知文書説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "personal_share_basic_policy": false,
                            "personal_two-step_verification": true,
                            "platform-name": "aaaデジタルヘルスプラットフォーム",
                            "portal-name": "My PXR",
                            "pxr-root-name": "流通制御サービスプロバイダー",
                            "pxr_id_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                            "pxr_id_format_errormessage": "8桁以上かつアルファベットと数字混在で入力して下さい。",
                            "pxr_id_password_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$",
                            "pxr_id_password_format_errormessage": "12桁以上かつアルファベットと数字混在で入力して下さい。",
                            "pxr_id_password_similarity_check": true,
                            "pxr_id_prefix": "",
                            "pxr_id_suffix": "",
                            "region-root-name": "領域運営サービスプロバイダー",
                            "region-tou_re-consent_notification_interval": {
                                "type": "day",
                                "value": 3
                            },
                            "search_target_ns": [
                                {
                                    "name": "データカテゴリ",
                                    "ns": "catalog/ext/aaa-healthcare-consortium/attribute/category/data"
                                }
                            ],
                            "service-name": "サービス",
                            "service_category_for_data_category": [
                                {
                                    "service": {
                                        "_value": 1000065,
                                        "_ver": 1
                                    },
                                    "dataCategory": [
                                        {
                                            "_value": 1000137,
                                            "_ver": 1
                                        }
                                    ]
                                }
                            ],
                            "service_category_for_workflow": [
                                {
                                    "service": {
                                        "_value": 1000065,
                                        "_ver": 1
                                    },
                                    "workflow_p": {
                                        "_value": 1000438,
                                        "_ver": 1
                                    },
                                    "workflow": {
                                        "_value": 1000481,
                                        "_ver": 1
                                    }
                                }
                            ],
                            "session-expiration": {
                                "type": "hour",
                                "value": 3
                            },
                            "terms_of_service": {
                                "title": "利用規約",
                                "section": [
                                    {
                                        "title": "利用規約",
                                        "content": [
                                            {
                                                "sentence": "利用規約です。"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "use_app-p": true,
                            "use_id_connect": false,
                            "use_region_service_operation": true,
                            "use_share": true,
                            "use_supply": true,
                            "use_wf-p": true,
                            "wf-p-name": "ワークフロープロバイダー",
                            "workflow-name": "ワークフロー"
                        },
                        "prop": [
                            {
                                "key": "account-lock-count",
                                "type": {
                                    "of": "number",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "アカウントロックまでの試行上限回数",
                                "isInherit": true
                            },
                            {
                                "key": "account-lock-release-time",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "アカウントロック解除までの時間",
                                "isInherit": true
                            },
                            {
                                "key": "app-p-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "アプリケーションプロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "book-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "My-Condition-Book呼称",
                                "isInherit": true
                            },
                            {
                                "key": "book-open-code-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "Book開設申請コード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "book-open-notification-interval",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "Book開設申請通知間隔",
                                "isInherit": true
                            },
                            {
                                "key": "book_create_sms_message",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "Book作成時SMSメッセージ内容",
                                "isInherit": true
                            },
                            {
                                "key": "catalog-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "My-Condition-Dataカタログ呼称",
                                "isInherit": true
                            },
                            {
                                "key": "coin-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXRコイン呼称",
                                "isInherit": true
                            },
                            {
                                "key": "data-consumer-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "データコンシューマーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "data-trader-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "データ取引サービスプロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "help_contact",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "ヘルプ・問い合わせ",
                                "isInherit": true
                            },
                            {
                                "key": "identity-verification-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "本人性確認コード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "login_sms_message",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "個人ポータルログイン時SMSメッセージ内容",
                                "isInherit": true
                            },
                            {
                                "key": "management_id_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のIDフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "management_id_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のIDフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "management_initial_login_description",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "運営ポータル：初回ログインURL通知文書説明文",
                                "isInherit": true
                            },
                            {
                                "key": "management_password_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のパスワードフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "management_password_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のパスワードフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "management_password_similarity_check",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "運営ポータル群のパスワード類似性チェックを行う",
                                "isInherit": true
                            },
                            {
                                "key": "min_period_for_platform-tou_re-consent",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "プラットフォーム利用規約の再同意期限の最低期間",
                                "isInherit": true
                            },
                            {
                                "key": "min_period_for_region-tou_re-consent",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "リージョン利用規約の再同意期限の最低期間",
                                "isInherit": true
                            },
                            {
                                "key": "onboarding_start",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "個人ポータル開始時のオンボーディング記載内容",
                                "isInherit": true
                            },
                            {
                                "key": "onboarding_store",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "個人ポータル蓄積設定時のオンボーディング記載内容",
                                "isInherit": true
                            },
                            {
                                "key": "one-time-login-code-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "ワンタイムログインコード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "open_book_automatically",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "自動Book開設フラグ",
                                "isInherit": true
                            },
                            {
                                "key": "password-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "パスワード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "password-generations-number",
                                "type": {
                                    "of": "number",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "パスワード世代管理数",
                                "isInherit": true
                            },
                            {
                                "key": "personal_account_delete",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：アカウント削除の可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "personal_account_delete_ng_message",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "個人ポータル：アカウント削除できない設定時の表示メッセージ内容",
                                "isInherit": true
                            },
                            {
                                "key": "personal_disassociation",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：連携解除可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "personal_initial_login_description",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "Book開設時のQRコード通知文書説明文",
                                "isInherit": true
                            },
                            {
                                "key": "personal_share_basic_policy",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：共有の基本方針可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "personal_two-step_verification",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：2段階認証解除可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "platform-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXRエコシステム基盤呼称",
                                "isInherit": true
                            },
                            {
                                "key": "portal-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "個人ポータル呼称",
                                "isInherit": true
                            },
                            {
                                "key": "pxr-root-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "流通制御サービスプロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_password_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのパスワードフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_password_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのパスワードフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_password_similarity_check",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "PXR-IDのパスワード類似性チェックを行う",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_prefix",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのprefix",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_suffix",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのsuffix",
                                "isInherit": true
                            },
                            {
                                "key": "region-root-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "領域運営サービスプロバイダーの名称",
                                "isInherit": true
                            },
                            {
                                "key": "region-tou_re-consent_notification_interval",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "リージョン利用規約通知間隔",
                                "isInherit": true
                            },
                            {
                                "key": "search_target_ns",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "SearchTargetNs",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "検索対象ネームスペース",
                                "isInherit": true
                            },
                            {
                                "key": "service-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "サービス名",
                                "isInherit": true
                            },
                            {
                                "key": "service_category_for_data_category",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "ServiceCategoryForDataCategory",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "データカテゴリ用サービスカテゴリ",
                                "isInherit": true
                            },
                            {
                                "key": "service_category_for_workflow",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "ServiceCategoryForWorkflow",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "ワークフロー用サービスカテゴリ",
                                "isInherit": true
                            },
                            {
                                "key": "session-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "セッション有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "terms_of_service",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "利用規約",
                                "isInherit": true
                            },
                            {
                                "key": "use_app-p",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "アプリケーションプロバイダーの使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_id_connect",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "IDコネクトの使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_region_service_operation",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "リージョンサービス運用の設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_share",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "共有の使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_supply",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "提供の使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_wf-p",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "ワークフロープロバイダーの使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "wf-p-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "ワークフロープロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "workflow-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "ワークフローの呼称",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }
                ]).end();
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/name', _listener);
        this._app.post('/catalog/updateSet/register', _listener2);
        this._app.post('/catalog/updateSet/request', _listener2);
        this._app.get('/catalog/:code', _listener3);
        this._app.get('/catalog', _listener4);
        this._server = this._app.listen(3001);
    }
}

// カタログサーバー(規約同意カタログns異常判定用)
class _StubCatalogServer2 {
    _app: express.Express;
    _server: Server;
    _template: any;

    constructor(status: number, template?: any) {
        this._app = express();
        this._template = template;
        // イベントハンドラー１
        // カタログ名称を取得
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status).json(
                {
                    id: '301c4aaa-3d11-4efb-82e7-a35cba034b6d',
                    name: 'PXRカタログ',
                    description: 'aaa地区が運営するPXR基盤が提供するデータカタログです。',
                    ext_name: 'aaa-healthcare-consortium'
                }
            ).end();
        }

        // イベントハンドラー2 カタログ変更セット登録API 申請API
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status).json(this._template).end();
        };

        const _listener3 = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            if (code === 9999999) {
                res.status(status).json({
                    "catalogItem": {
                        "ns": "catalog/ext/aaa-healthcare-consortium/terms-of-use/platform/aaaaaaaa",
                        "name": "PF利用規約",
                        "description": "PF利用規約の定義です。",
                        "_code": {
                            "_value": 9999999,
                            "_ver": 1
                        },
                        "inherit": {
                            "_value": 203,
                            "_ver": 1
                        }
                    },
                    "template": {
                        "prop": null,
                        "value": [
                            {
                                "key": "terms-of-use",
                                "value": [
                                    {
                                        "key": "title",
                                        "value": "プラットフォーム利用規約"
                                    },
                                    {
                                        "key": "section",
                                        "value": [
                                            {
                                                "key": "title",
                                                "value": "第1項"
                                            },
                                            {
                                                "key": "content",
                                                "value": [
                                                    {
                                                        "key": "sentence",
                                                        "value": "規約～～～。"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "key": "re-consent-flag",
                                "value": false
                            },
                            {
                                "key": "period-of-re-consent",
                                "value": null
                            },
                            {
                                "key": "deleting-data-flag",
                                "value": true
                            },
                            {
                                "key": "returning-data-flag",
                                "value": true
                            }
                        ]
                    },
                    "inner": null,
                    "attribute": null
                }).end();
            } else if (code === 8888888) {
                res.status(status).json({
                    'catalogItem': {
                        'ns': 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432/aaaaaaaa',
                        'name': '高齢者向け健康サポート利用規約',
                        'description': '高齢者向け健康サポートの利用規約です。',
                        '_code': {
                            '_value': 8888888,
                            '_ver': 1
                        },
                        'inherit': {
                            '_value': 204,
                            '_ver': null
                        }
                    },
                    'template': {
                        'prop': null,
                        'value': [
                            {
                                'key': 'terms-of-use',
                                'value': [
                                    {
                                        'key': 'title',
                                        'value': 'リージョン利用規約'
                                    },
                                    {
                                        'key': 'section',
                                        'value': [
                                            {
                                                'key': 'title',
                                                'value': '第1項'
                                            },
                                            {
                                                'key': 'content',
                                                'value': [
                                                    {
                                                        'key': 'sentence',
                                                        'value': '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                'key': 're-consent-flag',
                                'value': false
                            },
                            {
                                'key': 'period-of-re-consent',
                                'value': null
                            },
                            {
                                'key': 'deleting-data-flag',
                                'value': false
                            },
                            {
                                'key': 'returning-data-flag',
                                'value': false
                            }
                        ]
                    },
                    'inner': null,
                    'attribute': null
                }).end();
            }
            res.end();
        };

        const _listener4 = (req: express.Request, res: express.Response) => {
            let ns = req.query['ns'];
            if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.status(status).json([
                    {
                        "catalogItem": {
                            "ns": "catalog/ext/aaa-healthcare-consortium/setting/global",
                            "name": "PXR：グローバル設定",
                            "_code": {
                                "_value": 1000374,
                                "_ver": 1
                            },
                            "inherit": {
                                "_value": 160,
                                "_ver": 1
                            },
                            "description": "PXR全体のグローバル設定の定義です。"
                        },
                        "template": {
                            "_code": {
                                "_value": 1000374,
                                "_ver": 1
                            },
                            "account-lock-count": 6,
                            "account-lock-release-time": {
                                "type": "minute",
                                "value": 30
                            },
                            "app-p-name": "アプリケーションプロバイダー",
                            "book-name": "ヘルスケアNOTE",
                            "book-open-code-expiration": {
                                "type": "minute",
                                "value": 10
                            },
                            "book-open-notification-interval": {
                                "type": "day",
                                "value": 1
                            },
                            "book_create_sms_message": "%s?ID=%s パスワード: %s",
                            "catalog-name": "PXRカタログ",
                            "coin-name": "PXRコイン",
                            "data-consumer-name": "データコンシューマー",
                            "data-trader-name": "データ取引サービスプロバイダー",
                            "help_contact": {
                                "title": "ヘルプ・問い合わせ",
                                "section": [
                                    {
                                        "title": "ヘルプ・問い合わせ",
                                        "content": [
                                            {
                                                "sentence": "ヘルプ・問い合わせです。"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "identity-verification-expiration": {
                                "type": "day",
                                "value": 7
                            },
                            "login_sms_message": "PXRポータルのワンタイムログインコードは %s です。",
                            "management_id_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                            "management_id_format_errormessage": "8桁以上かつアルファベットと数字混在で入力して下さい。",
                            "management_initial_login_description": {
                                "title": "初回ログインURL通知文書説明",
                                "section": [
                                    {
                                        "title": "初回ログインURL通知文書説明",
                                        "content": [
                                            {
                                                "sentence": "初回ログインURL通知文書説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "management_password_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$",
                            "management_password_format_errormessage": "12桁以上かつアルファベットと数字混在で入力して下さい。",
                            "management_password_similarity_check": true,
                            "min_period_for_platform-tou_re-consent": {
                                "type": "day",
                                "value": 7
                            },
                            "min_period_for_region-tou_re-consent": {
                                "type": "day",
                                "value": 7
                            },
                            "onboarding_start": {
                                "title": "Onboarding",
                                "section": [
                                    {
                                        "title": "PXRエコシステムとは",
                                        "content": [
                                            {
                                                "sentence": "PXRエコシステム説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "onboarding_store": {
                                "title": "データ蓄積設定",
                                "section": [
                                    {
                                        "title": "データ蓄積設定",
                                        "content": [
                                            {
                                                "sentence": "データ蓄積設定説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "one-time-login-code-expiration": null,
                            "open_book_automatically": true,
                            "password-expiration": {
                                "type": "day",
                                "value": 90
                            },
                            "password-generations-number": 4,
                            "personal_account_delete": false,
                            "personal_account_delete_ng_message": "アカウント削除をご希望の場合はお問合せ下さい。",
                            "personal_disassociation": true,
                            "personal_initial_login_description": {
                                "title": "Book開設時のQRコード通知文書説明",
                                "section": [
                                    {
                                        "title": "Book開設時のQRコード通知文書説明",
                                        "content": [
                                            {
                                                "sentence": "Book開設時のQRコード通知文書説明"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "personal_share_basic_policy": false,
                            "personal_two-step_verification": true,
                            "platform-name": "aaaデジタルヘルスプラットフォーム",
                            "portal-name": "My PXR",
                            "pxr-root-name": "流通制御サービスプロバイダー",
                            "pxr_id_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                            "pxr_id_format_errormessage": "8桁以上かつアルファベットと数字混在で入力して下さい。",
                            "pxr_id_password_format": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$",
                            "pxr_id_password_format_errormessage": "12桁以上かつアルファベットと数字混在で入力して下さい。",
                            "pxr_id_password_similarity_check": true,
                            "pxr_id_prefix": "",
                            "pxr_id_suffix": "",
                            "region-root-name": "領域運営サービスプロバイダー",
                            "region-tou_re-consent_notification_interval": {
                                "type": "day",
                                "value": 3
                            },
                            "search_target_ns": [
                                {
                                    "name": "データカテゴリ",
                                    "ns": "catalog/ext/aaa-healthcare-consortium/attribute/category/data"
                                }
                            ],
                            "service-name": "サービス",
                            "service_category_for_data_category": [
                                {
                                    "service": {
                                        "_value": 1000065,
                                        "_ver": 1
                                    },
                                    "dataCategory": [
                                        {
                                            "_value": 1000137,
                                            "_ver": 1
                                        }
                                    ]
                                }
                            ],
                            "service_category_for_workflow": [
                                {
                                    "service": {
                                        "_value": 1000065,
                                        "_ver": 1
                                    },
                                    "workflow_p": {
                                        "_value": 1000438,
                                        "_ver": 1
                                    },
                                    "workflow": {
                                        "_value": 1000481,
                                        "_ver": 1
                                    }
                                }
                            ],
                            "session-expiration": {
                                "type": "hour",
                                "value": 3
                            },
                            "terms_of_service": {
                                "title": "利用規約",
                                "section": [
                                    {
                                        "title": "利用規約",
                                        "content": [
                                            {
                                                "sentence": "利用規約です。"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "use_app-p": true,
                            "use_id_connect": false,
                            "use_region_service_operation": true,
                            "use_share": true,
                            "use_supply": true,
                            "use_wf-p": true,
                            "wf-p-name": "ワークフロープロバイダー",
                            "workflow-name": "ワークフロー"
                        },
                        "prop": [
                            {
                                "key": "account-lock-count",
                                "type": {
                                    "of": "number",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "アカウントロックまでの試行上限回数",
                                "isInherit": true
                            },
                            {
                                "key": "account-lock-release-time",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "アカウントロック解除までの時間",
                                "isInherit": true
                            },
                            {
                                "key": "app-p-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "アプリケーションプロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "book-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "My-Condition-Book呼称",
                                "isInherit": true
                            },
                            {
                                "key": "book-open-code-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "Book開設申請コード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "book-open-notification-interval",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "Book開設申請通知間隔",
                                "isInherit": true
                            },
                            {
                                "key": "book_create_sms_message",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "Book作成時SMSメッセージ内容",
                                "isInherit": true
                            },
                            {
                                "key": "catalog-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "My-Condition-Dataカタログ呼称",
                                "isInherit": true
                            },
                            {
                                "key": "coin-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXRコイン呼称",
                                "isInherit": true
                            },
                            {
                                "key": "data-consumer-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "データコンシューマーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "data-trader-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "データ取引サービスプロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "help_contact",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "ヘルプ・問い合わせ",
                                "isInherit": true
                            },
                            {
                                "key": "identity-verification-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "本人性確認コード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "login_sms_message",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "個人ポータルログイン時SMSメッセージ内容",
                                "isInherit": true
                            },
                            {
                                "key": "management_id_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のIDフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "management_id_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のIDフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "management_initial_login_description",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "運営ポータル：初回ログインURL通知文書説明文",
                                "isInherit": true
                            },
                            {
                                "key": "management_password_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のパスワードフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "management_password_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "運営ポータル群のパスワードフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "management_password_similarity_check",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "運営ポータル群のパスワード類似性チェックを行う",
                                "isInherit": true
                            },
                            {
                                "key": "min_period_for_platform-tou_re-consent",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "プラットフォーム利用規約の再同意期限の最低期間",
                                "isInherit": true
                            },
                            {
                                "key": "min_period_for_region-tou_re-consent",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "リージョン利用規約の再同意期限の最低期間",
                                "isInherit": true
                            },
                            {
                                "key": "onboarding_start",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "個人ポータル開始時のオンボーディング記載内容",
                                "isInherit": true
                            },
                            {
                                "key": "onboarding_store",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "個人ポータル蓄積設定時のオンボーディング記載内容",
                                "isInherit": true
                            },
                            {
                                "key": "one-time-login-code-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "ワンタイムログインコード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "open_book_automatically",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "自動Book開設フラグ",
                                "isInherit": true
                            },
                            {
                                "key": "password-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "パスワード有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "password-generations-number",
                                "type": {
                                    "of": "number",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "パスワード世代管理数",
                                "isInherit": true
                            },
                            {
                                "key": "personal_account_delete",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：アカウント削除の可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "personal_account_delete_ng_message",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "個人ポータル：アカウント削除できない設定時の表示メッセージ内容",
                                "isInherit": true
                            },
                            {
                                "key": "personal_disassociation",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：連携解除可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "personal_initial_login_description",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "Book開設時のQRコード通知文書説明文",
                                "isInherit": true
                            },
                            {
                                "key": "personal_share_basic_policy",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：共有の基本方針可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "personal_two-step_verification",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "個人ポータル：2段階認証解除可否設定",
                                "isInherit": true
                            },
                            {
                                "key": "platform-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXRエコシステム基盤呼称",
                                "isInherit": true
                            },
                            {
                                "key": "portal-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "個人ポータル呼称",
                                "isInherit": true
                            },
                            {
                                "key": "pxr-root-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "流通制御サービスプロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_password_format",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのパスワードフォーマット",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_password_format_errormessage",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのパスワードフォーマットエラーメッセージ",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_password_similarity_check",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "PXR-IDのパスワード類似性チェックを行う",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_prefix",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのprefix",
                                "isInherit": true
                            },
                            {
                                "key": "pxr_id_suffix",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "PXR-IDのsuffix",
                                "isInherit": true
                            },
                            {
                                "key": "region-root-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "領域運営サービスプロバイダーの名称",
                                "isInherit": true
                            },
                            {
                                "key": "region-tou_re-consent_notification_interval",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "リージョン利用規約通知間隔",
                                "isInherit": true
                            },
                            {
                                "key": "search_target_ns",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "SearchTargetNs",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "検索対象ネームスペース",
                                "isInherit": true
                            },
                            {
                                "key": "service-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "サービス名",
                                "isInherit": true
                            },
                            {
                                "key": "service_category_for_data_category",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "ServiceCategoryForDataCategory",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "データカテゴリ用サービスカテゴリ",
                                "isInherit": true
                            },
                            {
                                "key": "service_category_for_workflow",
                                "type": {
                                    "of": "inner[]",
                                    "inner": "ServiceCategoryForWorkflow",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "ワークフロー用サービスカテゴリ",
                                "isInherit": true
                            },
                            {
                                "key": "session-expiration",
                                "type": {
                                    "of": "inner",
                                    "inner": "Expiration",
                                    "cmatrix": null,
                                    "candidate": null
                                },
                                "description": "セッション有効期限",
                                "isInherit": true
                            },
                            {
                                "key": "terms_of_service",
                                "type": {
                                    "of": "item",
                                    "_code": null,
                                    "cmatrix": null,
                                    "candidate": {
                                        "ns": null,
                                        "_code": [
                                            {
                                                "_value": 61,
                                                "_ver": 1
                                            }
                                        ],
                                        "base": null
                                    }
                                },
                                "description": "利用規約",
                                "isInherit": true
                            },
                            {
                                "key": "use_app-p",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "アプリケーションプロバイダーの使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_id_connect",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "IDコネクトの使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_region_service_operation",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "リージョンサービス運用の設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_share",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "共有の使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_supply",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "提供の使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "use_wf-p",
                                "type": {
                                    "of": "boolean",
                                    "cmatrix": null
                                },
                                "description": "ワークフロープロバイダーの使用設定",
                                "isInherit": true
                            },
                            {
                                "key": "wf-p-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "ワークフロープロバイダーの呼称",
                                "isInherit": true
                            },
                            {
                                "key": "workflow-name",
                                "type": {
                                    "of": "string",
                                    "cmatrix": null,
                                    "format": null,
                                    "unit": null,
                                    "candidate": null
                                },
                                "description": "ワークフローの呼称",
                                "isInherit": true
                            }
                        ],
                        "attribute": null
                    }
                ]).end();
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/name', _listener);
        this._app.post('/catalog/updateSet/register', _listener2);
        this._app.post('/catalog/updateSet/request', _listener2);
        this._app.get('/catalog/:code', _listener3);
        this._app.get('/catalog', _listener4);
        this._server = this._app.listen(3001);
    }
}

// Book管理サービス
class _StubBookManageServer {
    _app: express.Express;
    _server: Server;

    constructor(status: number) {
        this._app = express();

        // イベントハンドラー1 利用規約更新通知登録API
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status).json({
                "result": "success"
            }).end();
        };
        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/book-manage/term_of_use/platform/update', _listener);
        this._app.post('/book-manage/term_of_use/region/update', _listener);
        this._server = this._app.listen(3005);
    }

}

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

let _operatorServer: any;
let _catalogServer: any;
let _bookManageServer: any;

/**
 * CatalogUpdate API のユニットテスト
 */
describe('CatalogUpdate API', () => {
    /**
     * 全テスト実行後の前処理
     */
    beforeAll(async () => {
        await Application.start()
        // DB接続
        await common.connect();
        // 事前データ準備
        await common.executeSqlString(`
      DELETE FROM pxr_catalog_update.platform_terms_of_use_manage;
      DELETE FROM pxr_catalog_update.region_terms_of_use_manage;
      SELECT SETVAL('pxr_catalog_update.platform_terms_of_use_manage_id_seq', 1, false);
      SELECT SETVAL('pxr_catalog_update.region_terms_of_use_manage_id_seq', 1, false);
    `);
        // DB切断
        await common.disconnect();
    });

    /**
     * 全テスト実行後の処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
    });

    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブを停止
        if (_operatorServer) {
            _operatorServer._server.close();
        }
        if (_catalogServer) {
            _catalogServer._server.close();
        }
        if (_bookManageServer) {
            _bookManageServer._server.close();
        }
    });

    describe('PF利用規約更新API', () => {
        test('正常：下書き（isDraft:true）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'PF利用規約変更',
                description: 'PF利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 9999999,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                                name: 'PF利用規約',
                                description: 'PF利用規約の定義です。',
                                _code: {
                                    _value: 9999999,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 203,
                                    _ver: 1
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'プラットフォーム利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: false
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: null
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: true
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: true
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: true,
                id: 1
            }));
        });
        test('正常：本書き（isDraft:false）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'PF利用規約変更',
                description: 'PF利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 9999999,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                                name: 'PF利用規約',
                                description: 'PF利用規約の定義です。',
                                _code: {
                                    _value: 9999999,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 203,
                                    _ver: 1
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'プラットフォーム利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: false
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: null
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: true
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: true
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: false,
                id: 2
            }));
        });
        test('正常：利用規約の再同意フラグがtrue', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_RE_CONSENT_FLAG_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'PF利用規約変更',
                description: 'PF利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 9999999,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                                name: 'PF利用規約',
                                description: 'PF利用規約の定義です。',
                                _code: {
                                    _value: 9999999,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 203,
                                    _ver: 1
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'プラットフォーム利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: true
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: '2099-01-01T00:00:00.000+0900'
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: true
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: true
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: false,
                id: 3
            }));
        });
        test('正常：CookieからセッションIDを取得して作成', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(PutTestRequest.PLATFORM_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'PF利用規約変更',
                description: 'PF利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 9999999,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                                name: 'PF利用規約',
                                description: 'PF利用規約の定義です。',
                                _code: {
                                    _value: 9999999,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 203,
                                    _ver: 1
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'プラットフォーム利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: false
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: null
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: true
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: true
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: true,
                id: 4
            }));
        });
        test('パラメータ異常：データがない', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send('{}');

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：name（空）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.EMPTY_NAME);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：catalog（Array以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_ARRAY_CATALOG);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：isDraft（Boolean以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_BOOLEAN_IS_DRAFT);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
        });
        test('パラメータ異常：catalog.type（数字以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_NUMBER_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
            expect(response.body.reasons[1].message).toBe(Message.validation.min);
            expect(response.body.reasons[2].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：catalog.type（数字範囲外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.ZERO_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
        });
        test('パラメータ異常：catalog.type（数字範囲外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.FOUR_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
        });
        test('パラメータ異常：catalog.catalogCode（数字以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_NUMBER_CATALOG_CATALOG_CODE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：catalog.catalogCode', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CATALOG_CODE_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ不足：catalog.catalogCode', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CATALOG_CODE_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.catalogCode（空）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_CATALOG_CODE_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.catalogCode（空）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_CATALOG_CODE_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.catalogCode（null）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_CATALOG_CODE_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.catalogCode（null）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_CATALOG_CODE_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ不足：catalog.template.catalogItem._code._ver', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CATALOG_VER_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ不足：catalog.template.catalogItem._code._ver', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.MISSING_CATALOG_VER_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.template.catalogItem._code._ver（空）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_CATALOG_VER_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.template.catalogItem._code._ver（空）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_CATALOG_VER_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.template.catalogItem._code._ver（null）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_CATALOG_VER_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('パラメータ異常：catalog.template.catalogItem._code._ver（null）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NULL_CATALOG_VER_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：Cookieおよびセッション情報がない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：カタログサービスレスポンス異常400', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(400);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });

            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.GET_CATALOG_NAME_FAILED);
        });
        test('異常：カタログサービスレスポンス異常200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(204);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });

            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.GET_CATALOG_NAME_FAILED);
        });
        test('異常：カタログサービス接続エラー', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });

            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：catalogの配列の要素数が１以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.EMPTY_CATALOG);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：catalog[].typeが2（更新）以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.NOT_UPDATE_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/platform と一致しない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.INVALID_PLATFORM_NS);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：取得したカタログのnsが catalog/ext/{ext_name}/terms-of-use/platform と一致しない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer2(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：現在時刻 + 規約の同意期限の最低期限 >= period-of-re-consent となる', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_INVALIDE_PERIOD_OF_RE_CONSENT);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PERIOD_RE_CONSENT_INVALID);
        });
        test('異常：Book管理サービスレスポンス異常200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));
            _bookManageServer = new _StubBookManageServer(204);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_RE_CONSENT_FLAG_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_UPDATE_TERMS_OF_USE);
        });
        test('異常：Book管理サービス接続エラー', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.PLATFORM_IS_DRAFT_FALSE));

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.platformTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.PLATFORM_RE_CONSENT_FLAG_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.CANT_CONNECT_TO_BOOK_MANAGE);
        });
    });

    describe('Region利用規約更新API', () => {
        test('正常：下書き（isDraft:true）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'Region利用規約変更',
                description: 'Region利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 8888888,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                                name: '高齢者向け健康サポート利用規約',
                                description: '高齢者向け健康サポートの利用規約です。',
                                _code: {
                                    _value: 8888888,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 204,
                                    _ver: null
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'リージョン利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: false
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: null
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: false
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: false
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: true,
                id: 1
            }));
        });
        test('正常：本書き（isDraft:false）', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.REGION_IS_DRAFT_FALSE));
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'Region利用規約変更',
                description: 'Region利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 8888888,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                                name: '高齢者向け健康サポート利用規約',
                                description: '高齢者向け健康サポートの利用規約です。',
                                _code: {
                                    _value: 8888888,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 204,
                                    _ver: null
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'リージョン利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: false
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: null
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: false
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: false
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: false,
                id: 2
            }));
        });
        test('正常：利用規約の再同意フラグがtrue', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.REGION_IS_DRAFT_FALSE));
            _bookManageServer = new _StubBookManageServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_RE_CONSENT_FLAG_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'Region利用規約変更',
                description: 'Region利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 8888888,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                                name: '高齢者向け健康サポート利用規約',
                                description: '高齢者向け健康サポートの利用規約です。',
                                _code: {
                                    _value: 8888888,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 204,
                                    _ver: null
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'リージョン利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: true
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: '2099-01-01T00:00:00.000+0900'
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: false
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: false
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: false,
                id: 3
            }));
        });
        test('正常：CookieからセッションIDを取得して作成', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);
            _bookManageServer = new _StubBookManageServer(200);

            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + type3Session])
                .send(PutTestRequest.REGION_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                name: 'Region利用規約変更',
                description: 'Region利用規約変更の理由等記載する説明。',
                catalog: [
                    {
                        type: 2,
                        catalogCode: 8888888,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                                name: '高齢者向け健康サポート利用規約',
                                description: '高齢者向け健康サポートの利用規約です。',
                                _code: {
                                    _value: 8888888,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 204,
                                    _ver: null
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'terms-of-use',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'リージョン利用規約'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: '第1項'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '規約～～～。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        key: 're-consent-flag',
                                        value: false
                                    },
                                    {
                                        key: 'period-of-re-consent',
                                        value: null
                                    },
                                    {
                                        key: 'deleting-data-flag',
                                        value: false
                                    },
                                    {
                                        key: 'returning-data-flag',
                                        value: false
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    }
                ],
                appendix: null,
                isDraft: true,
                id: 4
            }));
        });
        test('パラメータ異常：データがない', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send('{}');

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：name（空）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.EMPTY_NAME);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：catalog（Array以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_ARRAY_CATALOG);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：isDraft（Boolean以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_BOOLEAN_IS_DRAFT);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
        });
        test('パラメータ異常：catalog.type（数字以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_NUMBER_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
            expect(response.body.reasons[1].message).toBe(Message.validation.min);
            expect(response.body.reasons[2].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：catalog.type（数字範囲外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.ZERO_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.min);
        });
        test('パラメータ異常：catalog.type（数字範囲外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.FOUR_CATALOG_TYPE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.max);
        });
        test('パラメータ異常：catalog.catalogCode（数字以外）', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.NOT_NUMBER_CATALOG_CATALOG_CODE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：Cookieおよびセッション情報がない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(PutTestRequest.REGION_IS_DRAFT_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.INVALID_REGION_NS);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：取得したカタログのnsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer2(200);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_IS_DRAFT_FALSE);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_PARAMETER_INVALID);
        });
        test('異常：現在時刻 + 規約の同意期限の最低期限 >= period-of-re-consent となる', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.REGION_IS_DRAFT_FALSE));

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_INVALIDE_PERIOD_OF_RE_CONSENT);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PERIOD_RE_CONSENT_INVALID);
        });
        test('異常：Book管理サービスレスポンス異常200以外', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.REGION_IS_DRAFT_FALSE));
            _bookManageServer = new _StubBookManageServer(204);

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_RE_CONSENT_FLAG_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_UPDATE_TERMS_OF_USE);
        });
        test('異常：Book管理サービス接続エラー', async () => {
            // スタブを起動
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, JSON.parse(PutTestTemplate.REGION_IS_DRAFT_FALSE));

            const session = JSON.stringify({
                operatorId: 2,
                loginId: 'member01',
                type: 3,
                sessionId: type3Session,
                block: {
                    _value: 1000112,
                    _ver: 1
                },
                actor: {
                    _value: 1000432,
                    _ver: 1
                }
            });
            const response = await supertest(expressApp).put(Url.regionTermsOfUseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(session) })
                .send(PutTestRequest.REGION_RE_CONSENT_FLAG_TRUE);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.CANT_CONNECT_TO_BOOK_MANAGE);
        });
    });
});
