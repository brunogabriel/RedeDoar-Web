import { assert } from 'chai'
import request from 'supertest'
import { app } from '../../test_helper'

describe('pages', () => {
  describe('terms_of_use', () => {
    it('deve acessar pagina de termos de uso', (done) => {
      request(app)
        .get('/terms-of-use')
        .expect('Content-Type', /html/)
        .expect(200)
        .end((err, res) => {
          if (err) throw new Error(err)
          assert.include(res.text, '<!DOCTYPE html')
          done()
        })
    })
  })
})
