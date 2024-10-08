'use client';

import Dropdown from "@/core/components/dropdown";
import { BasicDepartment, DetailedDepartment, findDepartmentsByFilter, getProvinces, Province } from '@/services/department';
import { useEffect, useState } from "react";

interface SelectorProps {
    onChange: (provinceId: string, provinceName: string, parentId: string) => void;
    refreshData: boolean;
    onRefreshDataFinished: () => void;
    onCallBackInfoChange: (callBackInfo: {
        provinceId: string,
        parentId: string,
        deptName: string,
        level: string,
        wardName: string,
        districtName: string,
        pageSize: string,
        pageNumber: string
    }) => void;
}

export default function Selector({ onChange, refreshData, onRefreshDataFinished, onCallBackInfoChange }: SelectorProps) {
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [deptLevel1List, setDeptLevel1List] = useState<DetailedDepartment[]>([]);
    const [deptLevel2List, setDeptLevel2List] = useState<DetailedDepartment[]>([]);
    const [deptLevel3List, setDeptLevel3List] = useState<DetailedDepartment[]>([]);
    const [deptLevel4List, setDeptLevel4List] = useState<DetailedDepartment[]>([]);
    const [province, setProvince] = useState<Province>({ provinceId: '', provinceName: '' });
    const [deptLevel1, setDeptLevel1] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [deptLevel2, setDeptLevel2] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [deptLevel3, setDeptLevel3] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [deptLevel4, setDeptLevel4] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [callBackInfo, setCallBackInfo] = useState<{
        provinceId: string,
        parentId: string,
        deptName: string,
        level: string,
        wardName: string,
        districtName: string,
        pageSize: string,
        pageNumber: string,
    }>({
        provinceId: '',
        parentId: '',
        deptName: '',
        level: '',
        wardName: '',
        districtName: '',
        pageSize: '',
        pageNumber: ''
    });

    useEffect(() => {
        getProvinces().then(result => {
            setProvinceList(result);
        });
    }, []);

    // Only refresh children department list when parent department is selected
    useEffect(() => {
        if (refreshData) {
            if (!deptLevel1.deptId) {
                findDepartmentsByFilter(province.provinceId, '', '', '1', '', '', '', '').then(result => {
                    setDeptLevel1List(result);
                });
            } else if (!deptLevel2.deptId) {
                findDepartmentsByFilter(province.provinceId, deptLevel1.deptId, '', '2', '', '', '', '').then(result => {
                    setDeptLevel2List(result);
                });
            } else if (!deptLevel3.deptId) {
                findDepartmentsByFilter(province.provinceId, deptLevel2.deptId, '', '3', '', '', '', '').then(result => {
                    setDeptLevel3List(result);
                });
            } else if (!deptLevel4.deptId) {
                findDepartmentsByFilter(province.provinceId, deptLevel3.deptId, '', '4', '', '', '', '').then(result => {
                    setDeptLevel4List(result);
                });
            } else {
                findDepartmentsByFilter(province.provinceId, deptLevel3.deptId, '', '4', '', '', '', '').then(result => {
                    setDeptLevel4List(result);
                });
            }
            onRefreshDataFinished();
        }
    }, [refreshData])

    //====================================================
    useEffect(() => {
        if (province.provinceId) {
            findDepartmentsByFilter(province.provinceId, '', '', '1', '', '', '', '').then(result => {
                setDeptLevel1List(result);
            });
        } else {
            setDeptLevel1List([]);
            setCallBackInfo({
                ...callBackInfo,
                provinceId: '',
                parentId: '',
            });
        }
        setDeptLevel1({
            deptId: '',
            deptName: ''
        });
    }, [province.provinceId])

    useEffect(() => {
        if (deptLevel1.deptId) {
            findDepartmentsByFilter(province.provinceId, deptLevel1.deptId, '', '2', '', '', '', '').then(result => {
                setDeptLevel2List(result);
            });
        } else {
            setDeptLevel2List([]);
        }
        setDeptLevel2({
            deptId: '',
            deptName: ''
        });
    }, [deptLevel1.deptId])

    useEffect(() => {
        if (deptLevel2.deptId) {
            findDepartmentsByFilter(province.provinceId, deptLevel2.deptId, '', '3', '', '', '', '').then(result => {
                setDeptLevel3List(result);
            });
        } else {
            setDeptLevel3List([]);
        }
        setDeptLevel3({
            deptId: '',
            deptName: ''
        });
    }, [deptLevel2.deptId])

    useEffect(() => {
        if (deptLevel3.deptId) {
            findDepartmentsByFilter(province.provinceId, deptLevel3.deptId, '', '4', '', '', '', '').then(result => {
                setDeptLevel4List(result);
            });
        } else {
            setDeptLevel4List([]);
        }
        setDeptLevel4({
            deptId: '',
            deptName: ''
        });
    }, [deptLevel3.deptId])
    //====================================================
    useEffect(() => {
        if (deptLevel4.deptId) {
            setCallBackInfo({
                ...callBackInfo,
                provinceId: province.provinceId,
                parentId: deptLevel3.deptId,
            });
        } else if (deptLevel3.deptId) {
            setCallBackInfo({
                ...callBackInfo,
                provinceId: province.provinceId,
                parentId: deptLevel3.deptId,
            });
        } else if (deptLevel2.deptId) {
            setCallBackInfo({
                ...callBackInfo,
                provinceId: province.provinceId,
                parentId: deptLevel2.deptId
            });
        } else if (deptLevel1.deptId) {
            setCallBackInfo({
                ...callBackInfo,
                provinceId: province.provinceId,
                parentId: deptLevel1.deptId,
            });
        } else if (province.provinceId) {
            setCallBackInfo({
                ...callBackInfo,
                provinceId: province.provinceId,
                parentId: '',
            });
        }
    }, [province.provinceId, deptLevel1.deptId, deptLevel2.deptId, deptLevel3.deptId, deptLevel4.deptId])

    // Callback to parent component
    useEffect(() => {
        onCallBackInfoChange(callBackInfo);
    }, [callBackInfo])

    return (
        <div className="flex justify-between items-center w-full h-11 mt-6 pb-4 bg-white border-b-1 text-black">
            <Dropdown
                label="Tỉnh/Thành phố *"
                options={provinceList.map(province => ({ value: province.provinceId, name: province.provinceName }))}
                alternativeOption={{
                    name: ' -- Chọn tỉnh/thành phố --',
                    value: 'none'
                }}
                onChange={(provinceOption) => {
                    setProvince({
                        provinceId: provinceOption.value,
                        provinceName: provinceOption.name
                    });
                    onChange(provinceOption.value, provinceOption.name, '');
                }}
            />

            <Dropdown
                label=""
                options={deptLevel1List.map(department => ({ value: department.deptId, name: department.deptName }))}
                alternativeOption={{
                    name: ' -- Phòng ban cấp 1 --',
                    value: ''
                }}
                onChange={(department) => {
                    setDeptLevel1({
                        deptId: department.value,
                        deptName: department.name
                    });
                    onChange(province.provinceId, province.provinceName, department.value);
                }}
            />

            <Dropdown
                label=""
                options={deptLevel2List.map(department => ({ value: department.deptId, name: department.deptName }))}
                alternativeOption={{
                    name: ' -- Phòng ban cấp 2 --',
                    value: ''
                }}
                onChange={(department) => {
                    setDeptLevel2({
                        deptId: department.value,
                        deptName: department.name
                    });
                    onChange(province.provinceId, province.provinceName, department.value);
                }}
            />

            <Dropdown
                label=""
                options={deptLevel3List.map(department => ({ value: department.deptId, name: department.deptName }))}
                alternativeOption={{
                    name: ' -- Phòng ban cấp 3 --',
                    value: ''
                }}
                onChange={(department) => {
                    setDeptLevel3({
                        deptId: department.value,
                        deptName: department.name
                    });
                    onChange(province.provinceId, province.provinceName, department.value);
                }}
            />

            <Dropdown
                label=""
                options={deptLevel4List.map(department => ({ value: department.deptId, name: department.deptName }))}
                alternativeOption={{
                    name: ' -- Phòng ban cấp 4 --',
                    value: ''
                }}
                onChange={(department) => {
                    setDeptLevel4({
                        deptId: department.value,
                        deptName: department.name
                    });
                }}
            />
        </div>
    );
}
