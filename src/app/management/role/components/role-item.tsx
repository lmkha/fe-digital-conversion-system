'use client';

import { MdModeEditOutline } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";


interface RoleItemProps {
    id: string;
    code: string;
    name: string;
    isCheck: boolean;
    onIsCheckChange: (id: string, isCheck: boolean) => void;
    onEdit: () => void;
}

export default function RoleItem({ id, code, name, isCheck, onIsCheckChange, onEdit }: RoleItemProps) {
    const checkIcon = isCheck ?
        <MdCheckBox className="text-3xl text-blue-500" /> :
        <MdCheckBoxOutlineBlank className="text-3xl" />;

    return (
        <div className="flex bg-white p-2 rounded-t-md border-b-2 text-black">
            <div className="flex items-end justify-center gap-4 mr-5 w-28">
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
                <div className="flex-col w-1/4">
                    <h1>{code}</h1>
                </div>
                <div className="flex-col flex-1">
                    <h1>{name}</h1>
                </div>
            </div>
        </div>
    );
}
