import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import database from './database'
import routes from './routes'

let app = express()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

export default app
