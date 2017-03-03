export cropFiles from './crop_files'
export removeFiles from './remove_files'
export handleError from './handle_error'
export productView from './product_view'
export productCategoryView from './product_category_view'
export productImage from './product_image'
export productCategoryImage from './product_category_image'
export asset from './asset'
export pagination from './pagination'
export uploadUtils from './upload_utils'
export api from './api'
export * from './security'

export const normalizeLocale = (locale) => {
  return locale.toLowerCase().replace('_', '-')
}
