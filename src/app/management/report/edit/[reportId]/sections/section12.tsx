import { Divider, Stack, TextField, Typography } from "@mui/material";
import { Row1Data } from "../components/row1";
import { MonthYearTextField } from "../components/month-year-text-field";
import dayjs from "dayjs";
export interface Section12Data {
    row1?: Row1Data;
}
interface Section12Props {
    data?: Section12Data;
    onChange?: (data: Section12Data) => void;
}

export default function Section12({
    data = {
        row1: { value1: dayjs().format('MM/YYYY') },
    },
    onChange

}: Section12Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>12. Thời điểm tổ chức tiến hành đánh giá định kỳ nguy cơ rủi ro về ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <MonthYearTextField
                    value={data?.row1}
                    label1="Tháng/ Năm"
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}