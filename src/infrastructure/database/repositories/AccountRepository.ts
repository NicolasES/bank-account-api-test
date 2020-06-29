import { AccountRepositoryContract } from "../../../domain/repositories/AccountRepositoryContract";
import Account from "../../../domain/entities/Account"

export class AccountRepository implements AccountRepositoryContract{
    
    async persist(account: Account): Promise<Account> {
        return account.save()
    }

    async find(id: number | string): Promise<Account | null> {
        
        return Account.findByPk(id)
    }
}