require('dotenv').config()

module.exports = {
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    // logging: false,
    storage: './sqlitedb',
}

