'use client';

import { get } from '@/hooks/use-local-storage';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserInfo {
    userId: string | null;
    userName: string | null;
    email: string | null;
    phone: string | null;
    fullName: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    avatar: string | null;
    status: string | null;
    realRole: string | null;
    dept: {
        deptId: string | null;
        deptName: string | null;
        level: number | null;
        provinceName: string | null;
        districtName: string | null;
        wardName: string | null;
        provinceId: string | null;
        districtId: string | null;
        wardId: string | null;
    },
    role: string | null;
}

interface UserInfoContextType {
    userInfo: UserInfo;
    setUserInfo: (userInfo: UserInfo) => void;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export const UserInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(get('userInfo') || {});

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    const context = useContext(UserInfoContext);
    if (context === undefined) {
        throw new Error('Error: useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};
