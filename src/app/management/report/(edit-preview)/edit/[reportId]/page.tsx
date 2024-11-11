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
import { findReportDetailById } from "@/services/report-detail";
import { useAppContext } from "@/contexts/app-context";
import { Typography } from "@mui/material";

export default function ReportDetail() {
    const { setToastInfo } = useAppContext();
    const { reportId } = useParams<{ reportId: string }>();
    const router = useRouter();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
    const { goNext, setReportId, reportDetail, setReportDetail } = useEditPreviewReportDetailContext();
    const [pageData, setPageData] = useState<ReportPageData>();

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
        }
    }, [pageData]);

    return (
        <>
            {pageData ? (
                <>
                    <Section1 inputData={pageData?.section1Data} onChange={(data) => setPageData({ ...pageData, section1Data: data })} />
                    <Section2 inputData={pageData?.section2Data} onChange={(data) => setPageData({ ...pageData, section2Data: data })} />
                    <Section3 inputData={pageData?.section3Data} onChange={(data) => setPageData({ ...pageData, section3Data: data })} />
                    <Section4 inputData={pageData?.section4Data} onChange={(data) => setPageData({ ...pageData, section4Data: data })} />
                    <Section5 inputData={pageData?.section5Data} onChange={(data) => setPageData({ ...pageData, section5Data: data })} />
                    <Section6 inputData={pageData?.section6Data} onChange={(data) => setPageData({ ...pageData, section6Data: data })} />
                    <Section7 inputData={pageData?.section7Data} onChange={(data) => setPageData({ ...pageData, section7Data: data })} />
                    <Section8 inputData={pageData?.section8Data} onChange={(data) => setPageData({ ...pageData, section8Data: data })} />
                    <Section9 inputData={pageData?.section9Data} onChange={(data) => setPageData({ ...pageData, section9Data: data })} />
                    <Section10 inputData={pageData?.section10Data} onChange={(data) => setPageData({ ...pageData, section10Data: data })} />
                    <Section11 inputData={pageData?.section11Data} onChange={(data) => setPageData({ ...pageData, section11Data: data })} />
                    <Section12 inputData={pageData?.section12Data} onChange={(data) => setPageData({ ...pageData, section12Data: data })} />
                </>
            ) : (
                <Typography sx={{ textAlign: 'center' }} variant="body1">Đang tải dữ liệu...</Typography>
            )}
        </>
    );
};
