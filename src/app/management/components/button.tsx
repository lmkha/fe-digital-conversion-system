'use client';
import * as React from 'react';
import { PiExportBold } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export interface ActionButtonProps {
    type: 'add' | 'import' | 'save' | 'select' | 'next' | 'cancel' | 'download';
    label: string;
    onClick: () => void;
    selectValue?: number;
    options?: number[];
    onSelectChange?: (newValue: number) => void;
}

export default function ActionButton({ type, label, onClick, selectValue, options, onSelectChange }: ActionButtonProps) {
    console.log('Check select: ', selectValue);
    console.log('Check options: ', options);
    let icon = null;
    if (type === 'add') {
        icon = <IoAddOutline className="text-2xl" />;
    } else if (type === 'import') {
        icon = <PiExportBold className="text-2xl" />;
    }
    return (
        <>
            {type === 'select' ? (
                <MySelect
                    label={label}
                    value={selectValue || 0}
                    options={options || []}
                    onChange={(newValue) => onSelectChange && onSelectChange(newValue)}
                />
            ) : (
                <Button size="medium"
                    variant={type === 'import' ? 'outlined' : 'contained'}
                    startIcon={icon}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                    }}
                    onClick={onClick}
                >
                    {label}
                </Button>
            )}
        </>
    );
}

function MySelect({ label, value, options, onChange }: {
    label: string;
    value: number;
    options: number[];
    onChange: (newValue: number) => void;
}) {
    return (
        <FormControl sx={{ width: '100px' }} size='small'>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                onChange={(event) => onChange(event.target.value as number)}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}