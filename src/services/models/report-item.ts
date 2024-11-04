export type UpdatedAtType = {
    day: string;
    time: string;
}

export default interface ReportItem {
    reportId?: string;
    reportConfigId?: string;
    deptId?: string;
    status?: string;
    deptName?: string;
    level?: number;
    startDate?: string;
    finishDate?: string;
    reportPeriod?: string;
    year?: number;
    updatedAt?: UpdatedAtType;
    userUpdateName?: string;
}
