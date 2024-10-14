'use client';
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";

interface AddEditFilterProps {
    onTextChange: (key: 'code' | 'name', value: string) => void;
    onSubmitted: ({ code, name }: { code: string; name: string }) => void;
}

export default function AddEditFilter({ onTextChange, onSubmitted }: AddEditFilterProps) {
    const [data, setData] = useState<{
        code: string;
        name: string;
    }>({
        code: '',
        name: '',
    });

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

    return (
        <Box sx={{
            position: 'relative',
            height: 110,
            bgcolor: '#F4F6F8'
        }}>
            <Stack
                direction={'row'}
                justifyContent={'end'}
                alignItems={'end'}
                justifyItems={'end'}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    gap: 2,
                    pr: 2,
                    pb: 1,
                }}
            >
                <Stack gap={1} sx={{ width: '40%' }}>
                    <Typography fontWeight={'bold'}>
                        Mã quyền
                    </Typography>
                    <TextField
                        id="role-code"
                        label=""
                        variant="outlined"
                        sx={{ bgcolor: 'white', width: '100%', height: 56 }}
                        value={data.code}
                        onChange={(e) => changeData('code', e.target.value)}
                    />
                </Stack>
                <Stack gap={1} sx={{ width: '40%' }}>
                    <Typography fontWeight={'bold'}>
                        Tên quyền
                    </Typography>
                    <TextField
                        id="role-name"
                        label=""
                        variant="outlined"
                        sx={{ bgcolor: 'white', width: '100%', height: 56 }}
                        value={data.name}
                        onChange={(e) => changeData('name', e.target.value)}
                    />
                </Stack>
            </Stack>
        </Box>
    );
}
