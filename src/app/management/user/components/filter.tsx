'use client';

import { Box, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AutoComplete from "./autocomplete";
import { getRolesByDeptId } from "@/services/role";

interface FilterProps {
    deptId: string;
    onTextChange: (key: 'name' | 'username' | 'email' | 'phone' | 'role' | 'jobTitle' | 'status', value: string) => void;
    onSubmitted: ({ name, username, email, phone, role, jobTitle, status }: { name: string, username: string, email: string, phone: string, role: string, jobTitle: string, status: string }) => void;
}

export default function Filter({ deptId, onTextChange, onSubmitted }: FilterProps) {
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
    const [roles, setRoles] = useState<{
        roleId: string;
        roleName: string;
    }[]>([]);
    const [statusName, setStatusName] = useState<string>('');
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

    useEffect(() => {
        if (deptId) {
            getRolesByDeptId(deptId).then((res) => {
                setRoles(res.roles);
            });
        }
    }, [deptId]);

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
                <Stack width='15%' spacing={2} sx={{ color: 'black' }}>
                    <Typography fontWeight='bold'>Quyền</Typography>
                    <AutoComplete
                        label=""
                        value={{ name: data.role, id: data.role }}
                        options={roles.map(role => ({ id: role.roleId, name: role.roleName })) || []}
                        onChange={(value) => {
                            setData(prevData => ({ ...prevData, role: value.name }));
                            onSubmitted({ name: data.name, username: data.username, email: data.email, phone: data.phone, role: value.name, jobTitle: data.jobTitle, status: data.status });
                        }}
                        width="100%"
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
                    <AutoComplete
                        label=""
                        value={{ name: statusName, id: data.status }}
                        options={[{ id: '1', name: 'Bật' }, { id: '0', name: 'Tắt' }]}
                        onChange={(value) => {
                            setData(prevData => ({ ...prevData, status: value.id }));
                            setStatusName(value.name);
                            onSubmitted({ name: data.name, username: data.username, email: data.email, phone: data.phone, role: data.role, jobTitle: data.jobTitle, status: value.id });
                        }}
                        width="100%"
                    />
                </Stack>

            </Stack>
        </Box>
    );
}
