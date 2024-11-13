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
import ImagePickerForAddModal from "../components/image-picker-add";
import { getRolesByDeptId } from "@/services/role";
import { uploadAvatarAndCreateUser } from "@/services/user";
import { CircularProgress } from '@mui/material';
import { AddUserValidatedField, addUserValidator } from "@/validators/add-user";

interface AddUserModalProps {
    open: boolean;
    deptId?: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string) => void;
}

export default function AddUserModal({ open, deptId, onClose, onSubmitted }: AddUserModalProps) {
    // Address ------------------------------------------------------------------
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [wardList, setWardList] = useState<Ward[]>([]);
    // --------------------------------------------------------------------------
    const [imageUploadInfo, setImageUploadInfo] = useState<{
        file: File | null;
        imageUrl: string;
        success: boolean;
        errorMessage: string;
    }>({
        file: null,
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
    const [submitData, setSubmitData] = useState<{
        username: string;
        password: string;
        name: string;
        jobTitle: string;
        gender: {
            id: string;
            name: string;
        };
        dob: any;
        role: {
            name: string;
            id: string;
        };
        email: string;
        phone: string;
        province: {
            name: string;
            id: string;
        };
        district: {
            name: string;
            id: string;
        };
        ward: {
            name: string;
            id: string;
        };
        addressDetail: string;
        status: '0' | '1' | '2';
        avatar: string;
    }>({
        username: '',
        password: 'Abcd1@34',
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
        status: '1',
        avatar: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorFields, setErrorFields] = useState<AddUserValidatedField[]>();

    const handleSubmit = async () => {
        setLoading(true);

        // Validate input
        const errorFields = addUserValidator({
            username: submitData.username,
            password: submitData.password,
            name: submitData.name,
            jobTitle: submitData.jobTitle,
            roleId: submitData.role.id
        });

        if (errorFields.length > 0) {
            setErrorFields(errorFields);
            setLoading(false);
            return;
        } else {
            setErrorFields([]);
        }

        const result = await uploadAvatarAndCreateUser(
            imageUploadInfo.file,
            submitData.username,
            submitData.password,
            submitData.name,
            submitData.email,
            submitData.phone,
            submitData.role.id,
            deptId ? deptId : '',
            submitData.province.id,
            submitData.district.id,
            submitData.ward.id,
            submitData.gender.id,
            submitData.dob.format('MM-DD-YYYY'),
            submitData.status,
            submitData.jobTitle,
            submitData.addressDetail,
        );

        if (result.success) {
            onSubmitted(true, 'Thêm người dùng thành công');
            onClose();
        } else {
            onSubmitted(false, result.message);
        }

        setLoading(false);
    };
    // UseEffect ----------------------------------------------------------------

    // Address ------------------------------------------------------------------
    useEffect(() => {
        if (!open) {
            setSubmitData({
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
                status: '1',
                avatar: ''
            });
            setImageUploadInfo({
                file: null,
                imageUrl: '',
                success: true,
                errorMessage: ''
            });
            setErrorFields([]);
            return;
        }
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
                        color='black'
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
                        <ImagePickerForAddModal clearImage={!open} onSelectedImage={(file, imageUrl, success, errorMessage) => {
                            setImageUploadInfo({
                                file: file,
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
                                checked={submitData.status === '1'}
                                onChange={() => {
                                    setSubmitData({
                                        ...submitData,
                                        status: submitData.status === '1' ? '0' : '1'
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
                                    error={errorFields?.includes('username')}
                                    value={submitData.username}
                                    onChange={(e) => {
                                        setSubmitData({
                                            ...submitData,
                                            username: e.target.value
                                        });
                                    }}
                                />
                                <Password
                                    defaultValue="Abcd1@34"
                                    isError={errorFields?.includes('password')}
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
                                    error={errorFields?.includes('name')}
                                    value={submitData.name}
                                    onChange={(e) => {
                                        setSubmitData({
                                            ...submitData,
                                            name: e.target.value
                                        });
                                    }}
                                />
                                <TextField size="small" sx={{ width: '45%' }} label={'Công việc *'}
                                    error={errorFields?.includes('jobTitle')}
                                    value={submitData.jobTitle}
                                    onChange={(e) => {
                                        setSubmitData({
                                            ...submitData,
                                            jobTitle: e.target.value
                                        });
                                    }}
                                />
                            </Stack>

                            {/* Gender and Dob */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4} alignItems={'end'}>
                                <AutoComplete
                                    label="Giới tính "
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
                                    <DemoContainer
                                        components={['DatePicker', 'DatePicker']}
                                        sx={{
                                            width: '45%',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <MUIDatePicker
                                            slotProps={{
                                                textField: {
                                                    size: 'small',
                                                    sx: {
                                                        backgroundColor: 'white',
                                                        width: '100%',
                                                    }
                                                }
                                            }}
                                            label="Ngày sinh "
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
                                <TextField size="small" sx={{ width: '55%' }} label={'Email '}
                                    value={submitData.email}
                                    onChange={(e) => {
                                        setSubmitData({
                                            ...submitData,
                                            email: e.target.value
                                        });
                                    }}
                                />
                                <TextField size="small" sx={{ width: '45%' }} label={'Số điện thoại '}
                                    value={submitData.phone}
                                    onChange={(e) => {
                                        setSubmitData({
                                            ...submitData,
                                            phone: e.target.value
                                        });
                                    }}
                                />
                            </Stack>

                            {/* Role, province */}
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <AutoComplete
                                    error={errorFields?.includes('roleId')}
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
                                    label="Tỉnh / Thành phố "
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
                                    label="Quận / Huyện "
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
                                    label="Phường / Xã "
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
                                <TextField size="small" sx={{ width: '100%' }} label={'Địa chỉ '}
                                    value={submitData.addressDetail}
                                    onChange={(e) => {
                                        setSubmitData({
                                            ...submitData,
                                            addressDetail: e.target.value
                                        });
                                    }}
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
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                    ) : (
                        'Thêm'
                    )}
                </Button>

            </Box>
        </Modal >
    );
}
