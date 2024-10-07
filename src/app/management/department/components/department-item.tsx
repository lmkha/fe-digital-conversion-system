'use client';

import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";

interface DepartmentItemProps {
    id: string;
    name: string;
    level: number;
    district: string;
    ward: string;
    isCheck: boolean;
    onIsCheckChange: (id: string, isCheck: boolean) => void;
    onEdit: () => void;
}

export default function DepartmentItem({ id, name, level, district, ward, isCheck, onIsCheckChange, onEdit }: DepartmentItemProps) {
    const checkIcon = isCheck ?
        <ImCheckboxChecked className="text-2xl text-blue-500" /> :
        <ImCheckboxUnchecked className="text-2xl" />;

    return (
        <div className="flex bg-white p-2 rounded-t-md border-b-2 text-black">
            <div className="flex items-end justify-center gap-1 mr-5 w-20">
                <button
                    onClick={() => {
                        onIsCheckChange(id, !isCheck);
                    }}
                >
                    {checkIcon}
                </button>
                <button
                    onClick={onEdit}
                >
                    {<MdModeEditOutline className="text-2xl" />}
                </button>
            </div>
            <div className="flex-1 flex items-center gap-2 h-auto">
                <div className="flex-col flex-1">
                    <h1>{name}</h1>
                </div>
                <div className="flex-col w-24">
                    <h1>{level}</h1>
                </div>
                <div className="flex-col w-48">
                    <h1>{district}</h1>
                </div>
                <div className="flex-col w-48">
                    <h1>{ward}</h1>
                </div>

            </div>
        </div>
    );
}
