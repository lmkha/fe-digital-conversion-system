'use client';

import { PiExportBold } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Header() {
    const { headerButtons } = useManagement();
    useEffect(() => {
        console.log('HeaderButton rendered in header');
    }, [headerButtons]);

    return (
        <div className='relative z-10 flex justify-between items-center h-10 mx-2 rounded-md bg-white shadow-md -mb-4'>
            <h1 className="pl-4 font-bold">Department management</h1>
            <HeaderActionPanel headerButtons={headerButtons} />
        </div>
    );
}

function HeaderActionPanel({ headerButtons }: { headerButtons: HeaderActionButtonProps[] }) {
    return (
        <div className='flex justify-around w-auto gap-4 pr-4'>
            {headerButtons.map((button, index) => (
                <HeaderActionButton
                    key={index}
                    type={button.type}
                    label={button.label}
                    onClick={button.onClick}
                />
            ))}
        </div>
    );
}

export interface HeaderActionButtonProps {
    type: 'add' | 'import' | 'save';
    label: string;
    onClick: () => void;
}

function HeaderActionButton({ type, label, onClick }: HeaderActionButtonProps) {
    let icon = null;
    if (type === 'add') {
        icon = <IoAddOutline className="text-2xl" />;
    } else if (type === 'import') {
        icon = <PiExportBold className="text-2xl" />;
    }
    return (
        <div>
            <button className={`flex justify-center items-center w-32 h-full rounded-lg gap-3 
            ${type === 'import' ? 'text-blue-700 hover:text-white bg-white hover:bg-blue-500 border-2 border-blue-500'
                    : 'text-white hover:text-blue-700 bg-blue-500 hover:bg-white hover:border-2 hover:border-blue-500'} 
                    transition-all duration-100`}
                type="button"
                onClick={onClick}
            >
                {icon}
                {label}
            </button>
        </div>
    );
}
