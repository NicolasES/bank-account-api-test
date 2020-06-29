import express from 'express'
import Router from './application/http/routes/Router'
import sequelize from './infrastructure/database/sequelize'

const app = express()

sequelize.start()

app.use(express.json())
app.use(Router)

app.listen(3000, () => {
    console.log('Servidor iniciado.')
})