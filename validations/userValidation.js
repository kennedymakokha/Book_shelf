const Validator = require('validator');
const isEmpty = require('./isEmpty');
const { emailIsValid, } = require('./isEmail');
module.exports.validateRegisterInput = (data) => {
    let errors = {};
  
    data.firstname = !isEmpty(data.firstname) && data.firstname !== undefined ? data.firstname : '';
    data.surname = !isEmpty(data.surname) && data.surname !== undefined ? data.surname : '';
    data.email = !isEmpty(data.email) && data.email !== undefined ? data.email : '';
    data.phone = !isEmpty(data.phone) && data.phone !== undefined ? data.phone : '';
    data.password = !isEmpty(data.password) && data.password !== undefined ? data.password : '';

    if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
        errors.firstname = 'First name must be between 2 to 30 chars';
    }
    if (Validator.isEmpty(data.surname)) {
        errors.surname = 'surname field is required';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'phone number field is required';
    }

    if (!emailIsValid(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isLength(data.password, { min: 8, })) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.phone, { min: 10, max: 14 })) {
        errors.phone = 'Phone Number  must have at least  10 characters ';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

