/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Checkbox, Divider, IconButton, Stack, TablePagination, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { getPermissionByFilter } from '@/services/permission';
import role from '@/api/role';
import AddEditFilter from '../components/add-edit-filter';

interface AddRoleModalProps {
    isOpen: boolean;
    deptId: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string) => void;
}

export function AddRoleModal({ isOpen, deptId, onClose, onSubmitted }: AddRoleModalProps) {
    const [permissionList, setPermissionList] = React.useState<{
        isCheck: boolean,
        id: string,
        code: string,
        name: string,
        children: {
            isCheck: boolean,
            id: string,
            code: string,
            name: string
        }[]
    }[]>([]);
    const [pageInfo, setPageInfo] = React.useState({
        pageNumber: '0',
        total: '0',
        start: '0',
        end: '0',
        pageSize: '10'
    });
    const [submitData, setSubmitData] = React.useState({
        roleCode: '',
        roleName: '',
        permissionIds: [] as string[],
        deptId: deptId
    });
    const [filterData, setFilterData] = React.useState({
        code: '',
        name: '',
    });
    const [expandedGroupItemIds, setExpandedGroupItemIds] = React.useState<string[]>([]);

    // useEffect ---------------------------------------------------    
    // Init data when open modal
    React.useEffect(() => {
        setExpandedGroupItemIds([]);
        if (deptId) {
            setSubmitData({
                ...submitData,
                deptId: deptId
            });
            getPermissionByFilter('', '', '', '').then((result) => {
                if (result.success) {
                    setPageInfo({
                        pageNumber: result.pageInfo.pageNumber,
                        total: result.pageInfo.total,
                        start: result.pageInfo.start,
                        end: result.pageInfo.end,
                        pageSize: '10'
                    });
                    setPermissionList(result.parentList.map((item: any) => ({
                        id: item.permissionId,
                        code: item.permissionCode,
                        name: item.permissionName,
                        isCheck: false,
                        children: item.childrenList.map((component: any) => ({
                            id: component.permissionId,
                            code: component.permissionCode,
                            name: component.permissionName,
                            isCheck: false,
                        })),
                    })));
                }
            });
        }
    }, [deptId]);

    // Update permissionList when filterData changed, base on submitData to check isCheck for each item and each children
    React.useEffect(() => {
        async function fetchData() {
            const permissionResult = await getPermissionByFilter(filterData.code, filterData.name, pageInfo.pageNumber, pageInfo.total);
            if (permissionResult.success) {
                setPageInfo({
                    pageNumber: permissionResult.pageInfo.pageNumber,
                    total: permissionResult.pageInfo.total,
                    start: permissionResult.pageInfo.start,
                    end: permissionResult.pageInfo.end,
                    pageSize: '10'
                });

                setPermissionList(permissionResult.parentList.map((item: {
                    permissionId: string;
                    permissionCode: string;
                    permissionName: string;
                    childrenList: { permissionId: string; permissionCode: string; permissionName: string }[]
                }) => {
                    // Check all children
                    const children = item.childrenList.map((component: { permissionId: string; permissionCode: string; permissionName: string }) => ({
                        id: component.permissionId,
                        code: component.permissionCode,
                        name: component.permissionName,
                        isCheck: submitData.permissionIds.includes(component.permissionId),
                    }));

                    return {
                        id: item.permissionId,
                        code: item.permissionCode,
                        name: item.permissionName,
                        isCheck: submitData.permissionIds.includes(item.permissionId), // chỉ kiểm tra item
                        children: children
                    };
                }
                ));
            }
        }
        fetchData();
    }, [filterData]);

    // Handle logic ---------------------------------------------------
    const handleGroupItemCheck = (groupId: string) => {
        // Update permissionList
        setPermissionList(permissionList.map((item) => {
            if (item.id === groupId) {
                item.isCheck = !item.isCheck;
                item.children = item.children.map((child) => {
                    child.isCheck = item.isCheck;
                    return child;
                });
                // If group is checked, add all children to submitData, else remove children of group from submitData
                if (item.isCheck) {
                    setSubmitData({
                        ...submitData,
                        permissionIds: [
                            ...submitData.permissionIds,
                            ...item.children.map((child) => child.id)
                        ]
                    });
                } else {
                    setSubmitData({
                        ...submitData,
                        permissionIds: submitData.permissionIds.filter((id) => !item.children.map((child) => child.id).includes(id))
                    });
                }
            }
            return item;
        }));
    }

    const handleComponentItemCheck = (groupId: string, componentId: string) => {
        // Update permissionList
        setPermissionList(permissionList.map((item) => {
            if (item.id === groupId) {
                item.children = item.children.map((child) => {
                    if (child.id === componentId) {
                        child.isCheck = !child.isCheck;
                        // If component is checked, add it to submitData, else remove it from submitData
                        if (child.isCheck) {
                            setSubmitData({
                                ...submitData,
                                permissionIds: [...submitData.permissionIds, componentId]
                            });
                        } else {
                            setSubmitData({
                                ...submitData,
                                permissionIds: submitData.permissionIds.filter((id) => id !== componentId)
                            });
                        }
                    }
                    return child;
                });
            }
            return item;
        }));
    }
    // Render ---------------------------------------------------
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '45%',
                    height: '85%',
                    bgcolor: 'background.paper',
                    boxShadow: 10,
                    p: 2,
                    borderRadius: 3,
                }}>
                    {/* Label and exit Button */}
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            fontWeight={'bold'}
                            fontSize={30}
                        >
                            Thêm vai trò
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Stack>
                    <Divider />

                    {/* Text input */}
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        gap={2}
                        sx={{ my: 2 }}
                    >
                        <TextField
                            id="role-code"
                            label="Mã vai trò"
                            variant="outlined"
                            sx={{
                                bgcolor: 'white',
                                width: '50%'
                            }}
                            onChange={(e) => {
                                setSubmitData({
                                    ...submitData,
                                    roleCode: e.target.value
                                });
                            }}
                        />
                        <TextField
                            id="role-name"
                            label="Tên vai trò"
                            variant="outlined"
                            sx={{
                                bgcolor: 'white',
                                width: '50%'
                            }}
                            onChange={(e) => {
                                setSubmitData({
                                    ...submitData,
                                    roleName: e.target.value
                                });
                            }}
                        />
                    </Stack>

                    {/* Filter */}
                    <AddEditFilter
                        onTextChange={(key, value) => {
                        }}
                        onSubmitted={(data) => {
                            setFilterData(data);
                        }}
                    />

                    {/* List of permission */}
                    <Box
                        maxHeight={300}
                        overflow={'auto'}
                        sx={{
                            mt: 2,
                            position: 'relative',
                        }}
                    >
                        {permissionList.map((item) => (
                            <PermissionGroupItem
                                key={item.id}
                                expanded={expandedGroupItemIds.includes(item.id)}
                                checked={item.isCheck}
                                permissionCode={item.code}
                                permissionName={item.name}
                                handleExpand={() => {
                                    if (expandedGroupItemIds.includes(item.id)) {
                                        setExpandedGroupItemIds(expandedGroupItemIds.filter((id) => id !== item.id));
                                    } else {
                                        setExpandedGroupItemIds([...expandedGroupItemIds, item.id]);
                                    }
                                }}
                                onCheck={() => {
                                    handleGroupItemCheck(item.id);
                                    console.log(submitData.permissionIds);
                                }}
                            >
                                {item.children.map((child) => (
                                    <Box key={child.id}>
                                        <PermissionComponentItem
                                            key={child.id}
                                            permissionCode={child.code}
                                            permissionName={child.name}
                                            checked={child.isCheck}
                                            onCheck={() => {
                                                handleComponentItemCheck(item.id, child.id);
                                                console.log(submitData.permissionIds);
                                            }}
                                        />
                                        {
                                            item.children.indexOf(child) !== item.children.length - 1 &&
                                            <Divider />
                                        }
                                    </Box>
                                ))}
                            </PermissionGroupItem>
                        ))}
                    </Box>

                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={parseInt(pageInfo.total)}
                        page={parseInt(pageInfo.pageNumber)}
                        onPageChange={(event, newPage) => {
                            setPageInfo({
                                ...pageInfo,
                                pageNumber: newPage.toString()
                            });
                        }}
                        rowsPerPage={parseInt(pageInfo.pageSize)}
                        onRowsPerPageChange={(event) => {
                            const selectedValue = parseInt(event.target.value);
                            setPageInfo({
                                ...pageInfo,
                                pageSize: selectedValue.toString()
                            });
                        }}
                        labelRowsPerPage=''
                        rowsPerPageOptions={[5, 10, 20]}
                        sx={{
                            position: 'absolute',
                            bottom: 70,
                            right: 0,
                        }}
                    />
                    {/* Save button */}
                    <Button
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            width: 100,
                            height: 50,
                            bottom: 0,
                            right: 0,
                            m: 2,
                            bgcolor: '#2962FF',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}
                        onClick={() => {
                            role.createRole(submitData.roleCode, submitData.roleName, submitData.permissionIds, submitData.deptId).then((result) => {
                                if (result.success) {
                                    onSubmitted(true, "Thêm mới vai trò thành công!");
                                    onClose();
                                } else {
                                    onSubmitted(false, result.message);
                                }
                            });
                        }}
                    >
                        Thêm
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    padding: 0,
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
        expandIcon={<KeyboardArrowUpIcon sx={{ fontSize: '20', fontWeight: 'bold' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'white',
    padding: 0,
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
    },
    ...theme.applyStyles('dark', {
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: 2,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            if (!(event.target instanceof HTMLInputElement && event.target.type === 'checkbox')) {
                setExpanded(newExpanded ? panel : false);
            }
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack
                        direction={'row'}
                        gap={4}
                        justifyContent={'start'}
                        alignItems={'center'}
                        sx={{ pl: 4, width: '100%' }}
                    >
                        <Checkbox size='small' sx={{ mr: 6 }} />
                        <Typography sx={{ width: '40%' }}>ADMIN_G_DEPARTMENT</Typography>
                        <Typography sx={{ width: '40%' }}>Department Group</Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack
                        direction={'row'}
                        gap={4}
                        justifyContent={'start'}
                        alignItems={'center'}
                        sx={{ pl: 7, width: '100%' }}
                    >
                        <Checkbox size='small' sx={{ mr: 6 }} />
                        <Typography sx={{ width: '40%' }}>ADMIN_G_DEPARTMENT</Typography>
                        <Typography sx={{ width: '40%' }}>Department Group</Typography>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

interface PermissionGroupItemProps {
    expanded: boolean;
    checked: boolean;
    permissionCode: string;
    permissionName: string;
    onCheck: () => void;
    handleExpand: () => void;
    children?: React.ReactNode;  // To support children
}

function PermissionGroupItem({
    expanded,
    checked,
    permissionCode,
    permissionName,
    onCheck,
    handleExpand,
    children
}: PermissionGroupItemProps) {
    return (
        <Accordion
            expanded={expanded}
            onChange={handleExpand}
        >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Stack
                    direction={'row'}
                    gap={4}
                    justifyContent={'start'}
                    alignItems={'center'}
                    sx={{ pl: 4, width: '100%' }}
                >
                    <Checkbox size='small' sx={{ mr: 6 }} checked={checked} onChange={onCheck} onClick={(e) => e.stopPropagation()} />
                    <Typography sx={{ width: '40%' }}>{permissionCode}</Typography>
                    <Typography sx={{ width: '40%' }}>{permissionName}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
}

interface PermissionComponentItemProps {
    permissionCode: string;
    permissionName: string;
    checked: boolean;
    onCheck: () => void;
}
function PermissionComponentItem({ permissionCode, permissionName, checked, onCheck }: PermissionComponentItemProps) {
    return (
        <Stack
            direction={'row'}
            gap={4}
            justifyContent={'start'}
            alignItems={'center'}
            sx={{ pl: 7, width: '100%' }}
        >
            <Checkbox size='small' sx={{ mr: 6 }} checked={checked} onChange={onCheck} />
            <Typography sx={{ width: '40%' }}>{permissionCode}</Typography>
            <Typography sx={{ width: '40%' }}>{permissionName}</Typography>
        </Stack>
    );
}
