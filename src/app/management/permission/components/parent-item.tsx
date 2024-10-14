
'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ChildItem } from './child-item';

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

export function ParentItem({ no, type, permissionCode, permissionName, childrenList, onChangeItem, isExpanded }: ParentItemProps) {
    return (
        <div>
            <Accordion
                expanded={isExpanded}
                onChange={() => {
                    onChangeItem();
                    console.log('onChangeItem');
                }}
            >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div className='flex pl-3 w-full justify-start items-center'>
                        <div className='w-10 ml-10 flex justify-center'>
                            <h1>{no}</h1>
                        </div>
                        <div className='w-60 ml-24 flex justify-start'>
                            <h1>{type}</h1>
                        </div>
                        <div className='w-80 ml-10 flex justify-start'>
                            <h1>{permissionCode}</h1>
                        </div>
                        <div className='w-80 ml-52 flex justify-start'>
                            <h1>{permissionName}</h1>
                        </div>
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    {
                        childrenList?.map((item, index) => (
                            <ChildItem key={index} {...item} />
                        ))
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
