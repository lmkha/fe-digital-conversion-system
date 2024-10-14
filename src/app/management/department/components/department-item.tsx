'use client';

// import { ImCheckboxChecked } from "react-icons/im";
// import { ImCheckboxUnchecked } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";


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
        <MdCheckBox className="text-3xl text-blue-500" /> :
        <MdCheckBoxOutlineBlank className="text-3xl text-gray-300 hover:text-gray-600" />;

    return (
        <div className="flex bg-white p-2 rounded-t-md border-b-2 text-black">
            <div className="flex items-end justify-center gap-2 mr-5 w-20">
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
                    {<MdModeEditOutline className="text-2xl text-gray-400 hover:text-gray-600" />}
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
