/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from "react";
import DepartmentFilter, { DeptFilterData } from "../components/department-filter";
import { FilterData } from "./types";
import Filter from "./components/filter";
import ReportComponent from "./components/report-item";
import ReportItem from "@/services/models/report-item";
import { findReportByFilter } from "@/services/report";
import { Box, Typography } from "@mui/material";
import { useManagement } from "@/contexts/management-context";

export default function ReportPage() {
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    const [deptFilterData, setDeptFilterData] = useState<DeptFilterData>();
    const [filterData, setFilterData] = useState<FilterData>({
        year: new Date().getFullYear(),
    });
    const [reports, setReports] = useState<ReportItem[]>();

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        const currentYear = new Date().getFullYear();
        const options = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
        setHeaderButtons([
            {
                type: 'select',
                label: 'Năm',
                selectValue: filterData?.year,
                options: options,
                onSelectChange: (newValue) => {
                    setFilterData({ ...filterData, year: newValue });
                },
                onClick: () => { }
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    useEffect(() => {
        if (deptFilterData?.deptId) {
            findReportByFilter({
                deptId: deptFilterData?.deptId,
                reportPeriod: filterData?.reportPeriod,
                status: filterData?.status,
                deptName: filterData?.departmentName,
                level: filterData?.level,
                startDate: filterData?.startDate,
                finishDate: filterData?.finishDate,
                userUpdatedName: filterData?.userUpdateName,
                // year: filterData?.year,
                // updatedAt: filterData?.updatedAt,

            }).then((result) => {
                result.success && setReports(result.data?.reports);
            });
        }
    }, [deptFilterData?.deptId, filterData]);

    useEffect(() => {
    }, [footerInfo?.paginationInfo?.pageNumber]);

    useEffect(() => {
    }, [footerInfo?.paginationInfo?.pageSize]);

    return (
        <>
            <DepartmentFilter
                refreshData={false}
                onRefreshDataFinished={() => { }}
                onSubmitted={(selectorData) => setDeptFilterData(selectorData)}
            />

            <Filter
                onSubmitted={(filterData) => setFilterData(filterData)}
            />

            {reports?.length === 0 ? (
                <Typography variant="body1">Không có dữ liệu</Typography>
            ) : (
                <Box
                    sx={{
                        maxHeight: 430,
                        overflowY: 'auto',
                    }}
                >
                    {reports?.map((report) => (
                        <ReportComponent
                            key={report.reportId}
                            reportId={report.reportId}
                            status={report.status}
                            departmentName={report.deptName}
                            level={report.level}
                            startDate={report.startDate}
                            finishDate={report.finishDate}
                            reportingPeriod={report.reportPeriod}
                            updatedAt={report.updatedAt}
                            userUpdateName={report.userUpdateName}
                            onView={(reportId) => { }}
                            onEdit={(reportId) => { }}
                        />
                    ))}
                </Box>
            )}
        </>
    );
}
