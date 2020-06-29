import { Sequelize } from "sequelize-typescript"

import path from "path"
import User from "../../domain/entities/User"
import Account from "../../domain/entities/Account"
import Transaction from "../../domain/entities/Transaction"
import Payment from "../../domain/entities/Payment"


const start = async () => {

    const sequelize = new Sequelize({
        database: 'warren-api-test',
        dialect: 'mysql',
        username: 'root',
        password: '',
        // storage: ':memory:',
        // models: [__dirname + '/domain/entities'], // or [Player, Team],
    })
    // sequelize.addModels([path.resolve(__dirname, 'models')])
    sequelize.addModels([
        User, 
        Account, 
        Transaction,
        Payment
    ])
}

export default { start }