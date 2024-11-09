'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";

export interface Section2Data {
    row1?: TripleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
}

interface Section2Props {
    onChange?: (data: Section2Data) => void;
}

export default function Section2({
    onChange
}: Section2Props) {
    const [data, setData] = useState<Section2Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>2. Thông tin tai nạn lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Tổng số vụ TNLĐ"
                    label2="Số vụ có người chết"
                    label3="Số người bị TNLĐ"
                    defaultValue1="0"
                    defaultValue2="0"
                    defaultValue3="0"
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Số người chết vì TNLĐ"
                    label2="Tổng chi phí cho TNLĐ"
                    label3="Số ngày công vì TNLĐ"
                    defaultValue1="0"
                    defaultValue2="0"
                    defaultValue3="0"
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