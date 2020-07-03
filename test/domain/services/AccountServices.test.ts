import { AccountService } from "../../../src/domain/services/AccountService"
import { AccountRepositoryContract } from "../../../src/domain/repositories/AccountRepositoryContract"
import sequelize from "../../support/sequelize"
import User from "../../../src/domain/entities/User"
import Account from "../../../src/domain/entities/Account"
import { AccountRepositoryMock } from '../../support/mocks/repositoryMocks'

const UserMock = <jest.Mock<User>><unknown>User
const AccountMock = <jest.Mock<Account>><unknown>Account

describe('AccountServices', () => {
    let accountService: AccountService
    let accountRepository: AccountRepositoryContract

    beforeAll(() => {
        sequelize.startTestDB()
    })

    beforeEach(() => {
        AccountRepositoryMock.mockClear()
    })

    it('should instance "AccountServices" successfully', () => {
        accountRepository = new AccountRepositoryMock()
        accountService = new AccountService(accountRepository)

        expect(accountService instanceof AccountService).toBe(true)
    })

    it('should run "createAccount()" successfully', () => {
        const userMock = new UserMock()
        accountService.createAccount(userMock)

        expect(accountRepository.persist).toHaveBeenCalled()
    })
    
    it('should run "deleteAccount()" successfully', () => {
        const account = new AccountMock()
        accountService.deleteAccount(account)

        expect(accountRepository.delete).toHaveBeenCalled()
    })
})
