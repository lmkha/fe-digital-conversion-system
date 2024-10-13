'use client';
import { TextField } from '@mui/material';
import { useRef, useState } from 'react';


interface FilerProps {
    onTextChange: (key: 'type' | 'permissionCode' | 'permissionName', value: string) => void;
    onSubmitted: ({ type, permissionCode, permissionName }: { type: string; permissionCode: string; permissionName: string }) => void;
}

export default function Filter({ onTextChange, onSubmitted }: FilerProps) {
    const [data, setData] = useState<{
        type: string;
        permissionCode: string;
        permissionName: string;
    }>({
        type: '',
        permissionCode: '',
        permissionName: ''
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // To store the timeout reference

    const changeData = (key: 'type' | 'permissionCode' | 'permissionName', value: string) => {
        setData(prevData => {
            const newData = { ...prevData, [key]: value };
            onTextChange(key, value);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onSubmitted({ type: newData.type, permissionCode: newData.permissionCode, permissionName: newData.permissionName });
            }, 3000);

            return newData;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            onSubmitted({ type: data.type, permissionCode: data.permissionCode, permissionName: data.permissionName });
        }
    };

    return (
        <div className="flex bg-gray-200 p-2 mt-3 rounded-t-md text-black">
            <div className="flex justify-center gap-1 mr-5 w-1/6 ">
                <h1 className="font-semibold text-center">No</h1>
            </div>
            <div className="flex flex-1 items-center justify-start gap-2 h-auto">
                <div className="flex-col w-auto mr-4">
                    <h1 className="font-semibold mb-3">Type</h1>
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '5px',  // Bo góc cho TextField
                            }

                        }}
                        value={data.type}
                        onChange={(e) => {
                            changeData('type', e.target.value);
                            onTextChange('type', e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='flex-1 flex gap-4'>
                    <div className="flex-col w-3/5">
                        <h1 className="font-semibold mb-3">Permission Code</h1>
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '5px',  // Bo góc cho TextField
                                },
                                backgroundColor: 'white',
                            }}
                            value={data.permissionCode}
                            onChange={(e) => {
                                changeData('permissionCode', e.target.value);
                                onTextChange('permissionCode', e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="flex-col w-2/5">
                        <h1 className="font-semibold mb-3">Permission Name</h1>
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            sx={{
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '5px',  // Bo góc cho TextField
                                },
                                backgroundColor: 'white'
                            }}
                            value={data.permissionName}
                            onChange={(e) => {
                                changeData('permissionName', e.target.value);
                                onTextChange('permissionName', e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
