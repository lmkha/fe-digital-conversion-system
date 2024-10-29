'use client';
import * as React from 'react';
import { PiExportBold } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { Button } from '@mui/material';

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
        <Button size="medium"
            variant={type === 'import' ? 'outlined' : 'contained'}
            startIcon={icon}
            sx={{
                textTransform: 'none',
                fontWeight: 'bold',
            }}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}
