import { UserRepositoryContract } from "../repositories/UserRepositoryContract"
import User from "../entities/User"
import { UserServiceContract, CreateUserDTO } from "./contracts/UserServiceContract"

export class UserService implements UserServiceContract {
    constructor(
        private readonly userRepository: UserRepositoryContract
    ) { }

    createUser(data: CreateUserDTO): Promise<User> {
        let user = new User(data)
        return this.userRepository.persist(user)
    }
}
