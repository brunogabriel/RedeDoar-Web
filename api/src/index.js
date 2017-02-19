import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import database from './database'
import routes from './routes'
import i18n from 'i18n'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'

i18n.configure({
  locales:['en', 'pt-br'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  cookie: 'rededoarapi',
  queryParameter: 'language'
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
app.use(cookieParser())
app.use(cookieSession({
  name: 'friendly_donations',
  keys: ['456hds0a48d9eyj089712i0ueytwaew46wo545asf24asd10'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use('/', routes)

export default app
