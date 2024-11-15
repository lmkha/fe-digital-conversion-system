import { Box, Divider, Grid2, IconButton, Stack, TextField, Typography } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { UpdatedAtType } from "@/services/models/report-item";
import { usePermission } from "@/contexts/permission-context";

interface ReportItemProps {
    reportId?: string;
    status?: string;
    departmentName?: string;
    level?: number;
    startDate?: string;
    finishDate?: string;
    reportingPeriod?: string;
    updatedAt?: UpdatedAtType;
    userUpdateName?: string;
    onView?: (reportId: string) => void;
    onEdit?: (reportId: string) => void;
}

export default function ReportItem({ reportId, status, departmentName, level, startDate, finishDate, reportingPeriod, updatedAt, userUpdateName, onView, onEdit }: ReportItemProps) {
    const { permissionList } = usePermission();

    return (
        <>
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    width: '100%',
                    mb: 1,
                    mt: 1,
                }}
            >
                <Grid2 container sx={{ width: '100%' }} spacing={1}
                >
                    <Grid2 container size={2}>
                        {/* Action */}
                        <Grid2 size={5} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Stack direction={'row'}>
                                <IconButton onClick={() => {
                                    onView && onView(reportId || '');
                                }}>
                                    <VisibilityOutlinedIcon />
                                </IconButton>

                                {permissionList?.report?.update && (status === 'Nhập liệu' || status === 'Đã từ chối') && (
                                    <IconButton onClick={() => {
                                        onEdit && onEdit(reportId || '');
                                    }}>
                                        <CreateIcon />
                                    </IconButton>
                                )}

                            </Stack>
                        </Grid2>
                        {/* Status */}
                        <Grid2 size={7} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1}>
                                <Box sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor:
                                        status === 'Nhập liệu' ? 'steelblue' :
                                            status === 'Đã duyệt' ? 'green' :
                                                status === 'Chờ duyệt' ? 'orange' :
                                                    status === 'Đã từ chối' ? 'red' : 'gray',
                                }}
                                />
                                <Typography variant="body1">{status}</Typography>
                            </Stack>
                        </Grid2>
                    </Grid2>

                    <Grid2 container size={3}>
                        {/* Department name */}
                        <Grid2 size={8} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Typography variant="body1" >{departmentName}</Typography>
                        </Grid2>
                        {/* Level */}
                        <Grid2 size={4} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Typography variant="body1">{level}</Typography>
                        </Grid2>
                    </Grid2>

                    <Grid2 container size={5}>
                        {/* Start date */}
                        <Grid2 size={3} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Typography variant="body1" >{startDate}</Typography>
                        </Grid2>
                        {/* Finish day */}
                        <Grid2 size={3} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Typography variant="body1" >{finishDate}</Typography>
                        </Grid2>

                        {/* Reporting period */}
                        <Grid2 size={3} sx={{
                            justifyContent: 'start',
                            alignItems: 'center',
                            display: 'flex',
                        }}>
                            <Typography variant="body1">{reportingPeriod}</Typography>
                        </Grid2>
                        {/* Created at */}
                        <Grid2 size={3}>
                            <Stack direction={'column'} sx={{
                                justifyContent: 'center',
                                alignItems: 'start',
                            }}>
                                <Typography variant="body1" >{updatedAt?.day || '-'}</Typography>
                                <Typography variant="body1" >{updatedAt?.time || '-'}</Typography>
                            </Stack>
                        </Grid2>
                    </Grid2>

                    {/* Create By */}
                    <Grid2 container size={2} sx={{
                        justifyContent: 'start',
                        alignItems: 'center',
                        display: 'flex',
                    }}>
                        <Typography variant="body1">{userUpdateName}</Typography>
                    </Grid2>
                </Grid2>
            </Stack>
            <Divider />
        </>
    );
}