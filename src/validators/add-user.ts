
export function addUserValidator(username: string, name: string, password: string, jobTitle: string): string[] {
    // Validate username
    const errorFields: string[] = [];
    if (username.length > 50) errorFields.push('username');
    // If username is vietnamese, add to errorFields
    if (!/^[a-zA-Z0-9_]+$/.test(username)) errorFields.push('username');

    // Validate name
    if (name.length > 100) errorFields.push('name');



    return [];
}
