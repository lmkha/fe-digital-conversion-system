export function convertStringToInteger(str: string) {
    const number = parseInt(str, 10);
    if (isNaN(number)) {
        return -1;
    }
    return number;
}

export function isPositiveFraction(input: string): boolean {
    const fractionRegex = /^[0-9]\d*\/[1-9]\d*$/;
    return fractionRegex.test(input);
}

export function getNumeratorAndDenominator(input: string): { numerator: number, denominator: number } {
    const [numerator, denominator] = input.split("/").map(Number);
    return { numerator, denominator };
}
