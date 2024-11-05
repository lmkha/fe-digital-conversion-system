import { Divider, Stack, Typography } from "@mui/material";
import Row3 from "../components/row3";

export default function Section2() {
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