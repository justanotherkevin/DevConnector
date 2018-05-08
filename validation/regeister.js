const Validator = require('validator');
const isEmpty = require('./scripts');
// only read string
// https://github.com/chriso/validator.js/
module.exports = function validateRegisterInput(data) {
  console.log(data)
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}