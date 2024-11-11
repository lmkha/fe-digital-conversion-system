/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEditPreviewReportDetailContext } from "@/contexts/edit-preview-report-detail-context";
import { useManagement } from "@/contexts/management-context";
import { useRouter } from "next/navigation";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { downloadReportDetailAsWord, getReportDetailPreviewPDF, updateReportDetail } from "@/services/report-detail";
import { useEffect, useState } from 'react';
import PdfViewer from './components/pdf-preview';
import { Box, Typography } from "@mui/material";
import { useAppContext } from "@/contexts/app-context";
import HistoryButton from "./components/history-button";
import HistoryModal from "./components/histoty-modal";

export default function ReportDetailPreview() {
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons } = useManagement();
    const router = useRouter();
    const { goBack, reportId, reportDetail } = useEditPreviewReportDetailContext();
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
    const [openHistoryModal, setOpenHistoryModal] = useState(false);

    const fetchPdfData = async () => {
        if (reportId && reportDetail) {
            const response = await getReportDetailPreviewPDF({ reportId: reportId, uiModel: reportDetail });
            if (response.success && response.fileData) {
                setPdfData(new Uint8Array(response.fileData));
            }
        }
    };

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

    const handleSave = () => {
        if (reportId && reportDetail) {
            updateReportDetail({ reportId: reportId, uiModel: reportDetail }).then(result => {
                setToastInfo && setToastInfo({
                    show: true,
                    message: result.message || 'Có lỗi xảy ra',
                    severity: result.success ? 'success' : 'error'
                });
                if (result.success) {
                    router.push('/management/report');
                }
            });
        }
    };

    useEffect(() => {
        fetchPdfData();
    }, [reportId, reportDetail]);

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'back',
                onClick: () => {
                    goBack();
                    router.back();
                },
                label: 'Quay lại'
            },
            {
                type: 'download',
                onClick: () => { handleDownload() },
                label: 'Tải xuống'
            },
            {
                type: 'save',
                onClick: () => { handleSave() },
                label: 'Lưu'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle, reportId, reportDetail]);

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
            }}>
                <HistoryButton label="Lịch sử" onClick={() => { setOpenHistoryModal(true) }} />
            </Box>
            {pdfData ? (
                <PdfViewer fileData={pdfData} />
            ) : (
                <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
            )}

            <HistoryModal open={openHistoryModal} onClose={() => setOpenHistoryModal(false)} />
        </>
    );
}
