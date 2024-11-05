import { Divider, Stack, TextField, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";
import Row1, { Row1Data } from "../components/row1";
export interface Section11Data {
    row1?: Row1Data;
    row2?: Row1Data;
}
interface Section11Props {
    data?: Section11Data;
    onChange?: (data: Section11Data) => void;
}

export default function Section11({ data, onChange }: Section11Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>11. Tổ chức cung cấp dịch vụ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ ATVSLĐ được thuê"
                    value={data?.row1?.value1}
                    onChange={(value) => onChange?.({
                        ...data,
                        row1: {
                            value1: value.target.value
                        }
                    })}
                />
                <TextField
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ về y tế được thuê "
                    value={data?.row2?.value1}
                    onChange={(value) => onChange?.({
                        ...data,
                        row2: {
                            value1: value.target.value
                        }
                    })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}