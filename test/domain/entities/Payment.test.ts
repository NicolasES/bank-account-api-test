import Payment from '../../../src/domain/entities/Payment'
import sequelize from '../../support/sequelize'
import Transaction from '../../../src/domain/entities/Transaction'
const TransactionMock = <jest.Mock<Transaction>><unknown>Transaction

describe('Payment', () => {
    beforeAll(() => {
        sequelize.startTestDB()
    })

    it('should create a Payment successfully', () => {
        const transactionMock = new TransactionMock()
        transactionMock.id = 7

        const payment = new Payment({ amount: 50, receiver: "Fulano de tal" })
        payment.setTransaction(transactionMock)
        
        expect(payment instanceof Payment).toBe(true)
        expect(payment.amount).toBe(50)
        expect(payment.receiver).toBe("Fulano de tal")
        expect(payment.transaction).toBe(transactionMock)
        expect(payment.transactionId).toBe(7)
    })
})