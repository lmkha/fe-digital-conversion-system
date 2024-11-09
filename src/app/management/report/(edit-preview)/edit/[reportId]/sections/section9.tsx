'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";
export interface Section9Data {
    row1?: DoubleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
    row3?: TripleTextFieldGroupData;
    row4?: TripleTextFieldGroupData;
    row5?: DoubleTextFieldGroupData;
}
interface Section9Props {
    onChange?: (data: Section9Data) => void;
}

export default function Section9({
    onChange
}: Section9Props) {
    const [data, setData] = useState<Section9Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>9. Tình hình quan trắc môi trường</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <DoubleTextFieldGroup
                    label1="Số mẫu quan trắc môi trường lao động (Mẫu)"
                    label2="Số mẫu không đạt tiêu chuẩn(Mẫu) "
                    defaultValue1="0"
                    defaultValue2="0"
                    onChange={(value) => {
                        onChange?.({ ...data, row1: value });
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Mẫu nhiệt độ không đạt (Mẫu /Mẫu )"
                    label2="Mẫu độ ẩm không đạt (Mẫu/Mẫu)"
                    label3="Mẫu tốc độ gió không đạt (Mẫu/Mãu)"
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    defaultValue3="0/0"
                    onChange={(value) => {
                        onChange?.({ ...data, row2: value });
                        setData({ ...data, row2: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Mẫu ánh sáng không đạt (Mẫu/Mẫu)"
                    label2="Mẫu tiếng ồn không đạt (Mẫu/Mẫu)"
                    label3="Mẫu bụi không đạt (Mẫu/Mẫu)"
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    defaultValue3="0/0"
                    onChange={(value) => {
                        onChange?.({ ...data, row3: value });
                        setData({ ...data, row3: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Mẫu rung không đạt (Mẫu/Mẫu)"
                    label2="Mẫu hơi khí độc không đạt (Mẫu/Mẫu)"
                    label3="Mẫu phóng xạ không đạt (Mẫu/Mẫu)"
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    defaultValue3="0/0"
                    onChange={(value) => {
                        onChange?.({ ...data, row4: value });
                        setData({ ...data, row4: value });
                    }}
                />
                <DoubleTextFieldGroup
                    label1="Mẫu điện từ trường không đạt (Mẫu/Mẫu)"
                    label2="Mẫu khác không đạt (Mẫu/Mẫu)"
                    defaultValue1="0/0"
                    defaultValue2="0/0"
                    onChange={(value) => {
                        onChange?.({ ...data, row5: value });
                        setData({ ...data, row5: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
