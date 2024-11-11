'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";

export interface Section3Data {
    row1?: TripleTextFieldGroupData;
    row2?: DoubleTextFieldGroupData;
}
interface Section3Props {
    inputData?: Section3Data;
    onChange?: (data: Section3Data) => void;
}

export default function Section3({
    inputData,
    onChange
}: Section3Props) {
    const [data, setData] = useState<Section3Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>3. Bệnh nghề nghiệp</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Tổng số người bị BNN tới thời điểm BC"
                    label2="Số người mắc mới BNN"
                    label3="Số ngày công nghỉ phép về BNN"
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    defaultValue3={inputData?.row1?.value3 || '0'}
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <DoubleTextFieldGroup
                    label1="Số người phải nghỉ trước tuổi hưu vì BNN "
                    label2="Tổng chi phí  BNN phát sinh trong năm"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0.0'}
                    endAdornmentText2="Triệu đồng"
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