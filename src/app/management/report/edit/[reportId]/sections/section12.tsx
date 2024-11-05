import { Divider, Stack, TextField, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";
import Row1, { Row1Data } from "../components/row1";
export interface Section12Data {
    row1?: Row1Data;
}
interface Section12Props {
    data?: Section12Data;
    onChange?: (data: Section12Data) => void;
}

export default function Section12({ data, onChange }: Section12Props) {
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
                    value={data?.row1?.value1}
                    onChange={(value) => onChange?.({
                        ...data,
                        row1: {
                            value1: value.target.value
                        }
                    })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}