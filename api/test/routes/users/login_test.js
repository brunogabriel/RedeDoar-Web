import { assert } from 'chai'
import request from 'supertest'
import { makeRequest } from '../../test_helper'

describe('users', () => {
  describe('login', () => {
    it('deve logar com token do facebook', (done) => {
      makeRequest('post', '/users/login', 200)
        .send({ token: '123' })
        .end((err, res) => {
          if (err) throw new Error(err)
          assert(res.body.success)
          done()
        })
    })
    it('deve logar com token do google', (done) => {
      makeRequest('post', '/users/login', 200)
        .send({ token: '456' })
        .end((err, res) => {
          if (err) throw new Error(err)
          assert(res.body.success)
          done()
        })
    })
  })
})
