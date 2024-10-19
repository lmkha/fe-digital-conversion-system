/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Box, Button, Divider, IconButton, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import Password from "../components/password";
import {
    District,
    Ward,
    Province,
    getProvinces,
    getDistricts,
    getWards,
} from '@/services/department';
import AutoComplete from "../components/autocomplete";
import ImagePicker from "../components/image-picker";
import { getRolesByDeptId } from "@/services/role";

interface AddUserModalProps {
    open: boolean;
    deptId: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string) => void;
}

export default function AddUserModal({ open, deptId, onClose, onSubmitted }: AddUserModalProps) {
    // Address ------------------------------------------------------------------
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [wardList, setWardList] = useState<Ward[]>([]);
    // --------------------------------------------------------------------------
    const [imageUploadInfo, setImageUploadInfo] = useState({
        imageUrl: '',
        success: true,
        errorMessage: ''
    })
    const genders = [
        { name: 'Nam', id: 'Nam' },
        { name: 'Nữ', id: 'Nữ' },
        { name: 'Khác', id: 'Khác' },
    ];
    const [roles, setRoles] = useState<{
        roleId: string;
        roleName: string;
    }[]>([]);
    const [submitData, setSubmitData] = useState({
        username: '',
        password: '',
        name: '',
        jobTitle: '',
        gender: {
            id: '',
            name: ''
        },
        dob: dayjs(),
        role: {
            name: '',
            id: ''
        },
        email: '',
        phone: '',
        province: {
            name: '',
            id: ''
        },
        district: {
            name: '',
            id: ''
        },
        ward: {
            name: '',
            id: ''
        },
        addressDetail: '',
        active: true,
    });
    // UseEffect ----------------------------------------------------------------

    // Address ------------------------------------------------------------------
    useEffect(() => {
        if (open && deptId) {
            getProvinces().then((res) => {
                setProvinceList(res);
            });
            getRolesByDeptId(deptId).then((res) => {
                setRoles(res.roles);
            });
        }
    }, [open, deptId]);

    useEffect(() => {
        if (submitData.province.id) {
            getDistricts(submitData.province.id).then((res) => {
                setDistrictList(res);
            });
        } else {
            setDistrictList([]);
        }
        setSubmitData({
            ...submitData,
            district: {
                name: '',
                id: ''
            }
        });
    }, [submitData.province.id]);

    useEffect(() => {
        if (submitData.district.id) {
            getWards(submitData.district.id).then((res) => {
                setWardList(res);
            });
        } else {
            setWardList([]);
        }
        setSubmitData({
            ...submitData,
            ward: {
                name: '',
                id: ''
            }
        });
    }, [submitData.district.id]);


    // Render -------------------------------------------------------------------
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
                width: '70%',
                height: '95%',
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
                        Thêm người dùng
                    </Typography>
                    <IconButton
                        aria-label="delete"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </Stack>

                {/* Content */}
                <Stack direction={'row'} height={'83%'} spacing={2}>

                    {/* Image picker, active switch */}
                    <Stack direction={'column'} width={'30%'} height={'80%'} spacing={1}
                        justifyContent={'start'} alignItems={'center'}
                        sx={{
                            backgroundColor: 'white',
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 5,
                            px: 2,
                            py: 4,
                        }}>
                        <ImagePicker onSelectedImage={(imageUrl, success, errorMessage) => {
                            setImageUploadInfo({
                                imageUrl: imageUrl,
                                success: success,
                                errorMessage: errorMessage
                            });
                        }} />
                        <Box
                            width="100%"
                            height="50px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            paddingTop={3}
                        >
                            {imageUploadInfo.success ? (
                                <Stack justifyContent={'center'} alignItems={'center'}>
                                    <Typography sx={{ color: 'grey.600' }}>*.jpeg, *.jpg, *.png.</Typography>
                                    <Typography sx={{ color: 'grey.600' }}>Tối đa 100KB</Typography>
                                </Stack>
                            ) : (
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    {imageUploadInfo.errorMessage}
                                </Alert>
                            )}
                        </Box>
                        <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'} sx={{
                            pt: 2,
                        }}>

                            <Typography fontWeight={'bold'}>Kích hoạt</Typography>
                            <Switch
                                checked={submitData.active}
                                onChange={() => {
                                    setSubmitData({
                                        ...submitData,
                                        active: !submitData.active
                                    });
                                }}
                                color="primary"
                            />
                        </Stack>
                    </Stack>

                    {/* Form */}
                    <Box width={'70%'} height={'100%'} sx={{
                        border: '1px solid',
                        borderColor: 'grey.300',
                        borderRadius: 5,
                        px: 2,
                        py: 4
                    }}>
                        <Stack spacing={4}>
                            {/* Username and password */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '55%' }} label={'Tên tài khoản *'}
                                    value={submitData.username}
                                />
                                <Password
                                    isError={false}
                                    onChange={(value) => {
                                        setSubmitData({
                                            ...submitData,
                                            password: value
                                        })
                                    }}
                                    validatePassword={(password) => { }}
                                />
                            </Stack>

                            {/* Name, job title */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '55%' }} label={'Họ tên *'}
                                    value={submitData.name}
                                />
                                <TextField size="small" sx={{ width: '45%' }} label={'Công việc *'}
                                    value={submitData.jobTitle}
                                />
                            </Stack>

                            {/* Gender and Dob */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <AutoComplete
                                    label="Giới tính *"
                                    value={submitData.gender}
                                    options={genders}
                                    onChange={(value) => {
                                        setSubmitData({
                                            ...submitData,
                                            gender: value
                                        });
                                    }}
                                    width="55%"
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ width: '45%' }}>
                                        <MUIDatePicker
                                            sx={{ width: '100%' }}
                                            label="Ngày sinh *"
                                            format="DD/MM/YYYY"
                                            value={submitData.dob}
                                            onChange={(newValue) => {
                                                setSubmitData({
                                                    ...submitData,
                                                    dob: newValue as Dayjs
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Stack>

                            {/* Email, phone */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '55%' }} label={'Email *'}
                                    value={submitData.email}
                                />
                                <TextField size="small" sx={{ width: '45%' }} label={'Số điện thoại *'}
                                    value={submitData.phone}
                                />
                            </Stack>

                            {/* Role, province */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <AutoComplete
                                    label="Vai trò *"
                                    value={submitData.role}
                                    options={roles.map((role) => ({
                                        name: role.roleName,
                                        id: role.roleId
                                    }))}
                                    onChange={(value) => {
                                        setSubmitData({
                                            ...submitData,
                                            role: value
                                        });
                                    }}
                                    width="55%"
                                />
                                <AutoComplete
                                    label="Tỉnh / Thành phố *"
                                    value={submitData.province}
                                    options={provinceList.map((province) => ({
                                        name: province.provinceName,
                                        id: province.provinceId
                                    }))}
                                    onChange={(value) => {
                                        setSubmitData({
                                            ...submitData,
                                            province: value
                                        });
                                    }}
                                    width="45%"
                                />
                            </Stack>

                            {/* District, ward */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <AutoComplete
                                    label="Quận / Huyện *"
                                    value={submitData.district}
                                    options={districtList.map((district) => ({
                                        name: district.districtName,
                                        id: district.districtId
                                    }))}
                                    onChange={(value) => {
                                        setSubmitData({
                                            ...submitData,
                                            district: value
                                        });
                                    }}
                                    width="55%"
                                />
                                <AutoComplete
                                    label="Phường / Xã *"
                                    value={submitData.ward}
                                    options={wardList.map((ward) => ({
                                        name: ward.wardName,
                                        id: ward.wardId
                                    }))}
                                    onChange={(value) => {
                                        setSubmitData({
                                            ...submitData,
                                            ward: value
                                        });
                                    }}
                                    width="45%"
                                />
                            </Stack>

                            {/* Address detail */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '100%' }} label={'Địa chỉ *'}
                                    value={submitData.addressDetail}
                                />
                            </Stack>
                        </Stack>
                    </Box>
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
                >
                    Thêm
                </Button>

            </Box>
        </Modal >
    );
}
