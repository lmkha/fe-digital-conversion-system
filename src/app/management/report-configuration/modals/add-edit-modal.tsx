import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface AddEditReportModalProps {
    open: boolean;
    reportId?: string | null;
    onClose: () => void;
}

export default function AddEditReportModal({ open, reportId, onClose }: AddEditReportModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                height: '50%',
                bgcolor: 'background.paper',
                boxShadow: 10,
                p: 2,
                borderRadius: 3,
            }}>
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
                        {reportId ? 'Sửa báo cáo' : 'Thêm báo cáo'}
                    </Typography>
                    <IconButton
                        aria-label="delete"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Stack>

                {/* Content */}
                <Stack direction={'row'} height={'83%'} spacing={2}></Stack>
            </Box>
        </Modal>
    );
}
