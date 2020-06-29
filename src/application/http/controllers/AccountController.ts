import { Request, Response, NextFunction } from 'express'

import { AccountApplicationService } from "../../services/AccountApplicationSertice"

export class AccountController {
    constructor(private readonly accountApplicationService: AccountApplicationService) { }

    async deposit(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.accountApplicationService.deposit(req.params.id ,req.body.amount).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }
    
    async withdraw(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.accountApplicationService.withdraw(req.params.id ,req.body.amount).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }
}