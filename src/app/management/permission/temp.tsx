'use client';

export default function ParentItem() {
    return (
        <CustomizedAccordions />
    );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Divider } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={
            <KeyboardArrowDownIcon
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'black',
                }}
            />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: 0,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div className='flex h-12 pl-3 w-full justify-between items-center'>
                        <div className='ml-5 mr-16 w-1/12 flex justify-center'>
                            <h1>I</h1>
                        </div>
                        <div className='w-1/12 mr-20 flex justify-start'>
                            <h1>Group</h1>
                        </div>
                        <div className='w-1/3 flex justify-start'>
                            <h1>ADMIN_G_DEPARTMENT</h1>
                        </div>
                        <div className='pl-28 w-1/3 flex justify-start'>
                            <h1>Department Group</h1>
                        </div>
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <ChildItem />
                    <ChildItem />
                    <ChildItem />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function ChildItem() {
    return (
        <div>
            <div className='flex h-12 pl-11 w-full justify-between items-center'>
                <div className='ml-5 mr-16 w-1/12 flex justify-center'>
                    <h1>1</h1>
                </div>
                <div className='w-1/12 mr-20 flex justify-start'>
                    <h1>Group</h1>
                </div>
                <div className='pl-10 w-1/3 flex justify-start'>
                    <h1>ADMIN_G_DEPARTMENT</h1>
                </div>
                <div className='pl-28 w-1/3 flex justify-start'>
                    <h1>Department Group</h1>
                </div>
            </div>
            <Divider />
        </div>
    );
}

