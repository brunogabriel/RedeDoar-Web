import _ from 'lodash'

export default {
  getMessage: function(error) {
    console.log("error", error);
    let messages = []
    if (error.errors) {
      for (let i in error.errors) {
        messages.push(error.errors[i].message)
      }
    }
    return _.uniq(messages).join(', ')
  }
}
