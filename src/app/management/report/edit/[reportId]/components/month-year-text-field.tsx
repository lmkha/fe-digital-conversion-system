'use client';

import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useRef } from 'react';
import IMask from 'imask';
import { IMaskInput } from 'react-imask';
import { Row1Data } from "./row1";

interface MonthYearTextFieldProps {
    value?: Row1Data;
    label1?: string;
    endAdornmentText?: string;
    onChange?: (data: Row1Data) => void;
}

export function MonthYearTextField({
    value,
    label1,
    endAdornmentText,
    onChange
}: MonthYearTextFieldProps) {
    return (
        <TextField
            size="small"
            label={label1 || ""}
            value={value?.value1}
            onChange={(e) => onChange?.({ ...value, value1: e.target.value })}
            name="textmask"
            id="formatted-text-mask-input"
            slotProps={{
                input: {
                    inputComponent: TextMaskCustom as any,
                    endAdornment: <InputAdornment position="end">{endAdornmentText}</InputAdornment>
                }
            }}
        />
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
                defaultValue={value}
                inputRef={ref}
                onAccept={handleAccept}
                overwrite
            />
        );
    },
);
