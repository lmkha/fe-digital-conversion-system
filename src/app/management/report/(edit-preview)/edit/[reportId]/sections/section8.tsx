'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import { useState } from "react";
export interface Section8Data {
    row1?: DoubleTextFieldGroupData;
}
interface Section8Props {
    inputData?: Section8Data;
    onChange?: (data: Section8Data) => void;
}

export default function Section8({
    inputData,
    onChange
}: Section8Props) {
    const [data, setData] = useState<Section8Data>();
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
                <DoubleTextFieldGroup
                    label1="Tổng số người"
                    label2="Tổng chi phí quy định tại điểm 10 "
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0.0'}
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
