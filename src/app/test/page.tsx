'use client';

import * as React from 'react';
import { TextField } from '@mui/material';

export default function Page() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
            />
        </div>
    );
}

