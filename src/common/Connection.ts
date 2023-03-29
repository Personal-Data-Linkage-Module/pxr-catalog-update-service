/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from './AppError';
import Config from './Config';
import ApprovalManaged from '../repositories/postgres/ActorApprovalManage';
import ActorManage from '../repositories/postgres/ActorManage';
import AllianceApprovalManage from '../repositories/postgres/AllianceApprovalManage';
import AllianceManage from '../repositories/postgres/AllianceManage';
import AuditReportManage from '../repositories/postgres/AuditReportManage';
import JoinApprovalManage from '../repositories/postgres/JoinApprovalManage';
import JoinManage from '../repositories/postgres/JoinManage';
import DataOperationManage from '../repositories/postgres/DataOperationManage';
import PlatformTermsOfUseManage from '../repositories/postgres/PlatformTermsOfUseManage';
import RegionTermsOfUseManage from '../repositories/postgres/RegionTermsOfUseManage';
import { Connection, createConnection, getConnectionManager, getConnection } from 'typeorm';
import RegionManage from '../repositories/postgres/RegionManage';
import RegionApprovalManage from '../repositories/postgres/RegionApprovalManage';
import JoinServiceManage from '../repositories/postgres/JoinServiceManage';
import RegionStatusManage from '../repositories/postgres/RegionStatusManage';
import RegionStatusApprovalManage from '../repositories/postgres/RegionStatusApprovalManage';
/* eslint-enable */

const config = Config.ReadConfig('./config/ormconfig.json');
const Message = Config.ReadConfig('./config/message.json');

// エンティティを設定
config['entities'] = [
    ApprovalManaged,
    ActorManage,
    AllianceApprovalManage,
    AllianceManage,
    AuditReportManage,
    JoinApprovalManage,
    JoinManage,
    JoinServiceManage,
    DataOperationManage,
    PlatformTermsOfUseManage,
    RegionTermsOfUseManage,
    RegionManage,
    RegionApprovalManage,
    RegionStatusManage,
    RegionStatusApprovalManage
];

/**
 * コネクションの生成
 */
export async function connectDatabase (): Promise<Connection> {
    let connection = null;
    try {
        // データベースに接続
        connection = await createConnection(config);
    } catch (err) {
        if (err.name === 'AlreadyHasActiveConnectionError') {
            // すでにコネクションが張られている場合には、流用する
            connection = getConnectionManager().get('postgres');
        } else {
            // エラーが発生した場合は、アプリケーション例外に内包してスローする
            throw new AppError(
                Message.FAILED_CONNECT_TO_DATABASE, 500, err);
        }
    }
    // 接続したコネクションを返却
    return connection;
}
