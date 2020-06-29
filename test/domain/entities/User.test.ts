import User from '../../../src/domain/entities/User'
import sequelize from '../../support/sequelize'

describe('User', () => {
    beforeAll(() => {
        sequelize.startTestDB()
    })

    it('should create a User successfully', () => {
       const user = new User({ name: 'John', email: 'john@email.com', password: '123456' })
        expect(user instanceof User).toBe(true)
        expect(user.name).toBe('John')
        expect(user.email).toBe('john@email.com')
        expect(user.password).toBe('123456')
    })
})