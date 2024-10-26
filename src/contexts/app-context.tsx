'use client';

import { ToastInfo } from '@/core/types/toast-info';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
    toastInfo?: ToastInfo;
    setToastInfo?: (toastInfo: ToastInfo) => void;
}

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toastInfo, setToastInfo] = useState<ToastInfo>();

    return (
        <appContext.Provider value={{ toastInfo, setToastInfo }}>
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