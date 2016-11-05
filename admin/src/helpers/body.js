export default {
  addClass: function(className) {
    document.body.className += ` ${className}`
  },
  removeClass: function(className) {
    document.body.className = document.body.className.replace(className, '')
  }
}
