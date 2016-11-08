export default {
  url: function(path) {
    const endpoint = process.env.REDEDOAR_API_URL
    return `${endpoint}${path}`
  }
}
