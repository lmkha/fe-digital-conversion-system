'use client';

import { get } from '@/hooks/use-local-storage';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PermissionList {
    department: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    },
    user: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    },
    role: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    },
    report: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    },
    reportConfig: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
    }
}

interface PermissionContextType {
    permissionList: PermissionList;
    setPermissionList: (permissionList: PermissionList) => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [permissionList, setPermissionList] = useState<PermissionList>(get('permissionList') || {
        department: {
            create: false,
            read: false,
            update: false,
            delete: false,
        },
        user: {
            create: false,
            read: false,
            update: false,
            delete: false,
        },
        role: {
            create: false,
            read: false,
            update: false,
            delete: false,
        },
        report: {
            create: false,
            read: false,
            update: false,
            delete: false,
        },
        reportConfig: {
            create: false,
            read: false,
            update: false,
            delete: false,
        }
    });

    return (
        <PermissionContext.Provider value={{ permissionList, setPermissionList }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('Error: useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};
