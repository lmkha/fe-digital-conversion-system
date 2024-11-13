'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export default function TestPage() {
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <DatePicker />
            </Box>
        </>
    );
}

export function DatePicker() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <MUIDatePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            sx: {
                                width: '100%'
                            }
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

