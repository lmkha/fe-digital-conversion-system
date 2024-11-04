export function validateEditReportConfig({ startDate, finishDate }: {
    startDate: string,
    finishDate: string
}): { field: string, message: string }[] {
    const errors: { field: string, message: string }[] = [];
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
