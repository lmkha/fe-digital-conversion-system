'use client';

import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FilterData } from "../types";
import AutoComplete from "../../user/components/autocomplete";

interface FilterProps {
    onSubmitted: (filterData: FilterData) => void;
}

export default function Filter({ onSubmitted }: FilterProps) {
    const [data, setData] = useState<FilterData>();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const changeData = (key: 'year' | 'reportName' | 'reportPeriod' | 'startDate' | 'finishDate' | 'status', value: string) => {
        setData(prevData => {
            const newData = { ...prevData, [key]: value } as FilterData;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onSubmitted(newData);
            }, 3000);

            return newData;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            data && onSubmitted(data);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="flex-end"
            height={90}
            sx={{
                backgroundColor: '#E5E7EB',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                mt: 1
            }}
        >
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    width: '100%',
                    mb: 1,
                    mt: 1,
                }}
            >
                <Grid2 container sx={{ width: '100%' }} spacing={1}
                >
                    {/* Left side */}
                    <Grid2 container size={6}>
                        {/* Action */}
                        <Grid2 size={2}>
                            <Stack sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Thao tác</Typography>
                            </Stack>
                        </Grid2>
                        {/* Year */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Năm báo cáo</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                        {/* Report name */}
                        <Grid2 size={7}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Tên báo cáo</Typography>
                                <AutoComplete
                                    label=""
                                    value={{ id: '', name: '' }}
                                    options={[]}
                                    onChange={(value) => { }}
                                    width="100%"
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>

                    {/* Right side */}
                    <Grid2 container size={6}>
                        {/* Report period */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Kỳ báo cáo</Typography>
                                <AutoComplete
                                    label=""
                                    value={{ id: '', name: '' }}
                                    options={[]}
                                    onChange={(value) => { }}
                                    width="100%"
                                />
                            </Stack>
                        </Grid2>
                        {/* Start date */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Thời gian bắt đầu</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                        {/* Finish date */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Thời gian kết thúc</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                        {/* Status */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Trạng thái</Typography>
                                <AutoComplete
                                    label=""
                                    value={{ id: '', name: '' }}
                                    options={[]}
                                    onChange={(value) => { }}
                                    width="100%"
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Grid2>

            </Stack>
        </Box>
    );
}
