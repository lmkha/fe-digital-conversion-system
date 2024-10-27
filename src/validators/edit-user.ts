export type EditUserValidatedField = 'name' | 'jobTitle';

export function editUserValidator({ name, jobTitle }: {
    name: string,
    jobTitle: string
}): EditUserValidatedField[] {
    const errorFields: EditUserValidatedField[] = [];
    // Validate name
    if (name.length > 100) errorFields.push('name');
    // Validate job title
    if (jobTitle.length > 100) errorFields.push('jobTitle');
    return errorFields;
}
