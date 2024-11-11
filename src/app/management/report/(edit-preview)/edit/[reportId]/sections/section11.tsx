'use client';

import { Divider, Stack, TextField, Typography } from "@mui/material";
import { SingleTextFieldData } from "../components/single-tf-group";
import { useState } from "react";
export interface Section11Data {
    row1?: SingleTextFieldData;
    row2?: SingleTextFieldData;
}
interface Section11Props {
    inputData?: Section11Data;
    onChange?: (data: Section11Data) => void;
}

export default function Section11({
    inputData,
    onChange
}: Section11Props) {
    const [data, setData] = useState<Section11Data>();
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>11. Tổ chức cung cấp dịch vụ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <TextField
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ ATVSLĐ được thuê"
                    defaultValue={inputData?.row1?.value1}
                    onChange={(value) => {
                        onChange?.({
                            ...data,
                            row1: {
                                value1: value.target.value
                            }
                        });
                        setData({
                            ...data,
                            row1: {
                                value1: value.target.value
                            }
                        });
                    }}
                />
                <TextField
                    size="small"
                    fullWidth
                    label="Tên tổ chức dịch vụ về y tế được thuê "
                    defaultValue={inputData?.row2?.value1}
                    onChange={(value) => {
                        onChange?.({
                            ...data,
                            row2: {
                                value1: value.target.value
                            }
                        });
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