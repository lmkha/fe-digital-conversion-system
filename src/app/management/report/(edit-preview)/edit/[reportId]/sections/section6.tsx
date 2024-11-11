'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";
export interface Section6Data {
    row1?: TripleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
}
interface Section3Props {
    inputData?: Section6Data;
    onChange?: (data: Section6Data) => void;
}

export default function Section6({
    inputData,
    onChange
}: Section3Props) {
    const [data, setData] = useState<Section6Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>6. Máy, thiết bị có yêu cầu nghiêm ngặt về ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Tổng số"
                    label2="Máy có yêu cầu nghiêm ngặt ATVSLĐ đang sử dụng"
                    label3="Số đã được kiểm định"
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    defaultValue3={inputData?.row1?.value3 || '0'}
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Số chưa được kiểm định"
                    label2="Số đã được khai báo"
                    label3="Số chưa được khai báo"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0'}
                    defaultValue3={inputData?.row2?.value3 || '0'}
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