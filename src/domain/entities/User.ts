import { Table, Column, Model, HasOne } from "sequelize-typescript"
import Account from "./Account"

@Table({
    tableName: 'users',
    timestamps: false
})
export class User extends Model<User>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    @Column
    name: string

    @Column
    email: string

    @Column
    password: string

    @HasOne(() => Account, { foreignKey: 'user_id' })
    account: Account
}

export default User