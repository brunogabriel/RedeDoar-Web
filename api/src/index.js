import express from 'express'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import routes from './routes'

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI).then(() => {
  if (process.env.DROP_DATABASE) {
    mongoose.connection.db.dropDatabase(() => {
      console.log('- Drop database')
    })
  }
})

let app = express()

app.use('/', routes)

export default app
