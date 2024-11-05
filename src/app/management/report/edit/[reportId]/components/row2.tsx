import { Grid2, TextField } from "@mui/material";

export interface Row2Data {
    value1: string;
    value2: string;
}

interface Row2Props {
    label1?: string;
    label2?: string;
    value?: Row2Data;
    onChange?: (data: Row2Data) => void;
}

export default function Row2({ label1, label2, value, onChange }: Row2Props) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                    value={value?.value1}
                    onChange={(e) => onChange?.({ ...value, value1: e.target.value } as Row2Data)}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label2 || ""}
                    value={value?.value2}
                    onChange={(e) => onChange?.({ ...value, value2: e.target.value } as Row2Data)}
                />
            </Grid2>
            <Grid2 size={4}></Grid2>
        </Grid2>
    );
}