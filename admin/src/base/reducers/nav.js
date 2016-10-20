import {
  TOGGLE_DROPDOWN,
  TOGGLE_MOBILE_NAV,
  SET_CURRENT_LINK
} from '../constants'

let initialState = {
  opened_nav: false,
  opened_languages: false,
  current_nav_item: null,
  current_opened_dropdown: null,
}

const nav = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_NAV:
      return Object.assign({}, state, {
        opened_nav: !state.opened_nav
      })

    case TOGGLE_DROPDOWN:
      let current_opened_dropdown = action.name
      if (state.current_opened_dropdown == current_opened_dropdown) {
        current_opened_dropdown = null
      }
      return Object.assign({}, state, {
        current_opened_dropdown: current_opened_dropdown
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
