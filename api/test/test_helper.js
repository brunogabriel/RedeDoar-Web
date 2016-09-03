import mongoose from 'mongoose'
import Promise from 'bluebird'

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI_TEST)

const cleanDatabase = (done) => {
  mongoose.connection.db.dropDatabase(done)
}

export { mongoose, cleanDatabase }
