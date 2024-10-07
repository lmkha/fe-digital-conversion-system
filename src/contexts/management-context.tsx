'use client';

import { ActionButtonProps } from '@/app/management/components/button';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ManagementContextType {
    headerButtons: ActionButtonProps[];
    setHeaderButtons: (buttons: ActionButtonProps[]) => void;
    exportDataFooter: () => void;
    setExportDataFooter: (callback: () => void) => void; // Cập nhật kiểu của setExportDataFooter
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerButtons, setHeaderButtons] = useState<ActionButtonProps[]>([]);
    const [exportDataFooter, setExportDataFooter] = useState<() => void>(() => {
        console.log('Export data footer not set yet');
    });

    // Truyền cả exportDataFooter và setExportDataFooter vào provider
    return (
        <ManagementContext.Provider value={{ headerButtons, setHeaderButtons, exportDataFooter, setExportDataFooter }}>
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
