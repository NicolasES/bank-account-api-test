import { UserServiceContract, CreateUserDTO } from "../../domain/services/contracts/UserServiceContract"
import { AccountServiceContract } from "../../domain/services/contracts/AccountServiceContract"

export class UserApplicationService {
    constructor(
        private readonly userService: UserServiceContract,
        private readonly accountService: AccountServiceContract
    ) {}

    async create(data: CreateUserDTO): Promise<any> {
        let user = await this.userService.createUser(data)
        await this.accountService.createAccount(user)
        return this.userService.findUser(user.id) 
    }
    
    async all(): Promise<any> {
        return this.userService.getAllUsers()
    }

    async find(userId: string): Promise<any> {
        return this.userService.findUser(Number(userId))
    }

    async delete(userId: string): Promise<any> {
        let user = await this.userService.findUser(Number(userId))
        if (user.account) {
            await this.accountService.deleteAccount(user.account)
        }
        return this.userService.deleteUser(user)
    }

}