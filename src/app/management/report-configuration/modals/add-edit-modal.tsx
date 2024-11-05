/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AutoComplete from "../../user/components/autocomplete";
import dayjs from "dayjs";
import MyDatePicker from "../components/date-picker";
import ReportConfigItem from "@/services/models/report-config-item";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/app-context";
import { createReportConfiguration, findReportConfigurationById, updateReportConfiguration } from "@/services/report-config";
import { validateAddReportConfig } from "@/validators/add-report-config";
import { validateEditReportConfig } from "@/validators/edit-report-config";

interface AddEditReportModalProps {
    open: boolean;
    deptId: string;
    reportId?: string | null;
    onClose: () => void;
}

export default function AddEditReportModal({ open, deptId, reportId, onClose }: AddEditReportModalProps) {
    const { setToastInfo } = useAppContext();
    const [submitData, setSubmitData] = useState<ReportConfigItem>({
        reportName: 'Báo cáo ATVSLĐ'
    });
    const [validateResult, setValidateResult] = useState<{ field: string, message: string }[]>();
    const handleAddNew = () => {
        const validateRes = validateAddReportConfig({
            year: submitData.year?.toString() || '',
            period: submitData.reportPeriod || '',
            startDate: submitData.startDate || '',
            finishDate: submitData.finishDate || ''
        });
        if (validateRes.length > 0) {
            setValidateResult(validateRes);
            setToastInfo && setToastInfo({
                show: true,
                message: validateRes[0].message,
                severity: 'error'
            });
            return;
        }

        createReportConfiguration({
            deptId: deptId,
            year: submitData.year || 0,
            reportPeriod: submitData.reportPeriod || '',
            startDate: submitData.startDate || '',
            finishDate: submitData.finishDate || '',
            reportName: submitData.reportName || '',
            status: submitData.status ? 1 : 0
        }).then((result) => {
            setToastInfo && setToastInfo({
                show: true,
                message: result.message,
                severity: result.success ? 'success' : 'error'
            });
            if (result.success) {
                onClose();
            }
        });
    };

    const handleEdit = () => {
        const validateRes = validateEditReportConfig({
            startDate: submitData.startDate || '',
            finishDate: submitData.finishDate || ''
        });
        if (validateRes.length > 0) {
            setValidateResult(validateRes);
            setToastInfo && setToastInfo({
                show: true,
                message: validateRes[0].message,
                severity: 'error'
            });
            return;
        }

        updateReportConfiguration({
            deptId: deptId,
            reportId: reportId || '',
            startDate: submitData.startDate || '',
            finishDate: submitData.finishDate || '',
            status: submitData.status ? 1 : 0
        }).then((result) => {
            setToastInfo && setToastInfo({
                show: true,
                message: result.message,
                severity: result.success ? 'success' : 'error'
            });
            if (result.success) {
                onClose();
            }
        });
    };

    useEffect(() => {
        if (reportId) {
            // Call API to get report detail
            findReportConfigurationById({ reportId }).then((result) => {
                if (result.success) {
                    result.reportConfig && setSubmitData(result.reportConfig);
                } else {
                    setToastInfo && setToastInfo({
                        show: true,
                        message: result.message,
                        severity: 'error'
                    });
                }
            });
        } else {
            setSubmitData({
                reportName: 'Báo cáo ATVSLĐ'
            });
        }
    }, [reportId]);

    useEffect(() => {
        if (!open) {
            setSubmitData({
                reportName: 'Báo cáo ATVSLĐ'
            });
            setValidateResult([]);
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                height: '66%',
                bgcolor: 'background.paper',
                boxShadow: 10,
                p: 2,
                borderRadius: 3,
            }}>
                {/* Title and close button */}
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
                        fontSize={25}
                    >
                        {reportId ? 'Sửa báo cáo' : 'Thêm báo cáo'}
                    </Typography>
                    <IconButton
                        aria-label="delete"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Stack>
                <Divider />

                {/* Content */}
                <Stack direction={'column'} height={'83%'} spacing={2} paddingTop={2}>
                    {/* Report type */}
                    <AutoComplete
                        disabled={true}
                        label="Loại báo cáo * "
                        value={{
                            id: '1',
                            name: 'Báo cáo ATVSLĐ'
                        }}
                        options={[]}
                        onChange={() => { }}
                        width="100%"
                        error={false}
                    />

                    {/* Year, period */}
                    <Stack direction={'row'} spacing={4}>
                        <TextField
                            error={validateResult?.some((item) => item.field === 'year')}
                            disabled={reportId ? true : false}
                            size="small"
                            label="Năm * "
                            value={submitData?.year?.toString() || ''}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const inputValue = event.target.value;
                                const parsedValue = parseInt(inputValue);
                                setSubmitData({
                                    ...submitData,
                                    year: isNaN(parsedValue) ? 0 : parsedValue
                                });
                            }}
                            sx={{ width: '50%' }}
                        />
                        <AutoComplete
                            error={validateResult?.some((item) => item.field === 'period')}
                            disabled={reportId ? true : false}
                            label="Kỳ * "
                            value={{
                                id: submitData?.reportPeriod || '',
                                name: submitData?.reportPeriod || '',
                            }}
                            options={[
                                {
                                    name: 'Cả năm',
                                    id: 'Cả năm'
                                },
                                {
                                    name: '6 tháng',
                                    id: '6 tháng'
                                }
                            ]}
                            onChange={(value) => {
                                submitData && setSubmitData({
                                    ...submitData,
                                    reportPeriod: value.id
                                });
                            }}
                            width="50%"
                        />
                    </Stack>

                    {/* Start date, Finish date */}
                    <Stack direction={'row'} spacing={4}>
                        <MyDatePicker
                            error={validateResult && validateResult?.some((item) => item.field === 'startDate')}
                            label="Ngày bắt đầu * "
                            value={submitData?.startDate ? dayjs(submitData.startDate, "DD/MM/YYYY") : null}
                            onChange={(newValue) => {
                                submitData && setSubmitData({
                                    ...submitData,
                                    startDate: newValue?.format("DD/MM/YYYY") || ''
                                });
                            }}
                            containerWidth="100%"
                            width="275px"
                        />
                        <MyDatePicker
                            error={validateResult && validateResult?.some((item) => item.field === 'finishDate')}
                            label="Ngày kết thúc * "
                            value={submitData?.finishDate ? dayjs(submitData.finishDate, "DD/MM/YYYY") : null}
                            onChange={(newValue) => {
                                submitData && setSubmitData({
                                    ...submitData,
                                    finishDate: newValue?.format("DD/MM/YYYY") || ''
                                });
                            }}
                            containerWidth="100%"
                            width="275px"
                        />
                    </Stack>
                    {/* Report type */}
                    <AutoComplete
                        label="Trạng thái "
                        value={{
                            name: submitData?.status === undefined
                                ? ''
                                : submitData.status
                                    ? 'Kích hoạt'
                                    : 'Không kích hoạt',
                            id: submitData?.status === undefined
                                ? ''
                                : submitData.status
                                    ? '1'
                                    : '0',
                        }}
                        options={[
                            {
                                id: '1',
                                name: 'Kích hoạt'
                            },
                            {
                                id: '0',
                                name: 'Không kích hoạt'
                            }
                        ]}
                        onChange={(newValue) => {
                            if (!newValue.id) {
                                setSubmitData({
                                    ...submitData,
                                    status: undefined
                                });
                            } else {
                                setSubmitData({
                                    ...submitData,
                                    status: newValue.id === '1' ? true : false
                                });
                            }
                        }}
                        width="100%"
                        error={false}
                    />
                </Stack>

                {/* Button */}
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
                        reportId ? handleEdit() : handleAddNew();
                    }}
                    disabled={false}
                >
                    {reportId ? 'Lưu' : 'Thêm'}
                </Button>
            </Box>
        </Modal>
    );
}
