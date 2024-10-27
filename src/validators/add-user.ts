import isValidPassword from "@/core/logic/password-validator";

export type AddUserValidatedField = 'username' | 'name' | 'password' | 'jobTitle';

export function addUserValidator({ username, name, password, jobTitle }: {
    username: string,
    name: string,
    password: string,
    jobTitle: string
}): AddUserValidatedField[] {
    // Validate username
    const errorFields: AddUserValidatedField[] = [];
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
