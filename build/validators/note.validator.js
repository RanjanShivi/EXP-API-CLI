"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newNoteValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var newNoteValidator = function newNoteValidator(req, res, next) {
  var schema = _joi["default"].object({
    Title: _joi["default"].string().min(4).required(),
    Description: _joi["default"].string().min(4).required(),
    Color: _joi["default"].string(),
    isArchived: _joi["default"]["boolean"](),
    isDeleted: _joi["default"]["boolean"](),
    userID: _joi["default"].string().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newNoteValidator = newNoteValidator;