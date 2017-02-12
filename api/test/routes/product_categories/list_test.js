import { assert } from 'chai'
import request from 'supertest'
import { app, closeConnection } from '../../test_helper'

after(closeConnection)

describe('product_categories', () => {
  describe('list', () => {
    it('deve retornar as categorias de doações sem precisar de autenticação', (done) => {
      request(app)
        .get('/product_categories')
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
