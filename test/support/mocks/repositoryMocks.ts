import { PaymentRepositoryContract } from "../../../src/domain/repositories/PaymentRepositoryContract"
import { TransactionRepositoryContract } from "../../../src/domain/repositories/TransactionRepositoryContract"
import { AccountRepositoryContract } from "../../../src/domain/repositories/AccountRepositoryContract"
import { UserRepositoryContract } from "../../../src/domain/repositories/UserRepositoryContract"

const PaymentRepositoryMock = jest.fn<PaymentRepositoryContract, []>(() => ({
    persist: jest.fn()
}))
const TransactionRepositoryMock = jest.fn<TransactionRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    getHistoryAccount: jest.fn()
}))

const AccountRepositoryMock = jest.fn<AccountRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    delete: jest.fn()
}))

const UserRepositoryMock = jest.fn<UserRepositoryContract, []>(() => ({
    persist: jest.fn(),
    find: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn()
}))

export {
    PaymentRepositoryMock,
    TransactionRepositoryMock,
    AccountRepositoryMock,
    UserRepositoryMock
}