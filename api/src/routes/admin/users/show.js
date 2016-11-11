import { User } from '../../../models'

export default (req, res, next) => {
  let fields = 'name gender email picture language active'
  return User.findOne({ _id: req.params.id }, fields)
    // .populate({
    //   path: 'products',
    //   select: 'title'
    // })
    .then((user) => {
      const data = user
      res.send({
        status: true,
        data: data
      })
    })
}
