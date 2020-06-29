import Account from "../../entities/Account"
import User from "../../entities/User";

export interface AccountServiceContract {
    createAccount(user: User): Promise<Account> 
}