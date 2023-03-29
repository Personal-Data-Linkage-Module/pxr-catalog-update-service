/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
export namespace PostTestRequest {
    /**
     * 正常：下書き（isDraft:true）
     */
    export const PLATFORM_IS_DRAFT_TRUE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
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
        isDraft: true
    });

    /**
     * 正常：本書き（isDraft:false）
     */
    export const PLATFORM_IS_DRAFT_FALSE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
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
        isDraft: false
    })

    /**
     * 正常：catalog.catalogItemなしで登録
     */
    export const MISSING_CATALOG_ITEM = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                comment: null,
                template: {
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
        isDraft: true
    });

    /**
     * 正常：カタログコードなしで登録
     */
    export const MISSING_CATALOG_CODE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * 正常：カタログバージョンなしで登録
     */
    export const MISSING_CATALOG_VER = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            _value: 9999999
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * 正常：下書き（isDraft:true）
     */
    export const REGION_IS_DRAFT_TRUE = JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                        name: '高齢者向け健康サポート利用規約',
                        description: '高齢者向け健康サポートの利用規約です。',
                        _code: {
                            _value: 9999999,
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
        isDraft: true
    });

    /**
     * 正常：本書き（isDraft:false）
     */
    export const REGION_IS_DRAFT_FALSE = JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                        name: '高齢者向け健康サポート利用規約',
                        description: '高齢者向け健康サポートの利用規約です。',
                        _code: {
                            _value: 9999999,
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
        isDraft: false
    })

    /**
     * パラメータ異常：name（空）
     */
    export const EMPTY_NAME = JSON.stringify({
        name: '',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog（Array以外）
     */
    export const NOT_ARRAY_CATALOG = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog:
        {
            type: 1,
            catalogCode: 9999999,
            comment: null,
            template: {
                catalogItem: {
                    ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                    name: '利用規約',
                    description: '利用規約の定義です。',
                    _code: {
                        _value: 9999999,
                        _ver: 1
                    },
                    inherit: {
                        _value: 203,
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
        ,
        appendix: null,
        isDraft: true
    });

    /**
     * パラメータ異常：isDraft（Boolean以外）
     */
    export const NOT_BOOLEAN_IS_DRAFT = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: ''
    });

    /**
     * パラメータ異常：catalog.type（数字以外）
     */
    export const NOT_NUMBER_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 'a',
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.type（数字範囲外）
     */
    export const ZERO_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 0,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.type（数字範囲外）
     */
    export const FOUR_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 4,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.catalogCode（数字以外）
     */
    export const NOT_NUMBER_CATALOG_CATALOG_CODE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 'a',
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * 異常：catalogの配列の要素数が１以外
     */
    export const EMPTY_CATALOG = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
        ],
        appendix: null,
        isDraft: false
    });

    /**
     * 異常：catalogの配列の要素数が１以外
     */
    export const LENGTH_TWO_CATALOG = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
            },
            {
                type: 1,
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
        isDraft: false
    });

    /**
     * 異常：catalog[].typeが1（作成）以外
     */
    export const NOT_ADD_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: false
    })

    /**
     * 異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/platform と一致しない
     */
    export const INVALID_PLATFORM_NS = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform/aaaaaaa',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: false
    })

    /**
     * 異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない
     */
    export const INVALID_REGION_NS = JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432/aaaaaaa',
                        name: '高齢者向け健康サポート利用規約',
                        description: '高齢者向け健康サポートの利用規約です。',
                        _code: {
                            _value: 9999999,
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
        isDraft: false
    })

    /**
     * 異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない
     */
    export const INVALID_ACTOR_REGION_NS = JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000002',
                        name: '高齢者向け健康サポート利用規約',
                        description: '高齢者向け健康サポートの利用規約です。',
                        _code: {
                            _value: 9999999,
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
        isDraft: false
    })
}

export namespace PutTestRequest {
    /**
     * 正常：下書き（isDraft:true）
     */
    export const PLATFORM_IS_DRAFT_TRUE = JSON.stringify({
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
        isDraft: true
    });

    /**
     * 正常：本書き（isDraft:false）
     */
    export const PLATFORM_IS_DRAFT_FALSE = JSON.stringify({
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
        isDraft: false
    });

    /**
     * 正常：下書き（isDraft:true）
     */
    export const REGION_IS_DRAFT_TRUE = JSON.stringify({
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
        isDraft: true
    })

    /**
     * 正常：本書き（isDraft:false）
     */
    export const REGION_IS_DRAFT_FALSE = JSON.stringify({
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
        isDraft: false
    })


    /**
     * 正常：利用規約の再同意フラグがtrue
     */
    export const PLATFORM_RE_CONSENT_FLAG_TRUE = JSON.stringify({
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
        isDraft: false
    });

    /**
     * 正常：利用規約の再同意フラグがtrue
     */
    export const REGION_RE_CONSENT_FLAG_TRUE = JSON.stringify({
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
        isDraft: false
    })

    /**
     * パラメータ異常：name（空）
     */
    export const EMPTY_NAME = JSON.stringify({
        name: '',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog（Array以外）
     */
    export const NOT_ARRAY_CATALOG = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog:
        {
            type: 2,
            catalogCode: 9999999,
            comment: null,
            template: {
                catalogItem: {
                    ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                    name: '利用規約',
                    description: '利用規約の定義です。',
                    _code: {
                        _value: 9999999,
                        _ver: 1
                    },
                    inherit: {
                        _value: 203,
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
        ,
        appendix: null,
        isDraft: true
    });

    /**
     * パラメータ異常：isDraft（Boolean以外）
     */
    export const NOT_BOOLEAN_IS_DRAFT = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: ''
    });

    /**
     * パラメータ異常：catalog.type（数字以外）
     */
    export const NOT_NUMBER_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 'a',
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.type（数字範囲外）
     */
    export const ZERO_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 0,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.type（数字範囲外）
     */
    export const FOUR_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 4,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.catalogCode（数字以外）
     */
    export const NOT_NUMBER_CATALOG_CATALOG_CODE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 'a',
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: true
    });


    /**
     * パラメータ不足：catalog.catalogCode
     */
    export const MISSING_CATALOG_CODE_IS_DRAFT_TRUE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
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
        isDraft: true
    });

    /**
     * パラメータ不足：catalog.catalogCode
     */
    export const MISSING_CATALOG_CODE_IS_DRAFT_FALSE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
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
        isDraft: false
    });

    /**
     * パラメータ異常：catalog.catalogCode（空）
     */
    export const EMPTY_CATALOG_CODE_IS_DRAFT_TRUE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: '',
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            catalog_value: '',
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.catalogCode（空）
     */
    export const EMPTY_CATALOG_CODE_IS_DRAFT_FALSE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: '',
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            catalog_value: '',
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
        isDraft: false
    });

    /**
     * パラメータ不足：catalog.catalogCode（null）
     */
    export const NULL_CATALOG_CODE_IS_DRAFT_TRUE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: null,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            _value: null,
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
        isDraft: true
    });

    /**
     * パラメータ不足：catalog.catalogCode（null）
     */
    export const NULL_CATALOG_CODE_IS_DRAFT_FALSE = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: null,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            _value: null,
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
        isDraft: false
    });

    /**
     * パラメータ不足：catalog.template.catalogItem._code._ver
     */
    export const MISSING_CATALOG_VER_IS_DRAFT_TRUE = JSON.stringify({
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
                            _value: 9999999
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
        isDraft: true
    });

    /**
     * パラメータ不足：catalog.template.catalogItem._code._ver
     */
    export const MISSING_CATALOG_VER_IS_DRAFT_FALSE = JSON.stringify({
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
                            _value: 9999999
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
        isDraft: false
    });

    /**
     * パラメータ異常：catalog.template.catalogItem._code._ver（空）
     */
    export const EMPTY_CATALOG_VER_IS_DRAFT_TRUE = JSON.stringify({
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
                            _ver: ''
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
        isDraft: true
    });

    /**
     * パラメータ異常：catalog.template.catalogItem._code._ver（空）
     */
    export const EMPTY_CATALOG_VER_IS_DRAFT_FALSE = JSON.stringify({
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
                            _ver: ''
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
        isDraft: false
    });

    /**
     * パラメータ不足：catalog.template.catalogItem._code._ver（null）
     */
    export const NULL_CATALOG_VER_IS_DRAFT_TRUE = JSON.stringify({
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
                            _ver: null
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
        isDraft: true
    });

    /**
     * パラメータ不足：catalog.template.catalogItem._code._ver（null）
     */
    export const NULL_CATALOG_VER_IS_DRAFT_FALSE = JSON.stringify({
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
                            _ver: null
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
        isDraft: false
    });

    /**
     * 異常：catalogの配列の要素数が１以外
     */
    export const EMPTY_CATALOG = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
        ],
        appendix: null,
        isDraft: false
    });

    /**
     * 異常：catalogの配列の要素数が１以外
     */
    export const LENGTH_TWO_CATALOG = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
            },
            {
                type: 1,
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
        isDraft: false
    });

    /**
     * 異常：catalog[].typeが2（更新）以外
     */
    export const NOT_UPDATE_CATALOG_TYPE = JSON.stringify({
        name: '利用規約変更',
        description: '利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform',
                        name: '利用規約',
                        description: '利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: false
    })

    /**
     * 異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/platform と一致しない
     */
    export const INVALID_PLATFORM_NS = JSON.stringify({
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/platform/aaaaaaa',
                        name: 'PF利用規約',
                        description: 'PF利用規約の定義です。',
                        _code: {
                            _value: 9999999,
                            _ver: 1
                        },
                        inherit: {
                            _value: 203,
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
        isDraft: false
    })

    /**
     * 異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない
     */
    export const INVALID_REGION_NS = JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 8888888,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432/aaaaaaaa',
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
        isDraft: false
    })

    /**
     * 異常：catalog[].template.catalogItem.nsが catalog/ext/{ext_name}/terms-of-use/region/{actor_code} と一致しない
     */
    export const INVALID_ACTOR_REGION_NS = JSON.stringify({
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 2,
                catalogCode: 8888888,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000002',
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
        isDraft: false
    })

    /**
     * 異常：現在時刻 + 規約の同意期限の最低期限 >= period-of-re-consent となる
     */
    export const PLATFORM_INVALIDE_PERIOD_OF_RE_CONSENT = JSON.stringify({
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
                                value: '2020-01-01T00:00:00.000+0900'
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
        isDraft: false
    });

    /**
     * 正常：利用規約の再同意フラグがtrue
     */
    export const REGION_INVALIDE_PERIOD_OF_RE_CONSENT = JSON.stringify({
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
                                value: '2020-01-01T00:00:00.000+0900'
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
        isDraft: false
    })
}

export namespace PostTestTemplate {
    /**
     * 正常：本書き（isDraft:false）
     */
    export const PLATFORM_IS_DRAFT_FALSE = JSON.stringify({
        id: 1,
        name: 'PF利用規約変更',
        description: 'PF利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
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
        appendix: null
    })
    /**
     * 正常：本書き（isDraft:false）
     */
    export const REGION_IS_DRAFT_FALSE = JSON.stringify({
        id: 1,
        name: 'Region利用規約変更',
        description: 'Region利用規約変更の理由等記載する説明。',
        catalog: [
            {
                type: 1,
                catalogCode: 9999999,
                comment: null,
                template: {
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/terms-of-use/region/actor_1000432',
                        name: '高齢者向け健康サポート利用規約',
                        description: '高齢者向け健康サポートの利用規約です。',
                        _code: {
                            _value: 9999999,
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
    })
}

export namespace PutTestTemplate {
    /**
     * 正常：本書き（isDraft:false）
     */
    export const PLATFORM_IS_DRAFT_FALSE = JSON.stringify({
        id: 1,
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
        appendix: null
    })
    /**
     * 正常：本書き（isDraft:false）
     */
    export const REGION_IS_DRAFT_FALSE = JSON.stringify({
        id: 1,
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
    })
}
