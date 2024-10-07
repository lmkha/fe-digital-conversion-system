'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, Alert, Slide, IconButton, LinearProgress } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

// Tạo hiệu ứng Slide từ bên trái
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function Toast({
    open,
    message,
    severity,
    duration = 2000,
    autoClose = true,
    onClose,
}: {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    duration?: number; // Thời gian tự động tắt (milliseconds)
    autoClose?: boolean; // Tự động tắt Toast sau duration
    onClose: () => void;
}) {
    const [progress, setProgress] = useState(100); // State để theo dõi giá trị thanh tiến độ

    // Tự động tắt Toast sau duration (nếu mở)
    useEffect(() => {
        if (open && autoClose) {
            setProgress(100);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const progressStep = 100 / (duration / 100);
                    const newProgress = prev - progressStep;
                    if (newProgress <= -progressStep) {
                        clearInterval(interval);
                        return 0;
                    }
                    return newProgress;
                });
            }, 100);

            const timer = setTimeout(onClose, duration);
            return () => {
                clearInterval(interval);
                clearTimeout(timer); // 
            };
        }
    }, [open]);

    // Custom styles cho success và error
    const customStyles = {
        success: {
            iconColor: '#54D62C',
            textColor: '#08660D',
            backgroundColor: '#E9FCD4',
        },
        error: {
            iconColor: '#FF4842',
            textColor: '#7A0C2E',
            backgroundColor: '#FFE7D9',
        },
    };

    const styles = severity === 'success' ? customStyles.success : customStyles.error;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition} // Áp dụng hiệu ứng Slide
            PaperProps={{
                style: {
                    position: 'fixed',
                    top: '16px',
                    right: '16px',
                    margin: 0,
                    backgroundColor: 'transparent',
                    boxShadow: 'none', // Loại bỏ shadow
                },
            }}
            hideBackdrop // Sử dụng hideBackdrop để loại bỏ backdrop
        >
            <Alert
                severity={severity}
                sx={{
                    backgroundColor: styles.backgroundColor,
                    color: styles.textColor,
                    '& .MuiAlert-icon': {
                        color: styles.iconColor, // Màu icon
                    },
                }}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit" // Giữ nguyên màu mặc định cho nút cancel
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
            {autoClose && open && (
                <LinearProgress
                    variant="determinate"
                    value={progress} // Giá trị thanh tiến độ
                    sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'transparent',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: severity === 'success' ? styles.iconColor : styles.iconColor,
                        },
                    }}
                />
            )}
        </Dialog>
    );
}
