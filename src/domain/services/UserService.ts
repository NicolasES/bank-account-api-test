import { UserRepositoryContract } from "../repositories/UserRepositoryContract"
import User from "../entities/User"
import { UserServiceContract, CreateUserDTO } from "./contracts/UserServiceContract"
import { HttpException } from "../exceptions/HttpException"
import bcrypt from 'bcrypt'

export class UserService implements UserServiceContract {
    constructor(
        private readonly userRepository: UserRepositoryContract
    ) { }
    async findUser(userId: number): Promise<User> {
        let user = await this.userRepository.find(userId)
        if (!user) {
            throw new HttpException('User not found.', 404)
        }
        return user
    }

    async deleteUser(user: User): Promise<boolean> {
        return this.userRepository.delete(user)
    }
    
    createUser(data: CreateUserDTO): Promise<User> {
        let user = new User(data)
        data.password = bcrypt.hashSync(data.password, 10)

        return this.userRepository.persist(user)
    }
    
    getAllUsers(): Promise<User[]> {
        return this.userRepository.getAll()
    }
    
}
