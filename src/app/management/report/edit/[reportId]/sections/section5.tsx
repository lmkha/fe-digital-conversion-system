import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section5() {
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