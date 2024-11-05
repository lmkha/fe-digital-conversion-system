import { Divider, Stack, TextField, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";
import Row1 from "../components/row1";

export default function Section12() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>12. Thời điểm tổ chức tiến hành đánh giá định kỳ nguy cơ rủi ro về ATVSLĐ</Typography>
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