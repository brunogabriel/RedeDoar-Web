export default {
  isProduction: function() {
    const location = window.location
    return location.host.includes('dominio.com.br')
  },
  isStaging: function() {
    const location = window.location
    return location.host.includes('sandbox.dominio.com.br')
  }
}
