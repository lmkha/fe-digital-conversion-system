'use client';
import TextInput from "@/core/components/text-input";
import { DetailedDepartment, findDepartmentFilterFull } from "@/services/department";
import { useEffect, useState } from "react";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { RiCheckboxIndeterminateLine } from "react-icons/ri";

interface FilterProps {
    provinceId: string;
    isCheck: boolean;
    onTextChange: (key: 'name' | 'level' | 'district' | 'ward', value: string) => void;
    onCheckAllChange: (isCheck: boolean) => void;
    onSentToTableListChange: (sentToTableList: DetailedDepartment[]) => void;
}

export default function Filter({ provinceId, isCheck, onTextChange, onCheckAllChange, onSentToTableListChange }: FilterProps) {
    const [data, setData] = useState<{
        isCheck: boolean;
        name: string;
        level: string;
        district: string;
        ward: string;
    }>({
        isCheck: isCheck,
        name: '',
        level: '',
        district: '',
        ward: ''
    });
    const [sentToTableList, setSentToTableList] = useState<DetailedDepartment[]>([]);
    const changeData = (key: 'isCheck' | 'name' | 'level' | 'district' | 'ward', value: boolean | string) => {
        setData({ ...data, [key]: value });
    };
    const [checkAllIcon, setCheckAllIcon] = useState(<RiCheckboxIndeterminateLine className="text-2xl" />);
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            findDepartmentFilterFull(provinceId, '', data.name, data.level, data.ward, data.district, '', '', setSentToTableList);
        }
    };

    useEffect(() => {
        if (data.isCheck) {
            setCheckAllIcon(<RiCheckboxIndeterminateFill className="text-2xl text-blue-700" />);
        } else {
            setCheckAllIcon(<RiCheckboxIndeterminateLine className="text-2xl" />);
        }
    }, [data]);

    useEffect(() => {
        onSentToTableListChange(sentToTableList);
    }, [sentToTableList])

    return (
        <div className="flex bg-gray-200 p-2 rounded-t-md text-black">
            <div className="flex items-start gap-1 mr-5">
                <button
                    onClick={() => {
                        onCheckAllChange(!data.isCheck);
                        changeData('isCheck', !data.isCheck);
                    }}
                >
                    {checkAllIcon}
                </button>
                <h1 className="font-bold">Action</h1>
            </div>
            <div className="flex-1 flex items-center gap-2 h-auto">
                <div className="flex-col flex-1">
                    <h1 className="font-bold">Department Name</h1>
                    <TextInput
                        textLabel=""
                        value={data.name}
                        onChange={(value) => {
                            setData({ ...data, name: value });
                            onTextChange('name', data.name);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col w-24">
                    <h1 className="font-bold">Level</h1>
                    <TextInput
                        textLabel=""
                        value={data.level}
                        onChange={(value) => {
                            setData({ ...data, level: value });
                            onTextChange('level', data.level);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col w-48">
                    <h1 className="font-bold">District</h1>
                    <TextInput
                        textLabel=""
                        value={data.district}
                        onChange={(value) => {
                            setData({ ...data, district: value });
                            onTextChange('district', data.district);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col w-48">
                    <h1 className="font-bold">Ward</h1>
                    <TextInput
                        textLabel=""
                        value={data.ward}
                        onChange={(value) => {
                            setData({ ...data, ward: value });
                            onTextChange('ward', data.ward);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>

            </div>
        </div>
    );
}