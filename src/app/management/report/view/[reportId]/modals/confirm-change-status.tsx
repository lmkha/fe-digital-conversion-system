'use client';

import { Box, Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';

interface ConfirmChangeStatusModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: (value: boolean) => void;
}

export default function ConfirmChangeStatusModal({ open, onClose, onConfirm }: ConfirmChangeStatusModalProps) {
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '45%',
                    height: '66%',
                    bgcolor: 'background.paper',
                    boxShadow: 10,
                    p: 2,
                    borderRadius: 3,
                }}>
                    {/* Title and close button */}
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            fontWeight={'bold'}
                            fontSize={25}
                        >
                            Bạn có chắc chắn muốn duyệt bài không?
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Stack>
                    <Divider />

                    <Stack direction={'row'}>
                        <Button variant="contained" sx={{
                            backgroundColor: '#4CAF50',
                            textTransform: 'none',
                        }} onClick={() => {
                            onConfirm && onConfirm(true);
                        }}>
                            Có
                        </Button>

                        <Button variant="contained" sx={{
                            backgroundColor: '#F44336',
                            textTransform: 'none',
                        }} onClick={() => {
                            onConfirm && onConfirm(false);
                        }}>
                            Không
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
