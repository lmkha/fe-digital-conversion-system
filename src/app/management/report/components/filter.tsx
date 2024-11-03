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
                    <Grid2 container size={2}>
                        {/* Action */}
                        <Grid2 size={5}>
                            <Typography variant="body1" fontWeight={'bold'} sx={{
                                textAlign: 'center',
                            }}>Thao tác</Typography>
                        </Grid2>
                        {/* Status */}
                        <Grid2 size={7}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Trạng thái</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>

                    <Grid2 container size={3}>
                        {/* Department name */}
                        <Grid2 size={8}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Tên phòng ban</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                        {/* Level */}
                        <Grid2 size={4}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Cấp</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>

                    <Grid2 container size={5}>
                        {/* Start date */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Ngày bắt đầu</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                        {/* Finish day */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Ngày kết thúc</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>

                        {/* Reporting period */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Kỳ báo cáo</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                        {/* Created at */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Thời gian tạo</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>


                    {/* Create By */}
                    <Grid2 container size={2}>
                        <Stack spacing={1} sx={{
                            justifyContent: 'center',
                            alignItems: 'start',
                        }}>
                            <Typography variant="body1" fontWeight={'bold'}>Người tạo</Typography>
                            <TextField
                                size="small"
                                sx={{ width: '100%', backgroundColor: 'white' }}
                            />
                        </Stack>
                    </Grid2>

                </Grid2>

            </Stack>
        </Box>
    );
}
