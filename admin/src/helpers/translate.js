export default {
  getMessages: (store) => {
    if (typeof store == 'function') {
      return store().intl.messages
    } else if (store.intl) {
      return store.intl.messages
    }
  }
}
