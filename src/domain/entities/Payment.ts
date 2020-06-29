import { Table, Column, Model, BelongsTo } from "sequelize-typescript"
import Transaction from "./Transaction";

@Table({
    tableName: 'payments',
    timestamps: false
})
export class Payment extends Model<Payment> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column({
        field: 'transaction_id',
    })
    transactionId: number;

    @Column
    amount: number

    @Column
    receiver: string

    @BelongsTo(() => Transaction, 'transaction_id')
    transaction: Transaction

    setTransaction(transaction: Transaction) {
        this.transaction = transaction
        this.transactionId = transaction.id
    }
}

export default Payment
