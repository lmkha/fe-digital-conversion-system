/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { isNonNegativeInteger, isNumber } from "@/validators/report-detail";

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
    inputData?: Section1Data;
    onChange?: (data: Section1Data) => void;
}

export default function Section1({
    inputData,
    onChange
}: Section1Props) {
    const [data, setData] = useState<Section1Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section1HelpText>();

    const isSection1HelperTextEmpty = (section?: Section1HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        console.log('Section1 inputData:', inputData);
    }, [inputData]);

    // Only call onChange when all helper text is filled(no error)
    useEffect(() => {
        isSection1HelperTextEmpty(helpText) && data && onChange?.(data);
    }, [data]);

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
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    defaultValue3={inputData?.row1?.value3 || '0'}
                    helperText1={helpText?.row1?.helperText1}
                    helperText2={helpText?.row1?.helperText2}
                    helperText3={helpText?.row1?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row1: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Lao động nữ"
                    label2="Lao động làm việc trong điều kiện độc hại"
                    label3="Lao động là người chưa thành niên"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0'}
                    defaultValue3={inputData?.row2?.value3 || '0'}
                    helperText1={helpText?.row2?.helperText1}
                    helperText2={helpText?.row2?.helperText2}
                    helperText3={helpText?.row2?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row2: value });
                    }}
                />
                <TripleTextFieldGroup
                    label1="Lao động dưới 15 tuổi"
                    label2="Lao động người khuyết tật"
                    label3="Lao động người cao tuổi"
                    defaultValue1={inputData?.row3?.value1 || '0'}
                    defaultValue2={inputData?.row3?.value2 || '0'}
                    defaultValue3={inputData?.row3?.value3 || '0'}
                    helperText1={helpText?.row3?.helperText1}
                    helperText2={helpText?.row3?.helperText2}
                    helperText3={helpText?.row3?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row3: value });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}