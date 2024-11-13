import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

interface ConfirmDialogProps {
    title: string;
    open: boolean;
    onClose: () => void;
    onConfirm?: (value: boolean) => void;
}

export default function ConfirmDialog({ title, open, onClose, onConfirm }: ConfirmDialogProps) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography fontWeight={'bold'}>Xác nhận</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => {
                        onConfirm && onConfirm(false);
                    }}>Hủy</Button>

                    <Button variant='contained' onClick={() => {
                        onConfirm && onConfirm(true);
                    }} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
