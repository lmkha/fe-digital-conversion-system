/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import Stepper from "../components/stepper";
import { EditPreviewReportDetailProvider, useEditPreviewReportDetailContext } from "@/contexts/edit-preview-report-detail-context";

type LayoutProps = {
    children: ReactNode;
};

function LayoutContent({ children }: LayoutProps) {
    const { activeStep } = useEditPreviewReportDetailContext();

    return (
        <Stack
            direction={'column'}
            sx={{
                maxHeight: '85vh',
                overflowY: 'auto',
                pr: 1
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <Stepper activeStep={activeStep} />
            </Box>
            {children}
        </Stack>
    );
}

export default function Layout({ children }: LayoutProps) {
    return (
        <EditPreviewReportDetailProvider>
            <LayoutContent>{children}</LayoutContent>
        </EditPreviewReportDetailProvider>
    );
};
