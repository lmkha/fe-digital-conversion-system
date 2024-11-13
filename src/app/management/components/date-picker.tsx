import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DatePickerProps {
    label: string;
    value: dayjs.Dayjs | null;
    onChange: (newValue: dayjs.Dayjs | null) => void;
    error?: boolean;
}

export default function MyDatePicker({ label, value, onChange, error = false }: DatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    label={label}
                    format="DD/MM/YYYY"
                    value={value}
                    onChange={(newValue) => {
                        if (newValue && newValue.isValid()) {
                            onChange(newValue);
                        } else {
                            onChange(null);
                        }
                    }}
                    slotProps={{
                        textField: {
                            size: 'small',
                            error: error,
                            sx: {
                                backgroundColor: 'white',
                                width: '100%',
                            }
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
