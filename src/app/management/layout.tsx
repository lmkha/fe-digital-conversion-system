import { ReactNode, useState } from 'react';
import SideNav from './components/sidenav';
import Header from './components/header';

import { ManagementProvider } from '@/contexts/management-context';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <ManagementProvider>
            <div className='flex w-screen h-screen bg-white'>
                {/* SideBar, on the left */}
                <SideNav />
                {/* Header and Content on the right */}
                <div className='flex-1 flex flex-col'>
                    <Header />
                    {/* Ensure this div takes up all remaining space */}
                    <div className='flex-1 bg-white mx-2 pt-2'>
                        <div className='m-2'>
                            {children}
                        </div>
                    </div>
                    {/* <Footer/> */}
                </div>
            </div>
        </ManagementProvider>
    );
};