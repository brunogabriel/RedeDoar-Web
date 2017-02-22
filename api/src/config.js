let config = { }

config.rootUrl  = process.env.ROOT_URL || 'http://rede-doar-api.dev.azk.io/'
config.staticUrl  = process.env.STATIC_URL || 'http://rede-doar-api.dev.azk.io'

config.facebook = {
  appId: process.env.FACEBOOK_APPID || '1370357039645664',
  appSecret: process.env.FACEBOOK_APPSECRET || '2b7cc39be51237c2150725e87da4dbf0',
  appNamespace: process.env.FACEBOOK_APPNAMESPACE || '',
  redirectUri: process.env.FACEBOOK_REDIRECTURI ||  config.rootUrl + 'users/facebook/callback',
  scope: 'email,user_birthday,user_about_me',
  fields: ['email', 'birthday', 'name', 'gender', 'location', 'picture']
}

export default config
