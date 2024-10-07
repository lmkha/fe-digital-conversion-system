'use client';

import { ActionButtonProps } from '@/app/management/components/button';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ManagementContextType {
    headerButtons: ActionButtonProps[];
    setHeaderButtons: (buttons: ActionButtonProps[]) => void;
    headerTitle: string;
    setHeaderTitle: (title: string) => void;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerButtons, setHeaderButtons] = useState<ActionButtonProps[]>([]);
    const [headerTitle, setHeaderTitle] = useState<string>('');
    const [exportDataFooter, setExportDataFooter] = useState<() => void>(() => {
        console.log('Export data footer not set yet');
    });

    return (
        <ManagementContext.Provider value={{ headerButtons, headerTitle, setHeaderTitle, setHeaderButtons }}>
            {children}
        </ManagementContext.Provider>
    );
};

// Custom hook để sử dụng context
export const useManagement = () => {
    const context = useContext(ManagementContext);
    if (context === undefined) {
        throw new Error('useManagement must be used within a ManagementProvider');
    }
    return context;
};
