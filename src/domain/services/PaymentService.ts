import { PaymentServiceContract } from "./contracts/PaymentServiceContract";
import Payment from "../entities/Payment";
import Transaction from "../entities/Transaction";
import { PaymentRepositoryContract } from "../repositories/PaymentRepositoryContract";
import { AccountRepositoryContract } from "../repositories/AccountRepositoryContract";
import { TransactionRepositoryContract } from "../repositories/TransactionRepositoryContract";
import { HttpException } from "../exceptions/HttpException";

export class PaymentService implements PaymentServiceContract {
    constructor(
        private readonly paymentRepository: PaymentRepositoryContract,
        private readonly accountRepository: AccountRepositoryContract,
        private readonly transactionRepository: TransactionRepositoryContract
    ) { }


    async performPayment(accountId: number, amount: number, receiver: string): Promise<Payment> {
        if (amount <= 0 ) {
            throw new HttpException('The payment amount must be greater than 0.', 400)
        }
        if (!receiver) {
            throw new HttpException('The payment receiver is required.', 400)
        }

        let account = await this.findAccount(accountId, amount)
        account.amount -= amount
        await this.accountRepository.persist(account)
        
        let transaction = new Transaction({ amount: (-amount), description: `Pagamento para ${receiver}` })
        transaction.accountAmount = account.amount
        transaction.setAccount(account)
        await this.transactionRepository.persist(transaction)

        let payment = new Payment({ amount, receiver })
        payment.setTransaction(transaction)
        return this.paymentRepository.persist(payment)
    }

    private async findAccount(accountId: number, amount: number) {
        let account = await this.accountRepository.find(accountId)
        if(!account) {
            throw new HttpException('Account not found.', 404)
        }
        if (account.amount < amount) {
            throw new HttpException('Insufficient amount in the account.', 400)
        }
        return account
    }
}