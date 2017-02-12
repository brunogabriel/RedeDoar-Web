import mongoose from 'mongoose'
import Promise from 'bluebird'
import app from '../src'

mongoose.Promise = Promise

const cleanDatabase = (done) => {
  mongoose.connection.db.dropDatabase(done)
}

const openConnection = (done) => {
  mongoose.connect(process.env.MONGODB_URI_TEST).then(() => {
    cleanDatabase(done)
  })
}

const closeConnection = (done) => {
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close(done)
}

export { mongoose, openConnection, closeConnection, app }
