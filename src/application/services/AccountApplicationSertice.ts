import { TransactionServiceContract } from "../../domain/services/contracts/TransactionServiceContract"

export class AccountApplicationService {
    constructor(
        private readonly transactionService: TransactionServiceContract,
    ) {}

    async deposit(accountId: string, value: number): Promise<any> {
        return this.transactionService.performDeposit(Number(accountId), value)
    }
}