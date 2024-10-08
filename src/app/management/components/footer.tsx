'use client';

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { TfiImport } from "react-icons/tfi";
import { useManagement } from "@/contexts/management-context";

export interface FooterProps {
    exportDataFooter: () => void;
    pageNumber: string;
    totalPage: string;
    totalSelected: string;
    onChangePageNumber: (pageNumber: string) => void;
    onChangePageSize: (pageSize: string) => void;
}

export default function Footer() {
    const { footerInfo } = useManagement();
    console.log(`Show footer in Footer: ${footerInfo.pageNumber} / ${footerInfo.totalPage} trang`);
    return (
        <div className='relative z-10 flex justify-between items-center h-fit mx-2 rounded-md bg-white shadow-md    mb-4 text-black'>
            <button className="flex justify-center items-center gap-2 px-3 py-1 ml-2
                            text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md"
                onClick={() => {
                    console.log('Export data');
                    footerInfo.exportDataFooter();
                }}
            >
                <TfiImport />
                <span>Tải xuống</span>
            </button>

            <div className="mr-2 flex gap-4">
                <select className="flex justify-center items-center gap-0.5 px-1 rounded-md bg-gray-200"
                    title="itemsOfPage"
                    defaultValue="10"
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        footerInfo.onChangePageSize(selectedValue);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

                <h1>{footerInfo.pageNumber} / {footerInfo.totalPage} trang</h1>
                <div className="flex gap-2">
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                    text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button
                            onClick={() => {
                                const newPageNumber = (parseInt(footerInfo.pageNumber) - 1);
                                if (newPageNumber > 0) {
                                    footerInfo.onChangePageNumber(newPageNumber.toString());
                                }
                            }}
                        >
                            {<GrFormPrevious />}
                        </button>
                    </div>
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button
                            onClick={() => {
                                const newPageNumber = (parseInt(footerInfo.pageNumber) + 1);
                                if (newPageNumber <= parseInt(footerInfo.totalPage)) {
                                    footerInfo.onChangePageNumber(newPageNumber.toString());
                                }
                            }}
                        >
                            {<GrFormNext />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
