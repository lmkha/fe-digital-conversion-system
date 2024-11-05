import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section4() {
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