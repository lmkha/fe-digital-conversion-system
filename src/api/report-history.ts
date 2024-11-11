import Base from "./base";

class ReportHistoryAPI extends Base {
    async getReportHistoryById(reportId: string) {
        try {
            const response = await this.get('/report-history/find-report-history', {
                reportId: reportId
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
}

const reportHistoryAPI = new ReportHistoryAPI();
export default reportHistoryAPI;
