import {
  TOGGLE_DROPDOWN,
  TOGGLE_MOBILE_NAV,
  SET_CURRENT_LINK
} from '../constants'

export const toggleMobileNav = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_MOBILE_NAV })
  }
}

export const toggleDropdown = (name) => {
  return dispatch => {
    dispatch({ type: TOGGLE_DROPDOWN, name })
  }
}

export const setCurrentNavItem = (item) => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_LINK, current_nav_item: item })
  }
}
