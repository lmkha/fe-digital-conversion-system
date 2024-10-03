/**
 * Kiểm tra xem một chuỗi mật khẩu có hợp lệ hay không.
 * 
 * Hàm này sẽ kiểm tra mật khẩu dựa trên các tiêu chí sau:
 * - Độ dài mật khẩu phải từ 8 đến 50 ký tự.
 * - Mật khẩu không được chứa khoảng trắng.
 * - Mật khẩu phải chứa ít nhất một ký tự đặc biệt.
 * - Mật khẩu phải có ít nhất một ký tự in hoa.
 * - Mật khẩu phải có ít nhất một ký tự chữ thường.
 * - Mật khẩu phải có ít nhất một ký tự số.
 * 
 * @param {string} password - Chuỗi mật khẩu cần kiểm tra.
 * @returns {boolean} - Trả về `true` nếu mật khẩu hợp lệ, `false` nếu không.
 */
export default function isValidPassword(password: string): boolean {
    // Kiểm tra độ dài mật khẩu (từ 8 đến 50 ký tự)
    const lengthCondition = password.length >= 8 && password.length <= 50;
    console.log(`lengthCondition: ${lengthCondition}`);
    // Kiểm tra không chứa khoảng trắng
    const whitespaceCondition = !/\s/.test(password);
    console.log(`whitespaceCondition: ${whitespaceCondition}`);

    // Kiểm tra có ít nhất một ký tự đặc biệt (như !@#$%^&*(),.?":{}|<>)
    const specialCharacterCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    console.log(`specialCharacterCondition: ${specialCharacterCondition}`);

    // Kiểm tra có ít nhất một ký tự in hoa
    const uppercaseCondition = /[A-Z]/.test(password);
    console.log(`uppercaseCondition: ${uppercaseCondition}`);

    // Kiểm tra có ít nhất một ký tự chữ thường
    const lowercaseCondition = /[a-z]/.test(password);
    console.log(`lowercaseCondition: ${lowercaseCondition}`);

    // Kiểm tra có ít nhất một ký tự số
    const digitCondition = /\d/.test(password);
    console.log(`digitCondition: ${digitCondition}`);

    // Trả về true nếu tất cả các điều kiện trên đều thỏa mãn
    return lengthCondition && whitespaceCondition && specialCharacterCondition
        && uppercaseCondition && lowercaseCondition && digitCondition;
}

