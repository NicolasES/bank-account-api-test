import { UserService } from "../../../src/domain/services/UserService"
import { UserRepositoryContract } from "../../../src/domain/repositories/UserRepositoryContract"
import sequelize from "../../support/sequelize"
import User from "../../../src/domain/entities/User"

const UserMock = <jest.Mock<User>><unknown>User

const UserRepositoryMock = jest.fn<UserRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn()
}))

describe('UserServices', () => {
    let userService: UserService
    let userRepository: UserRepositoryContract

    beforeAll(() => {
        sequelize.startTestDB()
    })

    beforeEach(() => {
        UserRepositoryMock.mockClear()
    })

    it('should instance "UserServices" successfully', () => {
        userRepository = new UserRepositoryMock()
        userService = new UserService(userRepository)

        expect(userService instanceof UserService).toBe(true)
    })

    it('should run "createUser()" successfully', () => {
        let createUserData = { name: "John", email: "john@email.com", password: "123456" }
        userService.createUser(createUserData)

        expect(userRepository.persist).toHaveBeenCalled()
    })

    it('should run "getAllUsers()" successfully', () => {
        userService.getAllUsers()
        expect(userRepository.getAll).toHaveBeenCalled()
    })
    
    it('should run "findUser()" successfully', async () => {
        let userMock = new User()
        userRepository.find = jest.fn().mockResolvedValueOnce(userMock)

        let user = await userService.findUser(1)
        expect(userRepository.find).toHaveBeenCalled()
        expect(user).toBe(userMock)
    })
    
    it('should run "findUser()" and throw HttpException - "User not found."', async () => {
        userRepository.find = jest.fn().mockResolvedValueOnce(null)
        await expect(userService.findUser(1)).rejects.toThrow('User not found.')
    })
    
    it('should run "deletUser()" successfully', async () => {
        let userMock = new User()
        userService.deleteUser(userMock)
        expect(userRepository.delete).toHaveBeenCalled()
    })

})
