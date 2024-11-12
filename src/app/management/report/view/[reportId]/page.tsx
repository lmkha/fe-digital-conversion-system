/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useManagement } from "@/contexts/management-context";
import { useRouter } from "next/navigation";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { downloadReportDetailAsWord, findReportDetailById, getReportDetailPreviewPDF } from "@/services/report-detail";
import { useEffect, useState } from 'react';
import { useAppContext } from "@/contexts/app-context";
import { Stack, Typography } from "@mui/material";
import PdfViewer from "../../(edit-preview)/preview/components/pdf-preview";
import { useParams } from "next/navigation";

export default function ReportDetailPreview() {
    const { reportId } = useParams<{ reportId: string }>();
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
    const router = useRouter();
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

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
    }, [reportId]);

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'back',
                onClick: () => {
                    router.back();
                },
                label: 'Quay lại'
            },
            {
                type: 'download',
                onClick: () => { handleDownload() },
                label: 'Tải xuống'
            },
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <>
            <Stack
                direction={'column'}
                sx={{
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    pr: 1
                }}
            >
                {pdfData ? (
                    <PdfViewer fileData={pdfData} />
                ) : (
                    <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
                )}
            </Stack>

        </>
    );
}
