'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { DoubleHelpText, TripleHelpText } from "../types";
import { isNonNegativeInteger, isNonNegativeNumber } from "@/validators/report-detail";
import { convertStringToInteger } from "@/core/logic/convert";

interface Section3HelpText {
    row1?: TripleHelpText;
    row2?: DoubleHelpText;
}

export interface Section3Data {
    row1?: TripleTextFieldGroupData;
    row2?: DoubleTextFieldGroupData;
}
interface Section3Props {
    inputData?: Section3Data;
    onChange?: (data: Section3Data) => void;
}

export default function Section3({
    inputData,
    onChange
}: Section3Props) {
    const [data, setData] = useState<Section3Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section3HelpText>();

    const isSection3HelperTextEmpty = (section?: Section3HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection3HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>3. Bệnh nghề nghiệp</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Tổng số người bị BNN tới thời điểm BC"
                    label2="Số người mắc mới BNN"
                    label3="Số ngày công nghỉ phép về BNN"
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

                        if (isNonNegativeInteger(value.value1) && isNonNegativeInteger(value.value2)) {
                            if (convertStringToInteger(value.value2) > convertStringToInteger(value.value1)) {
                                setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: 'Không được vượt quá số người bị BNN tới thời điểm BC' } }));
                            } else {
                                setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: undefined } }));
                            }
                        }
                    }}
                />
                <DoubleTextFieldGroup
                    label1="Số người phải nghỉ trước tuổi hưu vì BNN "
                    label2="Tổng chi phí  BNN phát sinh trong năm"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0.0'}
                    endAdornmentText2="Triệu đồng"
                    helperText1={helpText?.row2?.helperText1}
                    helperText2={helpText?.row2?.helperText2}
                    onChange={(value) => {
                        setData({ ...data, row2: value });
                        if (!isNonNegativeInteger(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: undefined } }));
                        }
                        if (!isNonNegativeNumber(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText2: 'Nhập số thập phân không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText2: undefined } }));
                        }

                        if (isNonNegativeInteger(data?.row1?.value1) && isNonNegativeInteger(value.value1)) {
                            if (data?.row1?.value1 && convertStringToInteger(value.value1) > convertStringToInteger(data?.row1?.value1)) {
                                setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: 'Không được vượt quá số người bị BNN tới thời điểm BC' } }));
                            } else {
                                setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: undefined } }));
                            }
                        }
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}