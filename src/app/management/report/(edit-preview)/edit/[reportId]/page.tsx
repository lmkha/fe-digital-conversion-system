/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";
import Section9 from "./sections/section9";
import Section10 from "./sections/section10";
import Section11 from "./sections/section11";
import Section12 from "./sections/section12";
import { ReportPageData } from "./types";
import { useEditPreviewReportDetailContext } from "@/contexts/edit-preview-report-detail-context";
import { useParams } from "next/navigation";
import { findReportDetailById, getReportDetailByHistoryId } from "@/services/report-detail";
import { useAppContext } from "@/contexts/app-context";
import { Box, Typography } from "@mui/material";
import HistoryButton from "./components/history-button";
import HistoryModal from "./components/histoty-modal";

export default function ReportDetail() {
    const { setToastInfo } = useAppContext();
    const { reportId } = useParams<{ reportId: string }>();
    const router = useRouter();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
    const { goNext, setReportId, reportDetail, setReportDetail } = useEditPreviewReportDetailContext();
    const [pageData, setPageData] = useState<ReportPageData>();
    const [openHistoryModal, setOpenHistoryModal] = useState(false);
    const [historyPageData, setHistoryPageData] = useState<ReportPageData>();
    const [dataRender, setDataRender] = useState<ReportPageData>();

    // Clear footer in this page
    useEffect(() => {
        setFooterInfo({})
    }, []);

    // Fetch report detail by reportId
    useEffect(() => {
        if (reportId) {
            if (reportDetail) {
                setPageData(reportDetail)
            }
            else {
                setReportId && setReportId(reportId);
                findReportDetailById(reportId).then((response) => {
                    if (response.success) {
                        setPageData(response.reportDetail);
                    } else {
                        setToastInfo && setToastInfo({
                            show: true,
                            message: response.message || 'Có lỗi xảy ra',
                            severity: 'error'
                        });
                    }
                });
            }
        }
    }, [reportId]);

    // Set header title and buttons
    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'cancel',
                onClick: () => {
                    router.back();
                },
                label: 'Hủy'
            },
            {
                type: 'next',
                onClick: () => {
                    router.push('/management/report/preview');
                    goNext();
                },
                label: 'Bước tiếp theo'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    useEffect(() => {
        if (pageData) {
            setReportDetail && setReportDetail(pageData);
            setDataRender(pageData);
        }
    }, [pageData]);

    useEffect(() => {
        if (historyPageData) {
            setDataRender(historyPageData);
        }
    }, [historyPageData]);

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
            }}>
                <HistoryButton label="Lịch sử" onClick={() => { setOpenHistoryModal(true) }} />
            </Box>
            <HistoryModal
                reportId={reportId}
                open={openHistoryModal}
                onClose={() => setOpenHistoryModal(false)}
                onViewReportHistory={(reportId) => {
                    getReportDetailByHistoryId(reportId).then((response) => {
                        if (response.success) {
                            setHistoryPageData(response.reportDetail);
                        } else {
                            setToastInfo && setToastInfo({
                                show: true,
                                message: response.message || 'Có lỗi xảy ra khi lấy dữ liệu lịch sử',
                                severity: 'error'
                            });
                        }
                    });
                }}
            />

            {dataRender ? (
                <>
                    <Section1 inputData={dataRender?.section1Data} onChange={(data) => setDataRender({ ...dataRender, section1Data: data })} />
                    <Section2 inputData={dataRender?.section2Data} onChange={(data) => setDataRender({ ...dataRender, section2Data: data })} />
                    <Section3 inputData={dataRender?.section3Data} onChange={(data) => setDataRender({ ...dataRender, section3Data: data })} />
                    <Section4 inputData={dataRender?.section4Data} onChange={(data) => setDataRender({ ...dataRender, section4Data: data })} />
                    <Section5 inputData={dataRender?.section5Data} onChange={(data) => setDataRender({ ...dataRender, section5Data: data })} />
                    <Section6 inputData={dataRender?.section6Data} onChange={(data) => setDataRender({ ...dataRender, section6Data: data })} />
                    <Section7 inputData={dataRender?.section7Data} onChange={(data) => setDataRender({ ...dataRender, section7Data: data })} />
                    <Section8 inputData={dataRender?.section8Data} onChange={(data) => setDataRender({ ...dataRender, section8Data: data })} />
                    <Section9 inputData={dataRender?.section9Data} onChange={(data) => setDataRender({ ...dataRender, section9Data: data })} />
                    <Section10 inputData={dataRender?.section10Data} onChange={(data) => setDataRender({ ...dataRender, section10Data: data })} />
                    <Section11 inputData={dataRender?.section11Data} onChange={(data) => setDataRender({ ...dataRender, section11Data: data })} />
                    <Section12 inputData={dataRender?.section12Data} onChange={(data) => setDataRender({ ...dataRender, section12Data: data })} />
                </>
            ) : (
                <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
            )}
        </>
    );
};
