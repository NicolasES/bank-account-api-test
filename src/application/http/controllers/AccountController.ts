import { Request, Response, NextFunction } from 'express'

import { AccountApplicationService } from "../../services/AccountApplicationService"
import { PaymentApplicationService } from '../../services/PaymentApplicationService'

export class AccountController {
    constructor(
        private readonly accountApplicationService: AccountApplicationService,
        private readonly paymentApplicationService: PaymentApplicationService,
    ) { }

    async deposit(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.accountApplicationService.deposit(req.params.id, req.body.amount).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }
    
    async withdraw(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.accountApplicationService.withdraw(req.params.id, req.body.amount).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    async payment(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.paymentApplicationService.payment(req.params.id, req.body).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    async history(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.accountApplicationService.history(req.params.id).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }
}