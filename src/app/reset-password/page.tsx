'use client';

import Toast from "@/core/components/toast";
import { useEffect, useState } from "react";
import TextInput from "@/core/components/text-input";
import isValidPassword from "@/core/logic/password-validator";
import auth from "@/api/auth";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const numberOfSeconds = 20;
    const [timer, setTimer] = useState(numberOfSeconds);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
    const [passwordInfo, setPasswordInfo] = useState<{
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })


    const [toastInfo, setToastInfo] = useState<{
        autoClose: boolean;
        showToast: boolean;
        severity: 'success' | 'error';
        message: string;
    }>({
        autoClose: false,
        showToast: false,
        severity: 'success',
        message: ''
    });


    useEffect(() => {
        if (changePasswordSuccess && toastInfo.showToast == false) {
            router.replace('/');
        }
    }, [changePasswordSuccess, toastInfo]);

    const handleSendRequest = async () => {
        // Check if password is empty
        if (passwordInfo.newPassword === '' || passwordInfo.confirmNewPassword === '') {
            setToastInfo({
                autoClose: false,
                showToast: true,
                severity: 'error',
                message: 'Mật khẩu không được để trống'
            });
            return;
        }
        // Check if password and confirm password are the same
        if (passwordInfo.newPassword !== passwordInfo.confirmNewPassword) {
            setToastInfo({
                autoClose: false,
                showToast: true,
                severity: 'error',
                message: 'Mật khẩu mới không khớp'
            });
            return;
        }

        // Validate password
        if (!isValidPassword(passwordInfo.newPassword)) {
            setToastInfo({
                autoClose: false,
                showToast: true,
                severity: 'error',
                message: 'Mật khẩu không hợp lệ'
            });
            return
        }
        // Send request
        const result = await auth.changePassword(passwordInfo.newPassword);
        setToastInfo({
            autoClose: result.success,
            showToast: true,
            severity: result.success ? 'success' : 'error',
            message: result.message
        });
        if (result.success) {
            setChangePasswordSuccess(true);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSendRequest();
        }
    };

    return (
        <div>
            {/* Toast */}
            <Toast
                open={toastInfo.showToast}
                message={toastInfo.message}
                severity={toastInfo.severity}
                autoClose={toastInfo.autoClose}
                onClose={() => { setToastInfo({ ...toastInfo, showToast: false }) }}
            />

            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[624px] h-[350px] z-50"> {/* Tailwind classes for width and height */}
                    <h2 className="text-2xl font-bold text-center">Đổi mật khẩu</h2>
                    <div className="mt-3 flex flex-col items-center justify-center w-full h-auto">
                        <div className="mt-4 w-full">
                            <TextInput
                                textLabel="Mật khẩu mới (*)"
                                value={passwordInfo.newPassword}
                                onChange={(value) => { setPasswordInfo({ ...passwordInfo, newPassword: value }) }}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="mt-4 mb-5 w-full">
                            <TextInput
                                textLabel="Nhập lại mật khẩu mới (*)"
                                value={passwordInfo.confirmNewPassword}
                                onChange={(value) => { setPasswordInfo({ ...passwordInfo, confirmNewPassword: value }) }}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded w-full mt-4'
                            onClick={handleSendRequest}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}