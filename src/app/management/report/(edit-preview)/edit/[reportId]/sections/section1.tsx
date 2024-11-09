'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useState } from "react";
import { isNumber } from "@/validators/report-detail";

export interface Section1Data {
    row1?: TripleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
    row3?: TripleTextFieldGroupData;
}

interface TripleHelpText {
    helperText1?: string;
    helperText2?: string;
    helperText3?: string;
}

interface Section1HelpText {
    row1?: TripleHelpText;
    row2?: TripleHelpText;
    row3?: TripleHelpText;
}

interface Section1Props {
    onChange?: (data: Section1Data) => void;
}

export default function Section1({
    onChange
}: Section1Props) {
    const [data, setData] = useState<Section1Data>();
    const [helpText, setHelpText] = useState<Section1HelpText>();

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>1. Thông tin lao động</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Tổng số lao động"
                    label2="Người làm công tác ATVSLĐ"
                    label3="Người làm công tác y tế"
                    defaultValue1="0"
                    defaultValue2="0"
                    defaultValue3="0"
                    helperText1={helpText?.row1?.helperText1}
                    helperText2={helpText?.row1?.helperText2}
                    helperText3={helpText?.row1?.helperText3}
                    onChange={(value) => {
                        if (!isNumber(value.value1)) {
                            setHelpText({
                                ...helpText,
                                row1: {
                                    ...helpText?.row1,
                                    helperText1: 'Vui lòng nhập số'
                                }
                            });
                            return;
                        }
                        setHelpText({
                            ...helpText,
                            row1: {
                                ...helpText?.row1,
                                helperText1: undefined
                            }
                        });
                        onChange?.({ ...data, row1: value })
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Lao động nữ"
                    label2="Lao động làm việc trong điều kiện độc hại"
                    label3="Lao động là người chưa thành niên"
                    defaultValue1="0"
                    defaultValue2="0"
                    defaultValue3="0"
                    onChange={(value) => {
                        onChange?.({ ...data, row2: value })
                        setData({ ...data, row2: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Lao động dưới 15 tuổi"
                    label2="Lao động người khuyết tật"
                    label3="Lao động người cao tuổi"
                    defaultValue1="0"
                    defaultValue2="0"
                    defaultValue3="0"
                    onChange={(value) => {
                        onChange?.({ ...data, row3: value })
                        setData({ ...data, row3: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}