import { Divider, Stack, TextField, Typography } from "@mui/material";
import { SingleTextFieldData } from "../components/single-tf-group";
import { MonthYearTextField } from "../components/month-year-text-field";
import dayjs from "dayjs";
import { useState } from "react";
export interface Section12Data {
    row1?: SingleTextFieldData;
}
interface Section12Props {
    inputData?: Section12Data;
    onChange?: (data: Section12Data) => void;
}

export default function Section12({
    inputData,
    onChange

}: Section12Props) {
    const [data, setData] = useState<Section12Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>12. Thời điểm tổ chức tiến hành đánh giá định kỳ nguy cơ rủi ro về ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <MonthYearTextField
                    label1="Tháng/ Năm"
                    defaultValue1={inputData?.row1?.value1 || dayjs().format('MM/YYYY')}
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}