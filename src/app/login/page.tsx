/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Fragment, useEffect, useState } from 'react';
import LoginForm from './components/login-form';
import LoginImage from './components/login-image';
import RecoveryOptionChooser from '@/app/forgot-password/choose-method-modal';
import Toast from '@/core/components/toast';
import RecoveryByEmailForm from '@/app/forgot-password/via-email/email-recovery-modal';
import { useRouter } from 'next/navigation';
import RecoveryBySMSForm from '../forgot-password/via-sms/sms-recovery-modal';
import { useAuth } from '@/contexts/auth-context';
import { useUserInfo } from '@/contexts/user-info-context';
import { login as loginService } from '@/services/login';

export default function Page() {
    const { isLoggedIn, login, logout } = useAuth();
    const { setUserInfo } = useUserInfo();
    const router = useRouter();
    const [showRecoveryOptionChooser, setShowRecoveryOptionChooser] = useState(false);
    const [showRecoveryByEmailForm, setShowRecoveryByEmailForm] = useState(false);
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
        const result = await loginService(
            data.username,
            data.password,
            data.deptId,
            () => {
                login();
            },
            () => {
                logout();
            },
            (userInfo) => {
                setUserInfo(userInfo);
            }
        );
        setToastInfo({
            showToast: true,
            severity: result.success ? 'success' : 'error',
            message: result.message
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.replace('/management');
        }
    }, [isLoggedIn]);

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
