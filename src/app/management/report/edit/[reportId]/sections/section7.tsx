import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3, { Row3Data } from "../components/row3";
export interface Section7Data {
    row1?: Row3Data;
}
interface Section7Props {
    data?: Section7Data;
    onChange?: (data: Section7Data) => void;
}

export default function Section7({
    data = {
        row1: { value1: "0", value2: "0", value3: "0" },
    },
    onChange
}: Section7Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>7. Thời gian làm việc, thời gian nghỉ ngơi</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Tổng số người làm thêm trong năm (người)"
                    label2="Tổng số giờ làm thêm trong năm (người)"
                    label3="Số giờ làm thêm cao nhất trong 1 tháng (người)"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
            </Stack>
        </>
    );
}