import * as awilix from 'awilix'
const { InjectionMode, asClass } = awilix

import { UserController } from '../http/controllers/UserController'
import { UserApplicationService } from '../services/UserApplicationService'
import { UserService } from '../../domain/services/UserService'
import { UserRepository } from '../../infrastructure/database/repositories/UserRepository'
import { AccountRepository } from '../../infrastructure/database/repositories/AccountRepository'
import { AccountService } from '../../domain/services/AccountService'
import { AccountController } from '../http/controllers/AccountController'
import { AccountApplicationService } from '../services/AccountApplicationSertice'
import { TransactionService } from '../../domain/services/TransactionService'
import { TransactionRepository } from '../../infrastructure/database/repositories/TransactionRepository'

const container = awilix.createContainer({ injectionMode: InjectionMode.CLASSIC })

container.register({
    userController: asClass(UserController)
})

export class ServiceContainer {
    private readonly container = awilix.createContainer({ injectionMode: InjectionMode.CLASSIC })

    constructor() {
        this.registerControllers()
        this.registerApplicationServices()
        this.registerServices()
        this.registerRepositories()
    }

    // CONTROLLERS
    private registerControllers() {
        this.container.register({
            userController: asClass(UserController),
            accountController: asClass(AccountController)
        })
    }
    
    // APPLICATION SERVICES
    private registerApplicationServices() {
        this.container.register({
            userApplicationService: asClass(UserApplicationService),
            accountApplicationService: asClass(AccountApplicationService)
        })
    }
    
    // SERVICES
    private registerServices() {
        this.container.register({
            userService: asClass(UserService),
            accountService: asClass(AccountService),
            transactionService: asClass(TransactionService)
        })
    }
    
    // REPOSITORIES
    private registerRepositories() {
        this.container.register({
            userRepository: asClass(UserRepository),
            accountRepository: asClass(AccountRepository),
            transactionRepository: asClass(TransactionRepository)
        })
    }

    resolve<T>(target: string) {
        return this.container.resolve<T>(target)
    }
}
