import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

const schema = Joi.object({
    amount: Joi.number().greater(0),
    receiver: Joi.string().required()
})

export default function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body)

    if (!error) {
        return next()
    }
    throw error
}