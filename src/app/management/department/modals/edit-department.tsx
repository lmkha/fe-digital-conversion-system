'use client';

import { Fragment, useEffect, useRef, useState } from "react";
import { MdCancelPresentation } from "react-icons/md";
import {
    District,
    Ward,
    Province,
    getProvinces,
    getDistricts,
    getWards,
    getDepartmentById,
    updateDepartment,
    DetailedDepartment
} from '@/services/department';
import Toast from "@/core/components/toast";
import Combobox from "@/core/components/combobox";
import TextField from '@mui/material/TextField';

export interface EditDepartmentModalProps {
    isVisible: boolean;
    label: string;
    onClose: () => void;
    onSubmitted: (success: boolean, message: string, code: number) => void;
    deptId: string;
}

export default function EditDepartmentModal({
    isVisible,
    label,
    onClose,
    onSubmitted,
    deptId,
}: EditDepartmentModalProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [wardList, setWardList] = useState<Ward[]>([]);
    const [department, setDepartment] = useState<DetailedDepartment>({
        deptId: '',
        deptName: '',
        level: 0,
        provinceId: '',
        districtId: '',
        wardId: '',
        provinceName: '',
        districtName: '',
        wardName: ''
    });
    const [toastInfo, setToastInfo] = useState<{
        showToast: boolean
        severity: 'success' | 'error';
        message: string
    }>({
        showToast: false,
        severity: 'success',
        message: ''
    });

    // Fetch department data when modal is visible
    useEffect(() => {
        const fetchDepartment = async () => {
            if (isVisible && deptId) {
                await getDepartmentById(deptId).then(result => {
                    setDepartment(result);
                });
            }
            getProvinces().then(result => {
                setProvinceList(result);
            });
        }
        fetchDepartment();
    }, [isVisible, deptId]);

    // Fetch districts when province changes
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                if (department.provinceId) {
                    await getDistricts(department.provinceId).then(result => {
                        setDistrictList(result);
                    });
                } else {
                    setDepartment({
                        ...department,
                        districtName: '',
                        districtId: '',
                        wardName: '',
                        wardId: '',
                    });
                    setDistrictList([]);
                    setWardList([]);
                }
            } catch (error) {
                console.error("Error fetching districts:");
            }
        }
        fetchDistricts();
    }, [department.provinceId]);

    // Fetch wards when district changes
    useEffect(() => {
        const fetchWards = async () => {
            try {
                if (department.districtId) {
                    await getWards(department.districtId).then(result => {
                        setWardList(result);
                    });
                } else {
                    setDepartment({
                        ...department,
                        wardName: '',
                        wardId: '',
                    });
                    setWardList([]);
                }
            } catch (error) {
                console.error("Error fetching wards:");
            }
        }
        fetchWards();
    }, [department.districtId]);

    // Validate data before submit
    const validateDataBeforeSubmit = () => {
        // Trim deptName and check if it's empty or over 30 characters
        if (department.deptName.trim() === '') {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Tên phòng ban không được để trống!'
            });
            return false;
        }
        if (department.deptName.length > 30) {
            setToastInfo({
                showToast: true,
                severity: 'error',
                message: 'Tên phòng ban không được quá 30 ký tự!'
            });
            return false;
        }
        // Check if province, district, ward is empty
        if (!department.provinceId) {
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

    // Handle click outside
    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         if (ref.current && !ref.current.contains(event.target as Node)) {
    //             onClose();
    //         }
    //     }

    //     if (isVisible) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     } else {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     }

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isVisible, onClose]);

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
                        className="flex-col bg-white p-6 rounded-lg shadow-lg w-1/2 h-fit"
                    >
                        <div className="flex justify-between items-start">
                            <h1 className="text-black text-xl font-bold mb-4">{label}</h1>
                            <button
                                onClick={onClose}
                            >
                                {<MdCancelPresentation className="text-black text-3xl hover:text-red-500" />}
                            </button>
                        </div>

                        {/* First line, contain Department name TextFiled and province combobox */}
                        <div className="flex justify-between mb-4 w-full gap-4">
                            <div className="w-1/2">
                                <TextField
                                    className="w-full"
                                    label="Tên phòng ban (*)"
                                    value={department.deptName}
                                    onChange={(e) => {
                                        setDepartment({
                                            ...department,
                                            deptName: e.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <Combobox
                                    value={{ id: department.provinceId, name: department.provinceName }}
                                    className="w-full"
                                    label="Tỉnh / Thành phố"
                                    options={provinceList.map(province => ({ id: province.provinceId, name: province.provinceName }))}
                                    onChange={(province) => {
                                        setDepartment({
                                            ...department,
                                            provinceId: province.id,
                                            provinceName: province.name
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        {/* Second line, contain District combobox and Ward combobox */}
                        <div className="flex justify-between mb-4 w-full gap-4">
                            <div className="w-1/2">
                                <Combobox
                                    value={{ id: department.districtId, name: department.districtName }}
                                    className="w-full"
                                    label="Quận / Huyện"
                                    options={districtList.map(district => ({ id: district.districtId, name: district.districtName }))}
                                    onChange={(district) => {
                                        setDepartment({
                                            ...department,
                                            districtId: district.id,
                                            districtName: district.name
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <Combobox
                                    value={{ id: department.wardId, name: department.wardName }}
                                    className="w-full"
                                    label="Phường / Xã"
                                    options={wardList.map(ward => ({ id: ward.wardId, name: ward.wardName }))}
                                    onChange={(ward) => {
                                        setDepartment({
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
                            <button className="w-20 h-full bg-checkVarSecondary rounded-lg text-white hover:bg-white hover:text-blue-600 hover:border-blue-500 border-2"
                                onClick={async () => {
                                    if (!validateDataBeforeSubmit()) return;
                                    const result = await updateDepartment(department);
                                    onSubmitted(result.success, result.message, result.code);
                                    setDepartment({
                                        deptId: '',
                                        deptName: '',
                                        level: 0,
                                        provinceId: '',
                                        districtId: '',
                                        wardId: '',
                                        provinceName: '',
                                        districtName: '',
                                        wardName: ''
                                    });
                                    onClose();
                                }}
                            >
                                Lưu
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
