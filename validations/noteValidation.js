const Validator = require('validator');
const isEmpty = require('./isEmpty');
const { emailIsValid, } = require('./isEmail');
module.exports.validateNoteInput = (data) => {
    console.log(data)
    let errors = {};
    data.title = !isEmpty(data.title) && data.title !== undefined ? data.title : '';
    data.level = !isEmpty(data.level) && data.level !== undefined ? data.level : '';
    data.type = !isEmpty(data.type) && data.type !== undefined ? data.type : '';
    data.area = !isEmpty(data.area) && data.area !== undefined ? data.area : '';
    data.desc = !isEmpty(data.desc) && data.desc !== undefined ? data.desc : '';

    

    if (Validator.isEmpty(data.level)) {
        errors.level = 'level field is required';
    }
    if (Validator.isEmpty(data.area)) {
        errors.area = 'Area  field is required';
    }

    if (Validator.isEmpty(data.type)) {
        errors.type = 'type of study field is required';
    }
    if (Validator.isEmpty(data.desc)) {
        errors.desc = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

