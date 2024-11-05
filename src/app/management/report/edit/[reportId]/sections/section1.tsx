import { Divider, Stack, Typography } from "@mui/material";
import Row3 from "../components/row3";

export default function Section1() {
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