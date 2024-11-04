/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Box, Divider, Grid2, Stack, TextField, Typography } from "@mui/material";
import HorizontalLinearStepper from "./components/stepper";
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportDetail() {
    const router = useRouter();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    // ------------------------
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    // ------------------------

    useEffect(() => {
        setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
        setHeaderButtons([
            {
                type: 'cancel',
                onClick: () => {
                    router.push('/management/report');
                },
                label: 'Hủy'
            },
            {
                type: 'add',
                onClick: () => {
                    handleNext();
                },
                label: 'Bước tiếp theo'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
            }}>
                <HorizontalLinearStepper activeStep={activeStep} />
            </Box>
            <Stack direction={'column'}
                sx={{
                    maxHeight: '75vh',
                    overflowY: 'auto',
                    pr: 1
                }}
            >
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
                <Section9 />
                <Section10 />
                <Section11 />
                <Section12 />
            </Stack>
        </>
    );
};

function Row3() {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Grid2>
        </Grid2>
    );
}

function Row2() {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Grid2>

            <Grid2 size={4}>

            </Grid2>
        </Grid2>
    );
}

function Row1() {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Grid2>

            <Grid2 size={4}>

            </Grid2>

            <Grid2 size={4}>

            </Grid2>
        </Grid2>
    );
}

function Section1() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>1. Thông tin lao động</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row3 />
                <Row3 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section2() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>2. Thông tin tai nạn lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row3 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section3() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>3. Bệnh nghề nghiệp</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row2 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section4() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>4. Kết quả phân loại sức khỏe người lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row2 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section5() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>5. Huấn luyện về vệ sinh an toàn lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row3 />
                <Row3 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section6() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>6. Máy, thiết bị có yêu cầu nghiêm ngặt về ATVSLĐ</Typography>
                {/* <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography> */}
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row3 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section7() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>7. Thời gian làm việc, thời gian nghỉ ngơi</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
            </Stack>
            {/* <Divider sx={{ marginBottom: 2 }} /> */}
        </>
    );
}

function Section8() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>8. Bồi dưỡng chống độc hại bằng hiện vật</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row2 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section9() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>9. Tình hình quan trắc môi trường</Typography>
                {/* <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography> */}
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row2 />
                <Row3 />
                <Row3 />
                <Row3 />
                <Row2 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section10() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>10. Chi phí thực hiện kế hoạch ATVSLĐ</Typography>
                {/* <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography> */}
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 />
                <Row3 />
                <Row1 />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section11() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>11. Tổ chức cung cấp dịch vụ</Typography>
                {/* <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography> */}
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
                <TextField
                    size="small"
                    fullWidth
                    label="Tổng số lao động"
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}

function Section12() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>12. Thời điểm tổ chức tiến hành đánh giá định kỳ nguy cơ rủi ro về ATVSLĐ</Typography>
                {/* <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography> */}
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TextField
                    size="small"
                    sx={{ width: '30%' }}
                    label="Tổng số lao động"
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}


