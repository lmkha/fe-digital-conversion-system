"use client";

import { Grid2, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export interface DoubleTextFieldGroupData {
  value1: string;
  value2: string;
}

interface DoubleTextFieldGroupProps {
  label1?: string;
  label2?: string;
  isChange1?: boolean;
  isChange2?: boolean;
  defaultValue1?: string;
  defaultValue2?: string;
  endAdornmentText1?: string;
  endAdornmentText2?: string;
  helperText1?: string;
  helperText2?: string;
  onChange?: (data: DoubleTextFieldGroupData) => void;
}

export default function DoubleTextFieldGroup({
  label1,
  label2,
  isChange1,
  isChange2,
  defaultValue1,
  defaultValue2,
  endAdornmentText1,
  endAdornmentText2,
  helperText1,
  helperText2,
  onChange,
}: DoubleTextFieldGroupProps) {
  const [data, setData] = useState<DoubleTextFieldGroupData>({
    value1: defaultValue1 || "",
    value2: defaultValue2 || "",
  });
  return (
    <Grid2 container spacing={14}>
      <Grid2 size={4}>
        <TextField
          key={defaultValue1}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: helperText1
                  ? null
                  : isChange1
                  ? "orange"
                  : "initial",
                borderWidth: helperText1 ? null : isChange1 ? "2px" : "1px",
              },
              "&:hover fieldset": {
                borderColor: helperText1
                  ? null
                  : isChange1
                  ? "orange"
                  : "initial",
              },
            },
          }}
          error={helperText1 ? true : false}
          helperText={helperText1}
          defaultValue={defaultValue1}
          size="small"
          fullWidth
          label={label1 || ""}
          onChange={(e) => {
            setData({ ...data, value1: e.target.value });
            onChange?.({
              ...data,
              value1: e.target.value,
            } as DoubleTextFieldGroupData);
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {endAdornmentText1}
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid2>

      <Grid2 size={4}>
        <TextField
          key={defaultValue2}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: helperText2
                  ? null
                  : isChange2
                  ? "orange"
                  : "initial",
                borderWidth: helperText2 ? null : isChange2 ? "2px" : "1px",
              },
              "&:hover fieldset": {
                borderColor: helperText2
                  ? null
                  : isChange2
                  ? "orange"
                  : "initial",
              },
            },
          }}
          error={helperText2 ? true : false}
          helperText={helperText2}
          defaultValue={defaultValue2}
          size="small"
          fullWidth
          label={label2 || ""}
          onChange={(e) => {
            setData({ ...data, value2: e.target.value });
            onChange?.({
              ...data,
              value2: e.target.value,
            } as DoubleTextFieldGroupData);
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {endAdornmentText2}
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid2>
    </Grid2>
  );
}
