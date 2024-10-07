'use client';
import TextInput from "@/core/components/text-input";
import { useEffect, useState, useRef } from "react";
import { RiCheckboxIndeterminateFill, RiCheckboxIndeterminateLine } from "react-icons/ri";

interface FilterProps {
    isCheck: boolean;
    onTextChange: (key: 'name' | 'level' | 'district' | 'ward', value: string) => void;
    onCheckAllChange: (isCheck: boolean) => void;
    onSubmitted: ({ name, level, district, ward }: { name: string; level: string; district: string; ward: string }) => void;
}

export default function Filter({ isCheck, onTextChange, onCheckAllChange, onSubmitted }: FilterProps) {
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

    const [checkAllIcon, setCheckAllIcon] = useState(<RiCheckboxIndeterminateLine className="text-2xl" />);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // To store the timeout reference

    const changeData = (key: 'name' | 'level' | 'district' | 'ward', value: string) => {
        setData(prevData => {
            const newData = { ...prevData, [key]: value };
            onTextChange(key, value);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                console.log(`Final data: ${newData.name}, ${newData.level}, ${newData.district}, ${newData.ward}`);
                onSubmitted({ name: newData.name, level: newData.level, district: newData.district, ward: newData.ward });
            }, 3000);

            return newData;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            onSubmitted({ name: data.name, level: data.level, district: data.district, ward: data.ward });
        }
    };

    useEffect(() => {
        if (data.isCheck) {
            setCheckAllIcon(<RiCheckboxIndeterminateFill className="text-2xl text-blue-700" />);
        } else {
            setCheckAllIcon(<RiCheckboxIndeterminateLine className="text-2xl" />);
        }
    }, [data]);

    return (
        <div className="flex bg-gray-200 p-2 rounded-t-md text-black">
            <div className="flex items-start gap-1 mr-5">
                <button
                    onClick={() => {
                        onCheckAllChange(!data.isCheck);
                        setData({ ...data, isCheck: !data.isCheck });
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
                        onChange={(value) => changeData('name', value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col w-24">
                    <h1 className="font-bold">Level</h1>
                    <TextInput
                        textLabel=""
                        value={data.level}
                        onChange={(value) => changeData('level', value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col w-48">
                    <h1 className="font-bold">District</h1>
                    <TextInput
                        textLabel=""
                        value={data.district}
                        onChange={(value) => changeData('district', value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col w-48">
                    <h1 className="font-bold">Ward</h1>
                    <TextInput
                        textLabel=""
                        value={data.ward}
                        onChange={(value) => changeData('ward', value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}
