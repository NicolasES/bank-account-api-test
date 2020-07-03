import { UserApplicationService } from '../../../src/application/services/UserApplicationService'
import { UserServiceMock, AccountServiceContractMock } from '../../support/mocks/domainServicesMocks'

describe('UserApplicationService', () => {
    let userApplicationService: UserApplicationService
    let userService = new UserServiceMock()
    let accountService = new AccountServiceContractMock()

    it('should instance "UserApplicationService" succesfully', () => {
        userApplicationService = new UserApplicationService(userService, accountService)

        expect(userApplicationService instanceof UserApplicationService).toBe(true)
    })
   
    it('should run "create()" succesfully', async () => {
        let userData = {
            id: 1,
            name: 'John',
            email: 'john@email.com',
            password: '123456'
        }
        userService.createUser = jest.fn().mockResolvedValueOnce(userData)

        await userApplicationService.create(userData)
        
        expect(userService.createUser).toHaveBeenCalled()
        expect(userService.findUser).toHaveBeenCalled()
    })
    
    it('should run "all()" succesfully', async () => {
        await userApplicationService.all()
        expect(userService.getAllUsers).toHaveBeenCalled()
    })

    it('should run "find()" succesfully', async () => {
        await userApplicationService.find("1")
        expect(userService.findUser).toHaveBeenCalled()
    })
   
    it('should run "delete()" succesfully', async () => {
        let userData = {
            id: 1,
            name: 'John',
            email: 'john@email.com',
            password: '123456',
            account: { id: 1}
        }
        userService.findUser = jest.fn().mockResolvedValueOnce(userData)

        await userApplicationService.delete("1")
        expect(userService.findUser).toHaveBeenCalled()
        expect(userService.deleteUser).toHaveBeenCalled()
        expect(accountService.deleteAccount).toHaveBeenCalled()
    })

    it('should run "delete()" succesfully (2)', async () => {
        let userData = {
            id: 1,
            name: 'John',
            email: 'john@email.com',
            password: '123456'
        }
        userService.findUser = jest.fn().mockResolvedValueOnce(userData)

        await userApplicationService.delete("1")
        expect(userService.findUser).toHaveBeenCalled()
        expect(userService.deleteUser).toHaveBeenCalled()
        expect(accountService.deleteAccount).not.toHaveBeenCalled()
    })
   
})
