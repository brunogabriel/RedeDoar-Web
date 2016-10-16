import moment_pt from 'moment/locale/pt'

// import { CHANGE_LANGUAGE } from '../constants'
// import enUsLocaleData from '../locales/en-US.json'
import ptBrLocaleData from './locales/pt-BR.json'
// import esEsLocaleData from '../locales/es-ES.json'

import { addLocaleData } from 'react-intl'
// import en from 'react-intl/locale-data/en'
// import es from 'react-intl/locale-data/es'
import pt from 'react-intl/locale-data/pt'
// import { intlReducer } from 'react-intl-redux'

addLocaleData([...pt])
// addLocaleData([...en, ...pt, ...es])

const messages = {
//   'en-US': enUsLocaleData,
  'pt-BR': ptBrLocaleData,
//   'es-ES': esEsLocaleData
}

let initialState = {
  defaultLocale: 'pt-BR',
  locale: 'pt-BR',
  messages: messages['pt-BR'],
//   options: [{
//     locale: 'pt-BR',
//     name: 'Português'
//   }, {
//     locale: 'en-US',
//     name: 'English'
//   }, {
//     locale: 'es-ES',
//     name: 'Español'
//   }]
}

const intl = (state = initialState, action) => {
  switch (action.type) {
    // case CHANGE_LANGUAGE:
    //   return Object.assign({}, state, {
    //     locale: action.locale,
    //     messages: messages[action.locale]
    //   })

    default:
      return state
  }
}

export default intl
