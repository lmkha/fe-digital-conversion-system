'use client';

import { Box, Grid, IconButton, Typography, Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

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
            <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(96,96,96,0.5)', zIndex: 40 }}></Box>

            {/* Modal */}
            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    ref={ref}
                    sx={{
                        bgcolor: 'white',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        width: 531,
                        height: 250,
                        position: 'relative',
                    }}
                >
                    {/* Close Button at top-right */}
                    <IconButton
                        aria-label="delete"
                        onClick={onclose}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>

                    {/* Title centered */}
                    <Typography variant="h5" fontWeight="bold" align="center" mb={4}>
                        Vui lòng chọn phương thức
                    </Typography>

                    {/* Action buttons */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mb: 2,
                            textTransform: 'none',
                            bgcolor: '#2962FF',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                        onClick={onSelectEmailRecovery}
                    >
                        Gửi mã xác thực qua Email
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            mb: 2,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                        onClick={onSelectSMSRecovery}
                    >
                        Gửi mã xác thực qua SMS
                    </Button>

                    {/* Footer text */}
                    <Typography variant="body2" align="center" color="textSecondary">
                        Bạn đã có tài khoản ?&nbsp;
                        <Box
                            component="span"
                            sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            onClick={onclose}
                        >
                            Đăng nhập
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
