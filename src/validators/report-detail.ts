export function isNumber(value: string): boolean {
    return !isNaN(Number(value)) && value.trim() !== '';
}

export function isNonNegativeInteger(value: string): boolean {
    const number = Number(value);
    return Number.isInteger(number) && number >= 0;
}

export function isNonNegativeNumber(value: string): boolean {
    return isNumber(value) && Number(value) >= 0;
}
