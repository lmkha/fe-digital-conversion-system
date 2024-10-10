'use client';

import { TfiImport } from "react-icons/tfi";
import { useManagement } from "@/contexts/management-context";
import TablePagination from '@mui/material/TablePagination';
import React from "react";

export interface FooterProps {
    exportDataFooter: () => void;
    pageNumber: number;
    total: number,
    start: number,
    end: number,
    onChangePageNumber: (pageNumber: number) => void;
    onChangePageSize: (pageSize: number) => void;
}

export default function Footer() {
    const { footerInfo } = useManagement();
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    return (
        <div className='relative z-10 flex justify-between items-center h-fit mx-2 rounded-md bg-white shadow-md    mb-4 text-black'>
            <button className="flex justify-center items-center gap-2 px-3 py-1 ml-2
                            text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md"
                onClick={() => {
                    footerInfo.exportDataFooter();
                }}
            >
                <TfiImport />
                <span>Tải xuống</span>
            </button>

            <div className="mr-2 flex gap-4">
                <TablePagination
                    component="div"
                    count={footerInfo.total}
                    page={footerInfo.pageNumber - 1}
                    onPageChange={(event, newPage) => {
                        footerInfo.onChangePageNumber(newPage + 1);
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        const selectedValue = parseInt(event.target.value);
                        footerInfo.onChangePageSize(selectedValue);
                        setRowsPerPage(selectedValue);
                    }}
                    labelRowsPerPage=''
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
        </div>
    );
}
