/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/

export namespace PostTestRequest {
    /**
     * 正常：ワークフロー
     */
    export const WORKFLOW = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 正常：アプリケーション
     */
    export const APPLICATION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：全体が空
     */
    export const EMPTY_REQUEST = JSON.stringify({});
    /**
     * パラメータ異常：全体が配列
     */
    export const ARRAY_REQUEST = JSON.stringify([{
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    }]);
    /**
     * パラメータ異常：name、空
     */
    export const EMPTY_NAME = JSON.stringify({
        name: "",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：name、文字列以外
     */
    export const NOT_STRING_NAME = JSON.stringify({
        name: true,
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：description、文字列以外
     */
    export const NOT_STRING_DESCRIPTION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: true,
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog、配列以外
     */
    export const NOT_ARRAY_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog:
        {
            type: 1,
            catalogCode: null,
            content: null,
            template: {
                catalogItem: {
                    ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                    name: "蓄積イベント通知定義",
                    description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                    _code: null,
                    inherit: {
                        _value: 211,
                        _ver: null
                    }
                },
                template: {
                    prop: null,
                    value: [
                        {
                            key: "notification",
                            value: [
                                {
                                    key: "share",
                                    value: [
                                        {
                                            key: "_value",
                                            value: 1000100
                                        },
                                        {
                                            key: "_ver",
                                            value: 1
                                        }
                                    ]
                                },
                                {
                                    key: "id",
                                    value: [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
        ,
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog、空の配列
     */
    export const EMTPY_ARRAY_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog、配列の要素が１より多い
     */
    export const MANY_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].type、null
     */
    export const NULL_TYPE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: null,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].type、数値以外
     */
    export const NOT_NUMBER_TYPE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 'a',
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].type、1以外
     */
    export const UPDATE_TYPE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].catalogCode、数値以外
     */
    export const NOT_NUMBER_CATALOG_CODE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: 'a',
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template
     */
    export const MISSING_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template、null
     */
    export const NULL_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: null
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem
     */
    export const MISSING_CATALOG_ITEM = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem、null
     */
    export const NULL_CATALOG_ITEM = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: null,
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem.ns
     */
    export const MISSING_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.ns、null
     */
    export const NULL_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: null,
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.ns、空
     */
    export const EMPTY_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.ns、文字列以外
     */
    export const NOT_STRING_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: true,
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].tempalte.catalogItem.name、文字列以外
     */
    export const NOT_STRING_CATALOG_NAME = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: true,
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.description、文字列以外
     */
    export const NOT_STRING_CATALOG_DESCRIPTION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: true,
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem._code._value
     */
    export const MISSING_CODE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem._code._value、数値以外
     */
    export const NOT_NUMBER_CODE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 'a'
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem.inherit._value
     */
    export const MISSING_INHERIT_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.inherit._value、数値以外
     */
    export const NOT_NUMBER_INHERIT_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 'a',
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.template
     */
    export const MISSING_TEMPLATE_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.template、null
     */
    export const NULL_TEMPLATE_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: null
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.template.value
     */
    export const MISSING_TEMPLATE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.template.value、null
     */
    export const NULL_TEMPLATE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.template.value、配列以外
     */
    export const NOT_ARRAY_TEMPLATE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value:
                        {
                            key: "notification",
                            value: [
                                {
                                    key: "share",
                                    value: [
                                        {
                                            key: "_value",
                                            value: 1000100
                                        },
                                        {
                                            key: "_ver",
                                            value: 1
                                        }
                                    ]
                                },
                                {
                                    key: "id",
                                    value: [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：isDraft、boolean以外
     */
    export const NOT_BOOLEAN_IS_DRAFT = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: 'a'
    });
    /**
     * 異常：カタログ不正（ns）
     */
    export const INVALID_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：カタログ不正（共有定義通知設定なし）
     */
    export const MISSING_NOTIFICATION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "dummy",
                                value: "dummy"
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：カタログ不正（共有機能定義カタログなし）
     */
    export const MISSING_SHARE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：カタログ不正（共有機能定義カタログコードがnull）
     */
    export const NULL_SHARE_CODE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: null
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：カタログ不正（共有機能定義カタログバージョンがnull）
     */
    export const NULL_SHARE_VERSION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: null
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：カタログ不正（共有機能定義カタログ識別子がない）
     */
    export const MISSING_SHARE_ID = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：カタログ不正（共有機能定義カタログ識別子が空）
     */
    export const EMPTY_SHARE_ID = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: []
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：対象状態共有機能定義カタログ内の状態共有機能UUIDがない
     */
    export const INVALID_SHARE_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000101
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：対象状態共有機能定義カタログ内の状態共有機能UUID内にリクエストのidがない
     */
    export const INVALID_SHARE_ID = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: null,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: null,
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "b87b27c1-5da8-37dd-6ee6-2c7831cf6a09"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
}

export namespace PutTestRequest {
    /**
     * 正常：ワークフロー
     */
    export const WORKFLOW = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/wf/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 正常：アプリケーション
     */
    export const APPLICATION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：全体が空
     */
    export const EMPTY_REQUEST = JSON.stringify({});
    /**
     * パラメータ異常：全体が配列
     */
    export const ARRAY_REQUEST = JSON.stringify([{
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 22,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    }]);
    /**
     * パラメータ異常：name、空
     */
    export const EMPTY_NAME = JSON.stringify({
        name: "",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：name、文字列以外
     */
    export const NOT_STRING_NAME = JSON.stringify({
        name: true,
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：description、文字列以外
     */
    export const NOT_STRING_DESCRIPTION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: true,
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog、配列以外
     */
    export const NOT_ARRAY_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog:
        {
            type: 2,
            catalogCode: 1001010,
            content: null,
            template: {
                catalogItem: {
                    ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                    name: "蓄積イベント通知定義",
                    description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                    _code: {
                        _value: 1001010,
                        _ver: 1
                    },
                    inherit: {
                        _value: 211,
                        _ver: null
                    }
                },
                template: {
                    prop: null,
                    value: [
                        {
                            key: "notification",
                            value: [
                                {
                                    key: "share",
                                    value: [
                                        {
                                            key: "_value",
                                            value: 1000100
                                        },
                                        {
                                            key: "_ver",
                                            value: 1
                                        }
                                    ]
                                },
                                {
                                    key: "id",
                                    value: [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
        ,
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog、空の配列
     */
    export const EMTPY_ARRAY_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog、配列の要素が１より多い
     */
    export const MANY_CATALOG = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].type、null
     */
    export const NULL_TYPE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: null,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].type、数値以外
     */
    export const NOT_NUMBER_TYPE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 'a',
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].type、1以外
     */
    export const ADD_TYPE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 1,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].catalogCode、数値以外
     */
    export const NOT_NUMBER_CATALOG_CODE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 'a',
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template
     */
    export const MISSING_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template、null
     */
    export const NULL_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: null
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem
     */
    export const MISSING_CATALOG_ITEM = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem、null
     */
    export const NULL_CATALOG_ITEM = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: null,
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem.ns
     */
    export const MISSING_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.ns、null
     */
    export const NULL_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: null,
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.ns、空
     */
    export const EMPTY_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.ns、文字列以外
     */
    export const NOT_STRING_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: true,
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].tempalte.catalogItem.name、文字列以外
     */
    export const NOT_STRING_CATALOG_NAME = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: true,
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.description、文字列以外
     */
    export const NOT_STRING_CATALOG_DESCRIPTION = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: true,
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem._code
     */
    export const MISSING_CODE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem._code._value
     */
    export const MISSING_CODE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem._code._value、数値以外
     */
    export const NOT_NUMBER_CODE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 'a'
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.catalogItem.inherit._value
     */
    export const MISSING_INHERIT_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.catalogItem.inherit._value、数値以外
     */
    export const NOT_NUMBER_INHERIT_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 'a',
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.template
     */
    export const MISSING_TEMPLATE_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.template、null
     */
    export const NULL_TEMPLATE_TEMPLATE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: null
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ不足：catalog[].template.template.value
     */
    export const MISSING_TEMPLATE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.template.value、null
     */
    export const NULL_TEMPLATE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: null
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：catalog[].template.template.value、配列以外
     */
    export const NOT_ARRAY_TEMPLATE_VALUE = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value:
                        {
                            key: "notification",
                            value: [
                                {
                                    key: "share",
                                    value: [
                                        {
                                            key: "_value",
                                            value: 1000100
                                        },
                                        {
                                            key: "_ver",
                                            value: 1
                                        }
                                    ]
                                },
                                {
                                    key: "id",
                                    value: [
                                        "507bff6c-4842-c3d2-a288-df88698d446e"
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * パラメータ異常：isDraft、boolean以外
     */
    export const NOT_BOOLEAN_IS_DRAFT = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001010,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: 'a'
    });
    /**
     * 異常：更新対象カタログにcatalogItem.nsがない
     */
    export const MISSING_UPDATE_CATALOG_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001011,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001011,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
    /**
     * 異常：更新対象カタログのnsが一致しない
     */
    export const INVALID_UPDATE_CATALOG_NS = JSON.stringify({
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        catalog: [
            {
                type: 2,
                catalogCode: 1001012,
                content: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001012,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000100
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null,
        isDraft: false
    });
}

export namespace TestTemplate {
    /**
     * 正常：ワークフロー
     */
    export const WORKFLOW_TEMPLATE = JSON.stringify({
        id: 1,
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        callerActorCode: 1000004,
        approvalActorCode: 1000004,
        approver: "test_member",
        approvalAt: "2099-12-31T00:00:00.000+0900",
        comment: null,
        status: 1,
        registerActorCode: 1000004,
        register: "test_member",
        registAt: "2099-12-31T00:00:00.000+0900",
        ns: null,
        catalog: [
            {
                type: 1,
                catalogCode: null,
                comment: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000465
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null
    });
    /**
     * 正常：アプリケーション
     */
    export const APPLICATION_TEMPLATE = JSON.stringify({
        id: 2,
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        callerActorCode: 1000004,
        approvalActorCode: 1000004,
        approver: "test_member",
        approvalAt: "2099-12-31T00:00:00.000+0900",
        comment: null,
        status: 1,
        registerActorCode: 1000004,
        register: "test_member",
        registAt: "2099-12-31T00:00:00.000+0900",
        ns: null,
        catalog: [
            {
                type: 1,
                catalogCode: null,
                comment: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        _code: {
                            _value: 1001010,
                            _ver: 1
                        },
                        inherit: {
                            _value: 211,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000465
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null
    });
    /**
     * 異常：不正カタログ（_codeなし）
     */
    export const INVALID_TEMPLATE = JSON.stringify({
        id: 3,
        name: "蓄積イベント通知定義作成",
        description: "蓄積イベント通知定義作成の理由等記載する説明。",
        callerActorCode: 1000004,
        approvalActorCode: 1000004,
        approver: "test_member",
        approvalAt: "2099-12-31T00:00:00.000+0900",
        comment: null,
        status: 1,
        registerActorCode: 1000004,
        register: "test_member",
        registAt: "2099-12-31T00:00:00.000+0900",
        ns: null,
        catalog: [
            {
                type: 1,
                catalogCode: null,
                comment: null,
                template: {
                    catalogItem: {
                        ns: "catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000004/share/notification",
                        name: "蓄積イベント通知定義",
                        description: "アプリケーションの状態共有機能に関する蓄積イベント通知の定義です。",
                        inherit: {
                            _value: 211,
                            _ver: 1
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: "notification",
                                value: [
                                    {
                                        key: "share",
                                        value: [
                                            {
                                                key: "_value",
                                                value: 1000465
                                            },
                                            {
                                                key: "_ver",
                                                value: 1
                                            }
                                        ]
                                    },
                                    {
                                        key: "id",
                                        value: [
                                            "507bff6c-4842-c3d2-a288-df88698d446e"
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        ],
        appendix: null
    });
}
