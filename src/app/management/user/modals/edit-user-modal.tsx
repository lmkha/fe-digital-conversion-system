/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Box, Button, IconButton, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import {
    District,
    Ward,
    Province,
    getProvinces,
    getDistricts,
    getWards,
} from '@/services/department';
import AutoComplete from "../components/autocomplete";
import { getRolesByDeptId } from "@/services/role";
import { findUserById, updateUser, uploadAvatarAndUpdateUser } from "@/services/user";
import ImagePickerForEditModal from "../components/image-picker-edit";
import { useUserInfo } from '@/contexts/user-info-context';
import { userInfo } from "os";
import { EditUserValidatedField, editUserValidator } from "@/validators/edit-user";

interface EditUserModalProps {
    open: boolean;
    userId: string;
    deptId: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string) => void;
}

export default function EditUserModal({ open, userId, deptId, onClose, onSubmitted }: EditUserModalProps) {
    const { setUserInfo, userInfo } = useUserInfo();
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
        userId: string
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
        userId: '',
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
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorFields, setErrorFields] = useState<EditUserValidatedField[]>();
    // handle submit data
    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Validate data
        const errorFields = editUserValidator({
            name: submitData.name,
            jobTitle: submitData.jobTitle,
            roleId: submitData.role.id,
        });
        if (errorFields.length > 0) {
            setErrorFields(errorFields);
            setIsSubmitting(false);
            return;
        } else {
            setErrorFields([]);
        }

        try {
            let result;

            // Avatar không thay đổi
            if (imageUploadInfo.file === null) {
                result = await updateUser(
                    userId,
                    submitData.email,
                    submitData.name,
                    submitData.phone,
                    submitData.ward.id,
                    submitData.district.id,
                    submitData.province.id,
                    submitData.gender.id,
                    submitData.dob.format('MM/DD/YYYY'),
                    submitData.status,
                    submitData.role.id,
                    submitData.jobTitle,
                    deptId,
                    submitData.addressDetail,
                    submitData.avatar
                );
            } else {
                // Avatar thay đổi
                result = await uploadAvatarAndUpdateUser(
                    userId,
                    submitData.email,
                    submitData.name,
                    submitData.phone,
                    submitData.ward.id,
                    submitData.district.id,
                    submitData.province.id,
                    submitData.gender.id,
                    submitData.dob.format('MM/DD/YYYY'),
                    submitData.status,
                    submitData.role.id,
                    submitData.jobTitle,
                    deptId,
                    submitData.addressDetail,
                    imageUploadInfo.file
                );
            }

            if (result.success) {
                // Update user avatar
                onSubmitted(true, "Cập nhật người dùng thành công!");
                onClose();
            } else {
                onSubmitted(false, result.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            onSubmitted(false, "Đã xảy ra lỗi khi cập nhật người dùng.");
        } finally {
            setIsSubmitting(false); // Dừng trạng thái loading khi API hoàn thành
        }
    };

    // UseEffect ----------------------------------------------------------------
    // Fetch user info base on userId
    useEffect(() => {
        getProvinces().then((res) => {
            setProvinceList(res);
        });
    }, []);
    useEffect(() => {
        // When close modal, reset all data
        if (!open) {
            setSubmitData({
                userId: '',
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
            setIsLoading(true);
            setIsFirstTime(true);

        }
        if (open && userId) {
            findUserById(userId).then((result) => {
                setSubmitData({
                    userId: result.data.userId,
                    name: result.data.fullName,
                    jobTitle: result.data.jobTitle,
                    gender: {
                        name: result.data?.gender || '',
                        id: result.data?.gender || ''
                    },
                    dob: dayjs(result.data?.dateOfBirth, 'YYYY/MM/DD') || dayjs(),
                    role: {
                        name: result.data.role?.roleName || '',
                        id: result.data.role?.roleId || ''
                    },
                    email: result.data.email,
                    phone: result.data.phone || '',

                    province: {
                        name: result.data.province?.provinceName || '',
                        id: result.data.province?.provinceId || ''
                    },
                    district: {
                        name: result.data.district?.districtName || '',
                        id: result.data.district?.districtId || ''
                    },
                    ward: {
                        name: result.data.ward?.wardName || '',
                        id: result.data.ward?.wardId || ''
                    },
                    addressDetail: result.data?.address || '',
                    status: result.data.status?.toString() || '',
                    avatar: result.data.avatar
                });
                if (result.data.province?.provinceId) {
                    getDistricts(result.data.province.provinceId).then((res) => {
                        setDistrictList(res);
                    });
                }
                if (result.data.district?.districtId) {
                    getWards(result.data.district.districtId).then((res) => {
                        setWardList(res);
                    });
                }
                getRolesByDeptId(deptId).then((res) => {
                    setRoles(res.roles);
                });
                setIsLoading(false);
            });
            console.log(`Check var address: ${submitData.addressDetail}`)
        }
    }, [open, userId]);


    // Address ------------------------------------------------------------------
    useEffect(() => {
        // Is not the first time
        if (!isFirstTime) {
            if (submitData.province.id) {
                getDistricts(submitData.province.id).then((res) => {
                    setDistrictList(res);
                });
                console.log(`Check ward 7: ${submitData.ward}`)
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
        }
    }, [submitData.province.id]);

    useEffect(() => {
        if (!isFirstTime) {
            if (submitData.district.id) {
                getWards(submitData.district.id).then((res) => {
                    setWardList(res);
                });
                console.log(`Check ward 8: ${submitData.ward}`)
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
        }
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
                {
                    isLoading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <>
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
                                    Chỉnh sửa người dùng
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
                                    <ImagePickerForEditModal
                                        avatarUrl={submitData.avatar}
                                        clearImage={!open}
                                        onSelectedImage={(file, imageUrl, success, errorMessage) => {
                                            console.log(`Check image: file ${file}, imageUrl ${imageUrl}, success ${success}, errorMessage ${errorMessage}`)
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
                                        {/* Name, job title */}
                                        <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                            <TextField size="small" label={'Họ tên *'} sx={{ width: '55%' }}
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
                                        <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
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
                                                <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ width: '45%' }}>
                                                    <MUIDatePicker
                                                        sx={{
                                                            width: '100%',
                                                            '.MuiInputBase-root': {
                                                                height: '40px',
                                                                fontSize: '14px'
                                                            },
                                                            '.MuiFormLabel-root': {
                                                                lineHeight: '1.2',
                                                                padding: 0,
                                                            },
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
                                                    setIsFirstTime(false);
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
                                                    setIsFirstTime(false);
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                ) : (
                                    'Lưu'
                                )}
                            </Button>
                        </>
                    )
                }


            </Box>
        </Modal >
    );
}
