import _ from 'lodash'

export default {
  getMessage: function(error) {
    if (!error.errors && error.message) {
      return error.message
    } else {
      let messages = []
      if (error.errors) {
        for (let i in error.errors) {
          messages.push(error.errors[i].message)
        }
      }
      return _.uniq(messages).join(', ')
    }
  }
}
