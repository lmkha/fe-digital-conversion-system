'use client';

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { TfiImport } from "react-icons/tfi";
import { useManagement } from "@/contexts/management-context";

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
                <select className="flex justify-center items-center gap-0.5 px-1 rounded-md bg-gray-200"
                    title="itemsOfPage"
                    defaultValue="10"
                    onChange={(e) => {
                        const selectedValue = parseInt(e.target.value);
                        footerInfo.onChangePageSize(selectedValue);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

                <h1>{`${footerInfo.start}-${footerInfo.end} of ${footerInfo.total}`}</h1>
                <div className="flex gap-2">
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                    text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button
                            onClick={() => {
                                const newPageNumber = footerInfo.pageNumber - 1;
                                if (newPageNumber > 0) {
                                    footerInfo.onChangePageNumber(newPageNumber);
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
                                if (footerInfo.end < footerInfo.total) {
                                    const newPageNumber = footerInfo.pageNumber + 1;
                                    footerInfo.onChangePageNumber(newPageNumber);
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
