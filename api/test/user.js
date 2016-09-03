import { assert } from 'chai'
import { mongoose, cleanDatabase } from './test_helper'
import { User } from '../src/models'

describe('User', () => {
  before(cleanDatabase)
  describe('nova conta', () => {
    it('deve verificar se existe uma conta atraves do facebook_id', () => {
      return User.hasFacebookId('123').then((data) => {
        assert.isNull(data)
      })
    })

    it('deve criar uma conta atraves dos dados do facebook', () => {
      let expires = new Date()
      expires.setHours(expires.getHours() + 2)
      
      let mock = {
        name: 'João Silveiras',
        facebook: {
          id: '123',
          accessToken: '5afd446d5sf4adf64ads4f1asdf2ads',
          expires: expires
        }
      }

      return User.createAccount(mock).then((data) => {
        assert.equal(mock.facebook.id, data.facebook.id)
        assert.equal(mock.name, data.name)
        assert.equal(mock.facebook.accessToken, data.facebook.accessToken)
        assert.equal(mock.facebook.expires, data.facebook.expires)
        assert.isNotNull(data)
      })
    })
  })
})
