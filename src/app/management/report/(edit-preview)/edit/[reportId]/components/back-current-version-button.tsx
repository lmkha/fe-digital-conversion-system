'use client';

import { Button } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

interface GoBackCurrentVersionProps {
    label: string;
    onClick: () => void;
}

export default function GoBackCurrentVersion({ label, onClick }: GoBackCurrentVersionProps) {
    return (
        <Button
            sx={{
                textTransform: 'none',
            }}
            variant="outlined"
            color="primary"
            startIcon={<FlipCameraAndroidIcon />}
            onClick={() => onClick()}
        >
            {label}
        </Button>
    );
}
