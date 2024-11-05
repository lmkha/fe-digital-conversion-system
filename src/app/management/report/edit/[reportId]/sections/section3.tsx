import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section3() {
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