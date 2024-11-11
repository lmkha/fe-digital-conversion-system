'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";

export interface Section4Data {
    row1?: TripleTextFieldGroupData;
    row2?: DoubleTextFieldGroupData;
}
interface Section4Props {
    inputData?: Section4Data;
    onChange?: (data: Section4Data) => void;
}

export default function Section4({
    inputData,
    onChange
}: Section4Props) {
    const [data, setData] = useState<Section4Data>();
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
                <TripleTextFieldGroup
                    label1="Loại I (Người)"
                    label2="Loại II (Người)"
                    label3="Loại III (Người)"
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    defaultValue3={inputData?.row1?.value3 || '0'}
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <DoubleTextFieldGroup
                    label1="Loại IV (Người)"
                    label2="Loại V (Người)"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0'}
                    onChange={(value) => {
                        onChange?.({ ...data, row2: value });
                        setData({ ...data, row2: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
