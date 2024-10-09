import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useMemo } from 'react';

interface OptionType {
    name: string;
    provinceName: string;
    districtName: string;
    id: string;
}

interface DeptComboboxProps {
    customOptions: OptionType[];
    onChange?: (value: OptionType) => void;
}

// export default function DeptCombobox({ customOptions, onChange }: DeptComboboxProps) {
//     const [value, setValue] = useState<OptionType | null>(customOptions[0]);
//     const [inputValue, setInputValue] = useState('');

//     // Xác định các mục có tên trùng nhau
//     const duplicatedNames = useMemo(() => {
//         const nameCounts: { [key: string]: number } = {};
//         customOptions.forEach(option => {
//             nameCounts[option.name] = (nameCounts[option.name] || 0) + 1;
//         });
//         return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
//     }, []);

//     return (
//         <div>
//             <div>{`value: ${value !== null ? `'${value.name}'` : 'null'}`}</div>
//             <div>{`inputValue: '${inputValue}'`}</div>
//             <br />
//             <Autocomplete
//                 value={value}
//                 onChange={(event: any, newValue: OptionType | null) => {
//                     setValue(newValue);
//                     if (newValue !== null) {
//                         console.log(`Selected ID: ${newValue.id}, Selected Name: ${newValue.name}`);
//                         onChange && onChange(newValue);
//                     } else {
//                         console.log('Selection cleared');
//                         onChange && onChange({ name: '', provinceName: '', districtName: '', id: '' });
//                     }
//                 }}
//                 inputValue={inputValue}
//                 onInputChange={(event, newInputValue) => {
//                     setInputValue(newInputValue);
//                 }}
//                 id="controllable-states-demo"
//                 options={customOptions}
//                 getOptionLabel={(option) => option.name}
//                 isOptionEqualToValue={(option, value) => option.id === value.id}
//                 sx={{ width: 300 }}
//                 renderOption={(props, option) => (
//                     <li {...props} key={option.id}>
//                         <div>
//                             <div>{option.name}</div>
//                             {duplicatedNames.has(option.name) && (
//                                 <div style={{ fontSize: '0.8em', color: 'gray' }}>
//                                     Tỉnh: {option.provinceName}, Huyện: {option.districtName}
//                                 </div>
//                             )}
//                         </div>
//                     </li>
//                 )}

//                 renderInput={(params) => <TextField {...params} label="Đơn vị *" />}
//             />
//         </div>
//     );
// }

export default function DeptCombobox({ customOptions, onChange }: DeptComboboxProps) {
    const [value, setValue] = useState<OptionType | null>(customOptions.length > 0 ? customOptions[0] : null);
    const [inputValue, setInputValue] = useState('');

    // Xác định các mục có tên trùng nhau
    const duplicatedNames = useMemo(() => {
        const nameCounts: { [key: string]: number } = {};
        customOptions.forEach(option => {
            nameCounts[option.name] = (nameCounts[option.name] || 0) + 1;
        });
        return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
    }, [customOptions]);

    return (
        <div>
            <div>{`value: ${value ? `'${value.name}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br />
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: OptionType | null) => {
                    setValue(newValue);
                    if (newValue) {
                        console.log(`Selected ID: ${newValue.id}, Selected Name: ${newValue.name}`);
                        onChange && onChange(newValue);
                    } else {
                        console.log('Selection cleared');
                        onChange && onChange({ name: '', provinceName: '', districtName: '', id: '' });
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
                            <div>{option.name}</div>
                            {duplicatedNames.has(option.name) && (
                                <div style={{ fontSize: '0.8em', color: 'gray' }}>
                                    Tỉnh: {option.provinceName}, Huyện: {option.districtName}
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
