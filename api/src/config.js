let config = {
  rootUrl: process.env.ROOT_URL || 'http://rede-doar-api.dev.azk.io/',
  staticUrl: process.env.STATIC_URL || 'http://rede-doar-api.dev.azk.io',
}

config.facebook = {
  appId: process.env.FACEBOOK_APPID || '1370357039645664',
  appSecret: process.env.FACEBOOK_APPSECRET || '2b7cc39be51237c2150725e87da4dbf0',
  appNamespace: process.env.FACEBOOK_APPNAMESPACE || '',
  redirectUri: process.env.FACEBOOK_REDIRECTURI ||  config.rootUrl + 'users/facebook/callback',
  scope: 'email,user_birthday,user_about_me',
  fields: ['email', 'birthday', 'name', 'gender', 'location', 'picture']
}

config.google = {
  appId: process.env.GOOGLE_APPID || '683942758553-1vv5fo0g0djsehickr1q29ereofu7tt5.apps.googleusercontent.com',
  appSecret: process.env.GOOGLE_APPSECRET || 'iomzfTKAsqIme2ZIN5H2B3nP',
  redirectUri: process.env.GOOGLE_REDIRECTURI || 'http://rede-doar-api.dev.azk.io/users/google/callback',
  scopes: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
}

export default config
