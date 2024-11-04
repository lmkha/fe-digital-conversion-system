export default interface ReportConfigItem {
    reportId: string;
    reportName: string;
    year: number;
    reportPeriod: string;
    startDate: string;
    finishDate: string;
    status: boolean;
    editAtOtherDept?: boolean;
}
