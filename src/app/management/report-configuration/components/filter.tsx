/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { FilterData } from "../types";
import AutoComplete from "../../user/components/autocomplete";
import dayjs from "dayjs";
import MyDatePicker from "../../components/date-picker";

interface FilterProps {
    onSubmitted: (filterData: FilterData) => void;
}

export default function Filter({ onSubmitted }: FilterProps) {
    const [data, setData] = useState<FilterData>({
        reportName: 'Báo cáo ATVSLĐ',
    });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const changeData = (key: 'year' | 'reportPeriod' | 'startDate' | 'finishDate' | 'status', value: string) => {
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
                <Grid2 container sx={{ width: '100%' }} spacing={1}>
                    {/* Left side */}
                    <Grid2 container size={5} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'end',
                    }}>
                        {/* Action */}
                        <Grid2 size={2} sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                            <Typography variant="body1" fontWeight={'bold'}>Thao tác</Typography>
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
                                    onChange={(e) => {
                                        changeData('year', e.target.value);
                                    }}
                                    onKeyDown={handleKeyDown}
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
                                    disabled={true}
                                    label=""
                                    value={{ id: data.reportName || '', name: data.reportName || '' }}
                                    options={[]}
                                    onChange={(value) => { }}
                                    width="100%"
                                />
                            </Stack>
                        </Grid2>
                    </Grid2>

                    {/* Right side */}
                    <Grid2 container size={7} sx={{
                        justifyContent: 'space-between',
                        alignItems: 'end',
                    }}>
                        <Grid2 container size={6} sx={{
                            justifyContent: 'space-between',
                            alignItems: 'end',
                        }}>
                            {/* Report period */}
                            <Grid2 size={5}>
                                <Stack spacing={1} sx={{
                                    justifyContent: 'center',
                                    alignItems: 'start',
                                }}>
                                    <Typography variant="body1" fontWeight={'bold'}>Kỳ báo cáo</Typography>
                                    <AutoComplete
                                        label=""
                                        value={{
                                            id: data.reportPeriod || '',
                                            name: data.reportPeriod || ''
                                        }}
                                        options={[
                                            {
                                                name: 'Cả năm',
                                                id: 'Cả năm'
                                            },
                                            {
                                                name: '6 tháng',
                                                id: '6 tháng'
                                            }
                                        ]}
                                        onChange={(value) => {
                                            setData(prevData => ({ ...prevData, reportPeriod: value.id }));
                                            onSubmitted({ ...data, reportPeriod: value.id });
                                        }}
                                        width="100%"
                                    />
                                </Stack>
                            </Grid2>
                            {/* Start date */}
                            <Grid2 size={7} >
                                <Stack sx={{
                                    justifyContent: 'center',
                                    alignItems: 'start',
                                }}>
                                    <Typography variant="body1" fontWeight={'bold'}>Thời gian bắt đầu</Typography>
                                    <MyDatePicker
                                        label=""
                                        value={data?.startDate ? dayjs(data.startDate, 'DD/MM/YYYY') : null}
                                        onChange={(newValue) => {
                                            if (newValue?.isValid()) {
                                                const formattedDate = newValue.format('DD/MM/YYYY');
                                                setData(prevData => ({
                                                    ...prevData,
                                                    startDate: formattedDate,
                                                }));
                                                onSubmitted({ ...data, startDate: formattedDate });
                                            } else {
                                                setData(prevData => ({ ...prevData, startDate: undefined }));
                                                onSubmitted({ ...data, startDate: undefined });
                                            }
                                        }}
                                    />
                                </Stack>
                            </Grid2>
                        </Grid2>
                        <Grid2 container size={6} sx={{
                            justifyContent: 'space-between',
                            alignItems: 'end',
                        }}>
                            {/* Finish date */}
                            <Grid2 size={7} sx={{
                                justifyContent: 'center',
                                alignItems: 'end',
                            }}>
                                <Stack>
                                    <Typography variant="body1" fontWeight={'bold'}>Thời gian kết thúc</Typography>
                                    <MyDatePicker
                                        label=""
                                        value={data?.finishDate ? dayjs(data.finishDate, 'DD/MM/YYYY') : null}
                                        onChange={(newValue) => {
                                            if (newValue?.isValid()) {
                                                const formattedDate = newValue.format('DD/MM/YYYY');
                                                setData(prevData => ({
                                                    ...prevData,
                                                    finishDate: formattedDate,
                                                }));
                                                onSubmitted({ ...data, finishDate: formattedDate });
                                            } else {
                                                setData(prevData => ({ ...prevData, finishDate: undefined }));
                                                onSubmitted({ ...data, finishDate: undefined });
                                            }
                                        }}
                                    // width="78%"
                                    />
                                </Stack>
                            </Grid2>
                            {/* Status */}
                            <Grid2 size={5}>
                                <Stack spacing={1} sx={{
                                    justifyContent: 'center',
                                    alignItems: 'start',
                                }}>
                                    <Typography variant="body1" fontWeight={'bold'}>Trạng thái</Typography>
                                    <AutoComplete
                                        label=""
                                        value={{
                                            id: data.status || '',
                                            name: data.status === '1' ? 'Đã kích hoạt' : data.status === '0' ? 'Chưa kích hoạt' : ''
                                        }}
                                        options={[
                                            {
                                                name: 'Chưa kích hoạt',
                                                id: '0'
                                            },
                                            {
                                                name: 'Đã kích hoạt',
                                                id: '1'
                                            }
                                        ]}
                                        onChange={(value) => {
                                            if (!value) {
                                                setData(prevData => ({ ...prevData, status: undefined }));
                                            } else {
                                                setData(prevData => ({ ...prevData, status: value.id as '0' | '1' }));
                                            }
                                            onSubmitted({ ...data, status: value.id as '0' | '1' });
                                        }}
                                        width="100%"
                                    />
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>

            </Stack>
        </Box>
    );
}
