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


const router = Router()

//USER
router.post('/users', UserValidation, (req, res, next) => {
    return userController.create(req, res, next)
})

// ACCOUNT
router.post('/accounts/:id/deposit', DepositValidation, (req, res, next) => {
    return accountController.deposit(req, res, next)
})

router.use(ErrorMiddleware)

export default router