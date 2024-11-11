/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEditPreviewReportDetailContext } from "@/contexts/edit-preview-report-detail-context";
import { useManagement } from "@/contexts/management-context";
import { useRouter } from "next/navigation";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { getReportDetailPreviewPDF } from "@/services/report-detail";
import { useEffect, useState } from 'react';
import PdfViewer from './components/pdf-preview'; // Your PdfViewer component
import { Typography } from "@mui/material";

export default function ReportDetailPreview() {
    const { setHeaderTitle, setHeaderButtons } = useManagement();
    const router = useRouter();
    const { goBack, reportId, reportDetail } = useEditPreviewReportDetailContext();
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null); // Store PDF data as ArrayBuffer

    useEffect(() => {
        const fetchPdfData = async () => {
            if (reportId && reportDetail) {
                const response = await getReportDetailPreviewPDF({
                    reportId: reportId,
                    uiModel: reportDetail
                });
                if (response.success && response.fileData) {
                    setPdfData(new Uint8Array(response.fileData)); // Store the binary data
                }
            }
        };
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
                onClick: () => { /* Add download logic here */ },
                label: 'Tải xuống'
            },
            {
                type: 'save',
                onClick: () => { /* Add save logic here */ },
                label: 'Lưu'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <>
            {pdfData ? (
                <PdfViewer fileData={pdfData} />
            ) : (
                <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
            )}
        </>
    );
}
