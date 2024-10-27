/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Fragment, useEffect, useRef, useState } from "react";
import {
    District,
    Ward,
    Province,
    getProvinces,
    getDistricts,
    getWards,
    createDepartment,
    createDepartmentLevel1,
    getDepartmentById
} from '@/services/department';
import Toast from "@/core/components/toast";
import Combobox from "@/core/components/combobox";
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { DepartmentItem } from "@/services/models/department-item";

export interface AddNewDepartmentModalProps {
    isVisible: boolean;
    label: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string, code: number) => void;
    parentId: string;
    provinceId: string;
    provinceName: string;
}

export default function AddNewDepartmentModal({
    isVisible,
    label,
    onClose,
    onSubmitted,
    parentId,
    provinceId,
    provinceName
}: AddNewDepartmentModalProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [wardList, setWardList] = useState<Ward[]>([]);
    const [parentDepartment, setParentDepartment] = useState<DepartmentItem>();
    const [department, setDepartment] = useState<DepartmentItem>();
    const [toastInfo, setToastInfo] = useState<{
        showToast: boolean
        severity: 'success' | 'error';
        message: string
    }>({
        showToast: false,
        severity: 'success',
        message: ''
    });

    // Initialize the form with the parent department's information
    useEffect(() => {
        if (isVisible) {
            if (parentId) {
                getDepartmentById(parentId).then(result => {
                    setParentDepartment(result);
                });
                department && parentDepartment && setDepartment({
                    ...department,
                    provinceId: parentDepartment.provinceId,
                    districtId: parentDepartment.districtId,
                    wardId: parentDepartment.wardId,
                    provinceName: parentDepartment.provinceName,
                    districtName: parentDepartment.districtName,
                    wardName: parentDepartment.wardName
                });
            }
            getProvinces().then(result => {
                setProvinceList(result);
            });
            if (provinceId) {
                department && setDepartment({
                    ...department,
                    provinceId: provinceId,
                    provinceName: provinceName
                });
            }
        } else {
            department && setDepartment({
                ...department,
                deptName: '',
                provinceId: '',
                districtId: '',
                wardId: '',
                provinceName: '',
                districtName: '',
                wardName: ''
            });
        }
    }, [isVisible, parentId, provinceId]);

    // Province change
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                if (department?.provinceId) {
                    await getDistricts(department.provinceId).then(result => {
                        setDistrictList(result);
                    });
                }
                department && setDepartment({
                    ...department,
                    districtId: '',
                    wardId: '',
                    districtName: '',
                    wardName: ''
                });
            } catch (error) {
                console.error("Error fetching districts:");
            }
        }
        fetchDistricts();
    }, [department?.provinceId]);

    // District change
    useEffect(() => {
        const fetchWards = async () => {
            try {
                if (department?.districtId) {
                    await getWards(department.districtId).then(result => {
                        setWardList(result);
                    })
                }
                department && setDepartment({
                    ...department,
                    wardId: '',
                    wardName: ''
                });
            } catch (error) {
                console.error("Error fetching wards:");
            }
        }
        fetchWards();
    }, [department?.districtId]);

    // Handle press ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleEscKey);
        } else {
            document.removeEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isVisible, onClose]);

    const validateDataBeforeSubmit = () => {
        // Trim deptName and check if it's empty or over 30 characters
        if (department?.deptName.trim() === '') {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Tên phòng ban không được để trống!'
            });
            return false;
        }
        if (department && department.deptName.length > 30) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Tên phòng ban không được quá 30 ký tự!'
            });
            return false;
        }
        // Check if province, district, ward is empty
        if (!department?.provinceId) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Vui lòng chọn tỉnh/thành phố!'
            });
            return false;
        }
        if (!department.districtId) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Vui lòng chọn quận/huyện!'
            });
            return false;
        }
        if (!department.wardId) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Vui lòng chọn phường/xã!'
            });
            return false;
        }
        return true;
    }

    if (!isVisible) return null;

    return (
        <Fragment>
            <div>
                {/* Backdrop */}
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40" />

                {/* Modal content */}
                <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
                    <div
                        ref={ref}
                        className="flex-col bg-white p-6 rounded-lg shadow-lg w-1/2 h-fit" // Tailwind classes for width and height
                    >
                        <div className="flex justify-between items-start">
                            <h1 className="text-black text-xl font-bold mb-4">{label}</h1>
                            <IconButton
                                aria-label="delete"
                                onClick={onClose}
                            >
                                <CloseIcon fontSize='large' />
                            </IconButton>
                        </div>
                        <div className="flex justify-between mb-4 w-full gap-4">
                            <div className="w-1/2">
                                <TextField
                                    className="w-full"
                                    label="Tên phòng ban (*)"
                                    value={department?.deptName}
                                    onChange={(event) => {
                                        department && setDepartment({
                                            ...department,
                                            deptName: event.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <Combobox
                                    value={{
                                        name: department?.provinceName ? department.provinceName : '',
                                        id: department?.provinceId ? department.provinceId : ''
                                    }}
                                    className="w-full"
                                    label="Tỉnh / Thành phố"
                                    options={provinceList.map(province => ({ id: province.provinceId, name: province.provinceName }))}
                                    onChange={(province) => {
                                        department && setDepartment({
                                            ...department,
                                            provinceId: province.id,
                                            provinceName: province.name
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between my-8 w-full gap-4">
                            <div className="w-1/2">
                                <Combobox
                                    value={{
                                        name: department?.districtName ? department.districtName : '',
                                        id: department?.districtId ? department.districtId : ''
                                    }}
                                    className="w-full"
                                    label="Quận / Huyện"
                                    options={districtList.map(district => ({ id: district.districtId, name: district.districtName }))}
                                    onChange={(district) => {
                                        department && setDepartment({
                                            ...department,
                                            districtId: district.id,
                                            districtName: district.name
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <Combobox
                                    value={{
                                        name: department?.wardName ? department.wardName : '',
                                        id: department?.wardId ? department.wardId : ''
                                    }}
                                    className="w-full"
                                    label="Phường / Xã"
                                    options={wardList.map(ward => ({ id: ward.wardId, name: ward.wardName }))}
                                    onChange={(ward) => {
                                        department && setDepartment({
                                            ...department,
                                            wardId: ward.id,
                                            wardName: ward.name
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                        </div>
                        <div className="flex h-14 w-full bg-white justify-end">
                            <button className="w-40 h-full bg-checkVarSecondary rounded-lg text-white hover:bg-white hover:text-blue-600 hover:border-blue-500 border-2"
                                onClick={async () => {
                                    if (!validateDataBeforeSubmit()) return;
                                    if (parentDepartment?.deptId && department) {
                                        const result = await createDepartment({
                                            deptName: department.deptName,
                                            wardId: department.wardId,
                                            districtId: department.districtId,
                                            provinceId: department.provinceId,
                                            parentId: parentDepartment.deptId
                                        });
                                        onSubmitted(result.success, result.message, result.code);
                                    } else {
                                        if (!department) return;
                                        const result = await createDepartmentLevel1({
                                            deptName: department.deptName,
                                            wardId: department.wardId,
                                            districtId: department.districtId,
                                            provinceId: department.provinceId
                                        });
                                        onSubmitted(result.success, result.message, result.code);
                                    }
                                    onClose();
                                }}
                            >
                                Thêm phòng ban
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                open={toastInfo.showToast}
                message={toastInfo.message}
                severity={toastInfo.severity}
                autoClose={true}
                duration={2000}
                onClose={() => setToastInfo({ ...toastInfo, showToast: false })}
            />
        </Fragment>
    );
}