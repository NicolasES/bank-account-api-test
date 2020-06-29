import { Request, Response, NextFunction } from 'express'

export default function(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err)

    err.statusCode = err.statusCode || 500

    if (err.isJoi) {
        let response = {
            message: 'Validation error.',
            statusCode: 422,
            data: err.details
        }
        return res.status(response.statusCode).json(response)
    }


    let response = {
        message: err.message,
        statusCode: err.statusCode,
        data: err.data
    }
    
    return res.status(response.statusCode).json(response)
}