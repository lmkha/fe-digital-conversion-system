'use client';

import { TfiImport } from "react-icons/tfi";
import { useManagement } from "@/contexts/management-context";
import TablePagination from '@mui/material/TablePagination';
import React from "react";

export default function Footer() {
    const { footerInfo, setFooterInfo } = useManagement();
    return (
        <div className={`relative z-10 flex ${footerInfo?.exportDataFooter ? 'justify-between' : 'justify-end'} items-center h-fit mx-2 rounded-md bg-white shadow-md mb-4 text-black`}>
            {
                footerInfo?.exportDataFooter &&
                <button className="flex justify-center items-center gap-2 px-3 py-1 ml-2
                                text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md"
                    onClick={() => {
                        footerInfo.exportDataFooter && footerInfo.exportDataFooter();
                    }}
                >
                    <TfiImport />
                    <span>Tải xuống</span>
                </button>
            }

            <div className="mr-2 flex gap-4">
                <TablePagination
                    component="div"
                    count={footerInfo?.paginationInfo?.total ? footerInfo?.paginationInfo?.total : 0}
                    page={footerInfo?.paginationInfo?.pageNumber ? footerInfo?.paginationInfo.pageNumber - 1 : 0}
                    onPageChange={(event, newPage) => {
                        footerInfo && setFooterInfo && setFooterInfo({
                            ...footerInfo,
                            paginationInfo: {
                                ...footerInfo.paginationInfo,
                                pageNumber: newPage + 1,
                            }
                        });
                    }}
                    rowsPerPage={footerInfo?.paginationInfo?.pageSize ? footerInfo?.paginationInfo.pageSize : 10}
                    onRowsPerPageChange={(event) => {
                        const selectedValue = parseInt(event.target.value);
                        footerInfo && setFooterInfo && setFooterInfo({
                            ...footerInfo,
                            paginationInfo: {
                                ...footerInfo.paginationInfo,
                                pageSize: selectedValue,
                            }
                        });
                    }}
                    labelRowsPerPage=''
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
        </div>
    );
}
