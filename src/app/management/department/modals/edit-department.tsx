'use client';

import { use, useEffect, useRef, useState } from "react";
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
        fetchWards();
    }, [department.districtId]);

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
        <div>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40" />

            {/* Modal content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                                textLabel="Department name"
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
                                label="Province/ City"
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
                                label="District"
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
                                label="Ward"
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
                    <div className="flex justify-end h-1/5">
                        <ActionButton
                            type="save"
                            label="Save"
                            onClick={async () => {
                                const result = await updateDepartment(department);
                                onSubmitted(result.success, result.message, result.code);
                                onClose();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
