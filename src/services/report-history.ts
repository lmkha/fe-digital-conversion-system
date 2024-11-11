import reportHistoryAPI from "@/api/report-history";

export interface ReportHistory {
    createdAt?: string;
    reportHistoryId?: string;
    userEdit?: string;
};

export const getReportHistory = async (reportId: string): Promise<{
    success: boolean;
    message: string;
    data?: ReportHistory[];
}> => {
    const result = await reportHistoryAPI.getReportHistoryById(reportId).then((response) => {
        return {
            success: response.success,
            message: response.message,
            data: response.data
        }
    });
    return result;
};
