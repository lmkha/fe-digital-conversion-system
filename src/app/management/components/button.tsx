'use client';
import * as React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export interface ActionButtonProps {
    type: 'add' | 'import' | 'save' | 'select' | 'next' | 'back' | 'cancel' | 'download';
    label: string;
    onClick: () => void;
    selectValue?: number;
    options?: number[];
    onSelectChange?: (newValue: number) => void;
}

export default function ActionButton({ type, label, onClick, selectValue, options, onSelectChange }: ActionButtonProps) {
    switch (type) {
        case 'select':
            return (
                <MySelect
                    label={label}
                    value={selectValue || 0}
                    options={options || []}
                    onChange={(newValue) => onSelectChange && onSelectChange(newValue)}
                />
            );
        case 'cancel':
            return (
                <Button
                    size="medium"
                    onClick={onClick}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                        color: 'gray',
                    }}
                >
                    {label}
                </Button>
            );
        case 'download':
            return (
                <Button
                    size="medium"
                    variant={'outlined'}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                    }}
                    onClick={onClick}
                >
                    {label}
                </Button>
            );
        case 'save':
            return (
                <Button
                    size="medium"
                    variant={'contained'}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                    }}
                    onClick={onClick}
                >
                    {label}
                </Button>
            );
        case 'next':
            return (
                <Button
                    size="medium"
                    variant={'contained'}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                    }}
                    onClick={onClick}
                >
                    {label}
                </Button>
            );
        case 'back':
            return (
                <Button
                    size="medium"
                    onClick={onClick}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                        color: 'gray',
                    }}
                >
                    {label}
                </Button>
            );
        case 'import':
            return (
                <Button
                    size="medium"
                    variant={'outlined'}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                    }}
                    onClick={onClick}
                >
                    {label}
                </Button>
            );
        case 'add':
            return (
                <Button
                    size="medium"
                    variant={'contained'}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        height: '45px',
                    }}
                    onClick={onClick}
                >
                    {label}
                </Button>
            );
    }
}

function MySelect({ label, value, options, onChange }: {
    label: string;
    value: number;
    options: number[];
    onChange: (newValue: number) => void;
}) {
    return (
        <FormControl sx={{ width: '100px' }} size="small">
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value === 0 ? '' : value}
                label={label}
                onChange={(event) => onChange(event.target.value as number)}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option === 0 ? "Năm" : option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
