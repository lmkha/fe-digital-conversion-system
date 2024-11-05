/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Divider, Grid2, Stack, TextField, Typography } from "@mui/material";
import HorizontalLinearStepper from "./components/stepper";
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

export default function ReportDetail() {
    const router = useRouter();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    // ------------------------
    const [activeStep, setActiveStep] = useState(1);
    const handleNext = () => {
        if (activeStep < 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 1) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
    // ------------------------

    useEffect(() => {
        setFooterInfo({});
    }, []);

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'cancel',
                onClick: () => {
                    handleBack();
                },
                label: 'Hủy'
            },
            {
                type: 'next',
                onClick: () => {
                    handleNext();
                },
                label: 'Bước tiếp theo'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle, activeStep]);

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
                    <HorizontalLinearStepper activeStep={activeStep} />
                </Box>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
                <Section9 />
                <Section10 />
                <Section11 />
                <Section12 />
            </Stack>
        </>
    );
};
