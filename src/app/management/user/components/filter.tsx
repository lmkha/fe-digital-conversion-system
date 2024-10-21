'use client';

import { Box, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface FilterProps {
    onTextChange: (key: 'name' | 'username' | 'email' | 'phone' | 'role' | 'jobTitle' | 'status', value: string) => void;
    onSubmitted: ({ name, username, email, phone, role, jobTitle, status }: { name: string, username: string, email: string, phone: string, role: string, jobTitle: string, status: string }) => void;
}

export default function Filter({ onTextChange, onSubmitted }: FilterProps) {
    const [data, setData] = useState<{
        name: string;
        username: string;
        email: string;
        phone: string;
        role: string;
        jobTitle: string;
        status: string;
    }>({
        name: '',
        username: '',
        email: '',
        phone: '',
        role: '',
        jobTitle: '',
        status: ''
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // To store the timeout reference

    const changeData = (key: 'name' | 'username' | 'email' | 'phone' | 'role' | 'jobTitle' | 'status', value: string) => {
        setData(prevData => {
            const newData = { ...prevData, [key]: value };
            onTextChange(key, value);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onSubmitted({ name: newData.name, username: newData.username, email: newData.email, phone: newData.phone, role: newData.role, jobTitle: newData.jobTitle, status: newData.status });
            }, 3000);

            return newData;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            onSubmitted({ name: data.name, username: data.username, email: data.email, phone: data.phone, role: data.role, jobTitle: data.jobTitle, status: data.status });
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
                    width: '90%',
                    mb: 1,
                }}
            >
                <Stack width='20%' spacing={2}>
                    <Typography fontWeight='bold'>Họ tên</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('name', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>

                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>Tên tài khoản</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('username', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>
                <Stack width='20%' spacing={2}>
                    <Typography fontWeight='bold'>Email</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('email', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>

                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>SĐT</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('phone', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>
                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>Quyền</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('role', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>
                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>Công việc</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('jobTitle', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>
                <Stack width='10%' spacing={2}>
                    <Typography fontWeight='bold'>Kích hoạt</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }}
                        onChange={(e) => changeData('status', e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Stack>

            </Stack>
        </Box>
    );
}
