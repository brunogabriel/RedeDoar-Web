import { createObjectId as id } from 'pow-mongodb-fixtures'

exports.users = [
  {
    _id: id('58a3885bd0c52900e1d7bdc9'),
    name: 'Fulano',
    email: 'fulano@gmail.com',
    password: '123456789',
    gender: 'male',
    birthday: '1970-05-02',
  }
]
