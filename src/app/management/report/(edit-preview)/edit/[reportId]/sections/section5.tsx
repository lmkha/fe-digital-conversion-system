'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";
export interface Section5Data {
    row1?: TripleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
    row3?: TripleTextFieldGroupData;
}
interface Section5Props {
    onChange?: (data: Section5Data) => void;
}


export default function Section5({
    onChange
}: Section5Props) {
    const [data, setData] = useState<Section5Data>();
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
                <TripleTextFieldGroup
                    label1="Nhóm 1: SL huấn luyện/SL hiện có "
                    label2="Nhóm 2: SL huấn luyện/SL hiện có (người/người)"
                    label3="Nhóm 3: SL huấn luyện/SL hiện có (người/người)"
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    defaultValue3="0/0"
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Trong đó: Tự huấn luyện"
                    label2="Thuê tổ chức cung cấp dịch vụ huấn luyện"
                    label3="Nhóm 4: SL huấn luyện/SL hiện có (người/người)"
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    defaultValue3="0/0"
                    onChange={(value) => {
                        onChange?.({ ...data, row2: value });
                        setData({ ...data, row2: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Nhóm 5: SL huấn luyện/SL hiện có (người/người)"
                    label2="Nhóm 6: SL huấn luyện/SL hiện có (người/người)"
                    label3="Tổng chi phí huấn luyện "
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    defaultValue3="0.0"
                    endAdornmentText3="Triệu đồng"
                    onChange={(value) => {
                        onChange?.({ ...data, row3: value });
                        setData({ ...data, row3: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}