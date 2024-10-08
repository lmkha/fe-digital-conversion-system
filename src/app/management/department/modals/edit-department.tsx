'use client';

import { Fragment, use, useEffect, useRef, useState } from "react";
import ActionButton from "../../components/button";
import Dropdown from "@/core/components/dropdown";
import { MdCancelPresentation } from "react-icons/md";
import TextInput from "@/core/components/text-input";
import {
    District,
    Ward,
    Province,
    getProvinces,
    getDistricts,
    getWards,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    DetailedDepartment
} from '@/services/department';
import Toast from "@/core/components/toast";

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
    const [toastInfo, setToastInfo] = useState
        <{
            showToast: boolean
            severity: 'success' | 'error';
            message: string
        }>({
            showToast: false,
            severity: 'success',
            message: ''
        });

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

    // Province change
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
                        districtName: ' -- Chọn quận/huyện -- ',
                        districtId: '',
                        wardName: ' -- Chọn phường/xã -- ',
                        wardId: '',
                    });
                    setWardList([]);
                }
            } catch (error) {
                console.error("Error fetching districts:");
            }
        }
        fetchDistricts();
    }, [department.provinceId]);

    // District change
    useEffect(() => {
        const fetchWards = async () => {
            try {
                if (department.districtId) {
                    await getWards(department.districtId).then(result => {
                        setWardList(result);
                    });
                }
            } catch (error) {
                console.error("Error fetching wards:");
            }
        }
        setDepartment({
            ...department,
            wardName: ' -- Chọn phường/xã -- ',
            wardId: '',
        });
        fetchWards();
    }, [department.districtId]);

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
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        }

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

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
                        className="flex-col bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/3" // Tailwind classes for width and height
                    >
                        <div className="flex justify-between items-start">
                            <h1 className="text-black text-xl font-bold mb-4">{label}</h1>
                            <button
                                onClick={onClose}
                            >
                                {<MdCancelPresentation className="text-black text-3xl hover:text-red-500" />}
                            </button>
                        </div>
                        <div className="flex justify-between mb-4 w-full gap-4">
                            <div className="w-1/2">
                                <TextInput
                                    textLabel="Tên phòng ban (*)"
                                    value={department.deptName}
                                    onChange={(value) => {
                                        setDepartment({
                                            ...department,
                                            deptName: value
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <Dropdown
                                    label="Tỉnh / Thành phố"
                                    options={provinceList.map(province => ({ value: province.provinceId, name: province.provinceName }))}
                                    alternativeOption={{
                                        name: department.provinceName,
                                        value: department.provinceId
                                    }}
                                    onChange={(province) => {
                                        setDepartment({
                                            ...department,
                                            provinceId: province.value,
                                            provinceName: province.name
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mb-4 w-full gap-4">
                            <div className="w-1/2">
                                <Dropdown
                                    label="Quận / Huyện"
                                    options={districtList.map(district => ({ value: district.districtId, name: district.districtName }))}
                                    alternativeOption={
                                        {
                                            name: department.districtName,
                                            value: department.districtId
                                        }
                                    }
                                    onChange={(district) => {
                                        setDepartment({
                                            ...department,
                                            districtId: district.value,
                                            districtName: district.name
                                        });
                                    }}
                                />
                            </div>
                            <div className="w-1/2">
                                <Dropdown
                                    label="Phường / Xã"
                                    options={wardList.map(ward => ({ value: ward.wardId, name: ward.wardName }))}
                                    alternativeOption={
                                        {
                                            name: department.wardName,
                                            value: department.wardId
                                        }
                                    }
                                    onChange={(ward) => {
                                        setDepartment({
                                            ...department,
                                            wardId: ward.value,
                                            wardName: ward.name
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                        </div>

                        <div className="flex h-14 w-full bg-white justify-end">
                            <button className="w-20 h-full bg-blue-500 rounded-md text-white hover:bg-white hover:text-blue-600 hover:border-blue-500 border-2"
                                onClick={async () => {
                                    if (!validateDataBeforeSubmit()) return;
                                    const result = await updateDepartment(department);
                                    onSubmitted(result.success, result.message, result.code);
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
