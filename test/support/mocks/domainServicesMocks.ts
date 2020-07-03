import { UserServiceContract } from "../../../src/domain/services/contracts/UserServiceContract"
import { AccountServiceContract } from "../../../src/domain/services/contracts/AccountServiceContract"
import { TransactionServiceContract } from "../../../src/domain/services/contracts/TransactionServiceContract"
import { PaymentServiceContract } from "../../../src/domain/services/contracts/PaymentServiceContract"

const UserServiceMock = jest.fn<UserServiceContract, []>(() => ({
    createUser: jest.fn(),
    findUser: jest.fn(),
    getAllUsers: jest.fn(),
    deleteUser: jest.fn()
}))

const AccountServiceContractMock = jest.fn<AccountServiceContract, []>(() => ({
    createAccount: jest.fn(),
    deleteAccount: jest.fn()
}))

const TransactionServiceContractMock = jest.fn<TransactionServiceContract, []>(() => ({
    getHistory: jest.fn(),
    performDeposit: jest.fn(),
    performWithdraw: jest.fn()
}))

const PaymentServiceContractMock = jest.fn<PaymentServiceContract, []>(() => ({
    performPayment: jest.fn()
}))

export {
    UserServiceMock,
    AccountServiceContractMock,
    TransactionServiceContractMock,
    PaymentServiceContractMock
}