import { assert } from 'chai'
import request from 'supertest'
import { app, closeConnection } from '../../test_helper'

after(closeConnection)

describe('users', () => {
  describe('facebook', () => {
    it('deve redirecionar para fazer login com facebook', (done) => {
      request(app)
        .get('/users/facebook')
        .expect(302)
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.include(res.header.location, 'facebook.com')
          done()
        })
    })
  })
})
