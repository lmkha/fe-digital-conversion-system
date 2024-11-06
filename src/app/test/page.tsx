'use client';

import { Box, TextField } from "@mui/material";
import React from 'react';
import IMask from 'imask';
import { IMaskInput } from 'react-imask';
import Stack from '@mui/material/Stack';

export default function Page() {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'}>
            <FormattedInputs />
        </Box>
    );
}

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
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
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);


function FormattedInputs() {
    const [values, setValues] = React.useState({
        textmask: '06/9876',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                label="react-imask"
                value={values.textmask}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                slotProps={{
                    input: {
                        inputComponent: TextMaskCustom as any,
                    }
                }}
            />
        </Stack>
    );
}
