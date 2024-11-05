import { Grid2, TextField } from "@mui/material";

export default function Row2(
    {
        label1, label2
    }: {
        label1?: string;
        label2?: string;
    }
) {
    return (
        <Grid2 container spacing={14}>
            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label1 || ""}
                />
            </Grid2>

            <Grid2 size={4}>
                <TextField
                    size="small"
                    fullWidth
                    label={label2 || ""}
                />
            </Grid2>

            <Grid2 size={4}>

            </Grid2>
        </Grid2>
    );
}