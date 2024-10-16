'use client';

import * as React from 'react';
import { Box, Grid2, TextField } from '@mui/material';
import UploadAvatarButton from '../management/user/components/image-picker';


export default function Page() {
    return (
        <DashedCircle />
    );
}

const DashedCircle = () => {
    return (
        <Box
            sx={{
                width: '120px',
                height: '120px',
                border: '2px dashed #ccc',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '10px',
            }}
        >
            <Box
                sx={{
                    width: '100px',
                    height: '100px',
                    border: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            />
        </Box>
    );
};
