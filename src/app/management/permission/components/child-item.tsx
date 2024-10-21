'use client';

import { Divider, Grid2, Stack, Typography } from "@mui/material";

export function ChildItem({ no, type, permissionCode, permissionName }: PermissionItemProps) {
    return (
        <Stack>
            <Grid2 container spacing={2} pl={15} height={'48px'} alignItems={'center'} justifyContent={'end'}>
                <Grid2 size={2}>
                    <Typography>{no}</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>{type}</Typography>
                </Grid2>
                <Grid2 size={4}>
                    <Typography>{permissionCode}</Typography>
                </Grid2>
                <Grid2 size={3}>
                    <Typography>{permissionName}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
        </Stack>
    );
}
