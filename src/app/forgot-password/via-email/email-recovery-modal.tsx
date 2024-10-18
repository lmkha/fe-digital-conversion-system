"use client";

import { useState, useEffect, useRef } from "react";
import isValidEmail from "@/core/logic/email-validator";
import Toast from "@/core/components/toast";
import TextInput from "@/core/components/text-input";
import auth from "@/api/auth";
import { Modal, Box, Button, Typography, Backdrop, IconButton, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
        <Box>
            {/* Toast */}
            <Toast
                open={toastInfo.showToast}
                message={toastInfo.message}
                severity={toastInfo.severity}
                autoClose={false}
                onClose={() => { setToastInfo({ showToast: false, severity: 'success', message: '' }) }}
            />

            {/* MUI Modal */}
            <Modal
                open={isVisible}
                onClose={onclose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    ref={ref}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40%',
                        height: '45%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    {/* Close Button at top-right */}
                    <IconButton onClick={onclose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon fontSize="large" />
                    </IconButton>

                    {/* Title centered */}
                    <Typography variant="h6" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                        Quên mật khẩu
                    </Typography>

                    {/* Content */}
                    <Typography variant="body2" color="text.secondary" align="center">
                        Vui lòng nhập email để đăng ký tài khoản
                    </Typography>

                    <Stack
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ marginTop: 3 }}
                    >
                        <TextInput
                            textLabel="Email (*)"
                            value={email}
                            onChange={(value) => { setEmail(value) }}
                            onKeyDown={handleKeyDown}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                textTransform: 'none',
                                bgcolor: '#2962FF',
                                fontWeight: 'bold',
                                fontSize: 18,
                            }}
                            onClick={handleSendRequest}
                            disabled={isButtonDisabled}
                        >
                            Gửi yêu cầu
                        </Button>

                        <Typography variant="body2">
                            Gửi yêu cầu tiếp theo:&nbsp;
                            <Typography variant="body2" component="span" color="primary">
                                {isButtonDisabled ? `${timer}s` : `${numberOfSeconds}s`}
                            </Typography>
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Bạn đã có tài khoản?&nbsp;
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ cursor: 'pointer', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}
                                onClick={onclose}
                            >
                                Đăng nhập
                            </Typography>
                        </Typography>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}
