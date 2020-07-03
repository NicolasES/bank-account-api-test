import { UserService } from "../../../src/domain/services/UserService"
import { UserRepositoryContract } from "../../../src/domain/repositories/UserRepositoryContract"
import sequelize from "../../support/sequelize"

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

    it('should run "createUser()" successfully', () => {
        userService.getAllUsers()
        expect(userRepository.getAll).toHaveBeenCalled()
    })
})
