import { PaymentServiceContract } from "../../domain/services/contracts/PaymentServiceContract"

export class PaymentApplicationService {
    constructor(
        private readonly paymentService: PaymentServiceContract
    ) {}

    async payment(accountId: string, body: { amount: number, receiver: string }): Promise<any> {
        return this.paymentService.performPayment(Number(accountId), body.amount, body.receiver)
    }
   
}