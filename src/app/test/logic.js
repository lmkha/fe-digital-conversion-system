function isValidPhoneNumber(phoneNumber) {
    var phoneNumberPattern = /^(0[0-9]+|[1-9][0-9]*)$/;
    return phoneNumber.length <= 15 && phoneNumberPattern.test(phoneNumber);
}
console.log(isValidPhoneNumber('07890'));
