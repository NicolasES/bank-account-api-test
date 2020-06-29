import { TransactionService } from "../../../src/domain/services/TransactionService"
import { TransactionRepositoryContract } from "../../../src/domain/repositories/TransactionRepositoryContract"
import sequelize from "../../support/sequelize"
import Account from "../../../src/domain/entities/Account"
import { AccountRepositoryContract } from "../../../src/domain/repositories/AccountRepositoryContract"
import { HttpException } from "../../../src/domain/exceptions/HttpException"

const AccountMock = <jest.Mock<Account>><unknown>Account

const TransactionRepositoryMock = jest.fn<TransactionRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn()
}))

const AccountRepositoryMock = jest.fn<AccountRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn()
}))

describe('TransactionServices', () => {
    let transactionService: TransactionService
    let transactionRepository: TransactionRepositoryContract
    let accountRepositoryMock: AccountRepositoryContract

    beforeAll(() => {
        sequelize.startTestDB()
    })

    beforeEach(() => {
        TransactionRepositoryMock.mockClear()
        AccountRepositoryMock.mockClear()
    })

    it('should instance "TransactionServices" successfully', () => {
        transactionRepository = new TransactionRepositoryMock()
        accountRepositoryMock = new AccountRepositoryMock()
        transactionService = new TransactionService(accountRepositoryMock, transactionRepository)

        expect(transactionService instanceof TransactionService).toBe(true)
    })

    it('should run "performDeposit()" successfully', async () => {
        accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(new AccountMock())

        await transactionService.performDeposit(1, 500)

        expect(accountRepositoryMock.persist).toHaveBeenCalled()
        expect(transactionRepository.persist).toHaveBeenCalled()
    })

    it('should run "performDeposit()" and throw HttpException("Account not found.")', async () => {
        await expect(transactionService.performDeposit(1, 500)).rejects.toThrow('Account not found.');
    })
})
