export class HttpException extends Error {
    message: string
    statusCode: number
    data: any

    constructor(message: string, statusCode: number = 400, data?: any) {
        super(message)
        this.statusCode = statusCode

        if (!data) {
            this.data = { error: message }
        } else {
            this.data = data
        }
    }
}