'use client';

import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FilterData } from "../types";
import AutoComplete from "../../user/components/autocomplete";
import { ReportStatus } from "@/api/report";
import { Level } from "@/core/types/level";

interface FilterProps {
    onSubmitted: (filterData: FilterData) => void;
}

export default function Filter({ onSubmitted }: FilterProps) {
    const [data, setData] = useState<FilterData>();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const changeData = (
        key: 'status' | 'departmentName' | 'level' | 'startDate' | 'finishDate' | 'reportPeriod' | 'updatedAt' | 'userUpdateName' | 'year',
        value: string | ReportStatus | number | Level
    ) => {
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
                                <AutoComplete
                                    label=""
                                    value={{
                                        id: data?.status || '',
                                        name: data?.status || ''
                                    }}
                                    options={Object.values(ReportStatus).map((status) => ({ id: status, name: status }))}
                                    onChange={(value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                status: value.id as ReportStatus
                                            })
                                            onSubmitted({
                                                ...data,
                                                status: value.id as ReportStatus
                                            });
                                        } else {
                                            setData({
                                                ...data,
                                                status: undefined
                                            })
                                            onSubmitted({
                                                ...data,
                                                status: undefined
                                            });
                                        }
                                    }}
                                    width="100%"
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
                                    onChange={(event) => changeData('departmentName', event.target.value)}
                                    onKeyDown={handleKeyDown}
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
                                <AutoComplete
                                    label=""
                                    value={{
                                        id: data?.level ? data.level.toString() : '',
                                        name: data?.level ? data.level.toString() : ''
                                    }}
                                    options={[
                                        { id: '1', name: '1' },
                                        { id: '2', name: '2' },
                                        { id: '3', name: '3' },
                                        { id: '4', name: '4' },
                                    ]}
                                    onChange={(value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                level: parseInt(value.id) as Level
                                            })
                                            onSubmitted({
                                                ...data,
                                                level: parseInt(value.id) as Level
                                            });
                                        } else {
                                            setData({
                                                ...data,
                                                level: undefined
                                            })
                                            onSubmitted({
                                                ...data,
                                                level: undefined
                                            });
                                        }
                                    }}
                                    width="100%"
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
                                    onChange={(event) => changeData('startDate', event.target.value)}
                                    onKeyDown={handleKeyDown}
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
                                    onChange={(event) => changeData('finishDate', event.target.value)}
                                    onKeyDown={handleKeyDown}
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
                                <AutoComplete
                                    label=""
                                    value={{
                                        id: data?.reportPeriod || '',
                                        name: data?.reportPeriod || ''
                                    }}
                                    options={[
                                        { id: "Cả năm", name: "Cả năm" },
                                        { id: "6 tháng", name: "6 tháng" },
                                    ]}
                                    onChange={(value) => {
                                        if (value) {
                                            setData({
                                                ...data,
                                                reportPeriod: value.id
                                            })
                                            onSubmitted({
                                                ...data,
                                                reportPeriod: value.id
                                            });
                                        } else {
                                            setData({
                                                ...data,
                                                reportPeriod: undefined
                                            })
                                            onSubmitted({
                                                ...data,
                                                reportPeriod: undefined
                                            });
                                        }
                                    }}
                                    width="100%"
                                />
                            </Stack>
                        </Grid2>
                        {/* Updated at */}
                        <Grid2 size={3}>
                            <Stack spacing={1} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" fontWeight={'bold'}>Cập nhật lúc</Typography>
                                <TextField
                                    size="small"
                                    sx={{ width: '100%', backgroundColor: 'white' }}
                                    onChange={(event) => changeData('updatedAt', event.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>
                    {/* Updated By */}
                    <Grid2 container size={2}>
                        <Stack spacing={1} sx={{
                            justifyContent: 'center',
                            alignItems: 'start',
                        }}>
                            <Typography variant="body1" fontWeight={'bold'}>Cập nhật bởi</Typography>
                            <TextField
                                size="small"
                                sx={{ width: '100%', backgroundColor: 'white' }}
                                onChange={(event) => changeData('userUpdateName', event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Stack>
                    </Grid2>
                </Grid2>
            </Stack>
        </Box>
    );
}
