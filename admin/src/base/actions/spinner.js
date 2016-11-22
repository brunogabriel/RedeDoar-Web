import { body } from '../../helpers'

export const enableMainLoader = () => {
  body.addClass('with-main-loader')
}

export const disableMainLoader = () => {
  body.removeClass('with-main-loader')
}
