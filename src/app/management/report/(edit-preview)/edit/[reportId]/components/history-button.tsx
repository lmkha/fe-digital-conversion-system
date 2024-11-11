'use client';

import RestoreIcon from '@mui/icons-material/Restore';
import { Button } from '@mui/material';

interface HistoryButtonProps {
    label: string;
    onClick: () => void;
}

export default function HistoryButton({ label, onClick }: HistoryButtonProps) {
    return (
        <Button
            sx={{
                textTransform: 'none',
            }}
            variant="outlined"
            color="primary"
            startIcon={<RestoreIcon />}
            onClick={() => onClick()}
        >
            {label}
        </Button>
    );
}
