'use client';

import { useManagement } from "@/contexts/management-context";
import ActionButton, { ActionButtonProps } from "./button";

export default function Header() {
    const { headerButtons } = useManagement();

    return (
        <div className='relative z-10 flex justify-between items-center h-10 mx-2 rounded-md bg-white shadow-md -mb-4'>
            <h1 className="pl-4 font-bold">Department management</h1>
            <HeaderActionPanel headerButtons={headerButtons} />
        </div>
    );
}

function HeaderActionPanel({ headerButtons }: { headerButtons: ActionButtonProps[] }) {
    return (
        <div className='flex justify-around w-auto gap-4 pr-4'>
            {headerButtons.map((button, index) => (
                <ActionButton
                    key={index}
                    type={button.type}
                    label={button.label}
                    onClick={button.onClick}
                />
            ))}
        </div>
    );
}
