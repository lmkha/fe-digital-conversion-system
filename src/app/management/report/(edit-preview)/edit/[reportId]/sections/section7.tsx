'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { TripleHelpText } from "../types";
import { isNonNegativeInteger } from "@/validators/report-detail";
export interface Section7Data {
    row1?: TripleTextFieldGroupData;
}

interface Section7HelpText {
    row1?: TripleHelpText;
}

interface Section7Props {
    inputData?: Section7Data;
    onChange?: (data: Section7Data) => void;
}

export default function Section7({
    inputData,
    onChange
}: Section7Props) {
    const [data, setData] = useState<Section7Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section7HelpText>();

    const isSection7HelperTextEmpty = (section?: Section7HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection7HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

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
            </Stack>
        </>
    );
}
