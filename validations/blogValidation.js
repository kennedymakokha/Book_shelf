const Validator = require('validator');
const isEmpty = require('./isEmpty');
const { emailIsValid, } = require('./isEmail');
module.exports.validateBlogInput = (data) => {
    let errors = {};
    data.title = !isEmpty(data.title) && data.title !== undefined ? data.title : '';
    data.body = !isEmpty(data.body) && data.body !== undefined ? data.body : '';
  
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }
    if (Validator.isEmpty(data.body)) {
        errors.body = 'Body field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

