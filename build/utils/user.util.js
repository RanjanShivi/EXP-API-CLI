"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatrToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var generatrToken = function generatrToken(searchData) {
  var token = _jsonwebtoken["default"].sign({
    "email": searchData.email,
    "id": searchData._id
  }, process.env.SECRET_KEY);

  return token;
};

exports.generatrToken = generatrToken;