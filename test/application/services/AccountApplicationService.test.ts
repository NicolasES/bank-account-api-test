import { AccountApplicationService } from '../../../src/application/services/AccountApplicationService'
import { TransactionServiceContractMock } from '../../support/mocks/domainServicesMocks'

describe('AccountApplicationService', () => {
    let accountApplicationService: AccountApplicationService
    let transactionService = new TransactionServiceContractMock()

    it('should instance "AccountApplicationService" succesfully', () => {
        accountApplicationService = new AccountApplicationService(transactionService)

        expect(accountApplicationService instanceof AccountApplicationService).toBe(true)
    })

    it ('should run "deposit()" succesfully', async () => {
        await accountApplicationService.deposit("1", 50)
        expect(transactionService.performDeposit).toHaveBeenCalled()
    })
    
    it ('should run "withdraw()" succesfully', async () => {
        await accountApplicationService.withdraw("1", 50)
        expect(transactionService.performWithdraw).toHaveBeenCalled()
    })
    
    it ('should run "history()" succesfully', async () => {
        await accountApplicationService.history("1")
        expect(transactionService.getHistory).toHaveBeenCalled()
    })
})
