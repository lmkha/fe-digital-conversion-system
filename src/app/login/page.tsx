'use client';

import { Fragment, useState } from 'react';
import LoginForm from './components/login-form';
import LoginImage from './components/login-image';
import RecoveryOptionChooser from '@/app/forgot-password/components/choose-method';
import Toast from '@/utils/ui/toast';
import RecoveryByEmailForm from '@/app/forgot-password/components/email-recovery-form';
import { useRouter } from 'next/navigation';
import auth from '@/api/Auth';

export default function Page() {
    const router = useRouter();
    const [showRecoveryOptionChooser, setShowRecoveryOptionChooser] = useState(false);
    const [showRecoveryByEmailForm, setShowRecoveryByEmailForm] = useState(false);
    const [toastInfo, setToastInfo] = useState
        <{
            showToast: boolean
            severity: 'success' | 'error';
            message: string
        }>({
            showToast: false,
            severity: 'success',
            message: ''
        });

    const handleLogin = async (data: { username: string, password: string, deptId: string }) => {
        try {
            await auth.login(data.username, data.password, data.deptId);
            setToastInfo({
                showToast: true,
                severity: 'success',
                message: 'Đăng nhập thành công'
            });
            router.push('/');
        } catch (err) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Tài khoản hoặc mật khẩu không đúng. Xin vui lòng thử lại'
            });
        }
    }

    return (
        <Fragment>
            <Toast
                open={toastInfo.showToast}
                message={toastInfo.message}
                severity={toastInfo.severity}
                autoClose={true}
                duration={2000}
                onClose={() => setToastInfo({ ...toastInfo, showToast: false })}
            />
            <div className="flex h-screen">
                <div className="flex-[2] flex items-center justify-center bg-blue-50 p-10">
                    <LoginImage />
                </div>

                <div className="flex-[1] flex items-center justify-center p-8 bg-blue-50">
                    <LoginForm
                        onShowForgotModal={() => setShowRecoveryOptionChooser(true)}
                        validateInput={(result) => {
                            // validate failed, show toast
                            if (result.status === 'error') {
                                setToastInfo({
                                    showToast: true,
                                    severity: result.status,
                                    message: result.message
                                });
                            } else {

                            }
                        }}
                        onLogin={handleLogin}
                    />
                </div>
            </div>
            <RecoveryOptionChooser
                isVisible={showRecoveryOptionChooser}
                onSelectEmailRecovery={() => { setShowRecoveryByEmailForm(true) }}
                onSelectZaloRecovery={() => { }}
                onclose={() => {
                    setShowRecoveryOptionChooser(false)
                }}
            />
            <RecoveryByEmailForm
                isVisible={showRecoveryByEmailForm}
                onclose={() => {
                    setShowRecoveryByEmailForm(false);
                    setShowRecoveryOptionChooser(false);
                }}
            />
        </Fragment>
    );
}
