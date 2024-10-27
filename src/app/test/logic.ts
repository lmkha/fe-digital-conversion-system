function isValidPassword(password: string): boolean {
    const lengthCondition = password.length >= 8 && password.length <= 50;
    const whitespaceCondition = !/\s/.test(password);
    const specialCharacterCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCondition = /[A-Z]/.test(password);
    const lowercaseCondition = /[a-z]/.test(password);
    const digitCondition = /\d/.test(password);
    return lengthCondition && whitespaceCondition && specialCharacterCondition
        && uppercaseCondition && lowercaseCondition && digitCondition;
}


type ValidatedField = 'username' | 'name' | 'password' | 'jobTitle';

export function addUserValidator({ username, name, password, jobTitle }: {
    username: string,
    name: string,
    password: string,
    jobTitle: string
}): ValidatedField[] {
    // Validate username
    const errorFields: ValidatedField[] = [];
    if (username.length > 50) errorFields.push('username');
    // If username is vietnamese, add to errorFields
    if (!/^[a-zA-Z0-9_]+$/.test(username)) errorFields.push('username');

    // Validate name
    if (name.length > 100) errorFields.push('name');

    // Validate password
    if (!isValidPassword(password)) errorFields.push('password');

    // Validate job title
    if (jobTitle.length > 100) errorFields.push('jobTitle');
    return errorFields;
}

console.log(addUserValidator({
    username: 'Lê Kha',
    name: 'name',
    password: 'password',
    jobTitle: 'jobTitle'
}));