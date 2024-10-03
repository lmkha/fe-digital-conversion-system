'use client';
import TextInput from "@/core/components/text-input";
import { useEffect, useState } from "react";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { RiCheckboxIndeterminateLine } from "react-icons/ri";

export default function Filter() {
    const [data, setData] = useState<{
        isCheck: boolean;
        name: string;
        level: string;
        district: string;
        ward: string;
    }>({
        isCheck: false,
        name: "",
        level: "",
        district: "",
        ward: ""
    });

    const changeData = (key: 'isCheck' | 'name' | 'level' | 'district' | 'ward', value: boolean | string) => {
        setData({ ...data, [key]: value });
    };

    const [checkAllIcon, setCheckAllIcon] = useState(<RiCheckboxIndeterminateLine className="text-2xl" />);

    useEffect(() => {
        if (data.isCheck) {
            setCheckAllIcon(<RiCheckboxIndeterminateFill className="text-2xl text-blue-700" />);
        } else {
            setCheckAllIcon(<RiCheckboxIndeterminateLine className="text-2xl" />);
        }
    }, [data]);

    return (
        <div className="flex bg-gray-200 p-2 rounded-t-md">
            <div className="flex items-start gap-1 mr-5">
                <button
                    onClick={() => { changeData('isCheck', !data.isCheck); }}
                >
                    {checkAllIcon}
                </button>
                <h1 className="font-bold">Action</h1>
            </div>
            <div className="flex-1 flex items-center gap-2 h-auto">
                <div className="flex-col flex-1">
                    {/* Department name */}
                    <h1 className="font-bold">Department Name</h1>
                    <TextInput
                        textLabel=""
                        value=""
                        onChange={() => { }}
                    />
                </div>
                <div className="flex-col w-24">
                    {/* Department name */}
                    <h1 className="font-bold">Level</h1>
                    <TextInput
                        textLabel=""
                        value=""
                        onChange={() => { }}
                    />
                </div>
                <div className="flex-col w-48">
                    {/* Department name */}
                    <h1 className="font-bold">District</h1>
                    <TextInput
                        textLabel=""
                        value=""
                        onChange={() => { }}
                    />
                </div>
                <div className="flex-col w-48">
                    {/* Department name */}
                    <h1 className="font-bold">Ward</h1>
                    <TextInput
                        textLabel=""
                        value=""
                        onChange={() => { }}
                    />
                </div>

            </div>
        </div>
    );
}