import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import database from './database'
import routes from './routes'
import i18n from 'i18n'

i18n.configure({
  locales:['en', 'pt-br'],
  directory: __dirname + '/locales',
  defaultLocale: 'pt-br',
  cookie: 'rededoarapi',
  queryParameter: 'lang'
})

let app = express()

app.use(i18n.init)
app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')
app.use(compression())
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '20mb' }))
app.use('/', routes)

export default app
