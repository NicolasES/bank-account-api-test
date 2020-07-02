import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

const schema = Joi.object({
    amount: Joi.number().strict().greater(0).required(),
    receiver: Joi.string().required().required()
})

export default function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body)

    if (!error) {
        return next()
    }
    throw error
}