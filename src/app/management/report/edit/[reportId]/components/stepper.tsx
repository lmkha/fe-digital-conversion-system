'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const steps = ['Soạn báo cáo', 'Xác nhận thông tin'];

export default function HorizontalLinearStepper({ activeStep }: { activeStep: number }) {
    return (
        <Box sx={{ width: '50%' }}>
            <Grid2 container spacing={2} width={'100%'} sx={{
                alignItems: 'center',
            }}>
                <Grid2 size={4} alignContent={'end'} justifyContent={'end'}>
                    {/* Stepper 1 */}
                    <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                color: activeStep === 1 ? 'white' : '#1890FF',
                                backgroundColor: activeStep === 1 ? '#1890FF' : 'white',
                                border: '1px solid #1890FF',
                                borderRadius: '50%',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            {activeStep === 1 ? 1 : <CheckIcon />}
                        </Box>
                        <Typography>Soạn báo cáo</Typography>
                    </Stack>
                </Grid2>
                <Grid2 size={4}>
                    <Divider sx={{
                        width: '100%',
                        height: '3px',
                        backgroundColor: activeStep === 2 ? '#1890FF' : 'lightgrey',
                        borderRadius: '3px'
                    }} />
                </Grid2>
                <Grid2 size={4}>
                    {/* Stepper 2 */}
                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 30,
                                height: 30,
                                color: activeStep === 2 ? 'white' : 'gray',
                                backgroundColor: activeStep === 2 ? '#1890FF' : 'white',
                                border: activeStep === 2 ? '1px solid #1890FF' : '1px solid gray',
                                borderRadius: '50%',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            2
                        </Box>
                        <Typography>Xác nhận thông tin</Typography>
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
}
