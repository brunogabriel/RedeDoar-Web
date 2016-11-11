import { User } from '../../../models'
import { pagination } from '../../../helpers'

export default (req, res, next) => {
  let params = {
    select: 'name gender email picture language active'
  }
  return pagination.paginate(User, req, params).then((result) => {
    const data = result.data
    res.send({
      status: true,
      data: data,
      paging: result.paging
    })
  })
}
