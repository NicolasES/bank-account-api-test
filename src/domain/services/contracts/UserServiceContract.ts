import User from "../../entities/User"

export interface UserServiceContract {
    createUser(data: CreateUserDTO): Promise<User>

    getAllUsers(): Promise<User[]>
}

export interface CreateUserDTO {
    name: string,
    email: string,
    password: string    
}