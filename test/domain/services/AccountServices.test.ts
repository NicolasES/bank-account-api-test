import { AccountService } from "../../../src/domain/services/AccountService"
import { AccountRepositoryContract } from "../../../src/domain/repositories/AccountRepositoryContract"
import sequelize from "../../support/sequelize"
import User from "../../../src/domain/entities/User"

const UserMock = <jest.Mock<User>><unknown>User

const AccountRepositoryMock = jest.fn<AccountRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
}))

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
})
