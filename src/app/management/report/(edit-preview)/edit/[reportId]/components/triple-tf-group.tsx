'use client';

import { Grid2, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export interface TripleTextFieldGroupData {
    value1: string;
    value2: string;
    value3: string;
}

interface TripleTextFieldGroupProps {
    label1?: string;
    label2?: string;
    label3?: string;
    defaultValue1?: string;
    defaultValue2?: string;
    defaultValue3?: string;
    endAdornmentText1?: string;
    endAdornmentText2?: string;
    endAdornmentText3?: string;
    helperText1?: string;
    helperText2?: string;
    helperText3?: string;
    onChange?: (data: TripleTextFieldGroupData) => void;
}

export default function TripleTextFieldGroup({
    label1,
    label2,
    label3,
    defaultValue1,
    defaultValue2,
    defaultValue3,
    endAdornmentText1,
    endAdornmentText2,
    endAdornmentText3,
    helperText1,
    helperText2,
    helperText3,
    onChange
}: TripleTextFieldGroupProps) {
    const [data, setData] = useState<TripleTextFieldGroupData>();

    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    key={defaultValue1}
                    error={helperText1 ? true : false}
                    helperText={helperText1}
                    defaultValue={defaultValue1}
                    size="small"
                    fullWidth
                    label={label1 || ""}
                    onChange={(e) => {
                        setData({ ...data, value1: e.target.value } as TripleTextFieldGroupData);
                        onChange?.({ ...data, value1: e.target.value } as TripleTextFieldGroupData)
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">{endAdornmentText1}</InputAdornment>,
                        }
                    }}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    key={defaultValue2}
                    error={helperText2 ? true : false}
                    helperText={helperText2}
                    defaultValue={defaultValue2}
                    size="small"
                    fullWidth
                    label={label2 || ""}
                    onChange={(e) => {
                        onChange?.({ ...data, value2: e.target.value } as TripleTextFieldGroupData)
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">{endAdornmentText2}</InputAdornment>,
                        }
                    }}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    key={defaultValue3}
                    error={helperText3 ? true : false}
                    helperText={helperText3}
                    defaultValue={defaultValue3}
                    size="small"
                    fullWidth
                    label={label3 || ""}
                    onChange={(e) => {
                        onChange?.({ ...data, value3: e.target.value } as TripleTextFieldGroupData)
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">{endAdornmentText3}</InputAdornment>,
                        }
                    }}
                />
            </Grid2>
        </Grid2>
    );
}