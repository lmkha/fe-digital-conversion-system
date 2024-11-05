import { Grid2, TextField } from "@mui/material";
export interface Row3Data {
    value1: string;
    value2: string;
    value3: string;
}

interface Row3Props {
    label1?: string;
    label2?: string;
    label3?: string;
    value?: Row3Data;
    onChange?: (data: Row3Data) => void;
}

export default function Row3({ label1, label2, label3, value, onChange }: Row3Props) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                    value={value?.value1}
                    onChange={(e) => onChange?.({ ...value, value1: e.target.value } as Row3Data)}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label2 || ""}
                    value={value?.value2}
                    onChange={(e) => onChange?.({ ...value, value2: e.target.value } as Row3Data)}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label3 || ""}
                    value={value?.value3}
                    onChange={(e) => onChange?.({ ...value, value3: e.target.value } as Row3Data)}
                />
            </Grid2>
        </Grid2>
    );
}