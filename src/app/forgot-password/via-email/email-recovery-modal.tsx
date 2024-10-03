"use client";

import { useState, useEffect, useRef } from "react";
import isValidEmail from "@/core/logic/email-validator";
import Toast from "@/core/components/toast";
import TextInput from "@/core/components/text-input";
import auth from "@/api/auth";

export default function RecoveryByEmailForm({ isVisible, onclose }: { isVisible: boolean, onclose: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const numberOfSeconds = 20;
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(numberOfSeconds);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [toastInfo, setToastInfo] = useState<{
        showToast: boolean;
        severity: 'success' | 'error';
        message: string;
    }>({
        showToast: false,
        severity: 'success',
        message: ''
    });

    // Close modal if click outside content
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (!toastInfo.showToast) {
                    onclose();
                }
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
    }, [isVisible, onclose, toastInfo]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isButtonDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        if (timer === 0) {
            setIsButtonDisabled(false);
            setToastInfo({ ...toastInfo, showToast: false });
            setTimer(numberOfSeconds);
        }

        return () => clearInterval(interval);
    }, [isButtonDisabled, timer, toastInfo]);

    const handleSendRequest = async () => {
        setIsButtonDisabled(true);

        if (!isValidEmail(email)) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Vui lòng nhập đúng định dạng email. Định dạng đúng ...@...'
            });
        } else {
            const emailExist = await auth.checkEmailExists(email);
            if (emailExist) {
                const sendEmailSuccess = await auth.sendRecoveryEmail(email);
                if (sendEmailSuccess) {
                    setToastInfo({
                        showToast: true,
                        severity: 'success',
                        message: 'Gửi email thành công'
                    });
                } else {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: 'Gửi email thất bại. Xin vui lòng thử lại sau'
                    });
                }
            } else {
                setToastInfo({
                    showToast: true,
                    severity: 'error',
                    message: 'Email chưa đăng ký trên hệ thống. Xin vui lòng thử lại sau'
                });
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !isButtonDisabled) {
            handleSendRequest();
        }
    };

    if (!isVisible) return null;

    return (
        <div>
            {/* Toast */}
            <Toast
                open={toastInfo.showToast}
                message={toastInfo.message}
                severity={toastInfo.severity}
                autoClose={false}
                onClose={() => { setToastInfo({ showToast: false, severity: 'success', message: '' }) }}
            />

            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div ref={ref} className="bg-white p-6 rounded-lg shadow-lg w-[624px] h-[300px] z-50"> {/* Tailwind classes for width and height */}
                    <h2 className="text-2xl font-bold text-center">Quên mật khẩu</h2>
                    <p className="mt-1 text-gray-500 text-center">Vui lòng nhập email để đăng ký tài khoản</p>
                    <div className="mt-3 flex flex-col items-center justify-center w-full h-auto">
                        <TextInput
                            textLabel="Email (*)"
                            value={email}
                            onChange={(value) => { setEmail(value) }}
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            type='submit'
                            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded w-full mt-4 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleSendRequest}
                            disabled={isButtonDisabled}
                        >
                            Gửi yêu cầu
                        </button>

                        <p className="mt-4 text-black">Gửi yêu cầu tiếp theo:&nbsp;
                            <span className="text-blue-500">{isButtonDisabled ? `${timer}s` : `${numberOfSeconds}s`}</span>
                        </p>

                        <p className="mt-4 text-gray-500">Bạn đã có tài khoản ?&nbsp;
                            <a onClick={() => onclose()} className="text-blue-500 hover:underline">Đăng nhập</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
