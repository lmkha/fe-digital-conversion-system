'use client';

import { Divider, Stack, TextField, Typography } from "@mui/material";
import { SingleTextFieldData } from "../components/single-tf-group";
import { useEffect, useState } from "react";
import { SingleHelpText } from "../types";
export interface Section11Data {
    row1?: SingleTextFieldData;
    row2?: SingleTextFieldData;
}

interface Section11HelpText {
    row1?: SingleHelpText;
    row2?: SingleHelpText;
}

interface Section11Props {
    inputData?: Section11Data;
    onChange?: (data: Section11Data) => void;
}

export default function Section11({
    inputData,
    onChange
}: Section11Props) {
    const [data, setData] = useState<Section11Data | undefined>(inputData);
    const [helpText, setHelpText] = useState<Section11HelpText>();

    const isSection11HelperTextEmpty = (section?: Section11HelpText): boolean => {
        return section ? Object.values(section).every((row) => {
            return Object.values(row).every((text) => text === '' || text === undefined);
        }) : true;
    };

    useEffect(() => {
        if (isSection11HelperTextEmpty(helpText) && data) {
            onChange?.(data);
        } else {
            onChange?.({});
        }
    }, [data]);

    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>11. Tổ chức cung cấp dịch vụ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TextField
                    error={helpText?.row1?.helperText1 ? true : false}
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ ATVSLĐ được thuê"
                    defaultValue={inputData?.row1?.value1}
                    helperText={helpText?.row1?.helperText1}
                    onChange={(value) => {
                        const trimmedValue = value.target.value.trim();
                        if (!trimmedValue) {
                            setHelpText({
                                ...helpText,
                                row1: {
                                    helperText1: 'Không được để trống'
                                }
                            });
                        } else {
                            setHelpText({
                                ...helpText,
                                row1: {
                                    helperText1: undefined
                                }
                            });
                        }
                        setData({
                            ...data,
                            row1: {
                                value1: value.target.value
                            }
                        });
                    }}
                />
                <TextField
                    error={helpText?.row2?.helperText1 ? true : false}
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ về y tế được thuê "
                    defaultValue={inputData?.row2?.value1}
                    helperText={helpText?.row2?.helperText1}
                    onChange={(value) => {
                        const trimmedValue = value.target.value.trim();
                        if (!trimmedValue) {
                            setHelpText({
                                ...helpText,
                                row2: {
                                    helperText1: 'Không được để trống'
                                }
                            });
                        } else {
                            setHelpText({
                                ...helpText,
                                row2: {
                                    helperText1: undefined
                                }
                            });
                        }
                        setData({
                            ...data,
                            row2: {
                                value1: value.target.value
                            }
                        });
                    }}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}