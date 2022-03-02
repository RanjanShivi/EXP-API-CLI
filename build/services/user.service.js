"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegistration = exports.userLogin = exports.resetPassword = exports.forgetPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Utils = _interopRequireWildcard(require("../utils/user.util"));

var Helpers = _interopRequireWildcard(require("../utils/helper"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//create new user
var userRegistration = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var user, salt, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            user = _context.sent;

            if (!(user == null)) {
              _context.next = 16;
              break;
            }

            _context.next = 6;
            return _bcrypt["default"].genSalt(10);

          case 6:
            salt = _context.sent;
            _context.next = 9;
            return _bcrypt["default"].hash(body.password, salt);

          case 9:
            body.password = _context.sent;
            _context.next = 12;
            return _user["default"].create(body);

          case 12:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 16:
            throw new Error("User Already Exists");

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userRegistration(_x) {
    return _ref.apply(this, arguments);
  };
}(); // login user


exports.userRegistration = userRegistration;

var userLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var searchData, validPassword, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            searchData = _context2.sent;

            if (!(searchData == null)) {
              _context2.next = 7;
              break;
            }

            throw new Error("User does not exist");

          case 7:
            _context2.next = 9;
            return _bcrypt["default"].compare(body.password, searchData.password);

          case 9:
            validPassword = _context2.sent;

            if (!validPassword) {
              _context2.next = 15;
              break;
            }

            token = Utils.generatrToken(searchData);
            return _context2.abrupt("return", token);

          case 15:
            throw new Error("Password Invalid");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function userLogin(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userLogin = userLogin;

var forgetPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, token, sendMail;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(body);
            _context3.next = 3;
            return _user["default"].findOne({
              email: body.email
            });

          case 3:
            data = _context3.sent;
            console.log(data);

            if (!(data == null)) {
              _context3.next = 9;
              break;
            }

            throw new Error("email is not registered");

          case 9:
            token = _jsonwebtoken["default"].sign({
              "email": data.email,
              "id": data._id
            }, process.env.SECRET_KEY2);
            sendMail = Helpers.sendMailTo(data.email, token);
            console.log(sendMail);
            return _context3.abrupt("return", sendMail);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgetPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.forgetPassword = forgetPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var data, salt, hashPassword;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(body);
            _context4.next = 3;
            return _user["default"].findOneAndUpdate({
              _id: body.userID
            }, {
              $set: {
                password: body.password
              }
            }, {
              "new": true
            });

          case 3:
            data = _context4.sent;
            _context4.next = 6;
            return _bcrypt["default"].genSalt(10);

          case 6:
            salt = _context4.sent;
            _context4.next = 9;
            return _bcrypt["default"].hash(data.password, salt);

          case 9:
            hashPassword = _context4.sent;
            data.password = hashPassword;
            return _context4.abrupt("return", data);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;