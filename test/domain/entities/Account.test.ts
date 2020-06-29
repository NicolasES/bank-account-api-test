import Account from '../../../src/domain/entities/Account'
import User from '../../../src/domain/entities/User'
import sequelize from '../../support/sequelize'
const UserMock = <jest.Mock<User>><unknown>User

describe('Account', () => {
    beforeAll(() => {
        sequelize.startTestDB()
    })

    it('should create a Account successfully', () => {
        const userMock = new UserMock()
        userMock.id = 7

        const account = new Account({ amount: 50 })
        account.setUser(userMock)
        
        expect(account instanceof Account).toBe(true)
        expect(account.amount).toBe(50)
        expect(account.user).toBe(userMock)
        expect(account.userId).toBe(7)
    })
})