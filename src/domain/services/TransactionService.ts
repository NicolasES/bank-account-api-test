import { TransactionServiceContract } from "./contracts/TransactionServiceContract";
import { AccountRepositoryContract } from "../repositories/AccountRepositoryContract";
import Transaction from "../entities/Transaction";
import { TransactionRepositoryContract } from "../repositories/TransactionRepositoryContract";
import { HttpException } from "../exceptions/HttpException";

export class TransactionService implements TransactionServiceContract{
    constructor(
        private readonly accountRepository: AccountRepositoryContract,
        private readonly transactionRepository: TransactionRepositoryContract
    ) { }

    async performDeposit(accountId: number, amount: number): Promise<Transaction> {
        let account = await this.findAccount(accountId)

        if (amount <= 0 ) {
            throw new HttpException('The deposit amount must be greater than 0.', 400)
        }
        console.log('data:', new Date())
        let deposit = new Transaction({ amount, description: 'Depósito em conta.', createdAt: new Date() })
        deposit.setAccount(account)

        account.amount += amount
        deposit.accountAmount = account.amount
        
        await this.accountRepository.persist(account)
        return this.transactionRepository.persist(deposit)
    }

    async performWithdraw(accountId: number, amount: number): Promise<Transaction> {
        let account = await this.findAccount(accountId)

        if (account.amount < amount) {
            throw new HttpException('Insufficient amount in the account.', 400)
        }

        if (amount <= 0 ) {
            throw new HttpException('The withdraw amount must be greater than 0.', 400)
        }

        let withdraw = new Transaction({ amount: (-amount), description: 'Retirada em conta.', createdAt: new Date() })
        withdraw.setAccount(account)

        account.amount -= amount
        withdraw.accountAmount = account.amount
        
        await this.accountRepository.persist(account)
        return this.transactionRepository.persist(withdraw)
    }

    async getHistory(accountId: number): Promise<Transaction[]> {
        let account = await this.findAccount(accountId)
        return this.transactionRepository.getHistoryAccount(account)
    }

    private async findAccount(accountId: number) {
        let account = await this.accountRepository.find(accountId)
        if(!account) {
            throw new HttpException('Account not found.', 404)
        }
        return account
    }
}