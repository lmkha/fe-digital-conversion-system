export function validateAddReportConfig({ year, period, startDate, finishDate }: {
    year: string,
    period: string,
    startDate: string,
    finishDate: string
}): { field: string, message: string }[] {
    const errors: { field: string, message: string }[] = [];

    const yearPattern = /^\d{1,4}$/;
    if (!year) {
        errors.push({ field: "year", message: "Năm không được để trống." });
    } else if (!yearPattern.test(year)) {
        errors.push({ field: "year", message: "Năm chỉ chứa số và tối đa 4 chữ số." });
    }

    if (!period) {
        errors.push({ field: "period", message: "Kỳ báo cáo không được để trống." });
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!startDate) {
        errors.push({ field: "startDate", message: "Ngày bắt đầu không được để trống." });
    } else if (!datePattern.test(startDate)) {
        errors.push({ field: "startDate", message: "Ngày bắt đầu không hợp lệ (DD/MM/YYYY)." });
    }

    if (!finishDate) {
        errors.push({ field: "finishDate", message: "Ngày kết thúc không được để trống." });
    } else if (!datePattern.test(finishDate)) {
        errors.push({ field: "finishDate", message: "Ngày kết thúc không hợp lệ (DD/MM/YYYY)." });
    } else if (startDate && finishDate) {
        const [startDay, startMonth, startYear] = startDate.split('/').map(Number);
        const [finishDay, finishMonth, finishYear] = finishDate.split('/').map(Number);
        const start = new Date(startYear, startMonth - 1, startDay);
        const finish = new Date(finishYear, finishMonth - 1, finishDay);

        if (finish < start) {
            errors.push({ field: "finishDate", message: "Ngày kết thúc phải sau ngày bắt đầu." });
        }
    }

    return errors;
}
