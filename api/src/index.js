import express from 'express'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import bodyParser from 'body-parser'
import routes from './routes'
import cors from 'cors'

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI).then(() => {
  if (process.env.DROP_DATABASE == true) {
    mongoose.connection.db.dropDatabase(() => {
      console.log('- Drop database')
    })
  }
})

let app = express()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', routes)

export default app
