/**
 * Kiểm tra xem một chuỗi có phải là số điện thoại hợp lệ hay không.
 * 
 * Hàm này sẽ kiểm tra định dạng của số điện thoại dựa trên các tiêu chí:
 * - Độ dài không quá 15 ký tự.
 * - Chỉ chứa các ký tự số nguyên dương.
 * - Cho phép bắt đầu bằng số 0.
 *
 * @param {string} phoneNumber - Chuỗi số điện thoại cần kiểm tra.
 * @returns {boolean} - Trả về `true` nếu chuỗi là số điện thoại hợp lệ, `false` nếu không.
 */
function isValidPhoneNumber(phoneNumber: string): boolean {
    // Kiểm tra độ dài tối đa của số điện thoại.
    const phoneNumberPattern = /^(0[0-9]+|[1-9][0-9]*)$/;
    return phoneNumber.length <= 15 && phoneNumberPattern.test(phoneNumber);
}

export default isValidPhoneNumber;
