import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section6() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>6. Máy, thiết bị có yêu cầu nghiêm ngặt về ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 label1="Tổng số" label2="Máy có yêu cầu nghiêm ngặt ATVSLĐ đang sử dụng" label3="Số đã được kiểm định" />
                <Row3 label1="Số chưa được kiểm định" label2="Số đã được khai báo" label3="Số chưa được khai báo" />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}