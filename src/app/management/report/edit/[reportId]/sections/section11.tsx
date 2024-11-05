import { Divider, Stack, TextField, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";
import Row1 from "../components/row1";

export default function Section11() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>11. Tổ chức cung cấp dịch vụ</Typography>
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