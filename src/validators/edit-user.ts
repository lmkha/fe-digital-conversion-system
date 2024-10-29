export type EditUserValidatedField = 'name' | 'jobTitle' | 'roleId';

export function editUserValidator({ name, jobTitle, roleId }: {
    name: string,
    jobTitle: string,
    roleId: string
}): EditUserValidatedField[] {
    const errorFields: EditUserValidatedField[] = [];
    // Validate name
    if (name.length == 0 || name.length > 100) errorFields.push('name');
    // Validate job title
    if (jobTitle.length == 0 || jobTitle.length > 100) errorFields.push('jobTitle');
    // Validate role id
    if (roleId.length == 0) errorFields.push('roleId');
    return errorFields;
}
