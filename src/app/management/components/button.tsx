'use client';

import { PiExportBold } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";

export interface ActionButtonProps {
    type: 'add' | 'import' | 'save';
    label: string;
    onClick: () => void;
}

export default function ActionButton({ type, label, onClick }: ActionButtonProps) {
    let icon = null;
    if (type === 'add') {
        icon = <IoAddOutline className="text-2xl" />;
    } else if (type === 'import') {
        icon = <PiExportBold className="text-2xl" />;
    }
    return (
        <div>
            <button className={`flex justify-center items-center w-full px-2 h-full rounded-lg gap-3 
            ${type === 'import' ? 'text-blue-700 hover:text-white bg-white hover:bg-blue-500 border-2 '
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
