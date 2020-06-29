import { Table, Column, Model } from "sequelize-typescript"

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
}

export default User