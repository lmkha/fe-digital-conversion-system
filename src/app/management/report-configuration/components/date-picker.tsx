import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DatePickerProps {
    label: string;
    width?: string;
    value: dayjs.Dayjs | null;
    onChange: (newValue: dayjs.Dayjs | null) => void;
}

export default function MyDatePicker({ label, width, value, onChange }: DatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DatePicker', 'DatePicker']}
                sx={{ width: width }}
            >
                <DatePicker
                    sx={{
                        width: '100%',
                        '.MuiInputBase-root': {
                            height: '40px',
                            fontSize: '14px'
                        },
                        '.MuiFormLabel-root': {
                            lineHeight: '1.2',
                            padding: 0,
                        },
                    }}
                    label={label}
                    format="DD/MM/YYYY"
                    value={value}
                    onChange={(newValue) => {
                        onChange(newValue);
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}