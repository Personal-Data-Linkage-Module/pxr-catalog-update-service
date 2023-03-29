/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
export function parse4update (data: any): any {
    const result: any = {};
    // catalogItemの修正
    data.catalogItem._code._ver = null;
    data.catalogItem.inherit._ver = null;
    result.catalogItem = data.catalogItem;

    const parser = (input: any) => {
        const res = [];
        for (const index in input) {
            const pusher: any = {
            };
            const val: any = input[index];

            if (typeof val === 'object' && Array.isArray(val)) {
                for (const array of val) {
                    const arrayValue: any = {
                        key: index
                    };
                    arrayValue.value = parser(array);
                    res.push(arrayValue);
                }
                continue;
            } else if (typeof val === 'object') {
                pusher.key = index;
                pusher.value = parser(val);
            } else {
                pusher.key = index;
                pusher.value = input[index];
            }
            res.push(pusher);
        }
        return res;
    };

    // templateの修正
    result.template = {};
    const templateProperties = [];
    for (const index in data.template) {
        if (index === '_code') {
            continue;
        }
        const prop = data.template[index];
        const value: any = {
            key: index
        };

        if (prop && typeof prop === 'object' && Array.isArray(prop)) {
            for (const array of prop) {
                const arrayValue: any = {
                    key: index
                };
                arrayValue.value = parser(array);
                templateProperties.push(arrayValue);
            }
            continue;
        } else if (prop && typeof prop === 'object') {
            value.value = parser(prop);
        } else {
            // プリミティブな値であれば、それらはそのまま値として設定する
            value.value = prop;
        }

        templateProperties.push(value);
    }
    result.template.value = templateProperties;

    // 固定で設定するプロパティ値
    result.template.prop = null;
    result.inner = null;
    result.attribute = null;

    return result;
}
