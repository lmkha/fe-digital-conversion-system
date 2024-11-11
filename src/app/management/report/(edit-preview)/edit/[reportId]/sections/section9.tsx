'use client';

import { Divider, Stack, Typography } from "@mui/material";
import DoubleTextFieldGroup, { DoubleTextFieldGroupData } from "../components/double-tf-group";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { DoubleHelpText, TripleHelpText } from "../types";
import { isNonNegativeInteger } from "@/validators/report-detail";
import { isPositiveFraction } from "@/core/logic/convert";
export interface Section9Data {
    row1?: DoubleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
    row3?: TripleTextFieldGroupData;
    row4?: TripleTextFieldGroupData;
    row5?: DoubleTextFieldGroupData;
}
interface Section9Props {
    inputData?: Section9Data;
    onChange?: (data: Section9Data) => void;
}

interface Section9HelpText {
    row1?: DoubleHelpText;
    row2?: TripleHelpText;
    row3?: TripleHelpText;
    row4?: TripleHelpText;
    row5?: DoubleHelpText;
}

export default function Section9({
    inputData,
    onChange
}: Section9Props) {
    const [data, setData] = useState<Section9Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section9HelpText>();

    const isSection9HelperTextEmpty = (section?: Section9HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection9HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>9. Tình hình quan trắc môi trường</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <DoubleTextFieldGroup
                    label1="Số mẫu quan trắc môi trường lao động (Mẫu)"
                    label2="Số mẫu không đạt tiêu chuẩn(Mẫu) "
                    defaultValue1={inputData?.row1?.value1 || '0'}
                    defaultValue2={inputData?.row1?.value2 || '0'}
                    helperText1={helpText?.row2?.helperText1}
                    helperText2={helpText?.row2?.helperText2}
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
                    }}
                />
                <TripleTextFieldGroup
                    label1="Mẫu nhiệt độ không đạt (Mẫu /Mẫu )"
                    label2="Mẫu độ ẩm không đạt (Mẫu/Mẫu)"
                    label3="Mẫu tốc độ gió không đạt (Mẫu/Mẫu)"
                    defaultValue1={inputData?.row2?.value1 || '0/0'}
                    defaultValue2={inputData?.row2?.value2 || '0/0'}
                    defaultValue3={inputData?.row2?.value3 || '0/0'}
                    helperText1={helpText?.row2?.helperText1}
                    helperText2={helpText?.row2?.helperText2}
                    helperText3={helpText?.row2?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row2: value });
                        if (!isPositiveFraction(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: undefined } }));
                        }
                        if (!isPositiveFraction(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText2: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText2: undefined } }));
                        }
                        if (!isPositiveFraction(value.value3)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText3: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText3: undefined } }));
                        }
                    }}
                />
                <TripleTextFieldGroup
                    label1="Mẫu ánh sáng không đạt (Mẫu/Mẫu)"
                    label2="Mẫu tiếng ồn không đạt (Mẫu/Mẫu)"
                    label3="Mẫu bụi không đạt (Mẫu/Mẫu)"
                    defaultValue1={inputData?.row3?.value1 || '0/0'}
                    defaultValue2={inputData?.row3?.value2 || '0/0'}
                    defaultValue3={inputData?.row3?.value3 || '0/0'}
                    helperText1={helpText?.row3?.helperText1}
                    helperText2={helpText?.row3?.helperText2}
                    helperText3={helpText?.row3?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row3: value });
                        if (!isPositiveFraction(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row3: { ...prev?.row3, helperText1: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row3: { ...prev?.row3, helperText1: undefined } }));
                        }
                        if (!isPositiveFraction(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row3: { ...prev?.row3, helperText2: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row3: { ...prev?.row3, helperText2: undefined } }));
                        }
                        if (!isPositiveFraction(value.value3)) {
                            setHelpText((prev) => ({ ...prev, row3: { ...prev?.row3, helperText3: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row3: { ...prev?.row3, helperText3: undefined } }));
                        }
                    }}
                />
                <TripleTextFieldGroup
                    label1="Mẫu rung không đạt (Mẫu/Mẫu)"
                    label2="Mẫu hơi khí độc không đạt (Mẫu/Mẫu)"
                    label3="Mẫu phóng xạ không đạt (Mẫu/Mẫu)"
                    defaultValue1={inputData?.row4?.value1 || '0/0'}
                    defaultValue2={inputData?.row4?.value2 || '0/0'}
                    defaultValue3={inputData?.row4?.value3 || '0/0'}
                    helperText1={helpText?.row4?.helperText1}
                    helperText2={helpText?.row4?.helperText2}
                    helperText3={helpText?.row4?.helperText3}
                    onChange={(value) => {
                        setData({ ...data, row4: value });
                        if (!isPositiveFraction(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row4: { ...prev?.row4, helperText1: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row4: { ...prev?.row4, helperText1: undefined } }));
                        }
                        if (!isPositiveFraction(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row4: { ...prev?.row4, helperText2: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row4: { ...prev?.row4, helperText2: undefined } }));
                        }
                        if (!isPositiveFraction(value.value3)) {
                            setHelpText((prev) => ({ ...prev, row4: { ...prev?.row4, helperText3: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row4: { ...prev?.row4, helperText3: undefined } }));
                        }
                    }}
                />
                <DoubleTextFieldGroup
                    label1="Mẫu điện từ trường không đạt (Mẫu/Mẫu)"
                    label2="Mẫu khác không đạt (Mẫu/Mẫu)"
                    defaultValue1={inputData?.row5?.value1 || '0/0'}
                    defaultValue2={inputData?.row5?.value2 || '0/0'}
                    helperText1={helpText?.row5?.helperText1}
                    helperText2={helpText?.row5?.helperText2}
                    onChange={(value) => {
                        setData({ ...data, row5: value });
                        if (!isPositiveFraction(value.value1)) {
                            setHelpText((prev) => ({ ...prev, row5: { ...prev?.row5, helperText1: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row5: { ...prev?.row5, helperText1: undefined } }));
                        }
                        if (!isPositiveFraction(value.value2)) {
                            setHelpText((prev) => ({ ...prev, row5: { ...prev?.row5, helperText2: 'Nhập phân số không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row5: { ...prev?.row5, helperText2: undefined } }));
                        }
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
