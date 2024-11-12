import Base from "./base";

export enum ReportStatus {
    DRAFT = 'Nhập liệu',
    PENDING_APPROVAL = 'Chờ duyệt',
    APPROVED = 'Đã duyệt',
    REJECTED = 'Đã từ chối',
}

export interface ReportFilterAPIParams {
    pageSize: number;
    pageNumber: number;
    deptId: string;
    reportPeriod?: string;
    year?: number;
    startDate?: string;
    finishDate?: string;
    status?: ReportStatus;
    deptName?: string;
    level?: 1 | 2 | 3 | 4;
    updatedAt?: string;
    userUpdatedName?: string;
}

class ReportAPI extends Base {
    async findReportByFilter({
        pageSize,
        pageNumber,
        deptId,
        reportPeriod,
        year,
        startDate,
        finishDate,
        status,
        deptName,
        level,
        updatedAt,
        userUpdatedName
    }: ReportFilterAPIParams) {
        try {
            const response = await this.get('/report/find-filter', {
                pageSize: pageSize,
                pageNumber: pageNumber,
                deptId: deptId,
                reportPeriod: reportPeriod,
                year: year,
                startDate: startDate,
                finishDate: finishDate,
                status: status,
                deptName: deptName,
                level: level,
                updatedAt: updatedAt,
                userUpdatedName: userUpdatedName
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }

    async updateStatus({ reportId, status }: { reportId: string, status: ReportStatus }) {
        try {
            const response = await this.patch(`/report/update-status?reportId=${reportId}&status=${status}`, {});
            return {
                success: response.success,
                message: response.message
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }

    async getReportStatusByReportId(reportId: string) {
        try {
            const response = await this.get(`/report/find-status-by-id?reportId=${reportId}`);
            return {
                success: response.success,
                message: response.message,
                data: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }
}

const reportAPI = new ReportAPI();
export default reportAPI;
