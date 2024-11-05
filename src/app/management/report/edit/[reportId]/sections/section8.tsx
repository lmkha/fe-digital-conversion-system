import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section8() {
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