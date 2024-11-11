/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";

interface PdfViewerProps {
    fileData: Uint8Array;
}

export default function PdfViewer({ fileData }: PdfViewerProps) {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        // Create a URL for the Uint8Array data
        const url = window.URL.createObjectURL(new Blob([fileData], { type: 'application/pdf' }));
        setFileUrl(url);

        // Cleanup the URL when the component is unmounted
        return () => {
            if (fileUrl) {
                window.URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileData]);

    return (
        <>
            {fileUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                    <Viewer fileUrl={fileUrl} />
                </Worker>
            ) : (
                <Typography variant="body1">Không thể hiển thị tệp PDF</Typography>
            )}
        </>
    );
}
