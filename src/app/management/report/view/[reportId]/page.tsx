/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useManagement } from "@/contexts/management-context";
import { useRouter } from "next/navigation";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { downloadReportDetailAsWord, findReportDetailById, getReportDetailPreviewPDF } from "@/services/report-detail";
import { useEffect, useState } from 'react';
import { useAppContext } from "@/contexts/app-context";
import { Button, Stack, Typography } from "@mui/material";
import PdfViewer from "../../(edit-preview)/preview/components/pdf-preview";
import { useParams } from "next/navigation";
import { useUserInfo } from "@/contexts/user-info-context";
import { getReportStatusByReportId, updateReportStatus } from "@/services/report";
import { ReportStatus } from "@/api/report";
import ConfirmDialog from "./modals/temp";
import { usePermission } from '@/contexts/permission-context';

export default function ReportDetailPreview() {
    const { permissionList } = usePermission();
    const { userInfo } = useUserInfo();
    const { reportId } = useParams<{ reportId: string }>();
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
    const router = useRouter();
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
    const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
    const [approvalValue, setApprovalValue] = useState<'Đã duyệt' | 'Đã từ chối'>();
    const [status, setStatus] = useState<string>();

    const handleDownload = () => {
        if (reportId) {
            downloadReportDetailAsWord({ reportId: reportId }).then(result => {
                setToastInfo && setToastInfo({
                    show: true,
                    message: result.success ? 'Tải xuống thành công' : result.message || 'Có lỗi xảy ra',
                    severity: result.success ? 'success' : 'error'
                });
            });
        }
    };

    useEffect(() => {
        setFooterInfo({})
    }, []);

    useEffect(() => {
        reportId && findReportDetailById(reportId).then(result1 => {
            if (result1.success) {
                result1.reportDetail && getReportDetailPreviewPDF({ reportId: reportId, uiModel: result1.reportDetail }).then(result2 => {
                    if (result2.success && result2.fileData) {
                        setPdfData(new Uint8Array(result2.fileData));
                    }
                })
            }
        });

        reportId && getReportStatusByReportId(reportId).then(result => {
            if (result.success) {
                setStatus(result.status);
            }
        });
    }, [reportId]);

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'back',
                onClick: () => {
                    router.back();
                },
                label: 'Quay lại',
            },
            {
                type: 'download',
                onClick: () => { handleDownload() },
                label: 'Tải xuống',
            },
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <>
            <Stack
                spacing={2}
                direction={'column'}
                sx={{
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    pt: 4,
                    pr: 1
                }}
            >
                {userInfo?.dept.level == 1 &&
                    (permissionList?.reportConfig?.create || permissionList?.reportConfig?.update) &&
                    status !== 'Nhập liệu' && (
                        <Stack direction={'row'}
                            sx={{
                                justifyContent: 'start',
                                gap: '10px',
                                position: 'fixed',
                                top: '65px',
                                left: '250px',
                                zIndex: 999,
                            }}>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                    setApprovalValue('Đã duyệt');
                                    setOpenChangeStatusModal(true);
                                }}><Typography fontWeight={'bold'}>Duyệt</Typography></Button>

                            <Button
                                color="error"
                                variant="contained"
                                onClick={() => {
                                    setApprovalValue('Đã từ chối');
                                    setOpenChangeStatusModal(true);
                                }}><Typography fontWeight={'bold'}>Từ chối</Typography></Button>
                        </Stack>
                    )}
                {pdfData ? (
                    <PdfViewer fileData={pdfData} />
                ) : (
                    <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
                )}
            </Stack>

            <ConfirmDialog
                title={`Bạn có chắc chắn muốn ${approvalValue == 'Đã duyệt' ? 'duyệt' : 'từ chối'} báo cáo này không?`}
                open={openChangeStatusModal}
                onClose={() => setOpenChangeStatusModal(false)}
                onConfirm={(value) => {
                    if (value == true) {
                        updateReportStatus({ reportId: reportId, status: approvalValue as ReportStatus }).then(result => {
                            setToastInfo && setToastInfo({
                                show: true,
                                message: result.success ? 'Cập nhật trạng thái thành công' : result.message || 'Có lỗi xảy ra',
                                severity: result.success ? 'success' : 'error'
                            });
                        });
                    }
                    setOpenChangeStatusModal(false);
                }}
            />
        </>
    );
}

