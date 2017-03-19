"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  url: function url(path) {
    var endpoint = process.env.REDEDOAR_API_URL;
    return "" + endpoint + path;
  }
};