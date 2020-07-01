import express from 'express'
const cors = require('cors')
import Router from './application/http/routes/Router'
import sequelize from './infrastructure/database/sequelize'
import serveStatic from 'serve-static'
import path from 'path'


const app = express()

sequelize.start()

app.use(cors())
app.use(express.json())
app.use(Router)


app.use(serveStatic(path.join(__dirname, '../front')))

app.listen(3000, () => {
    console.log('Servidor iniciado.')
})