import config from '../config'

export default {
  url: function (path) {
    return `${config.staticUrl}${path}`;
  }
}
