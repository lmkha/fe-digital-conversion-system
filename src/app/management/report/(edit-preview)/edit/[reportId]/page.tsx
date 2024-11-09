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

export default function ReportDetail() {
    const router = useRouter();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
    const { goNext } = useEditPreviewReportDetailContext();
    const [pageData, setPageData] = useState<ReportPageData>();

    useEffect(() => {
        setFooterInfo({})
    }, []);

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'cancel',
                onClick: () => {
                },
                label: 'Hủy'
            },
            {
                type: 'next',
                onClick: () => {
                    goNext();
                    router.push('/management/report/preview');
                },
                label: 'Bước tiếp theo'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    useEffect(() => {
        if (pageData) {
            console.log(pageData);
        }
    }, [pageData]);

    return (
        <>
            <Section1 onChange={(data) => setPageData({ ...pageData, section1Data: data })} />
            <Section2 onChange={(data) => setPageData({ ...pageData, section2Data: data })} />
            <Section3 onChange={(data) => setPageData({ ...pageData, section3Data: data })} />
            <Section4 onChange={(data) => setPageData({ ...pageData, section4Data: data })} />
            <Section5 onChange={(data) => setPageData({ ...pageData, section5Data: data })} />
            <Section6 onChange={(data) => setPageData({ ...pageData, section6Data: data })} />
            <Section7 onChange={(data) => setPageData({ ...pageData, section7Data: data })} />
            <Section8 onChange={(data) => setPageData({ ...pageData, section8Data: data })} />
            <Section9 onChange={(data) => setPageData({ ...pageData, section9Data: data })} />
            <Section10 onChange={(data) => setPageData({ ...pageData, section10Data: data })} />
            <Section11 onChange={(data) => setPageData({ ...pageData, section11Data: data })} />
            <Section12 onChange={(data) => setPageData({ ...pageData, section12Data: data })} />
        </>
    );
};
