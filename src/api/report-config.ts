import Base from "./base";


class ReportConfigAPI extends Base {
    async createReportConfiguration({ deptId, reportName, year, reportPeriod, startDate, finishDate, status, editAtOtherDept }: {
        deptId: string;
        reportName: string;
        year: number;
        reportPeriod: string;
        startDate: string;
        finishDate: string;
        status?: number;
        editAtOtherDept?: number;
    }) {
        try {
            const response = await this.post("/report-config/create", {
                deptId: deptId,
                reportName: reportName,
                year: year,
                reportPeriod: reportPeriod,
                startDate: startDate,
                finishDate: finishDate,
                status: status,
                editAtOtherDept: editAtOtherDept
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

    async updateReportConfiguration({ deptId, reportId, startDate, finishDate, status, editAtOtherDept }: {
        deptId: string;
        reportId: string;
        startDate: string;
        finishDate: string;
        status?: number;
        editAtOtherDept?: number;
    }) {
        try {
            const response = await this.post("/report-config/update", {
                deptId: deptId,
                reportId: reportId,
                startDate: startDate,
                finishDate: finishDate,
                status: status,
                editAtOtherDept: editAtOtherDept
            })
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

    async findReportConfigurationByFilter({ pageSize, pageNumber, deptId, reportName, reportPeriod, year, startDate, finishDate, status }: {
        pageSize: number;
        pageNumber: number;
        deptId: string;
        reportName?: string;
        reportPeriod?: string;
        year?: number;
        startDate?: string;
        finishDate?: string;
        status?: number;
    }) {
        try {
            const response = await this.get("/report-config/find-filter", {
                pageSize: pageSize,
                pageNumber: pageNumber,
                deptId: deptId,
                reportName: reportName,
                reportPeriod: reportPeriod,
                year: year,
                startDate: startDate,
                finishDate: finishDate,
                status: status
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

    async findReportConfigurationById({ reportId }: { reportId: string }) {
        try {
            const response = await this.get("/report-config/find-by-id", {
                reportId: reportId
            })
            return {
                success: response.success,
                message: response.message,
                data: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
            }
        }
    }

    async updateReportConfigurationStatus({ reportId, status, deptId }: { reportId: string, status: 0 | 1, deptId: string }) {
        try {
            const response = await this.post("/report-config/update-status", {
                reportId: reportId,
                status: status,
                deptId: deptId
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

    async getListYears() {
        try {
            const response = await this.get('/report-config/get-list-years');
            return {
                success: response.success,
                message: response.message,
                data: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
            }
        }
    }
}

const reportConfigAPI = new ReportConfigAPI();
export default reportConfigAPI;
