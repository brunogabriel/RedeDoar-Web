import { assert } from 'chai'
import request from 'supertest'
import { app, closeConnection } from '../../test_helper'

after(closeConnection)

describe('users', () => {
  describe('google', () => {
    it('deve redirecionar para fazer login com google', (done) => {
      request(app)
        .get('/users/login/google')
        .expect(302)
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.include(res.header.location, 'google.com')
          done()
        })
    })
  })
})
