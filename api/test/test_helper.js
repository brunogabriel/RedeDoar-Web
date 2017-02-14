import path from 'path'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import fixtures from 'pow-mongodb-fixtures'
import app from '../src'

const db = fixtures.connect(process.env.MONGODB_URI_TEST)

mongoose.Promise = Promise

const cleanDatabase = (done) => {
  db.clear(() => {
    mongoose.connection.db.dropDatabase(done)
  })
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

const loadAllFixtures = (done) => {
  mongoose.connection.dropDatabase((err, result) => {
    let pathname = path.join(__dirname, 'fixtures/')
    db.load(pathname, done)
  })
}

beforeEach(loadAllFixtures)

export { mongoose, openConnection, closeConnection, app }
