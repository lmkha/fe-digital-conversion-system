import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DatePickerProps {
    label: string;
    width?: string;
    containerWidth?: string;
    value: dayjs.Dayjs | null;
    onChange: (newValue: dayjs.Dayjs | null) => void;
}

export default function MyDatePicker({ label, width, containerWidth, value, onChange }: DatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DatePicker', 'DatePicker']}
                sx={{
                    width: containerWidth || '100%',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                }}
            >
                <DatePicker
                    sx={{
                        '.MuiInputBase-root': {
                            height: '40px',
                            fontSize: '14px',
                            width: width || '100%',
                            mt: -1,
                        },
                        '.MuiFormLabel-root': {
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '16px',
                            paddingLeft: '8px',
                            transition: 'all 0.2s ease',
                        },
                        '& .Mui-focused .MuiFormLabel-root, & .MuiFormLabel-root.MuiInputLabel-shrink': {
                            top: '-10px',
                            transform: 'translateY(0%)',
                            fontSize: '12px',
                            paddingLeft: '8px',
                        },
                        "-ms-overflow-style": "none",
                        "scrollbar-width": "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
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
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}