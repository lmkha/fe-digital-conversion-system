import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete as MUIAutoComplete } from '@mui/material';
import { useState } from 'react';

interface OptionType {
    name: string;
    id: string;
}

interface AutoCompleteProps {
    label: string;
    value: OptionType;
    options: OptionType[];
    onChange?: (value: OptionType) => void;
    width?: string;
}

export default function AutoComplete({ label, value, options, onChange, width = '100%' }: AutoCompleteProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <MUIAutoComplete
            size='small'
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
            sx={{ width: width }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                />
            }
        />
    );
}
