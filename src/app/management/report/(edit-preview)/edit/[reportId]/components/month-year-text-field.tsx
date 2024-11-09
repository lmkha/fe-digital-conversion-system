'use client';

import { Grid2, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import IMask from 'imask';
import { IMaskInput } from 'react-imask';
import { SingleTextFieldData } from "./single-tf-group";

interface MonthYearTextFieldProps {
    label1?: string;
    defaultValue1?: string;
    endAdornmentText?: string;
    onChange?: (data: SingleTextFieldData) => void;
}

export function MonthYearTextField({
    label1,
    defaultValue1,
    endAdornmentText,
    onChange
}: MonthYearTextFieldProps) {
    const [value, setValue] = useState(defaultValue1);
    useEffect(() => {
        setValue(defaultValue1 || ""); // Cập nhật giá trị khi defaultValue1 thay đổi
    }, [defaultValue1]);

    const handleChange = (newValue: string) => {
        setValue(newValue); // Cập nhật giá trị khi người dùng nhập
        onChange?.({ value1: newValue }); // Truyền giá trị mới lên component cha
    };

    return (
        <>
            <Grid2 container spacing={14}>
                <Grid2 size={4}>
                    <TextField
                        value={value}
                        sx={{ width: '100%' }}
                        size="small"
                        label={label1 || ""}
                        onChange={(e) => {
                            onChange?.({ value1: e.target.value });
                            handleChange(e.target.value);
                        }}
                        name="textmask"
                        id="formatted-text-mask-input"
                        slotProps={{
                            input: {
                                inputComponent: TextMaskCustom as any,
                                endAdornment: <InputAdornment position="end">{endAdornmentText}</InputAdornment>
                            }
                        }}
                    />
                </Grid2>
            </Grid2>
        </>

    );
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    value: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, value, ...other } = props;
        const defaultValueRef = useRef(value);

        useEffect(() => {
            defaultValueRef.current = value;
        }, [value]);

        const handleAccept = (value: string) => {
            // Check MM/YYYY format
            const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;

            // Only update if the value is in MM/YYYY format
            if (regex.test(value)) {
                // Only update if the value is different from the default value
                if (value !== defaultValueRef.current) {
                    onChange({ target: { name: props.name, value } });
                }
            }
        };

        return (
            <IMaskInput
                {...other}
                mask="MM/YYYY"
                blocks={{
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                    },
                    YYYY: {
                        mask: IMask.MaskedRange,
                        from: 1900,
                        to: 9999,
                        maxLength: 4,
                    }
                }}
                // defaultValue={value}
                value={value}
                inputRef={ref}
                onAccept={handleAccept}
                overwrite
            />
        );
    },
);
