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
  getParams: function (req, model) {
    let options = {}
    let filter = req.query.filter || null
    let search = req.query.search || null
    if (filter && search) {
      options[filter] = new RegExp(`.*${search}.*`, 'ig')
    }
    return options
  },
  getOptions: function(req, model, options) {
    let page = this.getPage(req)
    let limit = this.getLimit(req)
    options.page = page
    options.limit = limit
    let order = req.query.order || null
    if (order) {
      order = this.parseOrder(order, model)
      if (order) options.sort = order
    }
    return options
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
    options = this.getOptions(req, model, options)
    return model.paginate(params, options).then((result) => {
      let data = result.docs
      delete result.docs
      return { data: data, paging: result }
    })
  }
}
