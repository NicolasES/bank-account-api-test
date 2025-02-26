import { TransactionService } from "../../../src/domain/services/TransactionService"
import { TransactionRepositoryContract } from "../../../src/domain/repositories/TransactionRepositoryContract"
import sequelize from "../../support/sequelize"
import Account from "../../../src/domain/entities/Account"
import { AccountRepositoryContract } from "../../../src/domain/repositories/AccountRepositoryContract"
import { TransactionRepositoryMock, AccountRepositoryMock } from '../../support/mocks/repositoryMocks'

const AccountMock = <jest.Mock<Account>><unknown>Account

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
    
    it('should run "performDeposit()" and throw HttpException - "Account not found."', async () => {
        await expect(transactionService.performDeposit(1, 500)).rejects.toThrow('Account not found.');
    })
    
    it('should run "performDeposit()" and throw HttpException - "invalid amount."', async () => {
        accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(new AccountMock())
        await expect(transactionService.performDeposit(1, 0)).rejects.toThrow('The deposit amount must be greater than 0.');
    })
    
    it('should run "performWithdraw()" successfully', async () => {
        accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(new AccountMock())

        await transactionService.performWithdraw(1, 500)

        expect(accountRepositoryMock.persist).toHaveBeenCalled()
        expect(transactionRepository.persist).toHaveBeenCalled()
    })

    it('should run "performWithdraw()" and throw HttpException - "Account not found."', async () => {
        await expect(transactionService.performWithdraw(1, 500)).rejects.toThrow('Account not found.');
    })

    it('should run "performWithdraw()" and throw HttpException - "invalid amount."', async () => {
        accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(new AccountMock())
        await expect(transactionService.performWithdraw(1, 0)).rejects.toThrow('The withdraw amount must be greater than 0.');
    })
    
    it('should run "performWithdraw()" and throw HttpException - "insufficient amount."', async () => {
        let accountMock = new AccountMock()
        accountMock.amount = 10 
        accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(accountMock)

        await expect(transactionService.performWithdraw(1, 500)).rejects.toThrow('Insufficient amount in the account.');
    })

    it('should run "getHistory()" successfully', async () => {
        accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(new AccountMock())

        await transactionService.getHistory(1)

        expect(accountRepositoryMock.find).toHaveBeenCalled()
        expect(transactionRepository.getHistoryAccount).toHaveBeenCalled()
    })
})
