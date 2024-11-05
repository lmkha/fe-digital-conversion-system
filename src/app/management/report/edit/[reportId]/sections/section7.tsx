import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section7() {
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
        </>
    );
}