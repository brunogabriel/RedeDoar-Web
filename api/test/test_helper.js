import path from 'path'
import mongoose from 'mongoose'
import Promise from 'bluebird'
import fixtures from 'pow-mongodb-fixtures'
import request from 'supertest'
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

const makeRequest = (method, path, statusCode) => {
  let req = request(app)
  if (method == 'get') req = req.get(path)
  if (method == 'post') req = req.post(path)
  if (statusCode) req = req.expect(statusCode)
  req = req.expect('Content-Type', /json/)
  return req
}

beforeEach(loadAllFixtures)

after(closeConnection)

export {
  mongoose,
  openConnection,
  closeConnection,
  app,
  makeRequest
}
