import Transaction from "../entities/Transaction"
import Account from "../entities/Account";

export interface TransactionRepositoryContract {
    persist(transaction: Transaction): Promise<Transaction>

    find(id: number | string): Promise<Transaction | null>

    getHistoryAccount(account: Account): Promise<Transaction[]>
}