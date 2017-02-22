import { Product } from '../../models'
import { productView, handleError, pagination } from '../../helpers'

export default (req, res, next) => {
  let params = { active: true }
  let options = {
    select: [
      '_id',
      'title',
      'description',
      'delivery',
      'condition',
      'category',
      'user',
      'images',
      'comments',
      'contact_type',
      'contact_value',
      'to_user',
      'state',
      'location.context',
    ].join(' '),
    populate: [{
      path: 'user',
      select: 'name'
    }, {
      path: 'to_user',
      select: 'name'
    }, {
      path: 'category',
      select: 'name'
    }]
  }
  if (!req.query.latitude && !req.query.longitude) {
    options.sort = 'title'
  }
  return pagination.paginate(Product, req, options, params).then((result) => {
    let data = productView.prepareData(result.data)
    res.send({
      status: true,
      data: data,
      paging: result.paging
    })
  }).catch(next)
}
