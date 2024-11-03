export type CreateAtType = {
    date: string;
    time: string;
}

export interface FilterData {
    status: '0' | '1';
    departmentName: string;
    level: '1' | '2' | '3' | '4';
    startDate: string;
    finishDate: string;
    reportPeriod: string;
    createdAt: CreateAtType;
    createdBy: string;
}
