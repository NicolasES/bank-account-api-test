import { PaymentService } from "../../../src/domain/services/PaymentService"
import { TransactionRepositoryContract } from "../../../src/domain/repositories/TransactionRepositoryContract"
import { PaymentRepositoryContract } from "../../../src/domain/repositories/PaymentRepositoryContract"
import { AccountRepositoryContract } from "../../../src/domain/repositories/AccountRepositoryContract"
import Payment from "../../../src/domain/entities/Payment"
import sequelize from "../../support/sequelize"
import { HttpException } from "../../../src/domain/exceptions/HttpException"
import Account from "../../../src/domain/entities/Account"

// const PaymentMock = <jest.Mock<Payment>><unknown>Payment
const AccountMock = <jest.Mock<Account>><unknown>Account

const PaymentRepositoryMock = jest.fn<PaymentRepositoryContract, []>(() => ({
    persist: jest.fn()
}))
const TransactionRepositoryMock = jest.fn<TransactionRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    getHistoryAccount: jest.fn()
}))

const AccountRepositoryMock = jest.fn<AccountRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
}))

describe('PaymentService', () => {
    let paymentService: PaymentService
    let transactionRepository: TransactionRepositoryContract
    let paymentRepository: PaymentRepositoryContract
    let accountRepository: AccountRepositoryContract

    beforeAll(() => {
        sequelize.startTestDB()
    })

    beforeEach(() => {
        TransactionRepositoryMock.mockClear()
        PaymentRepositoryMock.mockClear()
    })

    it('should instance "PaymentService" successfully', () => {
        paymentRepository = new PaymentRepositoryMock()
        transactionRepository = new TransactionRepositoryMock()
        accountRepository = new AccountRepositoryMock()
        paymentService = new PaymentService(paymentRepository, accountRepository, transactionRepository)

        expect(paymentService instanceof PaymentService).toBe(true)
    })

    it('should run "performPayment()" succesfully', async () => {
        accountRepository.find = jest.fn().mockResolvedValueOnce(new AccountMock())


        await paymentService.performPayment(1, 500, "Padaria do João")

        expect(accountRepository.persist).toHaveBeenCalled()
        expect(transactionRepository.persist).toHaveBeenCalled()
        expect(paymentRepository.persist).toHaveBeenCalled()
    })
    
    it('should run "performPayment()" and throw HttpException - "insufficient amount."', async () => {
        accountRepository.find = jest.fn().mockResolvedValueOnce(null)

        await expect(paymentService.performPayment(1, 500, "Padaria do João")).rejects.toThrow('Account not found.')
    })

    it('should run "performPayment()" and throw HttpException - "insufficient amount."', async () => {
        let accountMock = new AccountMock()
        accountMock.amount = 10 
        accountRepository.find = jest.fn().mockResolvedValueOnce(accountMock)

        await expect(paymentService.performPayment(1, 500, "Padaria do João")).rejects.toThrow('Insufficient amount in the account.')
    })

    it('should run "performPayment()" and throw HttpException - "invalid amount."', async () => {
        let accountMock = new AccountMock()
        accountMock.amount = 1000 
        accountRepository.find = jest.fn().mockResolvedValueOnce(accountMock)

        await expect(paymentService.performPayment(1, 0, "Padaria do João")).rejects.toThrow('The payment amount must be greater than 0.')
    })
    
    it('should run "performPayment()" and throw HttpException - "invalid receiver."', async () => {
        let accountMock = new AccountMock()
        accountMock.amount = 1000 
        accountRepository.find = jest.fn().mockResolvedValueOnce(accountMock)

        await expect(paymentService.performPayment(1, 500, "")).rejects.toThrow('The payment receiver is required.')
    })

    // it('should run "performDeposit()" and throw HttpException - "Payment not found."', async () => {
    //     await expect(transactionService.performDeposit(1, 500)).rejects.toThrow('Payment not found.');
    // })

    // it('should run "performWithdraw()" and throw HttpException - "insufficient amount."', async () => {
    //     let accountMock = new AccountMock()
    //     accountMock.amount = 10 
    //     accountRepositoryMock.find = jest.fn().mockResolvedValueOnce(accountMock)

    //     await expect(transactionService.performWithdraw(1, 500)).rejects.toThrow('Insufficient amount in the account.');
    // })
})
