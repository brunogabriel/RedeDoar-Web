import Promise from 'bluebird'
import _ from 'lodash'
import { Product } from '../../../models'

export default (req, res, next) => {
  let items = []
  
  items.push(
    Product.count({ state: null }).then((count) => {
      return { active_donations: count }
    })
  )

  items.push(
    Product.count({ state: 'donated' }).then((count) => {
      return { donations_made: count }
    })
  )

  items.push(
    Product.count({ state: 'canceled' }).then((count) => {
      return { canceled_donations: count }
    })
  )

  let month_names = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ]
  
  let date = new Date()
  date.setDate(1)
  date.setMonth(date.getMonth() - 5)
  for (let i = 0; i < 6; i++) {
    let current_date = date
    let next_date = new Date()
    next_date.setDate(1)
    next_date.setMonth(date.getMonth() + 1)
    let conditions = { createdAt: { $gte: date, $lt: next_date } }
    items.push(
      Product.count(conditions).then((count) => {
        let month = `${month_names[current_date.getMonth()]}/${current_date.getFullYear()}`
        return { sort: i, month: month, count: count }
      })
    )
    date = next_date
  }

  return Promise.all(items).then((items) => {
    let donation = []
    let data = {}
    items.forEach((item) => {
      if (!item.month) {
        data = _.merge(data, item)
      } else {
        donation.push(item)
      }
    })
    data.donation = _.sortBy(donation, 'sort')
    res.send({
      status: true,
      data: data
    })
  })
}
