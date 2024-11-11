'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import SingleTextField, { SingleTextFieldData } from "../components/single-tf-group";
import { useState } from "react";
export interface Section10Data {
    row1?: TripleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
    row3?: SingleTextFieldData;
}
interface Section10Props {
    inputData?: Section10Data;
    onChange?: (data: Section10Data) => void;
}

export default function Section10({
    inputData,
    onChange
}: Section10Props) {
    const [data, setData] = useState<Section10Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>10. Chi phí thực hiện kế hoạch ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Các biện pháp kỹ thuật an toàn "
                    label2="Các biện pháp kỹ thuật vệ sinh "
                    label3="Trang bị phương tiện bảo vệ cá nhân "
                    defaultValue1={inputData?.row1?.value1 || '0.0'}
                    defaultValue2={inputData?.row1?.value2 || '0.0'}
                    defaultValue3={inputData?.row1?.value3 || '0.0'}
                    endAdornmentText1="Triệu đồng"
                    endAdornmentText2="Triệu đồng"
                    endAdornmentText3="Triệu đồng"
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Chăm sóc sức khỏe người lao động "
                    label2="Tuyên truyền huấn luyện "
                    label3="Đánh giá nguy cơ rủi tro về ATVSLĐ "
                    defaultValue1={inputData?.row2?.value1 || '0.0'}
                    defaultValue2={inputData?.row2?.value2 || '0.0'}
                    defaultValue3={inputData?.row2?.value3 || '0.0'}
                    endAdornmentText1="Triệu đồng"
                    endAdornmentText2="Triệu đồng"
                    endAdornmentText3="Triệu đồng"
                    onChange={(value) => {
                        onChange?.({ ...data, row2: value });
                        setData({ ...data, row2: value });
                    }}
                />
                <SingleTextField
                    label1="Chi khác "
                    defaultValue={inputData?.row3?.value1 || '0.0'}
                    endAdornmentText="Triệu đồng"
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
