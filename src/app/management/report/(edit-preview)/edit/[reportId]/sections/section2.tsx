'use client';

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, { TripleTextFieldGroupData } from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { TripleHelpText } from "../types";
import { isNonNegativeInteger, isNonNegativeNumber } from "@/validators/report-detail";
import { convertStringToInteger } from "@/core/logic/convert";

export interface Section2Data {
    row1?: TripleTextFieldGroupData;
    row2?: TripleTextFieldGroupData;
}

interface Section2HelpText {
    row1?: TripleHelpText;
    row2?: TripleHelpText;
}
interface Section2Props {
    inputData?: Section2Data;
    onChange?: (data: Section2Data) => void;
}

export default function Section2({
    inputData,
    onChange
}: Section2Props) {
    const [data, setData] = useState<Section2Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section2HelpText>();

    const isSection2HelperTextEmpty = (section?: Section2HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection2HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>2. Thông tin tai nạn lao động</Typography>
                <Typography sx={{
                    color: 'red',
                    fontWeight: 'medium'
                }}>*** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TripleTextFieldGroup
                    label1="Tổng số vụ TNLĐ"
                    label2="Số vụ có người chết"
                    label3="Số người bị TNLĐ"
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
                                setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: 'Không được vượt quá tổng số vụ TNLĐ' } }));
                            } else {
                                setHelpText((prev) => ({ ...prev, row1: { ...prev?.row1, helperText2: undefined } }));
                            }
                        }
                    }}
                />
                <TripleTextFieldGroup
                    label1="Số người chết vì TNLĐ"
                    label2="Tổng chi phí cho TNLĐ"
                    label3="Số ngày công vì TNLĐ"
                    defaultValue1={inputData?.row2?.value1 || '0'}
                    defaultValue2={inputData?.row2?.value2 || '0'}
                    defaultValue3={inputData?.row2?.value3 || '0'}
                    helperText1={helpText?.row2?.helperText1}
                    helperText2={helpText?.row2?.helperText2}
                    helperText3={helpText?.row2?.helperText3}
                    endAdornmentText2="Triệu đồng"
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
                        if (!isNonNegativeInteger(value.value3)) {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText3: 'Nhập số nguyên không âm' } }));
                        } else {
                            setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText3: undefined } }));
                        }

                        if (isNonNegativeInteger(data?.row1?.value3) && isNonNegativeInteger(value.value1)) {
                            if (data?.row1?.value3 && convertStringToInteger(value.value1) > convertStringToInteger(data?.row1?.value3)) {
                                setHelpText((prev) => ({ ...prev, row2: { ...prev?.row2, helperText1: 'Không được vượt quá số người bị TNLĐ' } }));
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