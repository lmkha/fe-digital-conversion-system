import { Grid2, InputAdornment, TextField } from "@mui/material";

export interface Row1Data {
    value1: string;
}
interface Row1Props {
    value?: Row1Data;
    label1?: string;
    endAdornmentText?: string;
    onChange?: (data: Row1Data) => void;
}

export default function Row1({
    value,
    label1,
    endAdornmentText,
    onChange
}: Row1Props) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                    value={value?.value1}
                    onChange={(e) => onChange?.({ ...value, value1: e.target.value })}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">{endAdornmentText}</InputAdornment>,
                        }
                    }}
                />
            </Grid2>

            <Grid2 size={4}>

            </Grid2>

            <Grid2 size={4}>

            </Grid2>
        </Grid2>
    );
}