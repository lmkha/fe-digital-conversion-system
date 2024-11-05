import { Divider, Stack, Typography } from "@mui/material";
import Row3, { Row3Data } from "../components/row3";

export interface Section1Data {
    row1?: Row3Data;
    row2?: Row3Data;
    row3?: Row3Data;
}

interface Section1Props {
    data?: Section1Data;
    onChange?: (data: Section1Data) => void;
}

export default function Section1({ data, onChange }: Section1Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>1. Thông tin lao động</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3
                    label1="Tổng số lao động"
                    label2="Người làm công tác ATVSLĐ"
                    label3="Người làm công tác y tế"
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row3
                    label1="Lao động nữ"
                    label2="Lao động làm việc trong điều kiện độc hai"
                    label3="Lao động là người chưa thành niên"
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
                <Row3
                    label1="Lao động dưới 15 tuổi"
                    label2="Lao động người khuyết tật"
                    label3="Lao động người cao tuổi"
                    value={data?.row3}
                    onChange={(value) => onChange?.({ ...data, row3: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}