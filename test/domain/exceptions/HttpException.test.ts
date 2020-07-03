import { HttpException } from '../../../src/domain/exceptions/HttpException'

describe('HttpException', () => {
    it('should instance a HttpException successfully', () => {
        let errorData = {
            message: "Error",
            status: 400
        }
        let httpException = new HttpException('Error', 400, errorData)

        expect(httpException.message).toBe('Error')
        expect(httpException.statusCode).toBe(400)
        expect(httpException.data).toBe(errorData)
        
        httpException = new HttpException('Error', 400)

        expect(httpException.message).toBe('Error')
        expect(httpException.statusCode).toBe(400)
        expect(httpException.data).toMatchObject({ error: errorData.message })
    })
})