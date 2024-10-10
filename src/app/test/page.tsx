'use client';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Page() {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [total, setTotal] = React.useState(63);

    const handleChangePageNumber = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    return (
        <TablePagination
            component="div"
            count={total}
            page={pageNumber}
            onPageChange={handleChangePageNumber}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage=''
        />
    );
}

