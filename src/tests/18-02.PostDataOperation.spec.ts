/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as supertest from 'supertest';
import Application from '../index';
import Common, { Url } from './Common';
import { Session } from './10-00.GetAlliance.TestData';
import * as express from 'express';
import { Server } from 'net';
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
/** eslint-enable  */

// 対象アプリケーションを取得
const expressApp = Application.express.app;
const common = new Common();

// 対象URLを設定
const type3Session: string = 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc';

/**
 * オペレータサービス
 */
export class _StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, actorCode: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                    _operatorServerId: 1,
                    type: 0,
                    loginId: 'mng_menber01',
                    name: '運営メンバー01',
                    auth: '{add: true, update: true, delete: true}',
                    lastLoginAt: '2020-01-14 15:27:20.426',
                    block: {
                        _value: 1000111,
                        _ver: 1
                    },
                    actor: {
                        _value: actorCode,
                        _ver: 1
                    }
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

/**
 * カタログサービス
 */
 export class _StubCatalogServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    ext_name: 'aaa-healthcare-consortium'
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener_reg = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1,
                    name: '',
                    description: '',
                    callerActorCode: 1,
                    approvalActorCode: 1,
                    approver: '',
                    approvalAt: '',
                    comment: '',
                    status: 1,
                    registerActorCode: 1,
                    register: '',
                    registAt: '',
                    ns: '',
                    catalog: [{
                        template: {
                            catalogItem: {
                                _code:{
                                    _value: 1,
                                    _ver: 1
                                }
                            }
                        }
                    }],
                    appendix: ''
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener_req = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                res.json({
                    id: 1,
                    name: '名前',
                    description: '説明',
                    callerActorCode: 1,
                    approvalActorCode: 1,
                    approver: 'root_user',
                    approvalAt: '2021-12-31T23:59:59.999+09:00',
                    comment: 'コメント',
                    status: 1,
                    registerActorCode: 1,
                    register: 'root_user',
                    registAt: '2021-12-31T23:59:59.999+09:00',
                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000432/store',
                    catalog: [],
                    appendix: ''
                });
            }
            res.end();
        };

        // イベントハンドラー
        let count = 1;
        const _listener_codes = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (status === 200) {
                if (type === 1000002) {
                    if (count === 1) {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store',
                                name: '外来診療が蓄積可能なデータ',
                                _code: {
                                    _value: 1000489,
                                    _ver: 10
                                },
                                inherit: {
                                    _value: 44,
                                    _ver: 1
                                },
                                description: '外来診療が蓄積可能なデータ定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000489,
                                    _ver: 10
                                },
                                store: [
                                    {
                                        id: '5589c2b6-e79b-eb17-c78b-8a9f4425a737',
                                        role: [
                                            {
                                                _value: 1000484,
                                                _ver: 1
                                            }
                                        ],
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000823,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1001511,
                                                    _ver: 3
                                                },
                                                requireConsent: true
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000811,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000814,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000815,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000816,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000817,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000818,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000819,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1001362,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    } else {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store',
                                name: '外来診療が蓄積可能なデータ',
                                _code: {
                                    _value: 1000489,
                                    _ver: 11
                                },
                                inherit: {
                                    _value: 44,
                                    _ver: 1
                                },
                                description: '外来診療が蓄積可能なデータ定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000489,
                                    _ver: 10
                                },
                                store: [
                                    {
                                        id: '5589c2b6-e79b-eb17-c78b-8a9f4425a737',
                                        role: [
                                            {
                                                _value: 1000484,
                                                _ver: 1
                                            }
                                        ],
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000823,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1001511,
                                                    _ver: 3
                                                },
                                                requireConsent: true
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000811,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000814,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000815,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000816,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000817,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000818,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000819,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1001362,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: '5589c2b6-e79b-eb17-c78b-8a9f4425a738',
                                        role: [
                                            {
                                                _value: 1000484,
                                                _ver: 1
                                            }
                                        ],
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000823,
                                                    _ver: 1
                                                },
                                                requireConsent: false
                                            },
                                            {
                                                code: {
                                                    _value: 1001511,
                                                    _ver: 3
                                                },
                                                requireConsent: false
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000811,
                                                    _ver: 1
                                                },
                                                requireConsent: false,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000814,
                                                            _ver: 1
                                                        },
                                                        requireConsent: false
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000815,
                                                            _ver: 1
                                                        },
                                                        requireConsent: false
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    }
                } else if (type === 1000003) {
                    if (count === 1) {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000436/share',
                                name: '【症状管理】お子様の症状管理機能',
                                _code: {
                                    _value: 1000466,
                                    _ver: 3
                                },
                                inherit: {
                                    _value: 40,
                                    _ver: 1
                                },
                                description: '【症状管理】お子様の症状管理機能です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000466,
                                    _ver: 3
                                },
                                share: [
                                    {
                                        id: 'b3a30be9-f78e-7a37-585d-3fa2e6b3a97c',
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000802,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000806,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000807,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000808,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ],
                                        thing: [
                                            {
                                                code: {
                                                    _value: 1000808,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    } else {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000436/share',
                                name: '【症状管理】お子様の症状管理機能',
                                _code: {
                                    _value: 1000466,
                                    _ver: 4
                                },
                                inherit: {
                                    _value: 40,
                                    _ver: 1
                                },
                                description: '【症状管理】お子様の症状管理機能です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000466,
                                    _ver: 3
                                },
                                share: [
                                    {
                                        id: 'b3a30be9-f78e-7a37-585d-3fa2e6b3a97c',
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000802,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000806,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000807,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000808,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ],
                                        thing: [
                                            {
                                                code: {
                                                    _value: 1000808,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1000807,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    }
                } else if (type === 1000004) {
                    if (count === 1) {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000436/share',
                                name: '【症状管理】お子様の症状管理機能',
                                _code: {
                                    _value: 1000466,
                                    _ver: 3
                                },
                                inherit: {
                                    _value: 40,
                                    _ver: 1
                                },
                                description: '【症状管理】お子様の症状管理機能です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000466,
                                    _ver: 3
                                },
                                share: [
                                    {
                                        id: 'b3a30be9-f78e-7a37-585d-3fa2e6b3a97c',
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000802,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000806,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000807,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000808,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ],
                                        thing: [
                                            {
                                                code: {
                                                    _value: 1000808,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    } else {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000436/share',
                                name: '【症状管理】お子様の症状管理機能',
                                _code: {
                                    _value: 1000466,
                                    _ver: 4
                                },
                                inherit: {
                                    _value: 40,
                                    _ver: 1
                                },
                                description: '【症状管理】お子様の症状管理機能です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000466,
                                    _ver: 3
                                },
                                share: [
                                    {
                                        id: 'b3a30be9-f78e-7a37-585d-3fa2e6b3a97c',
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000802,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000802,
                                                    _ver: 2
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000806,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000807,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000808,
                                                            _ver: 2
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ],
                                        thing: [
                                            {
                                                code: {
                                                    _value: 1000808,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1000807,
                                                    _ver: 2
                                                },
                                                requireConsent: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    }
                } else if (type === 1000005) {
                    if (count === 1) {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store',
                                name: '外来診療が蓄積可能なデータ',
                                _code: {
                                    _value: 1000489,
                                    _ver: 10
                                },
                                inherit: {
                                    _value: 44,
                                    _ver: 1
                                },
                                description: '外来診療が蓄積可能なデータ定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000489,
                                    _ver: 10
                                },
                                store: [
                                    {
                                        id: '5589c2b6-e79b-eb17-c78b-8a9f4425a737',
                                        role: [
                                            {
                                                _value: 1000484,
                                                _ver: 1
                                            }
                                        ],
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000823,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1001511,
                                                    _ver: 3
                                                },
                                                requireConsent: true
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000811,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000814,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000815,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000816,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000817,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000818,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000819,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1001362,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    } else {
                        res.json([{
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store',
                                name: '外来診療が蓄積可能なデータ',
                                _code: {
                                    _value: 1000489,
                                    _ver: 11
                                },
                                inherit: {
                                    _value: 44,
                                    _ver: 1
                                },
                                description: '外来診療が蓄積可能なデータ定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000489,
                                    _ver: 10
                                },
                                store: [
                                    {
                                        id: '5589c2b6-e79b-eb17-c78b-8a9f4425a737',
                                        role: [
                                            {
                                                _value: 1000484,
                                                _ver: 1
                                            }
                                        ],
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000823,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1001511,
                                                    _ver: 3
                                                },
                                                requireConsent: true
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000811,
                                                    _ver: 1
                                                },
                                                requireConsent: true,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000814,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000815,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000816,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000817,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000818,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000819,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1001362,
                                                            _ver: 1
                                                        },
                                                        requireConsent: true
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: '5589c2b6-e79b-eb17-c78b-8a9f4425a738',
                                        role: [
                                            {
                                                _value: 1000484,
                                                _ver: 1
                                            }
                                        ],
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000823,
                                                    _ver: 1
                                                },
                                                requireConsent: true
                                            },
                                            {
                                                code: {
                                                    _value: 1001511,
                                                    _ver: 3
                                                },
                                                requireConsent: false
                                            }
                                        ],
                                        event: [
                                            {
                                                code: {
                                                    _value: 1000811,
                                                    _ver: 1
                                                },
                                                requireConsent: false,
                                                thing: [
                                                    {
                                                        code: {
                                                            _value: 1000814,
                                                            _ver: 1
                                                        },
                                                        requireConsent: false
                                                    },
                                                    {
                                                        code: {
                                                            _value: 1000815,
                                                            _ver: 1
                                                        },
                                                        requireConsent: false
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            prop: null,
                            value: null,
                            attribute: null
                        }]);
                    }
                }
            }
            count++;
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/catalog/name', _listener);
        this._app.post('/catalog/updateSet/register', _listener_reg);
        this._app.post('/catalog/updateSet/request', _listener_req);
        this._app.post('/catalog/', _listener_codes);
        this._server = this._app.listen(3001);
    }
}

/**
 * BOOK管理サービス
 */
 export class _StubBookManageServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/book-manage//settings/update', _listener);
        this._server = this._app.listen(3005);
    }
}

let _operatorServer: _StubOperatorServer;
let _catalogServer: _StubCatalogServer;
let _bookManageServer: _StubBookManageServer;

/**
 * データ処理定義申請登録 API のユニットテスト
 */
describe('データ処理定義申請登録 API', () => {
    /**
     * 全テスト実行前の処理
     */
    beforeAll(async () => {
        await Application.start()
        // DB接続
        await common.connect();
        // 事前データ準備
        await common.executeSqlString(`
        DELETE FROM pxr_catalog_update.data_operation_manage;

        SELECT SETVAL('pxr_catalog_update.data_operation_manage_id_seq', 1, false);

        INSERT INTO pxr_catalog_update.data_operation_manage
        (
            template,
            application_actor_code,
            application_block_code,
            application_at,
            is_draft,
            is_disabled, created_by, created_at, updated_by, updated_at
        )
        VALUES
        (
            '{name:ストアカタログ,description:null,type:null,callerActorCode:1000438,approvalActorCode:1000438,approver:tongulltest00002,approvalAt:2022-05-11T11:54:54.619+0900,comment:null,status:1,registerActorCode:1000438,register:tongulltest00002,registAt:2022-05-11T11:54:54.199+0900,ns:null,catalog:[{type:1,catalogCode:null,comment:null,template:{catalogItem:{ns:catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store,name:テスト金,_code:{_value:1001665,_ver:1},inherit:{_value:44,_ver:1},description:N区総合病院が蓄積可能なデータ定義です。},attribute:null,inner:null,template:{prop:null,value:[{key:_code,value:null},{key:store,value:[{key:id,value:180b10a7254319}]}]}}}],appendix:[],attribute:null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            true,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{name:ストアカタログ,description:null,type:null,callerActorCode:1000438,approvalActorCode:1000438,approver:tongulltest00002,approvalAt:2022-05-11T11:54:54.619+0900,comment:null,status:1,registerActorCode:1000438,register:tongulltest00002,registAt:2022-05-11T11:54:54.199+0900,ns:null,catalog:[{type:1,catalogCode:null,comment:null,template:{catalogItem:{ns:catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store,name:テスト金,_code:{_value:1001665,_ver:1},inherit:{_value:44,_ver:1},description:N区総合病院が蓄積可能なデータ定義です。},attribute:null,inner:null,template:{prop:null,value:[{key:_code,value:null},{key:store,value:[{key:id,value:180b10a7254319}]}]}}}],appendix:[],attribute:null}',
            1000436,
            1000010,
            '2025-12-31 23:59:59.000',
            false,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{name:ストアカタログ,description:null,type:null,callerActorCode:1000438,approvalActorCode:1000438,approver:tongulltest00002,approvalAt:2022-05-11T11:54:54.619+0900,comment:null,status:1,registerActorCode:1000438,register:tongulltest00002,registAt:2022-05-11T11:54:54.199+0900,ns:null,catalog:[{type:1,catalogCode:null,comment:null,template:{catalogItem:{ns:catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store,name:テスト金,_code:{_value:1001665,_ver:1},inherit:{_value:44,_ver:1},description:N区総合病院が蓄積可能なデータ定義です。},attribute:null,inner:null,template:{prop:null,value:[{key:_code,value:null},{key:store,value:[{key:id,value:180b10a7254319}]}]}}}],appendix:[],attribute:null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            true,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{name:シェアカタログ,description:null,type:null,callerActorCode:1000438,approvalActorCode:1000438,approver:tongulltest00002,approvalAt:2022-05-11T11:54:54.619+0900,comment:null,status:1,registerActorCode:1000438,register:tongulltest00002,registAt:2022-05-11T11:54:54.199+0900,ns:null,catalog:[{type:1,catalogCode:null,comment:null,template:{catalogItem:{ns:catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store,name:テスト金,_code:{_value:1001665,_ver:1},inherit:{_value:44,_ver:1},description:N区総合病院が蓄積可能なデータ定義です。},attribute:null,inner:null,template:{prop:null,value:[{key:_code,value:null},{key:store,value:[{key:id,value:180b10a7254319}]}]}}}],appendix:[],attribute:null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            true,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{name:シェアカタログ,description:null,type:null,callerActorCode:1000438,approvalActorCode:1000438,approver:tongulltest00002,approvalAt:2022-05-11T11:54:54.619+0900,comment:null,status:1,registerActorCode:1000438,register:tongulltest00002,registAt:2022-05-11T11:54:54.199+0900,ns:null,catalog:[{type:1,catalogCode:null,comment:null,template:{catalogItem:{ns:catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store,name:テスト金,_code:{_value:1001665,_ver:1},inherit:{_value:44,_ver:1},description:N区総合病院が蓄積可能なデータ定義です。},attribute:null,inner:null,template:{prop:null,value:[{key:_code,value:null},{key:store,value:[{key:id,value:180b10a7254319}]}]}}}],appendix:[],attribute:null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            true,
            false, 'test_user', NOW(), 'test_user', NOW()
        ),
        (
            '{name:ストアカタログ,description:null,type:null,callerActorCode:1000438,approvalActorCode:1000438,approver:tongulltest00002,approvalAt:2022-05-11T11:54:54.619+0900,comment:null,status:1,registerActorCode:1000438,register:tongulltest00002,registAt:2022-05-11T11:54:54.199+0900,ns:null,catalog:[{type:1,catalogCode:null,comment:null,template:{catalogItem:{ns:catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000438/store,name:テスト金,_code:{_value:1001665,_ver:1},inherit:{_value:44,_ver:1},description:N区総合病院が蓄積可能なデータ定義です。},attribute:null,inner:null,template:{prop:null,value:[{key:_code,value:null},{key:store,value:[{key:id,value:180b10a7254319}]}]}}}],appendix:[],attribute:null}',
            1000001,
            1000010,
            '2025-12-31 23:59:59.000',
            true,
            false, 'test_user', NOW(), 'test_user', NOW()
        );
        `);
        // DB切断
        await common.disconnect();

    });
    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        Application.stop();
    });

    /**
     * 各テスト実行後の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
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

    /**
     * データ処理定義申請
     */
    describe('データ処理定義申請', () => {
        test('正常：下書き', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('正常：清書', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('異常：更新、bookManage未起動', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000003);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.CANT_CONNECT_TO_BOOK_MANAGE);
        });

        test('正常：更新(同意不要)', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('正常：更新', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000003);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 4,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/share',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('正常：更新', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000004);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 5,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/share',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('正常：更新', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000005);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 6,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/share',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });

        test('異常：対象外のNS', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000002/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_TARGET_NS);
        });

        test('異常：更新対象なし', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 2,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXISTS_APPLICATION_OF_ID);
        });

        test('異常：リクエストが空', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });

        test('異常：リクエストが配列', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify([{
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }]));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });

        test('異常：下書きでカタログがnull', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: null,
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_CATALOG);
        });

        test('異常：下書きでカタログが空の配列', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_CATALOG);
        });

        test('異常：清書でカタログがnull', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: null,
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_CATALOG);
        });

        test('異常：清書でカタログが空の配列', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_CATALOG);
        });

        test('異常：更新でカタログコードが未設定', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 2,
                            catalogCode: null,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_CATALOG_CODE);
        });

        test('異常：削除でカタログコードが未設定', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 1,
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 3,
                            catalogCode: null,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: {
                                        _value: 1,
                                        _ver: 1
                                    },
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: false
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_CATALOG_CODE);
        });

        test('異常：idが数字以外', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    id: 'test',
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });

        test('異常：nameが未定義', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('異常：nameがnull', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: null,
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });

        test('異常：nameが文字列以外', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: 1,
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });

        test('異常：descriptionが文字列以外', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: '名称',
                    description: 1,
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });

        test('異常：catalogが配列ではない', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: '名称',
                    description: '説明',
                    catalog: {
                        type: 1,
                        catalogCode: 9999999,
                        comment: null,
                        template: {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                name: 'データ処理定義申請',
                                description: 'データ処理定義申請の定義です。',
                                _code: null,
                                inherit: {
                                    _value: 48,
                                    _ver: null
                                }
                            },
                            template: {
                                prop: null,
                                value: [
                                    {
                                        key: 'statement',
                                        value: [
                                            {
                                                key: 'title',
                                                value: 'ステートメント'
                                            },
                                            {
                                                key: 'section',
                                                value: [
                                                    {
                                                        key: 'title',
                                                        value: 'ステートメント'
                                                    },
                                                    {
                                                        key: 'content',
                                                        value: [
                                                            {
                                                                key: 'sentence',
                                                                value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            inner: null,
                            attribute: null
                        }
                    },
                    appendix: 'その他',
                    isDraft: true
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });

        test('異常：isDraftがBoolean以外', async () => {
            _operatorServer = new _StubOperatorServer(200, 1000002);
            _catalogServer = new _StubCatalogServer(200, 1000002);
            _bookManageServer = new _StubBookManageServer(200, 1000002);
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.dataOperationURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    name: '名称',
                    description: '説明',
                    catalog: [
                        {
                            type: 1,
                            catalogCode: 9999999,
                            comment: null,
                            template: {
                                catalogItem: {
                                    ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000001/store',
                                    name: 'データ処理定義申請',
                                    description: 'データ処理定義申請の定義です。',
                                    _code: null,
                                    inherit: {
                                        _value: 48,
                                        _ver: null
                                    }
                                },
                                template: {
                                    prop: null,
                                    value: [
                                        {
                                            key: 'statement',
                                            value: [
                                                {
                                                    key: 'title',
                                                    value: 'ステートメント'
                                                },
                                                {
                                                    key: 'section',
                                                    value: [
                                                        {
                                                            key: 'title',
                                                            value: 'ステートメント'
                                                        },
                                                        {
                                                            key: 'content',
                                                            value: [
                                                                {
                                                                    key: 'sentence',
                                                                    value: '高齢者が医療・健康サービスを簡単に受けられるようにサポートするアプリの提供と利用講習会の開催などを行っています。'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                inner: null,
                                attribute: null
                            }

                        }
                    ],
                    appendix: 'その他',
                    isDraft: 'true'
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
        });
    });
});
