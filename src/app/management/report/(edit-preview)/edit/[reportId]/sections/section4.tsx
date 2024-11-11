'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { DoubleHelpText, TripleHelpText } from "../types";
import { isNonNegativeInteger } from "@/validators/report-detail";

export interface Section4Data {
    row1?: TripleTextFieldGroupData;
    row2?: DoubleTextFieldGroupData;
}

interface Section4HelpText {
    row1?: TripleHelpText;
    row2?: DoubleHelpText;
}
interface Section4Props {
    inputData?: Section4Data;
    onChange?: (data: Section4Data) => void;
}

export default function Section4({
    inputData,
    onChange
}: Section4Props) {
    const [data, setData] = useState<Section4Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section4HelpText>();

    const isSection4HelperTextEmpty = (section?: Section4HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection4HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>4. Kết quả phân loại sức khỏe người lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Loại I (Người)"
                    label2="Loại II (Người)"
                    label3="Loại III (Người)"
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    defaultValue3={inputData?.row1?.value3 || '0'}
                    helperText1={helpText?.row1?.helperText1}
                    helperText2={helpText?.row1?.helperText2}
                    helperText3={helpText?.row1?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row1: value });
                        if (!isNonNegativeInteger(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText1: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText1: undefined } }));
                        }
                        if (!isNonNegativeInteger(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: undefined } }));
                        }
                        if (!isNonNegativeInteger(value.value3)) {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText3: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText3: undefined } }));
                        }
                    }}
                />
                <DoubleTextFieldGroup
                    label1="Loại IV (Người)"
                    label2="Loại V (Người)"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0'}
                    helperText1={helpText?.row2?.helperText1}
                    helperText2={helpText?.row2?.helperText2}
                    onChange={(value) => {
                        setData({ ...data, row2: value });
                        if (!isNonNegativeInteger(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: undefined } }));
                        }
                        if (!isNonNegativeInteger(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText2: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText2: undefined } }));
                        }
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
