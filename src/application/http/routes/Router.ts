import { Router } from 'express'

import { ServiceContainer } from '../../service-container/SerticeContainer'
import { UserController } from '../controllers/UserController'
import { AccountController } from '../controllers/AccountController'

const container = new ServiceContainer()
const userController: UserController = container.resolve('userController')
const accountController: AccountController = container.resolve('accountController')

import ErrorMiddleware from '../middlewares/ErrorMiddleware'
import UserValidation from '../middlewares/validations/UserValidation'
import DepositValidation from '../middlewares/validations/DepositValidation'
import WithdrawValidation from '../middlewares/validations/WithdrawValidation'
import PaymentValidation from '../middlewares/validations/PaymentValidation'

const router = Router()

//USER
router.post('/users', UserValidation, (req, res, next) => {
    return userController.create(req, res, next)
})

router.get('/users', (req, res, next) => {
    return userController.all(req, res, next)
})

router.delete('/users/:id', (req, res, next) => {
    return userController.delete(req, res, next)
})

// ACCOUNT
router.post('/accounts/:id/deposit', DepositValidation, (req, res, next) => {
    return accountController.deposit(req, res, next)
})

router.post('/accounts/:id/withdraw', WithdrawValidation, (req, res, next) => {
    return accountController.withdraw(req, res, next)
})

router.post('/accounts/:id/payment', PaymentValidation, (req, res, next) => {
    return accountController.payment(req, res, next)
})

router.get('/accounts/:id/history', (req, res, next) => {
    return accountController.history(req, res, next)
})

router.use(ErrorMiddleware)

export default router