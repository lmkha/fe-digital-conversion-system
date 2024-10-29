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
    error?: boolean;
}

export default function AutoComplete({ label, value, options, onChange, width = '100%', error = false }: AutoCompleteProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <MUIAutoComplete
            // error={error}
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
            sx={{ width: width, backgroundColor: 'white' }}
            renderInput={(params) =>
                // <TextField
                //     {...params}
                //     label={label}
                // />
                <TextField
                    {...params}
                    label={label}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: error ? 'red' : 'default', // outline đỏ khi có lỗi
                            },
                            "&:hover fieldset": {
                                borderColor: error ? 'red' : 'default',
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: error ? 'red' : 'default',
                            }
                        }
                    }}
                />
            }
        />
    );
}
