import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';


export default function DatePicker() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <MUIDatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                <MUIDatePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
