/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- 対象テーブルのデータをすべて削除
DELETE FROM pxr_catalog_update.alliance_approval_manage;
DELETE FROM pxr_catalog_update.alliance_manage;

-- 対象テーブルのシーケンスを初期化
SELECT SETVAL('pxr_catalog_update.alliance_manage_id_seq', 1, false);
SELECT SETVAL('pxr_catalog_update.alliance_approval_manage_id_seq', 1, false);
