import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

interface OptionType {
    name: string;
    id: string;
}

interface ComboboxProps {
    label: string;
    value: OptionType;
    options: OptionType[];
    onChange?: (value: OptionType) => void;
    className?: string;
}

export default function Combobox({ label, value, options, onChange, className }: ComboboxProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <Autocomplete
            className={className}
            value={value}
            onChange={(event: any, newValue: OptionType | null) => {
                onChange && onChange(newValue || { name: '', id: '' });
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                />
            }
        />
    );
}