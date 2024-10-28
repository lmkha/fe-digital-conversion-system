/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, useEffect } from 'react';
import SideNav from './components/sidenav';
import Header from './components/header';

import { ManagementProvider } from '@/contexts/management-context';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Footer from './components/footer';
import Toast from '@/core/components/toast';
import { useAppContext } from '@/contexts/app-context';
import { get, set } from "@/hooks/use-local-storage";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const { toastInfo, setToastInfo } = useAppContext();
    // const { userInfo } = get("userInfo");

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [isLoggedIn]);

    // useEffect(() => {
    //     if (!userInfo) {
    //         router.replace('/login');
    //     }
    // }, [userInfo]);

    return (
        <ManagementProvider>
            <div className='flex w-screen h-screen bg-white'>
                {/* SideBar, on the left */}
                <SideNav />
                {/* Header and Content on the right */}
                <div className='flex-1 flex flex-col'>
                    <Header />
                    {/* Ensure this div takes up all remaining space */}
                    <div className='flex-1 bg-white mx-2 pt-3'>
                        <div className='m-2 text-black'>
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <Toast
                open={toastInfo?.show || false}
                message={toastInfo?.message || ""}
                severity={toastInfo?.severity || "error"}
                autoClose={toastInfo?.autoClose || true}
                duration={toastInfo?.duration || 2000}
                onClose={toastInfo?.onClose || (() => {
                    if (setToastInfo) setToastInfo({ show: false, message: '', severity: 'success' })
                })}
            />
        </ManagementProvider>
    );
};
