import {
  TOGGLE_MOBILE_NAV,
  TOGGLE_DROPDOWN_LANGUAGES,
  SET_CURRENT_LINK
} from '../constants'

let initialState = {
  opened_nav: false,
  opened_languages: false,
  current_nav_item: null
}

const nav = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_NAV:
      return Object.assign({}, state, {
        opened_nav: !state.opened_nav
      })

    case TOGGLE_DROPDOWN_LANGUAGES:
      return Object.assign({}, state, {
        opened_languages: !state.opened_languages
      })

    case SET_CURRENT_LINK:
      return Object.assign({}, state, {
        current_nav_item: action.current_nav_item
      })

    default:
      return state
  }
}

export default nav
