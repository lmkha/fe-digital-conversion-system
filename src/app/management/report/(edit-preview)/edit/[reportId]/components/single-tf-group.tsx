import { Grid2, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export interface SingleTextFieldData {
  value1: string;
}
interface SingleTextFieldProps {
  label1?: string;
  isChange1?: boolean;
  defaultValue?: string;
  endAdornmentText?: string;
  helperText1?: string;
  onChange?: (data: SingleTextFieldData) => void;
}

export default function SingleTextField({
  label1,
  isChange1,
  defaultValue,
  endAdornmentText,
  helperText1,
  onChange,
}: SingleTextFieldProps) {
  const [data, setData] = useState<SingleTextFieldData>({
    value1: defaultValue || "",
  });
  return (
    <Grid2 container spacing={14}>
      <Grid2 size={4}>
        <TextField
          key={defaultValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: isChange1 ? "orange" : "initial",
                borderWidth: isChange1 ? "2px" : "1px",
              },
              "&:hover fieldset": {
                borderColor: isChange1 ? "orange" : "initial",
              },
            },
          }}
          error={helperText1 ? true : false}
          helperText={helperText1}
          defaultValue={defaultValue}
          size="small"
          fullWidth
          label={label1 || ""}
          onChange={(e) => {
            setData({ ...data, value1: e.target.value });
            onChange?.({
              ...data,
              value1: e.target.value,
            } as SingleTextFieldData);
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {endAdornmentText}
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid2>
    </Grid2>
  );
}
