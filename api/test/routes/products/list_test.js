import { assert } from 'chai'
import request from 'supertest'
import { app, closeConnection } from '../../test_helper'

after(closeConnection)

describe('products', () => {
  describe('list', () => {
    it('deve retornar as doações sem precisar de autenticação', (done) => {
      request(app)
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.isTrue(res.body.status)
          assert.property(res.body, 'data')
          assert.property(res.body.data[0], 'title')
          assert.property(res.body.data[0], 'description')
          assert.property(res.body.data[0], 'delivery')
          assert.property(res.body.data[0], 'condition')
          assert.property(res.body.data[0], 'category')
          assert.property(res.body.data[0], 'user')
          assert.property(res.body.data[0], 'comments')
          assert.property(res.body.data[0], 'images')
          assert.property(res.body.data[0], 'location')
          assert.property(res.body, 'paging')
          assert.property(res.body.paging, 'total')
          assert.property(res.body.paging, 'limit')
          assert.property(res.body.paging, 'page')
          assert.property(res.body.paging, 'pages')
          done()
        })
    })
  })
})
