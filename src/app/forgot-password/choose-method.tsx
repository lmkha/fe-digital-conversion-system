'use client';

import { useEffect, useRef } from 'react';

interface IRecoveryOptionChooserProps {
    isVisible: boolean;
    onclose: () => void;
    onSelectZaloRecovery: () => void;
    onSelectSMSRecovery: () => void;
    onSelectEmailRecovery: () => void;
}

export default function RecoveryOptionChooser({
    isVisible,
    onclose,
    onSelectZaloRecovery = () => { },
    onSelectSMSRecovery = () => { },
    onSelectEmailRecovery = () => { },
}: IRecoveryOptionChooserProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    // Close modal if click outside content
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onclose();
            }
        }

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onclose]);

    if (!isVisible) return null;

    return (
        <div>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    ref={ref}
                    className="bg-white p-6 rounded-lg shadow-lg w-[531px] h-[211px]" // Tailwind classes for width and height
                >
                    {/* Modal content */}
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h2 className="text-2xl font-bold mb-4">Vui lòng chọn phương thức</h2>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded w-full mb-2"
                            onClick={onSelectZaloRecovery}
                        >
                            Gửi mã xác thực qua Zalo
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded w-full mb-2"
                            onClick={onSelectSMSRecovery}
                        >
                            Gửi mã xác thực qua SMS
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded w-full"
                            onClick={onSelectEmailRecovery}
                        >
                            Gửi mã xác thực qua Email
                        </button>
                        <p className="mt-4 text-gray-500">
                            Bạn đã có tài khoản ?&nbsp;
                            <a onClick={onclose} className="text-blue-500 hover:underline">Đăng nhập</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
