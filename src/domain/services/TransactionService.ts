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

        let deposit = new Transaction({ amount, description: 'Depósito em conta.' })
        deposit.setAccount(account)

        account.amount += deposit.amount
        
        await this.accountRepository.persist(account)
        return this.transactionRepository.persist(deposit)
    }

    async performWithdraw(accountId: number, amount: number): Promise<Transaction> {
        let account = await this.findAccount(accountId)

        if (amount <= 0 ) {
            throw new HttpException('The withdraw amount must be greater than 0.', 400)
        }

        let deposit = new Transaction({ amount, description: 'Retirada em conta.' })
        deposit.setAccount(account)

        account.amount -= deposit.amount
        
        await this.accountRepository.persist(account)
        return this.transactionRepository.persist(deposit)
    }

    private async findAccount(accountId: number) {
        let account = await this.accountRepository.find(accountId)
        if(!account) {
            throw new HttpException('Account not found.', 404)
        }
        return account
    }
}