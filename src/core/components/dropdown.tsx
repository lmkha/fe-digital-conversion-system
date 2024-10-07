import React from 'react';

interface Option {
    value: string;
    name: string;
}

interface DropdownProps {
    label: string;
    options: Option[];
    alternativeOption?: Option;
    onChange: (option: Option) => void;
}

export default function Dropdown({
    label,
    options,
    alternativeOption = { value: '', name: '' },
    onChange
}: DropdownProps) {
    // Lọc options để loại bỏ option trùng với alternativeOption
    const filteredOptions = options.filter(option => option.value !== alternativeOption.value);

    return (
        <div className="relative">
            <select
                id="department"
                className="peer h-10 w-full border border-gray-300 rounded px-3 text-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => {
                    try {
                        const selectedValue = e.target.value;
                        const selectedDepartment = options.find(option => option.value === selectedValue);
                        onChange(selectedDepartment!!);
                    } catch (error) {
                        onChange({ value: '', name: '' });
                    }
                }}
            >
                {/* Hiển thị alternativeOption trước */}
                <option
                    key={`${alternativeOption.value}-0`}
                    value={alternativeOption.value}
                >
                    {alternativeOption.name}
                </option>

                {/* Hiển thị các options đã được lọc */}
                {filteredOptions.map((option, index) => (
                    <option
                        key={`${option.value}-${index}`}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}

            </select>
            <label
                htmlFor="department"
                className="absolute left-3 top-[-6px] text-xs text-gray-500 bg-white px-1 transition-all peer-focus:text-blue-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-text-gray-400 z-10"
            >
                {label}
            </label>
        </div>
    );
}
