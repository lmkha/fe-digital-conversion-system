import reportConfigAPI from "@/api/report-config";
import ReportConfigItem from "./models/report-config-item";
import PaginationInfo from "@/core/types/pagination-info";

export const createReportConfiguration = async ({ deptId, reportName, year, reportPeriod, startDate, finishDate, status, editAtOtherDept }: {
    deptId: string;
    year: number;
    reportPeriod: string;
    startDate: string;
    finishDate: string;
    reportName: string;
    status?: number;
    editAtOtherDept?: number;
}) => {
    const result = await reportConfigAPI.createReportConfiguration({
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
        success: result.success,
        message: result.message,
    }
};

export const updateReportConfiguration = async ({ deptId, reportId, startDate, finishDate, status, editAtOtherDept }: {
    deptId: string;
    reportId: string;
    startDate: string;
    finishDate: string;
    status?: number;
    editAtOtherDept?: number;
}) => {
    const result = await reportConfigAPI.updateReportConfiguration({
        deptId: deptId,
        reportId: reportId,
        startDate: startDate,
        finishDate: finishDate,
        status: status,
        editAtOtherDept: editAtOtherDept
    });
    return {
        success: result.success,
        message: result.message,
    }
};

export const findReportConfigurationByFilter = async ({ pageSize = 10, pageNumber = 1, deptId, reportName, reportPeriod, year, startDate, finishDate, status }: {
    deptId: string;
    pageNumber?: number;
    pageSize?: number;
    reportName?: string;
    reportPeriod?: string;
    year?: number;
    startDate?: string;
    finishDate?: string;
    status?: number;
}): Promise<{
    success: boolean;
    message: string;
    data?: {
        paginationInfo: PaginationInfo;
        reportConfigs: ReportConfigItem[];
    };
}> => {
    const result = await reportConfigAPI.findReportConfigurationByFilter({
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
    if (result.success) {
        return {
            success: true,
            message: result.message,
            data: {
                paginationInfo: {
                    pageSize: 10,
                    pageNumber: result.data.pageNumber,
                    total: result.data.total,
                    start: result.data.start,
                    end: result.data.end,
                },
                reportConfigs: result.data.reportConfigs.map((item: any): ReportConfigItem => ({
                    reportId: item.reportId,
                    reportName: item.reportName,
                    year: item.year,
                    reportPeriod: item.reportPeriod,
                    startDate: item.startDate,
                    finishDate: item.finishDate,
                    status: item.status,
                }))
            }
        }
    } else {
        return {
            success: false,
            message: result.message,
        }
    }
}

export const findReportConfigurationById = async ({ reportId }: { reportId: string }) => {
    const result = await reportConfigAPI.findReportConfigurationById({ reportId: reportId });
    if (result.success) {
        return {
            success: true,
            message: result.message,
            reportConfig: {
                reportId: result.data.reportId,
                reportName: result.data.reportName,
                year: result.data.year,
                reportPeriod: result.data.reportPeriod,
                startDate: result.data.startDate,
                finishDate: result.data.finishDate,
                status: result.data.status,
            } as ReportConfigItem
        }
    } else {
        return {
            success: false,
            message: result.message,
        }
    }
}

// Status parameter is the current status
export const changeReportConfigurationStatus = async ({ reportId, status, deptId }: { reportId: string, status: boolean, deptId: string }) => {
    const result = await reportConfigAPI.updateReportConfigurationStatus({ reportId: reportId, status: status ? 0 : 1, deptId: deptId });
    return {
        success: result.success,
        message: result.message,
    }
}

export const getListYears = async (): Promise<{
    success: boolean;
    years?: number[];
    message?: string;
}> => {
    const result = await reportConfigAPI.getListYears().then((response) => {
        return {
            success: response.success,
            years: response.data,
            message: response.message
        }
    });
    return result;
}