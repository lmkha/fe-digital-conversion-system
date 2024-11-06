import { Divider, Stack, Typography } from "@mui/material";
import Row2, { Row2Data } from "../components/row2";
import Row3 from "../components/row3";
export interface Section8Data {
    row1?: Row2Data;
}
interface Section8Props {
    data?: Section8Data;
    onChange?: (data: Section8Data) => void;
}

export default function Section8({
    data = {
        row1: { value1: "0", value2: "0.0" },
    },
    onChange
}: Section8Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>8. Bồi dưỡng chống độc hại bằng hiện vật</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row2
                    label1="Tổng số người"
                    label2="Tổng chi phí quy định tại điểm 10 "
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}