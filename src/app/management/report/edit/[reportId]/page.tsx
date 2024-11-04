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
                type: 'next',
                onClick: () => {
                    handleNext();
                },
                label: 'Bước tiếp theo'
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <>
            <Stack direction={'column'}
                sx={{
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    pr: 1
                }}
            >
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <HorizontalLinearStepper activeStep={activeStep} />
                </Box>
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

function Row3(
    {
        label1, label2, label3
    }: {
        label1?: string;
        label2?: string;
        label3?: string;
    }
) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label2 || ""}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label3 || ""}
                />
            </Grid2>
        </Grid2>
    );
}

function Row2(
    {
        label1, label2
    }: {
        label1?: string;
        label2?: string;
    }
) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label2 || ""}
                />
            </Grid2>

            <Grid2 size={4}>

            </Grid2>
        </Grid2>
    );
}

function Row1(
    {
        label1
    }: {
        label1?: string;
    }
) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
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
                <Row3 label1="Tổng số lao động" label2="Người làm công tác ATVSLĐ" label3="Người làm công tác y tế" />
                <Row3 label1="Lao động nữ" label2="Lao động làm việc trong điều kiện độc hai" label3="Lao động là người chưa thành niên" />
                <Row3 label1="Lao động dưới 15 tuổi" label2="Lao động người khuyết tật" label3="Lao động người cao tuổi" />
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
                <Row3 label1="Tổng số vụ TNLĐ" label2="Số vụ có người chết" label3="Số người bị TNLĐ" />
                <Row3 label1="Số người chết vì TNLĐ" label2="Tổng chi phí cho TNLĐ" label3="Số ngày công vì TNLĐ" />
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
                <Row3 label1="Tổng số người bị BNN tới thời điểm BC" label2="Số người mắc mới BNN" label3="Số ngày công nghỉ phép về BNN" />
                <Row2 label1="Số người phải nghỉ trước tuổi hưu vì BNN " label2="Tổng chi phí  BNN phát sinh trong năm" />
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
                <Row3 label1="Loại I (Người)" label2="Loại II (Người)" label3="Loại III (Người)" />
                <Row2 label1="Loại IV (Người)" label2="Loại V (Người)" />
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
                <Row3 label1="Nhóm 1: SL huấn luyện/SL hiện có " label2="Nhóm 2: SL huấn luyện/SL hiện có (người/người)" label3="Nhóm 3: SL huấn luyện/SL hiện có (người/người)" />
                <Row3 label1="Trong đó: Tự huấn luyện" label2="Thuê tổ chức cung cấp dịch vụ huấn luyện" label3="Nhóm 4: SL huấn luyện/SL hiện có (người/người)" />
                <Row3 label1="Nhóm 5: SL huấn luyện/SL hiện có (người/người)" label2="Nhóm 6: SL huấn luyện/SL hiện có (người/người)" label3="Tổng chi phí huấn luyện " />
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
                <Row3 label1="Tổng số" label2="Máy có yêu cầu nghiêm ngặt ATVSLĐ đang sử dụng" label3="Số đã được kiểm định" />
                <Row3 label1="Số chưa được kiểm định" label2="Số đã được khai báo" label3="Số chưa được khai báo" />
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
                <Row3 label1="Tổng số người làm thêm trong năm (người)" label2="Tổng số giờ làm thêm trong năm (người)" label3="Số giờ làm thêm cao nhất trong 1 tháng (người)" />
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
                <Row2 label1="Tổng số người" label2="Tổng chi phí quy định tại điểm 10 " />
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
                <Row2 label1="Số mẫu quan trắc môi trường lao động (Mẫu)" label2="Số mẫu không đạt tiêu chuẩn(Mẫu) " />
                <Row3 label1="Mẫu nhiệt độ không đạt (Mẫu /Mẫu )" label2="Mẫu độ ẩm không đạt (Mẫu/Mẫu)" label3="Mẫu tốc độ gió không đạt (Mẫu/Mãu)" />
                <Row3 label1="Mẫu ánh sáng không đạt (Mẫu/Mẫu)" label2="Mẫu tiếng ồn không đạt (Mẫu/Mẫu)" label3="Mẫu bụi không đạt (Mẫu/Mẫu)" />
                <Row3 label1="Mẫu rung không đạt (Mẫu/Mẫu)" label2="Mẫu hơi khí độc không đạt (Mẫu/Mẫu)" label3="Mẫu phóng xạ không đạt (Mẫu/Mẫu)" />
                <Row2 label1="Mẫu điện từ trường không đạt (Mẫu/Mẫu)" label2="Mẫu khác không đạt (Mẫu/Mẫu)" />
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
                <Row3 label1="Các biện pháp kỹ thuật an toàn " label2="Các biện pháp kỹ thuật vệ sinh " label3="Trang bị phương tiện bảo vệ cá nhân" />
                <Row3 label1="Chăm sóc sức khỏe người lao động" label2="Tuyên truyền huấn luyện" label3="Đánh giá nguy cơ rủi tro về ATVSLĐ " />
                <Row1 label1="Chi khác " />
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
                    label="Tên tổ chức dịch vụ ATVSLĐ được thuê"
                />
                <TextField
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ về y tế được thuê "
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
                    label="Tháng/ Năm"
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
