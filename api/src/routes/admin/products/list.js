import { Product } from '../../../models'
import { pagination } from '../../../helpers'
import { handleError, productView } from '../../../helpers'

export default (req, res, next) => {
  let params = {
    populate: [{
      path: 'user',
      select: 'name'
    }, {
      path: 'category',
      select: 'name'
    }, {
      path: 'to_user',
      select: 'name'
    }]
  }
  return pagination.paginate(Product, req, params).then((result) => {
    let data = productView.prepareData(result.data)
    res.send({
      status: true,
      data: data,
      paging: result.paging
    })
  }, (err) => {
    next({ message: handleError.getMessage(err) })
  })
}
