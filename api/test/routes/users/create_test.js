import { assert } from 'chai'
import moment from 'moment'
import { makeRequest } from '../../test_helper'
import { comparePassword } from '../../../src/helpers'

const data = {
  name: 'Beltrano Silva Sauro',
  email: 'beltrano@gmail.com',
  password: '123456789',
  gender: 'male',
  birthday: '29/10/1974',
  phone: '(12) 90001-5000',
  language: 'pt-BR',
  termsOfUse: 1,
}

describe('users', () => {
  describe('create', () => {
    it('deve obrigar o usuário a aceitar os termos de uso', (done) => {
      makeRequest('post', '/users', 200)
        .send(Object.assign({}, data, { termsOfUse: 0 }))
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.isFalse(res.body.status)
          assert.include(res.body.message, 'termos de uso')
          done()
        })
    })
    it('deve criar um cadastro', (done) => {
      makeRequest('post', '/users', 200)
        .send(data)
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.isTrue(res.body.status)
          assert.property(res.body, 'data')
          assert.isTrue(comparePassword('123456789', res.body.data.password))
          assert.equal(
            moment(res.body.data.birthday).format('YYYY-MM-DD'),
            moment('1974-10-29').format('YYYY-MM-DD')
          )
          done()
        })
    })
  })
})
