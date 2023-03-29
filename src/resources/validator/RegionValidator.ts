/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    Request,
    Response,
    NextFunction
} from 'express';
import { Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import RegionReqDto from '../dto/RegionReqDto';
/* eslint-enable */

@Middleware({ type: 'before' })
export default class RegionValidator {
    async use (
        req: Request, res: Response, next: NextFunction
    ) {
        await transformAndValidate(RegionReqDto, req.body);
        next();
    }
}
