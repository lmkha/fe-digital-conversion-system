'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import { useEffect, useState } from "react";
import { DoubleHelpText } from "../types";
import { isNonNegativeInteger, isNonNegativeNumber } from "@/validators/report-detail";
export interface Section8Data {
    row1?: DoubleTextFieldGroupData;
}

interface Section8HelpText {
    row1?: DoubleHelpText;
}

interface Section8Props {
    inputData?: Section8Data;
    onChange?: (data: Section8Data) => void;
}

export default function Section8({
    inputData,
    onChange
}: Section8Props) {
    const [data, setData] = useState<Section8Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section8HelpText>();

    const isSection8HelperTextEmpty = (section?: Section8HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection8HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

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
                    endAdornmentText2="Triệu đồng"
                    helperText1={helpText?.row1?.helperText1}
                    helperText2={helpText?.row1?.helperText2}
                    onChange={(value) => {
                        setData({ ...data, row1: value });
                        if (!isNonNegativeInteger(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText1: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText1: undefined } }));
                        }
                        if (!isNonNegativeNumber(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: 'Nhập số thập phân không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: undefined } }));
                        }
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
