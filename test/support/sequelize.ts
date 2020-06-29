import { Sequelize } from "sequelize-typescript"
import path from "path"
import User from "../../src/domain/entities/User"
import Account from "../../src/domain/entities/Account"
import Transaction from "../../src/domain/entities/Transaction"
import Payment from "../../src/domain/entities/Payment"


const startTestDB = async () => {
    const sequelize = new Sequelize('sqlite::memory:')
    // sequelize.addModels([path.resolve(__dirname, '../../src/infrastructure/database/models')])
    sequelize.addModels([
        User, 
        Account, 
        Transaction,
        Payment 
    ])
}

export default { startTestDB }