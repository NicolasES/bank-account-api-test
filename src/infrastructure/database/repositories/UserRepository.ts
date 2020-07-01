import { UserRepositoryContract } from "../../../domain/repositories/UserRepositoryContract"
import User from "../../../domain/entities/User"
import Account from "../../../domain/entities/Account"

export class UserRepository implements UserRepositoryContract{
    async persist(user: User): Promise<User> {
        return user.save()
    }
    
    async find(id: number | string): Promise<User | null> {
        return User.findByPk(id)
    }

    getAll(): Promise<User[]> {
        return User.findAll({
            include: [Account]
        })
    }
}