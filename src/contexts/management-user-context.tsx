'use client';

import { UserItem } from '@/services/models/user-item';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PreviewUserList = UserItem[];

interface ManagementUserContextType {
    previewUserList: PreviewUserList | undefined;
    setPreviewUserList: (previewUserList: PreviewUserList) => void;
}

const ManagementUserContext = createContext<ManagementUserContextType | undefined>(undefined);

export const ManagementUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [previewUserList, setPreviewUserList] = useState<PreviewUserList>()

    return (
        <ManagementUserContext.Provider value={{ previewUserList, setPreviewUserList }}>
            {children}
        </ManagementUserContext.Provider>
    );
};

export const useManagementUser = () => {
    const context = useContext(ManagementUserContext);
    if (context === undefined) {
        throw new Error('useManagementUser must be used within a ManagementUserProvider');
    }
    return context;
};
