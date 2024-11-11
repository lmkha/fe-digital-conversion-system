'use client';

import { ReportPageData } from '@/app/management/report/(edit-preview)/edit/[reportId]/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditPreviewReportDetailContextType {
    activeStep: number;
    goNext: () => void;
    goBack: () => void;
    reportId?: string;
    setReportId?: (reportId: string) => void;
    reportDetail?: ReportPageData;
    setReportDetail?: (reportDetail: ReportPageData) => void;
}

const EditPreviewReportDetailContext = createContext<EditPreviewReportDetailContextType | undefined>(undefined);

export const EditPreviewReportDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [reportId, setReportId] = useState<string | undefined>(undefined);
    const [reportDetail, setReportDetail] = useState<ReportPageData | undefined>(undefined);

    const goNext = () => {
        if (activeStep < 2) {
            setActiveStep(prevStep => prevStep + 1);
        }
    }

    const goBack = () => {
        if (activeStep > 1) {
            setActiveStep(prevStep => prevStep - 1);
        }
    }

    return (
        <EditPreviewReportDetailContext.Provider value={{
            activeStep,
            goNext,
            goBack,
            reportId,
            setReportId,
            reportDetail,
            setReportDetail
        }}>
            {children}
        </EditPreviewReportDetailContext.Provider>
    );
}

export const useEditPreviewReportDetailContext = () => {
    const context = useContext(EditPreviewReportDetailContext);
    if (context === undefined) {
        throw new Error('useEditPreviewReportDetailContext must be used within a EditPreviewReportDetailProvider');
    }
    return context;
}
