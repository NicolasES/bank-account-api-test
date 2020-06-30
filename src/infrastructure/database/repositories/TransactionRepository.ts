import { TransactionRepositoryContract } from "../../../domain/repositories/TransactionRepositoryContract";
import Transaction from "../../../domain/entities/Transaction"
import Account from "../../../domain/entities/Account"

export class TransactionRepository implements TransactionRepositoryContract{
    
    async persist(transaction: Transaction): Promise<Transaction> {
        return transaction.save()
    }

    async find(id: number | string): Promise<Transaction | null> {
        return Transaction.findByPk(id)
    }

    getHistoryAccount(account: Account): Promise<Transaction[]> {
        return Transaction.findAll(
            {
                where: {
                    account_id: account.id
                }
            }
        )
    }
}
