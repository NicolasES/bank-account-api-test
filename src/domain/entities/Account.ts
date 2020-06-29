import { Table, Column, Model, BelongsTo } from "sequelize-typescript"
import { User } from "./User"

@Table({
    tableName: 'accounts',
    timestamps: false
})
export class Account extends Model<Account> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number
    
    @Column({
        field: 'user_id',
    })
    userId: number;
    
    @Column
    amount: number

    @BelongsTo(() => User, 'user_id')
    user: User

    setUser(user: User) {
        this.user = user
        this.userId = user.id
    }
}

export default Account