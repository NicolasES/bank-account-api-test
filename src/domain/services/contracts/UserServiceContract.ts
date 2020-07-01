import User from "../../entities/User"

export interface UserServiceContract {
    createUser(data: CreateUserDTO): Promise<User>

    getAllUsers(): Promise<User[]>

    findUser(userId: number): Promise<User>

    deleteUser(user: User): Promise<boolean>
}

export interface CreateUserDTO {
    name: string,
    email: string,
    password: string    
}