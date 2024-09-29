import React from 'react';

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
    highlightWhenEmpty: boolean;
}

export default function PasswordInput({
    value, onChange,
    showPassword,
    toggleShowPassword,
    highlightWhenEmpty = false
}: PasswordInputProps) {
    // Conditional class for the outline, checks both value and isChangeOutlineWhenEmpty
    const inputClasses = `
        peer h-10 w-full border 
        ${highlightWhenEmpty && !value ? 'border-red-500' : 'border-gray-300'} 
        rounded px-3 text-gray-900 bg-white 
        focus:outline-none focus:ring-2 
        ${highlightWhenEmpty && !value ? 'focus:ring-red-500' : 'focus:ring-blue-500'} 
        focus:border-transparent
    `;

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                className={inputClasses}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder=""
                title="Password"
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
                Mật khẩu *
            </label>

            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleShowPassword}
            >
                {showPassword ? (
                    // Icon for showing password
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16M4 20l16-16" />
                    </svg>
                ) : (
                    // Icon for hiding password
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12s2-5 9-5 9 5 9 5-2 5-9 5-9-5-9-5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l2 2-2-2zm0 0l-2-2 2 2zm0 0l2-2-2 2z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
