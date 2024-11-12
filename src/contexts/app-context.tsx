'use client';

import { ToastInfo } from '@/core/types/toast-info';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
    toastInfo?: ToastInfo;
    setToastInfo?: (toastInfo: ToastInfo) => void;
    reportStatus?: string;
    setReportStatus: (status: string) => void;
}

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toastInfo, setToastInfo] = useState<ToastInfo>();
    const [reportStatus, setReportStatus] = useState<string | undefined>();

    return (
        <appContext.Provider value={{ toastInfo, setToastInfo, reportStatus, setReportStatus }}>
            {children}
        </appContext.Provider>
    );
}

export const useAppContext = () => {
    const context = useContext(appContext);
    if (context === undefined) {
        throw new Error('Error: useAppContext must be used within a AppContextProvider');
    }
    return context;
}