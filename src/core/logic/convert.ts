export function convertStringToInteger(str: string) {
    const number = parseInt(str, 10);
    if (isNaN(number)) {
        return -1;
    }
    return number;
}

// export function isPositiveFraction(input: string): boolean {
//     const fractionRegex = /^[0-9]\d*\/[1-9]\d*$/;
//     return fractionRegex.test(input);
// }

export function isPositiveFraction(input: string): boolean {
    // Kiểm tra định dạng phân số (dương) cho phép `0/0`
    const fractionRegex = /^[0-9]\d*\/[0-9]\d*$/;

    if (!fractionRegex.test(input)) {
        return false;
    }

    // Tách tử số và mẫu số
    const [numerator, denominator] = input.split("/").map(Number);

    // Kiểm tra điều kiện tử số <= mẫu số và cho phép trường hợp `0/0`
    return (numerator <= denominator) || (numerator === 0 && denominator === 0);
}


export function getNumeratorAndDenominator(input: string): { numerator: number, denominator: number } {
    const [numerator, denominator] = input.split("/").map(Number);
    return { numerator, denominator };
}
