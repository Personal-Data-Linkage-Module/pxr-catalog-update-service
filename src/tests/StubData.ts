/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import JoinApprovalManage from '../repositories/postgres/JoinApprovalManage';
import JoinManage from '../repositories/postgres/JoinManage';
import ActorManage from '../repositories/postgres/ActorManage';
import ActorApprovalManage from '../repositories/postgres/ActorApprovalManage';
import AllianceManage from '../repositories/postgres/AllianceManage';
import AllianceApprovalManage from '../repositories/postgres/AllianceApprovalManage';
import EntityOperation from '../repositories/EntityOperation';
import { connectDatabase } from '../common/Connection';
/* eslint-enable */
const momentTz = require('moment-timezone');

export async function installApprovalTarget () {
    const entity1 = new JoinManage();
    entity1.joinApprovalManage = new JoinApprovalManage();
    entity1.applicantDate = momentTz(new Date()).utc();
    entity1.isDraft = false;
    entity1.createdBy = 'system';
    entity1.updatedBy = 'system';
    entity1.joinApprovalManage.createdBy = 'system';
    entity1.joinApprovalManage.updatedBy = 'system';
    const entity2 = new JoinManage();
    entity2.joinApprovalManage = new JoinApprovalManage();
    entity2.applicantDate = momentTz(new Date()).utc();
    entity2.isDraft = false;
    entity2.createdBy = 'system';
    entity2.updatedBy = 'system';
    entity2.joinApprovalManage.createdBy = 'system';
    entity2.joinApprovalManage.updatedBy = 'system';
    const entity3 = new JoinManage();
    entity3.joinApprovalManage = new JoinApprovalManage();
    entity3.createdBy = 'system';
    entity3.updatedBy = 'system';
    entity3.joinApprovalManage.createdBy = 'system';
    entity3.joinApprovalManage.updatedBy = 'system';
    const entity4 = new ActorManage();
    entity4.actorApprovalManage = new ActorApprovalManage();
    entity4.createdBy = 'system';
    entity4.updatedBy = 'system';
    entity4.actorApprovalManage.createdBy = 'system';
    entity4.actorApprovalManage.updatedBy = 'system';
    const entity5 = new ActorManage();
    entity5.actorApprovalManage = new ActorApprovalManage();
    entity5.createdBy = 'system';
    entity5.updatedBy = 'system';
    entity5.actorApprovalManage.createdBy = 'system';
    entity5.actorApprovalManage.updatedBy = 'system';
    const entity6 = new ActorManage();
    entity6.actorApprovalManage = new ActorApprovalManage();
    entity6.createdBy = 'system';
    entity6.updatedBy = 'system';
    entity6.actorApprovalManage.createdBy = 'system';
    entity6.actorApprovalManage.updatedBy = 'system';
    const entity7 = new AllianceManage();
    entity7.allianceApprovalManage = new AllianceApprovalManage();
    entity7.createdBy = 'system';
    entity7.updatedBy = 'system';
    entity7.allianceApprovalManage.createdBy = 'system';
    entity7.allianceApprovalManage.updatedBy = 'system';
    const entity8 = new AllianceManage();
    entity8.allianceApprovalManage = new AllianceApprovalManage();
    entity8.createdBy = 'system';
    entity8.updatedBy = 'system';
    entity8.allianceApprovalManage.createdBy = 'system';
    entity8.allianceApprovalManage.updatedBy = 'system';
    const entity9 = new AllianceManage();
    entity9.allianceApprovalManage = new AllianceApprovalManage();
    entity9.createdBy = 'system';
    entity9.updatedBy = 'system';
    entity9.allianceApprovalManage.createdBy = 'system';
    entity9.allianceApprovalManage.updatedBy = 'system';
    await EntityOperation.saveJoinEntity(entity1);
    await EntityOperation.saveJoinEntity(entity2);
    await EntityOperation.saveJoinEntity(entity3);
    await EntityOperation.saveActorEntity(entity4);
    await EntityOperation.saveActorEntity(entity5);
    await EntityOperation.saveActorEntity(entity6);
    await EntityOperation.saveAllianceEntity(entity7);
    await EntityOperation.saveAllianceEntity(entity8);
    await EntityOperation.saveAllianceEntity(entity9);
}

export async function clear () {
    const connection = await connectDatabase();
    await connection.query(`
    TRUNCATE pxr_catalog_update.actor_approval_manage CASCADE;
    TRUNCATE pxr_catalog_update.actor_manage CASCADE;
    TRUNCATE pxr_catalog_update.alliance_approval_manage CASCADE;
    TRUNCATE pxr_catalog_update.alliance_manage CASCADE;
    TRUNCATE pxr_catalog_update.join_approval_manage CASCADE;
    TRUNCATE pxr_catalog_update.join_manage CASCADE;
    
    SELECT setval('pxr_catalog_update.actor_approval_manage_id_seq', 1, true);
    SELECT setval('pxr_catalog_update.actor_manage_id_seq', 1, true);
    SELECT setval('pxr_catalog_update.alliance_approval_manage_id_seq', 1, true);
    SELECT setval('pxr_catalog_update.alliance_manage_id_seq', 1, true);
    SELECT setval('pxr_catalog_update.join_approval_manage_id_seq', 1, true);
    SELECT setval('pxr_catalog_update.join_manage_id_seq', 1, true);`);
}
