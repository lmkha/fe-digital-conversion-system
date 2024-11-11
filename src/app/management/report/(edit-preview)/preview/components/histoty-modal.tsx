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

interface HistoryModalProps {
    open: boolean;
    onClose: () => void;
}

export default function HistoryModal({ open, onClose }: HistoryModalProps) {
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

                    <BasicTable />

                </Box>
            </Modal>
        </>
    );
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
];

export function BasicTable() {
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
                        {rows.map((row) => (
                            <TableRow
                                key={`${row.name}-${row.calories}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Trịnh Trần Phương Tuấn
                                </TableCell>
                                <TableCell align="left">11/11/2024 21:57:31</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="primary" size="small">
                                        Xem
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
