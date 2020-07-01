import Account from "../entities/Account"

export interface AccountRepositoryContract {
    persist(account: Account): Promise<Account>

    find(id: number | string): Promise<Account | null>

    delete(account: Account): Promise<boolean>
}