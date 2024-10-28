/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Combobox from "@/core/components/combobox";
import { BasicDepartment, findDepartmentsByFilter, getProvinces, Province } from '@/services/department';
import { useEffect, useState } from "react";
import { DepartmentItem } from "@/services/models/department-item";
import { useUserInfo } from "@/contexts/user-info-context";

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
    const { userInfo } = useUserInfo();
    const [level, setLevel] = useState<number>();
    const [deptLevel1List, setDeptLevel1List] = useState<DepartmentItem[]>([]);
    const [deptLevel2List, setDeptLevel2List] = useState<DepartmentItem[]>([]);
    const [deptLevel3List, setDeptLevel3List] = useState<DepartmentItem[]>([]);
    const [deptLevel4List, setDeptLevel4List] = useState<DepartmentItem[]>([]);
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
        setLevel(userInfo.dept.level ? userInfo.dept.level : 0);
        setProvince({
            provinceId: userInfo.dept.provinceId ? userInfo.dept.provinceId : '',
            provinceName: userInfo.dept.provinceName ? userInfo.dept.provinceName : ''
        })
        if (userInfo.dept.level == 1) {
            setDeptLevel1({
                deptId: userInfo.dept.deptId ? userInfo.dept.deptId : '',
                deptName: userInfo.dept.deptName ? userInfo.dept.deptName : '',
            });
            return;
        }
        if (userInfo.dept.level == 2) {
            setDeptLevel2({
                deptId: userInfo.dept.deptId ? userInfo.dept.deptId : '',
                deptName: userInfo.dept.deptName ? userInfo.dept.deptName : ''
            });
            return;
        }
        if (userInfo.dept.level == 3) {
            setDeptLevel3({
                deptId: userInfo.dept.deptId ? userInfo.dept.deptId : '',
                deptName: userInfo.dept.deptName ? userInfo.dept.deptName : ''
            });
            return;
        }
        if (userInfo.dept.level == 4) {
            setDeptLevel4({
                deptId: userInfo.dept.deptId ? userInfo.dept.deptId : '',
                deptName: userInfo.dept.deptName ? userInfo.dept.deptName : ''
            });
            return;
        }
    }, [userInfo]);

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
        }
    }, [deptLevel1, deptLevel2, deptLevel3, deptLevel4])

    useEffect(() => {
        onCallBackInfoChange(callBackInfo);
    }, [callBackInfo])

    return (
        <div className="flex justify-between items-center w-full h-fit pb-4 bg-white border-b-1 text-black gap-2">
            <Combobox
                disabled={true}
                className="w-1/3 h-10"
                value={{ id: province.provinceId, name: province.provinceName }}
                label="Tỉnh/Thành phố *"
                options={[]}
                onChange={(provinceOption) => {
                    setProvince({
                        provinceId: provinceOption.id,
                        provinceName: provinceOption.name
                    });
                    onChange(provinceOption.id, provinceOption.name, '');
                }}
            />

            <Combobox
                disabled={level && level >= 1 ? true : false}
                className="w-1/3 h-10"
                value={{ id: deptLevel1.deptId, name: deptLevel1.deptName }}
                label="Phòng ban cấp 1 *"
                options={deptLevel1List.map(department => ({ id: department.deptId, name: department.deptName }))}
                onChange={(department) => {
                    setDeptLevel1({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onChange(province.provinceId, province.provinceName, department.id);
                }}
            />

            <Combobox
                disabled={level && level >= 2 ? true : false}
                className="w-1/3 h-10"
                value={{ id: deptLevel2.deptId, name: deptLevel2.deptName }}
                label="Phòng ban cấp 2 *"
                options={deptLevel2List.map(department => ({ id: department.deptId, name: department.deptName }))}
                onChange={(department) => {
                    setDeptLevel2({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onChange(province.provinceId, province.provinceName, department.id);
                }}
            />

            <Combobox
                disabled={level && level >= 3 ? true : false}
                className="w-1/3 h-10"
                value={{ id: deptLevel3.deptId, name: deptLevel3.deptName }}
                label="Phòng ban cấp 3 *"
                options={deptLevel3List.map(department => ({ id: department.deptId, name: department.deptName }))}
                onChange={(department) => {
                    setDeptLevel3({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onChange(province.provinceId, province.provinceName, department.id);
                }}
            />

            <Combobox
                disabled={level && level >= 4 ? true : false}
                className="w-1/3 h-10"
                value={{ id: deptLevel4.deptId, name: deptLevel4.deptName }}
                label="Phòng ban cấp 4 *"
                options={deptLevel4List.map(department => ({ id: department.deptId, name: department.deptName }))}
                onChange={(department) => {
                    setDeptLevel4({
                        deptId: department.id,
                        deptName: department.name
                    });
                }}
            />
        </div>
    );
}
