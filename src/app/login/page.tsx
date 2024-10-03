'use client';

import { Fragment, useState } from 'react';
import LoginForm from './components/login-form';
import LoginImage from './components/login-image';
import RecoveryOptionChooser from '@/app/forgot-password/choose-method-modal';
import Toast from '@/core/components/toast';
import RecoveryByEmailForm from '@/app/forgot-password/via-email/email-recovery-modal';
import { useRouter } from 'next/navigation';
import auth from '@/api/auth';
import RecoveryBySMSForm from '../forgot-password/via-sms/sms-recovery-modal';

export default function Page() {
    const router = useRouter();
    const [showRecoveryOptionChooser, setShowRecoveryOptionChooser] = useState(false);
    const [showRecoveryByEmailForm, setShowRecoveryByEmailForm] = useState(false);
    const [showRecoveryByZaloForm, setShowRecoveryByZaloForm] = useState(false);
    const [showRecoveryBySMSForm, setShowRecoveryBySMSForm] = useState(false);

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
        const result = await auth.login(data.username, data.password, data.deptId);
        setToastInfo({
            showToast: true,
            severity: result.success ? 'success' : 'error',
            message: result.message
        });
        if (result.code === 3000) {
            router.replace('/reset-password');
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
                onSelectEmailRecovery={() => {
                    setShowRecoveryOptionChooser(false)
                    setShowRecoveryByEmailForm(true)
                }}
                onSelectZaloRecovery={() => {
                    setShowRecoveryOptionChooser(false)
                    setShowRecoveryByZaloForm(true)
                }}
                onSelectSMSRecovery={() => {
                    setShowRecoveryOptionChooser(false)
                    setShowRecoveryBySMSForm(true)
                }}
                onclose={() => {
                    setShowRecoveryOptionChooser(false)
                }}
            />
            <RecoveryByEmailForm
                isVisible={showRecoveryByEmailForm}
                onclose={() => {
                    setShowRecoveryByEmailForm(false);
                }}
            />
            <RecoveryBySMSForm
                isVisible={showRecoveryBySMSForm}
                onclose={() => {
                    setShowRecoveryBySMSForm(false);
                }}
            />
        </Fragment>
    );
}
