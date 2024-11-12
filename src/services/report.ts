import reportAPI, { ReportFilterAPIParams, ReportStatus } from "@/api/report";
import PaginationInfo from "@/core/types/pagination-info";
import ReportItem from "./models/report-item";

interface ReportFilterParams extends Omit<ReportFilterAPIParams, 'pageSize' | 'pageNumber'> {
    pageSize?: number;
    pageNumber?: number;
}

export const findReportByFilter = async ({
    pageSize = 10,
    pageNumber = 1,
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
}: ReportFilterParams): Promise<{
    success: boolean;
    message: string;
    data?: {
        paginationInfo: PaginationInfo;
        reports: ReportItem[];
    };
}> => {
    const result = await reportAPI.findReportByFilter({
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

    if (result.success) {
        return {
            success: result.success,
            message: result.message,
            data: {
                paginationInfo: {
                    pageSize: 10,
                    pageNumber: result.data.pageNumber,
                    total: result.data.total,
                    start: result.data.start,
                    end: result.data.end,
                },
                reports: result.data.reports.map((item: any): ReportItem => {
                    const [day, time] = item.updatedAt.split(" ");
                    return {
                        reportId: item.reportId,
                        reportConfigId: item.reportConfigId,
                        deptId: item.deptId,
                        status: item.status,
                        deptName: item.deptName,
                        level: item.level,
                        startDate: item.startDate,
                        finishDate: item.finishDate,
                        reportPeriod: item.reportPeriod,
                        year: item.year,
                        updatedAt: {
                            day: day,
                            time: time
                        },
                        userUpdateName: item.userUpdateName
                    }
                })
            }
        }
    } else {
        return {
            success: false,
            message: result.message
        }
    }
};

export const updateReportStatus = async ({ reportId, status }: { reportId: string, status: ReportStatus }): Promise<{
    success: boolean;
    message: string;
}> => {
    const result = await reportAPI.updateStatus({ reportId, status });
    return {
        success: result.success,
        message: result.message
    };
};


export const getReportStatusByReportId = async (reportId: string): Promise<{
    success: boolean;
    message: string;
    status?: ReportStatus;
}> => {
    const result = await reportAPI.getReportStatusByReportId(reportId);
    return {
        success: result.success,
        message: result.message,
        status: result.data
    }
};