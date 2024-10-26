function isVietnamese(str: string): boolean {
    // Biểu thức chính quy để kiểm tra ký tự tiếng Việt có dấu
    const vietnamesePattern = /^[\p{L}\p{M}\s]+$/u;
    return vietnamesePattern.test(str);
}