'use client';

import { useEffect, useRef } from 'react';
import { MdCancelPresentation } from "react-icons/md";

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
        <div className='text-black'>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    ref={ref}
                    className="bg-white p-6 rounded-lg shadow-lg w-[531px] h-[250px]" // Tailwind classes for width and height
                >
                    {/* Modal content */}
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="flex w-full items-start justify-end">
                            <button onClick={onclose}>
                                {<MdCancelPresentation className="text-black text-3xl hover:text-red-500" />}
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 mx-auto text-center">Vui lòng chọn phương thức</h2>
                        <button
                            className="bg-blue-600 hover:bg-white text-white font-bold py-1 px-1 rounded w-full border-2 
                            hover:text-blue-500 hover:border-2 border-blue-500 mb-2"
                            onClick={onSelectEmailRecovery}
                        >
                            Gửi mã xác thực qua Email
                        </button>
                        <button
                            className="bg-white hover:bg-blue-600 font-bold text-blue-500 my-2 px-1 py-1 rounded w-full mb-2 border-2 border-blue-500 
                            hover:border-transparent hover:text-white"
                            onClick={onSelectSMSRecovery}
                        >
                            Gửi mã xác thực qua SMS
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
