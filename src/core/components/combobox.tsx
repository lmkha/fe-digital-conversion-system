import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useMemo } from 'react';

interface OptionType {
    name: string;
    id: string;
}

interface ComboboxProps {
    label: string;
    options: OptionType[];
    defaultOption?: OptionType;  // Default option to show as selected
    onChange?: (value: OptionType) => void;
    className?: string;
}

export default function Combobox({ label, options, defaultOption, onChange, className }: ComboboxProps) {
    // Set the value to defaultOption if it's provided, else to the first option
    const [value, setValue] = useState<OptionType | null>(defaultOption || (options.length > 0 ? options[0] : null));
    const [inputValue, setInputValue] = useState('');

    // Identify duplicated names in options
    const duplicatedNames = useMemo(() => {
        const nameCounts: { [key: string]: number } = {};
        options.forEach(option => {
            nameCounts[option.name] = (nameCounts[option.name] || 0) + 1;
        });
        return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
    }, [options]);

    // Create an extended options list to always include the defaultOption at the top
    const extendedOptions = useMemo(() => {
        const uniqueOptions = options.filter(option => option.id !== (defaultOption?.id)); // Exclude defaultOption from options
        if (defaultOption) {
            uniqueOptions.unshift(defaultOption); // Add defaultOption to the top of the list
        }
        return uniqueOptions;
    }, [options, defaultOption]);

    return (
        <div>
            <div>{`value: ${value !== null ? `'${value.name}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br />
            <Autocomplete
                className={className}
                value={value}
                onChange={(event: any, newValue: OptionType | null) => {
                    setValue(newValue);
                    if (newValue) {
                        onChange && onChange(newValue);  // Call onChange if provided
                    } else {
                        onChange && onChange({ name: '', id: '' }); // Call onChange with empty option
                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={extendedOptions}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        <div>
                            <div>{option.name}</div>
                            {duplicatedNames.has(option.name) && (
                                <div style={{ fontSize: '0.8em', color: 'gray' }}>
                                    ID: {option.id}
                                </div>
                            )}
                        </div>
                    </li>
                )}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </div>
    );
}

