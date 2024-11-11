'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";
export interface Section7Data {
    row1?: TripleTextFieldGroupData;
}
interface Section7Props {
    inputData?: Section7Data;
    onChange?: (data: Section7Data) => void;
}

export default function Section7({
    inputData,
    onChange
}: Section7Props) {
    const [data, setData] = useState<Section7Data>();
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
                <TripleTextFieldGroup
                    label1="Tổng số người làm thêm trong năm (người)"
                    label2="Tổng số giờ làm thêm trong năm (người)"
                    label3="Số giờ làm thêm cao nhất trong 1 tháng (người)"
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    defaultValue3={inputData?.row1?.value3 || '0'}
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
            </Stack>
        </>
    );
}
