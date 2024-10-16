/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Divider, IconButton, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
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
    createDepartment,
    createDepartmentLevel1,
    DetailedDepartment,
    getDepartmentById
} from '@/services/department';
import AutoComplete from "../components/autocomplete";
import ImagePicker from "../components/image-picker";

interface AddUserModalProps {
    open: boolean;
    deptId: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string) => void;
}

export default function AddUserModal({ open, deptId, onClose, onSubmitted }: AddUserModalProps) {
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
    // Address ------------------------------------------------------------------
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [wardList, setWardList] = useState<Ward[]>([]);
    const [address, setAddress] = useState({
        provinceName: '',
        districtName: '',
        wardName: '',
        provinceId: '',
        districtId: '',
        wardId: ''
    });
    const [gender, setGender] = useState({
        name: '',
        id: ''
    });
    const genders = [
        { name: 'Nam', id: '1' },
        { name: 'Nữ', id: '2' }
    ];

    // UseEffect ----------------------------------------------------------------

    // Address ------------------------------------------------------------------
    useEffect(() => {
        if (open) {
            getProvinces().then((res) => {
                setProvinceList(res);
            });
        }
    }, [open]);

    useEffect(() => {
        if (address.provinceId) {
            getDistricts(address.provinceId).then((res) => {
                setDistrictList(res);
            });
        } else {
            setDistrictList([]);
        }
        setAddress({
            ...address,
            districtName: '',
            districtId: ''
        });
    }, [address.provinceId]);

    useEffect(() => {
        if (address.districtId) {
            getWards(address.districtId).then((res) => {
                setWardList(res);
            });
        } else {
            setWardList([]);
        }
        setAddress({
            ...address,
            wardName: '',
            wardId: ''
        });
    }, [address.districtId]);


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
                <Stack direction={'row'} height={'80%'} spacing={2}>

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
                        <ImagePicker />
                        <Typography sx={{ color: 'grey.600' }}>*.jpeg, *.jpg, *.png.</Typography>
                        <Typography sx={{ color: 'grey.600' }}>Tối đa 100KB</Typography>
                        <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'} sx={{
                            pt: 2,
                        }}>
                            <Typography fontWeight={'bold'}>Kích hoạt</Typography>
                            <Switch />
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
                        <Stack spacing={5}>
                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '55%' }} label={'Tên tài khoản *'} />
                                <Password
                                    isError={false}
                                    helperText=""
                                    onChange={() => { }}
                                    validatePassword={(password) => { }}
                                />
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '55%' }} label={'Họ tên *'} />
                                <TextField size="small" sx={{ width: '45%' }} label={'Công việc *'} />
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <AutoComplete
                                    label="Giới tính *"
                                    value={gender}
                                    options={genders}
                                    onChange={(value) => {
                                        setGender(value);
                                    }}
                                    width="55%"
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ width: '45%' }}>
                                        <MUIDatePicker
                                            sx={{ width: '100%' }}
                                            label="Ngày sinh *"
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <TextField size="small" sx={{ width: '55%' }} label={'Vai trò *'} />
                                <TextField size="small" sx={{ width: '45%' }} label={'Email *'} />
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                <AutoComplete
                                    label="Tỉnh / Thành phố *"
                                    value={{ name: address.provinceName, id: address.provinceId }}
                                    options={provinceList.map((province) => ({
                                        name: province.provinceName,
                                        id: province.provinceId
                                    }))}
                                    onChange={(value) => {
                                        setAddress({
                                            ...address,
                                            provinceName: value.name,
                                            provinceId: value.id
                                        });
                                    }}
                                    width="55%"
                                />
                                <AutoComplete
                                    label="Quận / Huyện *"
                                    value={{ name: address.districtName, id: address.districtId }}
                                    options={districtList.map((district) => ({
                                        name: district.districtName,
                                        id: district.districtId
                                    }))}
                                    onChange={(value) => {
                                        setAddress({
                                            ...address,
                                            districtName: value.name,
                                            districtId: value.id
                                        });
                                    }}
                                    width="45%"
                                />
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-between'} spacing={4}>
                                {/* <TextField size="small" sx={{ width: '55%' }} label={'Phường / Xã *'} /> */}
                                <AutoComplete
                                    label="Phường / Xã *"
                                    value={{ name: address.wardName, id: address.wardId }}
                                    options={wardList.map((ward) => ({
                                        name: ward.wardName,
                                        id: ward.wardId
                                    }))}
                                    onChange={(value) => {
                                        setAddress({
                                            ...address,
                                            wardName: value.name,
                                            wardId: value.id
                                        });
                                    }}
                                    width="55%"
                                />
                                <TextField size="small" sx={{ width: '45%' }} label={'Địa chỉ *'} />
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
        </Modal>
    );
}
