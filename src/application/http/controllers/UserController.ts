import { Request, Response, NextFunction } from 'express'

import { UserApplicationService } from "../../services/UserApplicationService"

export class UserController {
    constructor(private readonly userApplicationService: UserApplicationService) { }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userApplicationService.create(req.body).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }
    
    async find(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userApplicationService.find(req.params.id).then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    async all(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userApplicationService.all().then(result => {
            return res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userApplicationService.delete(req.params.id).then(result => {
            return res.status(204).json(result)
        }).catch(err => {
            next(err)
        })
    }
}