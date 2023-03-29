/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { Server } from 'net';
import Config from '../common/Config';
import Db from './Db';
/* eslint-enable */

export async function clearDatabase () {
    const database = new Db();
    await database.Connect();
    await database.BeginTransaction();
    await database.Query(`
    TRUNCATE pxr_catalog_update.alliance_approval_manage CASCADE;
    TRUNCATE pxr_catalog_update.alliance_manage CASCADE;
    SELECT setval('pxr_catalog_update.alliance_approval_manage_id_seq', 1);
    SELECT setval('pxr_catalog_update.alliance_manage_id_seq', 1);
    `, []);
    await database.Commit();
    await database.Disconnect();
}

export async function initialRecords () {
    const database = new Db();
    await database.Connect();
    await database.Query(`TRUNCATE pxr_catalog_update.alliance_approval_manage CASCADE;
    TRUNCATE pxr_catalog_update.alliance_manage CASCADE;
    SELECT setval('pxr_catalog_update.alliance_approval_manage_id_seq', 1);
    SELECT setval('pxr_catalog_update.alliance_manage_id_seq', 1);
    INSERT INTO pxr_catalog_update.alliance_manage VALUES
    (2, 1000020, 1, null, null, 1000002, 1, 1000002, 1, '2025-04-02 00:00:00', 1, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (3, 1000020, 1, 1000114, 1, null, null, 1000114, 1, '2025-04-02 00:00:00', 1, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (4, 1000020, 1, null, null, 1000002, 1, 1000020, 1, '2025-04-02 00:00:00', 1, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (5, 1000020, 1, 1000114, 1, null, null, 1000020, 1, '2025-04-02 00:00:00', 1, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (6, 1000020, 1, null, null, 1000002, 1, 1000002, 1, '2025-04-02 00:00:00', 2, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (7, 1000020, 1, 1000114, 1, null, null, 1000114, 1, '2025-04-02 00:00:00', 2, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (8, 1000020, 1, null, null, 1000002, 1, 1000020, 1, '2025-04-02 00:00:00', 2, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now()),
    (9, 1000020, 1, 1000114, 1, null, null, 1000020, 1, '2025-04-02 00:00:00', 2, '2020-04-02 00:00:00', false, false, 'user01', now(), 'user01', now());

    INSERT INTO pxr_catalog_update.alliance_approval_manage VALUES
    (2, 2, 'MPK24POr', 0, null, 1000020, 1, null, null, false, 'user01', now(), 'user01', now()),
    (3, 3, 'bM67fLv4', 0, null, 1000020, 1, null, null, false, 'user01', now(), 'user01', now()),
    (4, 4, 'BiYVg9JG', 0, null, 1000002, 1, null, null, false, 'user01', now(), 'user01', now()),
    (5, 5, 'ecCVYBL1', 0, null, 1000114, 1, null, null, false, 'user01', now(), 'user01', now()),
    (6, 6, 'F0I3eNCg', 0, null, 1000020, 1, null, null, false, 'user01', now(), 'user01', now()),
    (7, 7, 'QFvJBsgu', 0, null, 1000020, 1, null, null, false, 'user01', now(), 'user01', now()),
    (8, 8, 'aaLoGMfQ', 0, null, 1000002, 1, null, null, false, 'user01', now(), 'user01', now()),
    (9, 9, 'InbYkBWq', 0, null, 1000114, 1, null, null, false, 'user01', now(), 'user01', now());
    `, []);
    await database.Disconnect();
}

export async function insertAllianceManage (params: (boolean | string | number)[]): Promise<number> {
    const database = new Db();
    await database.Connect();
    await database.BeginTransaction();
    const result = await database.Query(`
    INSERT INTO ${database.GetSchemaName()}.alliance_manage (
        alliance_trader_code,
        alliance_trader_version,
        alliance_consumer_code,
        alliance_consumer_version,
        alliance_region_code,
        alliance_region_version,
        alliance_actor_coded,
        alliance_actor_version,
        applicant_actor_code,
        applicant_actor_version,
        approval_expire_at,
        type,
        is_draft,
        created_by,
        created_at,
        updated_by,
        updated_at
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 now(), $15, now()
    )
    `, params);
    await database.Commit();
    await database.Disconnect();
    return parseInt(result.rows[0].id);
}

export async function insertAAllianceApprovalManage (params: (string | number)[]): Promise<number> {
    const database = new Db();
    await database.Connect();
    await database.BeginTransaction();
    const result = await database.Query(`
    INSERT INTO ${database.GetSchemaName()}.alliance_approval_manage (
        alliance_manage_id,
        auth_code,
        status,
        comment,
        approval_actor_code,
        approval_actor_version,
        approver,
        created_by,
        created_at,
        updated_by
        updated_at
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), $11, now()
    )
    `, params);
    await database.Connect();
    await database.Disconnect();
    return parseInt(result.rows[0].id);
}

export class StubCatalogServiceForNonAlliance {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.get('/catalog/:code', (req: express.Request, res: express.Response) => {
            const code = req.params.code + '';
            if (code === '1000002') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance/1000002.json'))
                    .end();
            } else if (code === '1000020') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance/1000020.json'))
                    .end();
            } else if (code === '1000108') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance/1000108.json'))
                    .end();
            } else if (code === '1000109') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance/1000109.json'))
                    .end();
            } else if (code === '1000111') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance/1000111.json'))
                    .end();
            } else if (code === '1000114') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance/1000114.json'))
                    .end();
            } else {
                res.status(204).end();
            }
        });
        this.app.put('/catalog/ext/:code', (req: express.Request, res: express.Response) => {
            res.status(200).end();
        });
        this.server = this.app.listen(port);
    }
}

export class StubCatalogServiceForNonAllianceOnlyTraderSide {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.get('/catalog/:code', (req: express.Request, res: express.Response) => {
            const code = req.params.code + '';
            if (code === '1000002') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance_only_trader/1000002.json'))
                    .end();
            } else if (code === '1000020') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance_only_trader/1000020.json'))
                    .end();
            } else if (code === '1000108') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance_only_trader/1000108.json'))
                    .end();
            } else if (code === '1000109') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance_only_trader/1000109.json'))
                    .end();
            } else if (code === '1000111') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance_only_trader/1000111.json'))
                    .end();
            } else if (code === '1000114') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/non_alliance_only_trader/1000114.json'))
                    .end();
            } else {
                res.status(204).end();
            }
        });
        this.app.put('/catalog/ext/:code', (req: express.Request, res: express.Response) => {
            res.status(200).end();
        });
        this.server = this.app.listen(port);
    }
}

export class StubCatalogServiceForAlliance {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.get('/catalog/:code', (req: express.Request, res: express.Response) => {
            const code = req.params.code + '';
            if (code === '1000002') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000002.json'))
                    .end();
            } else if (code === '1000020') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000020.json'))
                    .end();
            } else if (code === '1000108') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000108.json'))
                    .end();
            } else if (code === '1000109') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000109.json'))
                    .end();
            } else if (code === '1000111') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000111.json'))
                    .end();
            } else if (code === '1000114') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000114.json'))
                    .end();
            } else {
                res.status(204).end();
            }
        });
        this.app.put('/catalog/ext/:code', (req: express.Request, res: express.Response) => {
            res.status(200).end();
        });
        this.server = this.app.listen(port);
    }
}

export class StubCatalogServiceForAllianceNoPut {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.get('/catalog/:code', (req: express.Request, res: express.Response) => {
            const code = req.params.code + '';
            if (code === '1000002') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000002.json'))
                    .end();
            } else if (code === '1000020') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000020.json'))
                    .end();
            } else if (code === '1000108') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000108.json'))
                    .end();
            } else if (code === '1000109') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000109.json'))
                    .end();
            } else if (code === '1000111') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000111.json'))
                    .end();
            } else if (code === '1000114') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance/1000114.json'))
                    .end();
            } else {
                res.status(204).end();
            }
        });
        this.server = this.app.listen(port);
    }
}

export class StubCatalogServiceForAllianceOnlyTraderSide {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.get('/catalog/:code', (req: express.Request, res: express.Response) => {
            const code = req.params.code + '';
            if (code === '1000002') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance_only_trader/1000002.json'))
                    .end();
            } else if (code === '1000020') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance_only_trader/1000020.json'))
                    .end();
            } else if (code === '1000108') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance_only_trader/1000108.json'))
                    .end();
            } else if (code === '1000109') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance_only_trader/1000109.json'))
                    .end();
            } else if (code === '1000111') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance_only_trader/1000111.json'))
                    .end();
            } else if (code === '1000114') {
                res.status(200)
                    .json(Config.ReadConfig('./src/tests/Catalog/alliance_only_trader/1000114.json'))
                    .end();
            } else {
                res.status(204).end();
            }
        });
        this.app.put('/catalog/ext/:code', (req: express.Request, res: express.Response) => {
            res.status(200).end();
        });
        this.server = this.app.listen(port);
    }
}

export class StubNotificationService {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.post('/notification', (req: express.Request, res: express.Response) => {
            res.status(200).json({
                approval: {
                    expirationAt: '2025-04-01 00:00:00.000'
                }
            }).end();
        });
        this.app.put('/notification/approval', (req: express.Request, res: express.Response) => {
            res.status(200).json().end();
        });
        this.server = this.app.listen(port);
    }
}

export class StubOperatorService {
    app: express.Express;
    server: Server;
    constructor (port: number) {
        this.app = express();
        this.app.use(express.json());
        this.app.post('/operator/session', (req: express.Request, res: express.Response) => {
            if (req.body.sessionId === 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc') {
                res.status(200).json({
                    sessionId: 'cf930faf40d879b87a550d59f26fa4d5c788bb45fa9c94cee6c597608cb46acc',
                    operatorId: 10000123,
                    type: 3,
                    loginId: 'user01',
                    name: '{"aa":"aa"}',
                    auth: 0,
                    roles: [
                        {
                            _value: 1000109,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000108,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000075,
                        _ver: 1
                    }
                }).end();
            } else {
                res.status(204).end();
            }
        });
        this.server = this.app.listen(port);
    }
}
