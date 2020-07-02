import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

const schema = Joi.object({
    name: Joi.string().required().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export default function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body)

    if (!error) {
        return next()
    }
    throw error
}