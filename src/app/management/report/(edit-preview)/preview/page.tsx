/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEditPreviewReportDetailContext } from "@/contexts/edit-preview-report-detail-context";
import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import '@react-pdf-viewer/core/lib/styles/index.css';
import PdfViewer from "./components/pdf-preview";

export default function ReportDetailPreview() {
    const { setHeaderTitle, setHeaderButtons } = useManagement();
    const router = useRouter();
    const { goBack } = useEditPreviewReportDetailContext();
    const pdfUrl = "/docs/atvsld-report-template.pdf";

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
                onClick: () => { },
                label: 'Tải xuống'
            },
            {
                type: 'save',
                onClick: () => { },
                label: 'Lưu'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <PdfViewer url={pdfUrl} />
    );
}
