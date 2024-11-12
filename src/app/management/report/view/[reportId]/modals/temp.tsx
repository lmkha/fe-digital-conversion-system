import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: (value: boolean) => void;
}

export default function ConfirmDialog({ open, onClose, onConfirm }: ConfirmDialogProps) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Xác nhận duyệt báo cáo này, bấm đồng ý để xác nhận
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onConfirm && onConfirm(false);
                    }}>Hủy</Button>
                    <Button onClick={() => {
                        onConfirm && onConfirm(true);
                    }} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
