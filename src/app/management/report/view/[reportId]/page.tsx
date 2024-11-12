/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useManagement } from "@/contexts/management-context";
import { useRouter } from "next/navigation";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { downloadReportDetailAsWord, findReportDetailById, getReportDetailPreviewPDF } from "@/services/report-detail";
import { useEffect, useState } from 'react';
import { useAppContext } from "@/contexts/app-context";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import PdfViewer from "../../(edit-preview)/preview/components/pdf-preview";
import { useParams } from "next/navigation";
import { useUserInfo } from "@/contexts/user-info-context";
import { getReportStatusByReportId, updateReportStatus } from "@/services/report";
import { ReportStatus } from "@/api/report";
import ConfirmDialog from "./modals/temp";

export default function ReportDetailPreview() {
    const { userInfo } = useUserInfo();
    const { reportId } = useParams<{ reportId: string }>();
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
    const router = useRouter();
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
    const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
    const [reviewSelectValue, setReviewSelectValue] = useState<string>('');
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
                    pr: 1
                }}
            >
                {userInfo?.dept.level == 1 && status == 'Chờ duyệt' && (
                    <BasicSelect onChange={(newValue) => {
                        setReviewSelectValue(newValue);
                        if (newValue) {
                            setOpenChangeStatusModal(true);
                        }
                    }} />
                )}
                {pdfData ? (
                    <PdfViewer fileData={pdfData} />
                ) : (
                    <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
                )}
            </Stack>

            <ConfirmDialog
                open={openChangeStatusModal}
                onClose={() => setOpenChangeStatusModal(false)}
                onConfirm={(value) => {
                    if (value == true) {
                        updateReportStatus({ reportId: reportId, status: reviewSelectValue as ReportStatus }).then(result => {
                            setToastInfo && setToastInfo({
                                show: true,
                                message: result.success ? 'Cập nhật trạng thái thành công' : result.message || 'Có lỗi xảy ra',
                                severity: result.success ? 'success' : 'error'
                            });
                        });
                    } else {
                        setReviewSelectValue('');
                    }
                    setOpenChangeStatusModal(false);
                }}
            />
        </>
    );
}

const BasicSelect: React.FC<{ onChange: (newValue: string) => void }> = ({ onChange }) => {
    const [status, setStatus] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
        onChange(event.target.value as string);
    };

    return (
        <Box sx={{
            paddingTop: '10px',
        }}>
            <FormControl sx={{
                width: '100px',
            }} size='small'>
                <InputLabel id="demo-simple-select-label"><Typography>Duyệt</Typography></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={'Đã duyệt'}>Duyệt</MenuItem>
                    <MenuItem value={'Đã từ chối'}>Từ chối</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
