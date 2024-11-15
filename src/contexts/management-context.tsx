'use client';

import { ActionButtonProps } from '@/app/management/components/button';
import { FooterProps } from '@/core/types/footer-info';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ManagementContextType {
    headerButtons: ActionButtonProps[];
    setHeaderButtons: (buttons: ActionButtonProps[]) => void;
    headerTitle: string;
    setHeaderTitle: (title: string) => void;
    footerInfo?: FooterProps;
    setFooterInfo: (footer: FooterProps) => void;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerButtons, setHeaderButtons] = useState<ActionButtonProps[]>([]);
    const [headerTitle, setHeaderTitle] = useState<string>('');
    const [footerInfo, setFooterInfo] = useState<FooterProps>();

    return (
        <ManagementContext.Provider value={{ headerButtons, headerTitle, setHeaderTitle, setHeaderButtons, footerInfo, setFooterInfo }}>
            {children}
        </ManagementContext.Provider>
    );
};

export const useManagement = () => {
    const context = useContext(ManagementContext);
    if (context === undefined) {
        throw new Error('useManagement must be used within a ManagementProvider');
    }
    return context;
};
