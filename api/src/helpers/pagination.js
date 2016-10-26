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
  getParams: function(req) {
    let page = this.getPage(req)
    let limit = this.getLimit(req)
    return { page: page, limit: limit }
  },
  paginate: function(model, req, options={}) {
    let params = this.getParams(req)
    return model.paginate(options, params).then((result) => {
      let data = result.docs
      delete result.docs
      return { data: data, paging: result }
    })
  }
}
