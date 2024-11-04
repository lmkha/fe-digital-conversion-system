/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import AddEditReportModal from "./modals/add-edit-modal";
import Filter from "./components/filter";
import { FilterData } from "./types";
import ReportConfigurationComponent from "./components/report-configuration-item";
import ReportConfigItem from "@/services/models/report-config-item";
import { Typography } from "@mui/material";
import { useUserInfo } from "@/contexts/user-info-context";
import { changeReportConfigurationStatus, findReportConfigurationByFilter } from "@/services/report-config";
import { useAppContext } from "@/contexts/app-context";

export default function ReportConfigurationPage() {
    const { setToastInfo } = useAppContext();
    const { userInfo } = useUserInfo();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
    const [editedItemId, setEditedItemId] = useState<string | null>(null);
    const [filterData, setFilterData] = useState<FilterData>();
    const [reportConfigs, setReportConfigs] = useState<ReportConfigItem[]>();
    const [refresh, setRefresh] = useState<boolean>(false);

    const handleChangeStatus = (reportId: string) => {
        const reportConfig = reportConfigs?.find((reportConfig) => reportConfig.reportId === reportId);
        reportConfig && changeReportConfigurationStatus({
            deptId: userInfo.dept.deptId || '',
            reportId: reportConfig?.reportId || '',
            status: reportConfig?.status || false
        }).then((result) => {
            setToastInfo && setToastInfo({
                show: true,
                message: result.message,
                severity: result.success ? 'success' : 'error'
            });
            if (result.success) {
                reportConfigs?.map((reportConfig) => {
                    if (reportConfig.reportId === reportId) {
                        reportConfig.status = !reportConfig.status;
                    }
                    return reportConfig;
                });
            }
        });
    };

    useEffect(() => {
        setHeaderTitle('Quản lý cấu hình báo cáo');
        setHeaderButtons([
            {
                type: 'add',
                label: 'Thêm báo cáo',
                onClick: () => {
                    setShowAddEditModal(true);
                    setEditedItemId(null);
                }
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    useEffect(() => {
        if (userInfo.dept.deptId) {
            findReportConfigurationByFilter({
                deptId: userInfo.dept.deptId,
                year: parseInt(filterData?.year || '0') || undefined,
                reportName: filterData?.reportName,
                reportPeriod: filterData?.reportPeriod,
                startDate: filterData?.startDate,
                finishDate: filterData?.finishDate,
                status: filterData?.status === '0' ? 0 : filterData?.status === '1' ? 1 : undefined,
            }).then((result) => {
                if (result.success) {
                    setReportConfigs(result.data?.reportConfigs);
                }
                setFooterInfo({
                    ...footerInfo,
                    paginationInfo: result.data?.paginationInfo
                });
            });
        }
        if (refresh) {
            setRefresh(false);
        }
    }, [userInfo.dept.deptId, refresh, filterData]);

    useEffect(() => {
        if (userInfo.dept.deptId) {
            findReportConfigurationByFilter({
                pageSize: footerInfo?.paginationInfo?.pageSize,
                deptId: userInfo.dept.deptId,
                year: parseInt(filterData?.year || '0') || undefined,
                reportName: filterData?.reportName,
                reportPeriod: filterData?.reportPeriod,
                startDate: filterData?.startDate,
                finishDate: filterData?.finishDate,
                status: filterData?.status === '0' ? 0 : filterData?.status === '1' ? 1 : undefined,
            }).then((result) => {
                if (result.success) {
                    setReportConfigs(result.data?.reportConfigs);
                }
                setFooterInfo({
                    ...footerInfo,
                    paginationInfo: {
                        ...footerInfo?.paginationInfo,
                        total: result.data?.paginationInfo?.total,
                        start: result.data?.paginationInfo?.start,
                        end: result.data?.paginationInfo?.end,
                        pageNumber: result.data?.paginationInfo?.pageNumber
                    }
                });
            });
        }
        if (refresh) {
            setRefresh(false);
        }
    }, [footerInfo?.paginationInfo?.pageSize]);

    useEffect(() => {
        if (userInfo.dept.deptId) {
            findReportConfigurationByFilter({
                pageNumber: footerInfo?.paginationInfo?.pageNumber,
                pageSize: footerInfo?.paginationInfo?.pageSize,
                deptId: userInfo.dept.deptId,
                year: parseInt(filterData?.year || '0') || undefined,
                reportName: filterData?.reportName,
                reportPeriod: filterData?.reportPeriod,
                startDate: filterData?.startDate,
                finishDate: filterData?.finishDate,
                status: filterData?.status === '0' ? 0 : filterData?.status === '1' ? 1 : undefined,
            }).then((result) => {
                if (result.success) {
                    setReportConfigs(result.data?.reportConfigs);
                }
                setFooterInfo({
                    ...footerInfo,
                    paginationInfo: {
                        ...footerInfo?.paginationInfo,
                        total: result.data?.paginationInfo?.total,
                        start: result.data?.paginationInfo?.start,
                        end: result.data?.paginationInfo?.end
                    }
                });
            });
        }
        if (refresh) {
            setRefresh(false);
        }
    }, [footerInfo?.paginationInfo?.pageNumber]);

    return (
        <>
            <Filter
                onSubmitted={(filterData) => {
                    setFilterData(filterData);
                }}
            />

            {reportConfigs?.length === 0 ? (
                <Typography variant="body1">Không có dữ liệu</Typography>
            ) : (
                reportConfigs?.map((reportConfig) => (
                    <ReportConfigurationComponent
                        key={reportConfig.reportId}
                        reportId={reportConfig.reportId}
                        year={reportConfig?.year?.toString()}
                        reportName={reportConfig.reportName}
                        reportPeriod={reportConfig.reportPeriod}
                        startDate={reportConfig.startDate}
                        finishDate={reportConfig.finishDate}
                        status={reportConfig.status}
                        onEdit={(reportId) => {
                            setEditedItemId(reportId);
                            setShowAddEditModal(true);
                        }}
                        onChangeStatus={(reportId) => handleChangeStatus(reportId)}
                    />
                ))
            )}

            <AddEditReportModal
                open={showAddEditModal}
                deptId={userInfo.dept.deptId || ''}
                reportId={editedItemId}
                onClose={() => {
                    setEditedItemId(null);
                    setShowAddEditModal(false);
                    setRefresh(true);
                }}
            />
        </>
    );
}
