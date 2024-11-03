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
import { findReportConfigurationByFilter } from "@/services/report-config";

export default function ReportConfigurationPage() {
    const { userInfo } = useUserInfo();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
    const [editedItemId, setEditedItemId] = useState<string | null>(null);
    const [filterData, setFilterData] = useState<FilterData>();
    const [reportConfigs, setReportConfigs] = useState<ReportConfigItem[]>();
    const [refresh, setRefresh] = useState<boolean>(false);

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
            }).then((result) => {
                if (result.success) {
                    setReportConfigs(result.data?.reportConfigs);
                }
                console.log('paginationInfo', result.data?.paginationInfo);
                setFooterInfo({
                    ...footerInfo,
                    paginationInfo: result.data?.paginationInfo
                });
            });
        }
        if (refresh) {
            setRefresh(false);
        }
    }, [userInfo.dept.deptId, refresh]);

    return (
        <>
            <Filter
                onSubmitted={(filterData) => setFilterData(filterData)}
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
                    />
                ))
            )}

            <AddEditReportModal
                open={showAddEditModal}
                deptId={userInfo.dept.deptId || ''}
                reportId={editedItemId}
                onClose={() => {
                    setShowAddEditModal(false);
                    setRefresh(true);
                }}
            />
        </>
    );
}
