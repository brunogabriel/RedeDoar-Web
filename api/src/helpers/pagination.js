import _ from 'lodash'

export default {
  getPage: function (req) {
    let page = parseInt(req.query.page || 1)
    if (page <= 0) page = 1
    return page
  },
  getLimit: function (req) {
    let limit = req.query.limit || 10
    return limit
  },
  getOptions: function (req, options, model) {
    let filter = req.query.filter || null
    let search = req.query.search || null
    if (filter && search) {
      options[filter] = new RegExp(`.*${search}.*`, 'ig')
    }
    return options
  },
  getParams: function(req, model) {
    let page = this.getPage(req)
    let limit = this.getLimit(req)
    let params = { page: page, limit: limit }
    let order = req.query.order || null
    if (order) {
      order = this.parseOrder(order, model)
      if (order) params.sort = order
    }
    return params
  },
  parseOrder: function(order, model) {
    let direction = '+'
    let field = order.replace(' ', '+')
    if (field[0] == '+' || field[0] == '-') {
      direction = field[0]
      field = field.substring(1)
    }
    let keys = _.keys(model.schema.paths)
    if (_.includes(keys, field)) {
      if (direction == '+') order = field
      return order
    }
  },
  paginate: function(model, req, options={}) {
    let params = this.getParams(req, model)
    options = this.getOptions(req, options, model)
    return model.paginate(options, params).then((result) => {
      let data = result.docs
      delete result.docs
      return { data: data, paging: result }
    })
  }
}
