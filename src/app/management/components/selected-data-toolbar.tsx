import { RiDeleteBinLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

interface SelectedDataToolbarProps {
    isShow: boolean;
    totalSelected: number;
    onDelete: () => void;
    onClose: () => void;
}

export default function SelectedDataToolbar({ isShow, totalSelected, onDelete, onClose }: SelectedDataToolbarProps) {
    if (!isShow) return null;

    return (
        <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2 
                        flex justify-between items-center w
                        h-10 w-1/4 shadow-md border border-gray-300 text-black rounded-md"
        >
            <div className="flex w-2/3 h-full gap-2 items-center">
                <div className="w-1/5 h-full bg-blue-500 flex items-center justify-center rounded-l-md">
                    <h1 className="text-white">{totalSelected}</h1>
                </div>
                <h2 className="font-semibold w-fit">phòng ban đã được chọn</h2>
            </div>
            <div className="flex w-1/3 justify-between h-full gap-2">
                <button
                    className="flex items-center justify-center gap-1 w-2/3 bg-red-500 my-1 px-2 text-white rounded-md"
                    onClick={onDelete}
                >
                    <RiDeleteBinLine className="text-2xl" />
                    <h1>Xóa</h1>
                </button>
                <button
                    className="flex items-center justify-center w-1/4"
                    onClick={onClose}
                >
                    {<IoClose className="text-2xl" />}
                </button>
            </div>
        </div>
    );
}
