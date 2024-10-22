'use client';

import { Box, Button, FormControl, TextField } from "@mui/material";

export default function Page() {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'}>
            <FormControl>
                <TextField />
                <Button>Submit</Button>
            </FormControl>
        </Box>
    );
}