import User from "../entities/User"

export interface UserRepositoryContract {
    persist(user: User): Promise<User>

    find(id: number | string): Promise<User | null>

    getAll(): Promise<User[]>
}