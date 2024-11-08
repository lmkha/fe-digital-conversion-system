import { Grid2, InputAdornment, TextField } from "@mui/material";
export interface Row3Data {
    value1: string;
    value2: string;
    value3: string;
}

interface Row3Props {
    value?: Row3Data;
    label1?: string;
    label2?: string;
    label3?: string;
    endAdornmentText1?: string;
    endAdornmentText2?: string;
    endAdornmentText3?: string;
    onChange?: (data: Row3Data) => void;
}

export default function Row3({
    value,
    label1,
    label2,
    label3,
    endAdornmentText1,
    endAdornmentText2,
    endAdornmentText3,
    onChange
}: Row3Props) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                    value={value?.value1}
                    onChange={(e) => onChange?.({ ...value, value1: e.target.value } as Row3Data)}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">{endAdornmentText1}</InputAdornment>,
                        }
                    }}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label2 || ""}
                    value={value?.value2}
                    onChange={(e) => onChange?.({ ...value, value2: e.target.value } as Row3Data)}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">{endAdornmentText2}</InputAdornment>,
                        }
                    }}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label3 || ""}
                    value={value?.value3}
                    onChange={(e) => onChange?.({ ...value, value3: e.target.value } as Row3Data)}
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