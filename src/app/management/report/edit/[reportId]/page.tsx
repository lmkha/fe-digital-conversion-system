/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Stack } from "@mui/material";
import Stepper from "./components/stepper";
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Section1, { Section1Data } from "./sections/section1";
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
import { useStepperState } from "@/hooks/use-stepper-state";

export default function ReportDetail() {
    // const router = useRouter();
    const stepperState = useStepperState();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
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
                    stepperState.goBack();
                },
                label: 'Hủy'
            },
            {
                type: 'next',
                onClick: () => {
                    stepperState.goNext();
                },
                label: 'Bước tiếp theo'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle, stepperState.activeStep]);

    useEffect(() => {
        if (pageData) {
            console.log(pageData);
        }
    }, [pageData]);

    return (
        <>
            <Stack direction={'column'}
                sx={{
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    pr: 1
                }}
            >
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <Stepper state={stepperState} />
                </Box>
                <Section1 data={pageData?.section1Data} onChange={(data) => setPageData({ ...pageData, section1Data: data })} />
                <Section2 data={pageData?.section2Data} onChange={(data) => setPageData({ ...pageData, section2Data: data })} />
                <Section3 data={pageData?.section3Data} onChange={(data) => setPageData({ ...pageData, section3Data: data })} />
                <Section4 data={pageData?.section4Data} onChange={(data) => setPageData({ ...pageData, section4Data: data })} />
                <Section5 data={pageData?.section5Data} onChange={(data) => setPageData({ ...pageData, section5Data: data })} />
                <Section6 data={pageData?.section6Data} onChange={(data) => setPageData({ ...pageData, section6Data: data })} />
                <Section7 data={pageData?.section7Data} onChange={(data) => setPageData({ ...pageData, section7Data: data })} />
                <Section8 data={pageData?.section8Data} onChange={(data) => setPageData({ ...pageData, section8Data: data })} />
                <Section9 data={pageData?.section9Data} onChange={(data) => setPageData({ ...pageData, section9Data: data })} />
                <Section10 data={pageData?.section10Data} onChange={(data) => setPageData({ ...pageData, section10Data: data })} />
                <Section11 data={pageData?.section11Data} onChange={(data) => setPageData({ ...pageData, section11Data: data })} />
                <Section12 data={pageData?.section12Data} onChange={(data) => setPageData({ ...pageData, section12Data: data })} />
            </Stack>
        </>
    );
};
