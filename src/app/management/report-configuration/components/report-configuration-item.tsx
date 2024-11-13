import { Divider, Grid2, IconButton, Stack, Switch, Typography } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { usePermission } from "@/contexts/permission-context";

interface ReportConfigurationItemProps {
    reportId?: string;
    year?: string;
    reportName?: string;
    reportPeriod?: string;
    startDate?: string;
    finishDate?: string;
    status?: boolean;
    onEdit?: (reportId: string) => void;
    onChangeStatus?: (reportId: string) => void;
}

export default function ReportConfigurationItem({ reportId, year, reportName, reportPeriod, startDate, finishDate, status, onEdit, onChangeStatus }: ReportConfigurationItemProps) {
    const { permissionList } = usePermission();
    return (
        <>
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    mb: 1,
                    mt: 1,
                }}
            >
                <Grid2 container sx={{ width: '100%' }} spacing={2}>
                    {/* Left side */}
                    <Grid2 container size={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* Action */}
                        <Grid2 size={2} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                            {permissionList?.reportConfig?.update && (
                                <IconButton onClick={() => {
                                    onEdit && onEdit(reportId || '');
                                }}>
                                    <CreateIcon />
                                </IconButton>
                            )}
                        </Grid2>
                        {/* Year */}
                        <Grid2 size={3}>
                            <Typography variant="body1">{year}</Typography>
                        </Grid2>
                        {/* Report name */}
                        <Grid2 size={7} sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography variant="body1">{reportName}</Typography>
                        </Grid2>
                    </Grid2>

                    {/* Right side */}
                    <Grid2 container size={7} sx={{ justifyContent: 'center', alignItems: 'center', pl: 1 }}>
                        <Grid2 container size={6} sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {/* Report period */}
                            <Grid2 size={5}>
                                <Typography variant="body1">{reportPeriod}</Typography>
                            </Grid2>
                            {/* Start date */}
                            <Grid2 size={7}>
                                <Typography variant="body1">{startDate}</Typography>
                            </Grid2>
                        </Grid2>

                        <Grid2 container size={6} sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {/* Finish date */}
                            <Grid2 size={7}>
                                <Typography variant="body1">{finishDate}</Typography>
                            </Grid2>
                            {/* Status */}
                            <Grid2 size={5}>
                                {permissionList?.reportConfig?.update && (
                                    <Switch
                                        checked={status}
                                        onChange={() => {
                                            onChangeStatus && onChangeStatus(reportId || '');
                                        }}
                                    />
                                )}
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Stack>
            <Divider />
        </>
    );
}