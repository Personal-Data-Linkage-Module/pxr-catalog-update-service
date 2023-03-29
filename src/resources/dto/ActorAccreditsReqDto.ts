/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsString,
    IsDefined
} from 'class-validator';
/* eslint-enable */

/**
 * 申請先取得API リクエストDTO
 */
export default class ActorAccreditsReqDto {
    @IsString()
    @IsDefined()
    actorType: string;
}
