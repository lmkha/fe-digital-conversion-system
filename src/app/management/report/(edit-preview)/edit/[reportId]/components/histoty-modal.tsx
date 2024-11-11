'use client';

import { Box, Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getReportHistory, ReportHistory } from "@/services/report-history";

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
    reportId?: string;
    onViewReportHistory?: (reportHistoryId: string) => void;
}

export default function HistoryModal({ open, onClose, reportId, onViewReportHistory }: HistoryModalProps) {
    const [reportHistoryList, setReportHistoryList] = React.useState<ReportHistory[]>();

    React.useEffect(() => {
        if (open && reportId) {
            getReportHistory(reportId).then((response) => {
                if (response.success) {
                    setReportHistoryList(response.data);
                }
            });
        }
    }, [reportId, open]);

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
                            Lịch sử chỉnh sửa
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Stack>
                    <Divider />

                    <ReportHistoryTable
                        rows={reportHistoryList}
                        onViewReportHistory={(reportHistoryId) => {
                            onClose && onClose();
                            onViewReportHistory && onViewReportHistory(reportHistoryId)
                        }}
                    />

                </Box>
            </Modal>
        </>
    );
}

interface ReportHistoryTableProps {
    rows?: ReportHistory[];
    onViewReportHistory?: (reportHistoryId: string) => void;
};

export function ReportHistoryTable({ rows, onViewReportHistory }: ReportHistoryTableProps) {
    return (
        <Box sx={{ maxHeight: 370, overflow: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Người chỉnh sửa</TableCell>
                            <TableCell align="left">Thời gian</TableCell>
                            <TableCell align="center">Xem lại phiên bản</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <TableRow
                                key={row.reportHistoryId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.userEdit}
                                </TableCell>
                                <TableCell align="left">{row.createdAt}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="primary" size="small"
                                        onClick={() => row.reportHistoryId && onViewReportHistory && onViewReportHistory(row.reportHistoryId)}
                                    >Xem</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
