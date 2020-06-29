import Payment from "../../entities/Payment"

export interface PaymentServiceContract {
    performPayment(accountId: number, amount: number, receiver: string): Promise<Payment> 
}