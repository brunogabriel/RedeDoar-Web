import {
  TOGGLE_MOBILE_NAV,
  TOGGLE_DROPDOWN_LANGUAGES,
  SET_CURRENT_LINK
} from '../constants'

export const toggleMobileNav = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_MOBILE_NAV })
  }
}

export const toggleDropdownLanguages = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_DROPDOWN_LANGUAGES })
  }
}

export const setCurrentNavItem = (item) => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_LINK, current_nav_item: item })
  }
}
