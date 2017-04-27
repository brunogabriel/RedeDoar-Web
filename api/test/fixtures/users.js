import { createObjectId as id } from 'pow-mongodb-fixtures'
import { generateBcrypt } from '../../src/helpers'

exports.users = [
  {
    _id: id('58a3885bd0c52900e1d7bdc9'),
    name: 'Fulano',
    email: 'fulano@gmail.com',
    password: generateBcrypt('123456789'),
    gender: 'male',
    birthday: '1970-05-02',
    active: true,
    facebook: {
      id: '123',
      accessToken: '123',
      lastRefresh: new Date(),
      expires: new Date()
    },
    google: {
      id: '456',
      accessToken: '456',
      idToken: new Date(),
      expires: new Date()
    }
  }
]
