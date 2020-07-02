import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Router from './application/http/routes/Router'
import sequelize from './infrastructure/database/sequelize'
import serveStatic from 'serve-static'
import path from 'path'

dotenv.config()

const app = express()

sequelize.start()

app.use(cors())
app.use(express.json())
app.use(Router)


app.use(serveStatic(path.join(__dirname, '../front')))

const port = process.env.PORT || 3000
app.listen(3000, () => {
    console.log('Servidor iniciado.')
})