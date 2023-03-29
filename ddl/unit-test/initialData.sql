/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- 対象テーブルのデータをすべて削除
DELETE FROM pxr_catalog_update.actor_approval_manage;
DELETE FROM pxr_catalog_update.actor_manage;
DELETE FROM pxr_catalog_update.alliance_approval_manage;
DELETE FROM pxr_catalog_update.alliance_manage;
DELETE FROM pxr_catalog_update.audit_report_manage;
DELETE FROM pxr_catalog_update.data_operation_manage;
DELETE FROM pxr_catalog_update.join_approval_manage;
DELETE FROM pxr_catalog_update.join_service_manage;
DELETE FROM pxr_catalog_update.join_manage;
DELETE FROM pxr_catalog_update.platform_terms_of_use_manage;
DELETE FROM pxr_catalog_update.region_approval_manage;
DELETE FROM pxr_catalog_update.region_status_approval_manage;
DELETE FROM pxr_catalog_update.region_status_manage;
DELETE FROM pxr_catalog_update.region_manage;
DELETE FROM pxr_catalog_update.region_terms_of_use_manage;

-- 対象テーブルのシーケンスを初期化
SELECT SETVAL('pxr_catalog_update.actor_approval_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.actor_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.alliance_approval_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.alliance_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.audit_report_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.data_operation_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.join_approval_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.join_service_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.join_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.platform_terms_of_use_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.region_approval_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.region_status_approval_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.region_status_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.region_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.region_terms_of_use_manage_id_seq', 1, false);
