import moment_pt from 'moment/locale/pt'

import { CHANGE_LANGUAGE, LOAD_MESSAGES } from './constants'
import enUsLocaleData from './locales/en-US.json'
import ptBrLocaleData from './locales/pt-BR.json'

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import pt from 'react-intl/locale-data/pt'

addLocaleData([...en, ...pt])

const messages = {
  'en-US': enUsLocaleData,
  'pt-BR': ptBrLocaleData,
}

let initialState = {
  defaultLocale: 'pt-BR',
  locale: 'pt-BR',
  messages: messages['pt-BR'],
  options: [{
    locale: 'pt-BR',
    name: 'Português'
  }, {
    locale: 'en-US',
    name: 'English'
  }]
}

const intl = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return Object.assign({}, state, {
        locale: action.locale,
        messages: messages[action.locale]
      })

    case LOAD_MESSAGES:
      return Object.assign({}, state, {
        messages: Object.assign({}, state.messages, action.messages)
      })

    default:
      return state
  }
}

export default intl
