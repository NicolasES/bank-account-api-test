import { PaymentApplicationService } from '../../../src/application/services/PaymentApplicationService'
import { PaymentServiceContractMock } from '../../support/mocks/domainServicesMocks'

describe('AccountApplicationService', () => {
    let paymentApplicationService: PaymentApplicationService
    let paymentService = new PaymentServiceContractMock()

    it('should instance "PaymentApplicationService" succesfully', () => {
        paymentApplicationService = new PaymentApplicationService(paymentService)
        expect(paymentApplicationService instanceof PaymentApplicationService).toBe(true)
    })

    it ('should run "payment()" succesfully', async () => {
        let paymentData = {
            amount: 50,
            receiver: "Empresa de internet"
        }
        await paymentApplicationService.payment("1", paymentData)
        expect(paymentService.performPayment).toHaveBeenCalled()
    })
})
