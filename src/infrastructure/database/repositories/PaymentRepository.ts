import { PaymentRepositoryContract } from "../../../domain/repositories/PaymentRepositoryContract";
import Payment from "../../../domain/entities/Payment"

export class PaymentRepository implements PaymentRepositoryContract{
    
    async persist(payment: Payment): Promise<Payment> {
        return payment.save()
    }
}