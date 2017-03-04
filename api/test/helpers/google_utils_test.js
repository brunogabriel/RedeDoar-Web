import { assert } from 'chai'
import request from 'supertest'
import moment from 'moment'
import { googleUtils, normalizeLocale } from '../../src/helpers'

describe('helpers', () => {
  describe('googleUtils', () => {
    it('deve retornar instancia do oauth2Client', (done) => {
      let oauth2Client = googleUtils.getClient()
      assert.property(oauth2Client, 'clientId_')
      assert.property(oauth2Client, 'clientSecret_')
      assert.property(oauth2Client, 'redirectUri_')
      done()
    })
    it('deve usar promessa para retornar usuario do google', (done) => {
      let oauth2Client = googleUtils.getClient()
      googleUtils.getPeople(oauth2Client).then((result) => {
        throw new Error(`Result: ${result}`)
        done()
      }).catch((error) => {
        assert.include(error.message, 'No access or refresh token is set')
        done()
      })
    })
    it('deve formatar dados do google para formato para salvar no banco', (done) => {
      let result = {
        displayName: 'João Silveiras',
        emails: [{
          value: 'email@gmail.com',
        }],
        gender: 'male',
        image: {
          url: 'http://url.com/photo.jpg',
        },
        language: 'pt_BR',
        id: '1',
        birthday: '1970-08-29'
      }
      let tokens = {
        access_token: '123',
        expiry_date: moment().add(2, 'hours').unix(),
        id_token: '123'
      }
      let user = googleUtils.formatUserData(result, tokens)
      assert.equal(user.name, result.displayName)
      assert.equal(user.email, result.emails.shift().value)
      assert.equal(user.gender, result.gender)
      assert.equal(user.language, normalizeLocale(result.language))
      assert.equal(user.birthday.toJSON(), moment(result.birthday).toJSON())
      done()
    })
  })
})
