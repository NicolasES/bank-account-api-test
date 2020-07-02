import { Sequelize } from "sequelize-typescript"

import User from "../../domain/entities/User"
import Account from "../../domain/entities/Account"
import Transaction from "../../domain/entities/Transaction"
import Payment from "../../domain/entities/Payment"
import { Dialect } from "sequelize/types"

function setDialect(value=''): Dialect {
    switch(value) {
        case 'mysql': return 'mysql'
        case 'postgres': return 'postgres'
        case 'sqlite': return 'sqlite'
        default: return "mysql"
    }
}

const start = async () => {

    const sequelize = new Sequelize({
        dialect: setDialect(process.env.DB_DIALECT),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        storage: './sqlitedb',
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