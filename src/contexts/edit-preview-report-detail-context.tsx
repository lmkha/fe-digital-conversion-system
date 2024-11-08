'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditPreviewReportDetailContextType {
    activeStep: number;
    goNext: () => void;
    goBack: () => void;
}

const EditPreviewReportDetailContext = createContext<EditPreviewReportDetailContextType | undefined>(undefined);

export const EditPreviewReportDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeStep, setActiveStep] = useState(1);

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
        <EditPreviewReportDetailContext.Provider value={{ activeStep, goNext, goBack }}>
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
