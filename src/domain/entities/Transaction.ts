import { Table, Column, Model, BelongsTo } from "sequelize-typescript"
import { Account } from "./Account"

@Table({
    tableName: 'transactions',
    timestamps: false
})
export class Transaction extends Model<Transaction> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column({
        field: 'account_id',
    })
    accountId: number;

    @Column
    amount: number

    @Column
    description: string

    @Column({
        field: 'account_amount'
    })
    accountAmount: number
  
    @BelongsTo(() => Account, 'account_id')
    account: Account

    setAccount(account: Account) {
        this.account = account
        this.accountId = account.id
    }
}

export default Transaction
