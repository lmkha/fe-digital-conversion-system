import { Divider, Stack, Typography } from "@mui/material";
import Row3, { Row3Data } from "../components/row3";
import Row1, { Row1Data } from "../components/row1";
export interface Section10Data {
    row1?: Row3Data;
    row2?: Row3Data;
    row3?: Row1Data;
}
interface Section10Props {
    data?: Section10Data;
    onChange?: (data: Section10Data) => void;
}

export default function Section10({
    data = {
        row1: { value1: "0.0", value2: "0.0", value3: "0.0" },
        row2: { value1: "0.0", value2: "0.0", value3: "0.0" },
        row3: { value1: "0.0" }
    },
    onChange
}: Section10Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>10. Chi phí thực hiện kế hoạch ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Các biện pháp kỹ thuật an toàn "
                    label2="Các biện pháp kỹ thuật vệ sinh "
                    label3="Trang bị phương tiện bảo vệ cá nhân"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row3
                    label1="Chăm sóc sức khỏe người lao động"
                    label2="Tuyên truyền huấn luyện"
                    label3="Đánh giá nguy cơ rủi tro về ATVSLĐ "
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
                <Row1
                    label1="Chi khác "
                    value={data?.row3}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
