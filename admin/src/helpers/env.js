export default {
  isProduction: function() {
    const location = window.location
    return location.host.includes('cahere.com.br')
  },
  isStaging: function() {
    const location = window.location
    return location.host.includes('slideworks.cc')
  }
}
