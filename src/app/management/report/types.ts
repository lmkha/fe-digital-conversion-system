import { ReportStatus } from "@/api/report";
import { UpdatedAtType } from "@/services/models/report-item";

export interface FilterData {
    status?: ReportStatus;
    departmentName?: string;
    level?: 1 | 2 | 3 | 4;
    startDate?: string;
    finishDate?: string;
    reportPeriod?: string;
    updatedAt?: UpdatedAtType;
    userUpdateName?: string;
    year?: number;
}
