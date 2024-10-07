'use client';

import Dropdown from "@/core/components/dropdown";
import { BasicDepartment, DetailedDepartment, findDepartmentFilter, findDepartmentFilterFull, getProvinces, Province } from '@/services/department';
import { useEffect, useState } from "react";

interface SelectorProps {
    onChange: (provinceId: string, provinceName: string, parentId: string) => void;
    refreshData: boolean;
    onRefreshDataFinished: () => void;
    onSentToTableListChange: (sentToTableList: DetailedDepartment[]) => void;
}

export default function Selector({ onChange, refreshData, onRefreshDataFinished, onSentToTableListChange }: SelectorProps) {
    const [provinceList, setProvinceList] = useState<Province[]>([]);
    const [deptLevel1List, setDeptLevel1List] = useState<DetailedDepartment[]>([]);
    const [deptLevel2List, setDeptLevel2List] = useState<DetailedDepartment[]>([]);
    const [deptLevel3List, setDeptLevel3List] = useState<DetailedDepartment[]>([]);
    const [deptLevel4List, setDeptLevel4List] = useState<DetailedDepartment[]>([]);
    const [sentToTableList, setSentToTableList] = useState<DetailedDepartment[]>([]);
    const [province, setProvince] = useState<Province>({ provinceId: '', provinceName: '' });
    const [deptLevel1, setDeptLevel1] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [deptLevel2, setDeptLevel2] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [deptLevel3, setDeptLevel3] = useState<BasicDepartment>({ deptId: '', deptName: '' });
    const [deptLevel4, setDeptLevel4] = useState<BasicDepartment>({ deptId: '', deptName: '' });

    useEffect(() => {
        getProvinces(setProvinceList);
    }, []);

    useEffect(() => {
        if (refreshData) {
            setProvinceList([]);
            setProvince({
                provinceId: '',
                provinceName: ''
            });
            getProvinces(setProvinceList);
        }
        onRefreshDataFinished();
    }, [refreshData])

    useEffect(() => {
        if (province.provinceId) {
            findDepartmentFilterFull(province.provinceId, '', '', '1', '', '', '', '', setDeptLevel1List);
        } else {
            setDeptLevel1List([]);
            setDeptLevel1({
                deptId: '',
                deptName: ''
            });
        }
    }, [province.provinceId])

    useEffect(() => {
        if (deptLevel1.deptId) {
            findDepartmentFilterFull(province.provinceId, deptLevel1.deptId, '', '2', '', '', '', '', setDeptLevel2List);
        } else {
            setDeptLevel2List([]);
            setDeptLevel2({
                deptId: '',
                deptName: ''
            });
        }
    }, [deptLevel1.deptId])

    useEffect(() => {
        if (deptLevel2.deptId) {
            findDepartmentFilterFull(province.provinceId, deptLevel2.deptId, '', '3', '', '', '', '', setDeptLevel3List);
        } else {
            setDeptLevel3List([]);
            setDeptLevel3({
                deptId: '',
                deptName: ''
            });
        }
    }, [deptLevel2.deptId])

    useEffect(() => {
        if (deptLevel3.deptId) {
            findDepartmentFilterFull(province.provinceId, deptLevel3.deptId, '', '4', '', '', '', '', setDeptLevel4List);
        } else {
            setDeptLevel4List([]);
            setDeptLevel4({
                deptId: '',
                deptName: ''
            });
        }
    }, [deptLevel3.deptId])

    // Update sentToTableList when deptLevel1, deptLevel2, deptLevel3, deptLevel4 change
    useEffect(() => {
        if (deptLevel3.deptId) {
            findDepartmentFilterFull(province.provinceId, deptLevel3.deptId, '', '', '', '', '', '', setSentToTableList);
        } else if (deptLevel2.deptId) {
            findDepartmentFilterFull(province.provinceId, deptLevel2.deptId, '', '', '', '', '', '', setSentToTableList);
        } else if (deptLevel1.deptId) {
            findDepartmentFilterFull(province.provinceId, deptLevel1.deptId, '', '', '', '', '', '', setSentToTableList);
        } else if (province.provinceId) {
            findDepartmentFilterFull(province.provinceId, '', '', '', '', '', '', '', setSentToTableList);
        }
    }, [province.provinceId, deptLevel1.deptId, deptLevel2.deptId, deptLevel3.deptId, deptLevel4.deptId])

    // Send sentToTableList to parent component
    useEffect(() => {
        onSentToTableListChange(sentToTableList);
    }, [sentToTableList])

    return (
        <div className="flex justify-between items-center w-full h-11 mt-6 pb-4 bg-white border-b-1 text-black">
            <Dropdown
                label="Provinces"
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
