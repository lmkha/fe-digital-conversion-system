import React from 'react';

interface TextInputProps {
    textLabel: string;
    value: string;
    onChange: (value: string) => void;
    highlightWhenEmpty?: boolean;
}

export default function TextInput({
    textLabel,
    value,
    onChange,
    highlightWhenEmpty = false
}: TextInputProps) {
    const inputClasses = `
        peer h-10 w-full border 
        ${highlightWhenEmpty && !value ? 'border-red-500' : 'border-gray-300'} 
        rounded px-3 text-gray-900 bg-white 
        focus:outline-none focus:ring-2 
        ${highlightWhenEmpty && !value ? 'focus:ring-red-500' : 'focus:ring-blue-500'} 
        focus:border-transparent
    `;

    return (
        <div className="relative w-full">
            <input
                title={textLabel}
                type="text"
                className={inputClasses}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder=" "
            />
            <label
                className="
        absolute left-3 top-[-6px] 
        text-xs text-gray-500 
        bg-white px-1 
        transition-all 
        peer-focus:text-blue-500 
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 
        z-10
    "
            >
                {textLabel}
            </label>

        </div>
    );
}
