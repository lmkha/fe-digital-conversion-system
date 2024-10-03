/**
 * Kiểm tra xem một chuỗi có phải là email hợp lệ hay không.
 * 
 * Hàm này sẽ kiểm tra định dạng của địa chỉ email dựa trên các tiêu chí:
 * - Độ dài không quá 50 ký tự.
 * - Phần tên người dùng (trước dấu '@') chỉ chứa các ký tự chữ cái, số, và các ký tự đặc biệt như '.', '_', '%', '+', '-'.
 * - Phần tên miền (sau dấu '@') chỉ chứa các chữ cái, số, dấu chấm ('.') và dấu gạch ngang ('-').
 * - Phần mở rộng của tên miền (sau dấu '.') có ít nhất 2 ký tự và chỉ chứa chữ cái.
 *
 * @param {string} email - Chuỗi email cần kiểm tra.
 * @returns {boolean} - Trả về `true` nếu chuỗi là email hợp lệ, `false` nếu không.
 */
function isValidEmail(email: string): boolean {
    // Kiểm tra độ dài của email, nếu dài hơn 50 ký tự thì không hợp lệ
    if (email.length > 50) {
        return false;
    }

    // Biểu thức chính quy kiểm tra định dạng email hợp lệ
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Trả về true nếu email khớp với biểu thức chính quy, ngược lại trả về false
    return emailPattern.test(email);
}

export default isValidEmail;
