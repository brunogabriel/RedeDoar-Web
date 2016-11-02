import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import database from './database'
import routes from './routes'

let app = express()

app.use(compression())
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '20mb' }))
app.use('/', routes)

export default app
