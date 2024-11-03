export default interface ReportItem {
    reportId: string;
    reportName: string;
    year: number;
    reportPeriod: string;
    startDate: string;
    finishDate: string;
    status: boolean;
    editAtOtherDept?: boolean;
}
