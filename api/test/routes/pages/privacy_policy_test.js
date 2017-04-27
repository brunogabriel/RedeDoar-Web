import { assert } from 'chai'
import request from 'supertest'
import { app } from '../../test_helper'

describe('pages', () => {
  describe('privacy_policy', () => {
    it('deve acessar pagina de politica de privacidade', (done) => {
      request(app)
        .get('/privacy-policy')
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
