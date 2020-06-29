import Transaction from "../entities/Transaction"

export interface TransactionRepositoryContract {
    persist(transaction: Transaction): Promise<Transaction>

    find(id: number | string): Promise<Transaction | null>
}