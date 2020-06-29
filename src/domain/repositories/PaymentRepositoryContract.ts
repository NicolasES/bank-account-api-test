import Payment from "../entities/Payment";

export interface PaymentRepositoryContract {
    persist(payment: Payment): Promise<Payment>
}