'use client';

import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { TfiImport } from "react-icons/tfi";


export default function Footer({ exportDataFooter }: { exportDataFooter: () => void }) {
    return (
        <div className='flex justify-between items-center h-10 mx-2 mb-4 rounded-b-md bg-white shadow-md'>
            <button className="flex justify-center items-center gap-2 px-3 py-1 ml-2
                            text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md"
                onClick={() => {
                    console.log('Export data');
                    exportDataFooter();
                }}
            >
                <TfiImport />
                <span>Export Data</span>
            </button>

            <div className="mr-2 flex gap-4">
                <select className="flex justify-center items-center gap-0.5 px-1 rounded-md bg-gray-200"
                    title="itemsOfPage"
                    defaultValue="10"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

                <h1>1 - 2 of 2</h1>
                <div className="flex gap-2">
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                    text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button>{<GrFormPrevious />}</button>
                    </div>
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button>{<GrFormNext />}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
