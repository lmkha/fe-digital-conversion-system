import { Divider, Stack, Typography } from "@mui/material";
import Row2, { Row2Data } from "../components/row2";
import Row3, { Row3Data } from "../components/row3";

export interface Section3Data {
    row1?: Row3Data;
    row2?: Row2Data;
}
interface Section3Props {
    data?: Section3Data;
    onChange?: (data: Section3Data) => void;
}

export default function Section3({
    data = {
        row1: { value1: "0", value2: "0", value3: "0" },
        row2: { value1: "0", value2: "0.0" },
    },
    onChange
}: Section3Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>3. Bệnh nghề nghiệp</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Tổng số người bị BNN tới thời điểm BC"
                    label2="Số người mắc mới BNN"
                    label3="Số ngày công nghỉ phép về BNN"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row2
                    label1="Số người phải nghỉ trước tuổi hưu vì BNN "
                    label2="Tổng chi phí  BNN phát sinh trong năm"
                    endAdornmentText2="Triệu đồng"
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}