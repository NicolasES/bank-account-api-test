import Transaction from "../../entities/Transaction";

export interface TransactionServiceContract {
    performDeposit(accountId: number, value: number): Promise<Transaction>
}