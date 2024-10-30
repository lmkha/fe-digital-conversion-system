'use client';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';

interface FilerProps {
    onSubmitted: ({ type, permissionCode, permissionName }: PermissionFilterData) => void;
}
export default function Filter({ onSubmitted }: FilerProps) {
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
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            height={100}
            sx={{ backgroundColor: '#F4F6F8E5' }}
        >
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    width: '100%',
                    mb: 1,
                }}
            >
                <Typography fontWeight='bold' width={'20%'} textAlign={'center'}>STT</Typography>
                <Stack width={'15%'}>
                    <Typography fontWeight='bold'>Loại</Typography>
                    <TextField size='small' sx={{ width: '100%', backgroundColor: 'white' }}
                        value={data.type}
                        onChange={(e) => {
                            changeData('type', e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={true}
                    />
                </Stack>

                <Stack width={'35%'}>
                    <Typography fontWeight='bold'>Mã quyền</Typography>
                    <TextField size='small' sx={{ width: '100%', backgroundColor: 'white' }}
                        value={data.permissionCode}
                        onChange={(e) => {
                            changeData('permissionCode', e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>

                <Stack width={'30%'}>
                    <Typography fontWeight='bold'>Tên quyền</Typography>
                    <TextField size='small' sx={{ width: '100%', backgroundColor: 'white' }}
                        value={data.permissionName}
                        onChange={(e) => {
                            changeData('permissionName', e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>
            </Stack>
        </Box>
    );
}
