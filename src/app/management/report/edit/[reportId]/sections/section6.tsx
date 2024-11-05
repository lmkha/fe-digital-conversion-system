import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3, { Row3Data } from "../components/row3";
export interface Section6Data {
    row1?: Row3Data;
    row2?: Row3Data;
}
interface Section3Props {
    data?: Section6Data;
    onChange?: (data: Section6Data) => void;
}

export default function Section6({ data, onChange }: Section3Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>6. Máy, thiết bị có yêu cầu nghiêm ngặt về ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Tổng số"
                    label2="Máy có yêu cầu nghiêm ngặt ATVSLĐ đang sử dụng"
                    label3="Số đã được kiểm định"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row3
                    label1="Số chưa được kiểm định"
                    label2="Số đã được khai báo"
                    label3="Số chưa được khai báo"
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}