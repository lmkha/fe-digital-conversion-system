import React from 'react';


export default function LoginButton({ onClick }: {
    onClick: () => void;
}) {
    return (
        <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            Đăng nhập
        </button>
    );
};
