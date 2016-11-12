import { User } from '../../../models'
import { Product } from '../../../models'
import { pagination } from '../../../helpers'
import Promise from 'bluebird'

export default (req, res, next) => {
  let params = {
    select: 'name gender email picture language active'
  }
  return pagination.paginate(User, req, params).then((result) => {
    let data = result.data
    let items = []
    data.forEach((item) => {
      items.push(Product.count({ user: item._id }).then((count) => {
        item.set('products_count', count, { strict: false })
        return item
      }))
    })
    return Promise.all(items).then((items) => {
      res.send({
        status: true,
        data: data,
        paging: result.paging
      })
    })
  })
}
