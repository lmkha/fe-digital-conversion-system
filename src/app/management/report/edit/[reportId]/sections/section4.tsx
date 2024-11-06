import { Divider, Stack, Typography } from "@mui/material";
import Row2, { Row2Data } from "../components/row2";
import Row3, { Row3Data } from "../components/row3";

export interface Section4Data {
    row1?: Row3Data;
    row2?: Row2Data;
}
interface Section4Props {
    data?: Section4Data;
    onChange?: (data: Section4Data) => void;
}

export default function Section4({
    data = {
        row1: { value1: "0", value2: "0", value3: "0" },
        row2: { value1: "0", value2: "0" },
    },
    onChange
}: Section4Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>4. Kết quả phân loại sức khỏe người lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Loại I (Người)"
                    label2="Loại II (Người)"
                    label3="Loại III (Người)"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row2
                    label1="Loại IV (Người)"
                    label2="Loại V (Người)"
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
