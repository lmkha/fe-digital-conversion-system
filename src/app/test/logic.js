"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserValidator = addUserValidator;
function isValidPassword(password) {
    var lengthCondition = password.length >= 8 && password.length <= 50;
    var whitespaceCondition = !/\s/.test(password);
    var specialCharacterCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    var uppercaseCondition = /[A-Z]/.test(password);
    var lowercaseCondition = /[a-z]/.test(password);
    var digitCondition = /\d/.test(password);
    return lengthCondition && whitespaceCondition && specialCharacterCondition
        && uppercaseCondition && lowercaseCondition && digitCondition;
}
function addUserValidator(_a) {
    var username = _a.username, name = _a.name, password = _a.password, jobTitle = _a.jobTitle;
    // Validate username
    var errorFields = [];
    if (username.length > 50)
        errorFields.push('username');
    // If username is vietnamese, add to errorFields
    if (!/^[a-zA-Z0-9_]+$/.test(username))
        errorFields.push('username');
    // Validate name
    if (name.length > 100)
        errorFields.push('name');
    // Validate password
    if (!isValidPassword(password))
        errorFields.push('password');
    // Validate job title
    if (jobTitle.length > 100)
        errorFields.push('jobTitle');
    return errorFields;
}
console.log(addUserValidator({
    username: 'Lê Kha',
    name: 'name',
    password: 'password',
    jobTitle: 'jobTitle'
}));
