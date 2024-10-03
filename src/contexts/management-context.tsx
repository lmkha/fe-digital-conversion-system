/*
Đang gặp vấn đề gì?
- Button nằm trên Header, Header và Content cùng cấp với nhau
- Tôi muốn tùy vào page(tùy vào route) mà Header sẽ có số lượng button khác nhau, các button thực hiện các hành động khác nhau
    tương ứng với các page
*/

'use client';

import { HeaderActionButtonProps } from '@/app/management/components/header';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ManagementContextType {
    headerButtons: HeaderActionButtonProps[];
    setHeaderButtons: (buttons: HeaderActionButtonProps[]) => void;
}

const ManagementContext = createContext<ManagementContextType | undefined>(undefined);

export const ManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerButtons, setHeaderButtons] = useState<HeaderActionButtonProps[]>([]);

    return (
        <ManagementContext.Provider value={{ headerButtons, setHeaderButtons }}>
            {children}
        </ManagementContext.Provider>
    );
};


export const useManagement = () => {
    const context = useContext(ManagementContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
