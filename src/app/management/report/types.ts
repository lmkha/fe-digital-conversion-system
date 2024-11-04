import { ReportStatus } from "@/api/report";
import { Level } from "@/core/types/level";

export interface FilterData {
    status?: ReportStatus;
    departmentName?: string;
    level?: Level;
    startDate?: string;
    finishDate?: string;
    reportPeriod?: string;
    updatedAt?: string;
    userUpdateName?: string;
    year?: number;
}
