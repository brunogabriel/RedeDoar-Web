import mongoose from 'mongoose'
import Promise from 'bluebird'

mongoose.Promise = Promise
let database = process.env.MONGODB_URI
if (process.env.NODE_ENV == 'test') {
  database = process.env.MONGODB_URI_TEST
}
mongoose.connect(database).then(() => {
  if (process.env.DROP_DATABASE == true) {
    mongoose.connection.db.dropDatabase(() => {
      console.log('- Drop database')
    })
  }
})
