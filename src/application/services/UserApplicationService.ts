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
        return user 
    }
}