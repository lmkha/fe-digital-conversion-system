'use client';
import { useEffect, useState } from "react";

import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";


export default function DepartmentItem() {
    const [data, setData] = useState<{
        isCheck: boolean;
        name: string;
        level: string;
        district: string;
        ward: string;
    }>({
        isCheck: false,
        name: "Ủy ban nhân dân tỉnh Bình Thuận",
        level: "1",
        district: "Đức Linh",
        ward: "Đức Tài"
    });

    const changeData = (key: 'isCheck' | 'name' | 'level' | 'district' | 'ward', value: boolean | string) => {
        setData({ ...data, [key]: value });
    };
    const [checkIcon, setCheckIcon] = useState(<ImCheckboxUnchecked className="text-2xl" />);


    useEffect(() => {
        if (data.isCheck) {
            setCheckIcon(<ImCheckboxChecked className="text-2xl text-blue-500" />);
        } else {
            setCheckIcon(<ImCheckboxUnchecked className="text-2xl" />);
        }
    }, [data]);

    return (
        <div className="flex bg-white p-2 rounded-t-md border-b-2">
            <div className="flex items-end justify-center gap-1 mr-5 w-20">
                <button
                    onClick={() => changeData('isCheck', !data.isCheck)}
                >
                    {checkIcon}
                </button>
                <button>
                    {<MdModeEditOutline className="text-2xl" />}
                </button>
            </div>
            <div className="flex-1 flex items-center gap-2 h-auto">
                <div className="flex-col flex-1">
                    {/* Department name */}
                    <h1>Ủy ban nhân dân Thành phố Hồ Chí Minh</h1>
                </div>
                <div className="flex-col w-24">
                    {/* Department name */}
                    <h1>1</h1>
                </div>
                <div className="flex-col w-48">
                    {/* Department name */}
                    <h1>Quận 9</h1>
                </div>
                <div className="flex-col w-48">
                    {/* Department name */}
                    <h1>Hiệp Phú</h1>
                </div>

            </div>
        </div>
    );
}
