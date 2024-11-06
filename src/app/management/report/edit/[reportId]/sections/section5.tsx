import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3, { Row3Data } from "../components/row3";
export interface Section5Data {
    row1?: Row3Data;
    row2?: Row3Data;
    row3?: Row3Data;
}
interface Section5Props {
    data?: Section5Data;
    onChange?: (data: Section5Data) => void;
}


export default function Section5({
    data = {
        row1: { value1: "0/0", value2: "0/0", value3: "0/0" },
        row2: { value1: "0/0", value2: "0/0", value3: "0/0" },
        row3: { value1: "0/0", value2: "0/0", value3: "0.0" }
    },
    onChange
}: Section5Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>5. Huấn luyện về vệ sinh an toàn lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Nhóm 1: SL huấn luyện/SL hiện có "
                    label2="Nhóm 2: SL huấn luyện/SL hiện có (người/người)"
                    label3="Nhóm 3: SL huấn luyện/SL hiện có (người/người)"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row3
                    label1="Trong đó: Tự huấn luyện"
                    label2="Thuê tổ chức cung cấp dịch vụ huấn luyện"
                    label3="Nhóm 4: SL huấn luyện/SL hiện có (người/người)"
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
                <Row3
                    label1="Nhóm 5: SL huấn luyện/SL hiện có (người/người)"
                    label2="Nhóm 6: SL huấn luyện/SL hiện có (người/người)"
                    label3="Tổng chi phí huấn luyện "
                    endAdornmentText3="Triệu đồng"
                    value={data?.row3}
                    onChange={(value) => onChange?.({ ...data, row3: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}