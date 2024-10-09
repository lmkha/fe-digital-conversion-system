import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useMemo } from 'react';

const customOptions = [
    { name: 'UBND tỉnh Bình Thuận', id: '1' },
    { name: 'UBND huyện Đức Linh', id: '2' },
    { name: 'UBND thị trấn Đức Tài', id: '3' },
    { name: 'UBND xã Tân Hà', id: '4' },
    { name: 'UBND xã Tân Hà', id: '5' },
    { name: 'UBND tỉnh Bắc Ninh', id: '6' },
];

export default function ClientCombobox() {
    const [value, setValue] = useState<{ name: string; id: string } | null>(customOptions[0]);
    const [inputValue, setInputValue] = useState('');

    // Xác định các mục có tên trùng nhau
    const duplicatedNames = useMemo(() => {
        const nameCounts: { [key: string]: number } = {};
        customOptions.forEach(option => {
            nameCounts[option.name] = (nameCounts[option.name] || 0) + 1;
        });
        return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
    }, []);

    return (
        <div>
            <div>{`value: ${value !== null ? `'${value.name}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br />
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: { name: string; id: string } | null) => {
                    setValue(newValue);
                    if (newValue !== null) {
                        console.log(`Selected ID: ${newValue.id}, Selected Name: ${newValue.name}`);
                    } else {
                        console.log('Selection cleared');
                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={customOptions}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        <div>
                            {/* Hiển thị tên */}
                            <div>{option.name}</div>
                            {/* Hiển thị ID bên dưới nếu tên bị trùng */}
                            {duplicatedNames.has(option.name) && (
                                <div style={{ fontSize: '0.8em', color: 'gray' }}>
                                    ID: {option.id}
                                </div>
                            )}
                        </div>
                    </li>
                )}

                renderInput={(params) => <TextField {...params} label="Đơn vị *" />}
            />
        </div>
    );
}
