'use client';

import React, { useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function ImagePicker() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        // Outside box
        <Box
            width={'80%'}
            sx={{
                border: `2px dashed ${isHovered ? '#007BFF' : '#ccc'}`,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: '10px',
                backgroundColor: 'white',
                transition: 'border-color 0.3s ease', // Hiệu ứng chuyển đổi cho màu viền
                aspectRatio: '1/1'  // Set height base on width, because not sure about parent size
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    height: '90%',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    backgroundColor: 'grey.200'
                }}
            >
                <IconButton
                    sx={{ width: '100%', height: '100%' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Stack justifyContent={'center'} alignItems={'center'}>
                        <AddAPhotoIcon fontSize={'large'} />
                        <Typography>Chọn ảnh đại diện</Typography>
                    </Stack>
                </IconButton>
            </Box>
        </Box>
    );
}

