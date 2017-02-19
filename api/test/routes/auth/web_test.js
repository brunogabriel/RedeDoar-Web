import { assert } from 'chai'
import request from 'supertest'
import { app, closeConnection } from '../../test_helper'

after(closeConnection)

describe('auth', () => {
  describe('web', () => {
    it('deve autenticar com cadastro normal', (done) => {
      request(app)
        .post('/auth/web')
        .send({
          email: 'fulano@gmail.com',
          password: '123456789',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.isTrue(res.body.status)
          assert.property(res.body, 'data')
          done()
        })
    })
  })
})
