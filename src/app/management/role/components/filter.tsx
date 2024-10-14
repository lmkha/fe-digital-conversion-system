'use client';
import TextInput from "@/core/components/text-input";
import { useEffect, useState, useRef } from "react";
import { RiCheckboxIndeterminateFill, RiCheckboxIndeterminateLine } from "react-icons/ri";

interface FilterProps {
    isCheck: boolean;
    onTextChange: (key: 'code' | 'name', value: string) => void;
    onCheckAllChange: (isCheck: boolean) => void;
    onSubmitted: ({ code, name }: { code: string; name: string }) => void;
}

export default function Filter({ isCheck, onTextChange, onCheckAllChange, onSubmitted }: FilterProps) {
    const [data, setData] = useState<{
        isCheck: boolean;
        code: string;
        name: string;
    }>({
        isCheck: isCheck,
        code: '',
        name: '',
    });

    const [checkAllIcon, setCheckAllIcon] = useState(<RiCheckboxIndeterminateLine className="text-2xl text-gray-500 hover:text-black" />);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // To store the timeout reference

    const changeData = (key: 'code' | 'name', value: string) => {
        setData(prevData => {
            const newData = { ...prevData, [key]: value };
            onTextChange(key, value);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onSubmitted({ code: newData.code, name: newData.name });
            }, 3000);

            return newData;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            onSubmitted({ code: data.code, name: data.name });
        }
    };

    useEffect(() => {
        if (data.isCheck) {
            setCheckAllIcon(<RiCheckboxIndeterminateFill className="text-2xl text-blue-700" />);
        } else {
            setCheckAllIcon(<RiCheckboxIndeterminateLine className="text-2xl text-gray-500 hover:text-black" />);
        }
    }, [data]);

    return (
        <div className="flex bg-gray-200 p-2 mt-3 rounded-t-md text-black">
            <div className="flex items-start justify-center gap-4 mr-5 w-28">
                <button
                    onClick={() => {
                        onCheckAllChange(!data.isCheck);
                        setData({ ...data, isCheck: !data.isCheck });
                    }}
                >
                    {checkAllIcon}
                </button>
                <h1 className="font-semibold">Chọn</h1>
            </div>
            <div className="flex-1 flex items-center gap-2 h-auto">
                <div className="flex-col w-1/4">
                    <h1 className="font-semibold">Mã vai trò</h1>
                    <TextInput
                        textLabel=""
                        value={data.code}
                        onChange={(value) => changeData('code', value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex-col flex-1">
                    <h1 className="font-semibold">Tên vai trò</h1>
                    <TextInput
                        textLabel=""
                        value={data.name}
                        onChange={(value) => changeData('name', value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}
