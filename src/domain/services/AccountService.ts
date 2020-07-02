import { AccountServiceContract } from "./contracts/AccountServiceContract";
import Account from "../entities/Account";
import { AccountRepositoryContract } from "../repositories/AccountRepositoryContract";
import User from "../entities/User";

export class AccountService implements AccountServiceContract {
    constructor(
        private readonly accountRepository: AccountRepositoryContract
    ) { }
    
    createAccount(user: User): Promise<Account> {
        let account = new Account()
        account.setUser(user)
        account.amount = 0
        return this.accountRepository.persist(account)
    }

    async deleteAccount(account: Account): Promise<boolean> {
        return this.accountRepository.delete(account)
    }
}