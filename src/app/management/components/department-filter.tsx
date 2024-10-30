/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Combobox from "@/core/components/combobox";
import { findAllParentDepartments, findDepartmentByFilterForSelector, Province } from '@/services/department';
import { DepartmentItem } from "@/services/models/department-item";
import { useEffect, useRef, useState } from "react";
import { useUserInfo } from "@/contexts/user-info-context";

export interface DeptFilterData {
    provinceId: string;
    deptId: string;
}

interface DeptFilterProps {
    onSubmitted: (selectorData: DeptFilterData) => void;
    refreshData: boolean;
    onRefreshDataFinished: () => void;
}

export default function DepartmentFilter({ refreshData, onRefreshDataFinished, onSubmitted }: DeptFilterProps) {
    const [selectorData, setSelectorData] = useState<DeptFilterData>();
    const { userInfo } = useUserInfo();
    const [level, setLevel] = useState<number>(0);
    const [deptLevel1List, setDeptLevel1List] = useState<DepartmentItem[]>();
    const [deptLevel2List, setDeptLevel2List] = useState<DepartmentItem[]>();
    const [deptLevel3List, setDeptLevel3List] = useState<DepartmentItem[]>();
    const [deptLevel4List, setDeptLevel4List] = useState<DepartmentItem[]>();
    const [parentDeptList, setParentDeptList] = useState<DepartmentItem[]>();
    const [province, setProvince] = useState<Province>();
    const [deptLevel1, setDeptLevel1] = useState<DepartmentItem>();
    const [deptLevel2, setDeptLevel2] = useState<DepartmentItem>();
    const [deptLevel3, setDeptLevel3] = useState<DepartmentItem>();
    const [deptLevel4, setDeptLevel4] = useState<DepartmentItem>();

    // Refresh selector when page had add, delete or update department
    useEffect(() => {
        if (refreshData) {
            if (!deptLevel1?.deptId) {
                findDepartmentByFilterForSelector({
                    level: '1',
                    provinceId: province?.provinceId || ''
                }).then(result => {
                    setDeptLevel1List(result);
                });
            } else if (!deptLevel2?.deptId) {
                findDepartmentByFilterForSelector({
                    parentId: deptLevel1.deptId,
                    level: '2',
                    provinceId: province?.provinceId || ''
                }).then(result => {
                    setDeptLevel2List(result);
                });
            } else if (!deptLevel3?.deptId) {
                findDepartmentByFilterForSelector({
                    parentId: deptLevel2.deptId,
                    level: '3',
                    provinceId: province?.provinceId || ''
                }).then(result => {
                    setDeptLevel3List(result);
                });
            } else if (!deptLevel4?.deptId) {
                findDepartmentByFilterForSelector({
                    parentId: deptLevel3.deptId,
                    level: '4',
                    provinceId: province?.provinceId || ''
                }).then(result => {
                    setDeptLevel4List(result);
                });
            }
            onRefreshDataFinished();
        }
    }, [refreshData])

    // Update departments level 2 when department level 1 changes
    useEffect(() => {
        if (deptLevel1?.deptId) {
            setSelectorData({
                provinceId: province?.provinceId || '',
                deptId: deptLevel1.deptId
            });
            findDepartmentByFilterForSelector({
                provinceId: province?.provinceId || '',
                parentId: deptLevel1.deptId,
                level: '2'
            }).then(result => {
                setDeptLevel2List(result);
            });
        } else {
            setDeptLevel2List([]);
        }
        if (level != 2) {
            setDeptLevel2({
                deptId: '',
                deptName: ''
            });
        }
    }, [deptLevel1?.deptId])

    // Update departments level 3 when department level 2 changes
    useEffect(() => {
        if (deptLevel2?.deptId) {
            setSelectorData({
                provinceId: province?.provinceId || '',
                deptId: deptLevel2.deptId
            });
            findDepartmentByFilterForSelector({
                provinceId: province?.provinceId || '',
                parentId: deptLevel2.deptId,
                level: '3'
            }).then(result => {
                setDeptLevel3List(result);
            });
        } else {
            setDeptLevel3List([]);
        }
        if (level != 3) {
            setDeptLevel3({
                deptId: '',
                deptName: ''
            });
        }
    }, [deptLevel2?.deptId])

    // Update departments level 4 when department level 3 changes
    useEffect(() => {
        if (deptLevel3?.deptId) {
            setSelectorData({
                provinceId: province?.provinceId || '',
                deptId: deptLevel3.deptId
            });
            findDepartmentByFilterForSelector({
                provinceId: province?.provinceId || '',
                parentId: deptLevel3.deptId,
                level: '4'
            }).then(result => {
                setDeptLevel4List(result);
            });
        } else {
            setDeptLevel4List([]);
        }
        if (level != 4) {
            setDeptLevel4({
                deptId: '',
                deptName: ''
            });
        }
    }, [deptLevel3?.deptId])

    // Initialize selector data base on user info
    useEffect(() => {
        if (!userInfo.dept.deptId) {
            return;
        }
        setProvince({
            provinceId: userInfo.dept.provinceId || '',
            provinceName: userInfo.dept.provinceName || ''
        })
        userInfo.dept.deptId && findAllParentDepartments(userInfo.dept.deptId).then(result => {
            setParentDeptList(result);
            if (userInfo.dept.level == 1) {
                setDeptLevel1({
                    deptId: userInfo.dept.deptId || '',
                    deptName: userInfo.dept.deptName || '',
                });
                return;
            }
            if (userInfo.dept.level == 2) {
                setDeptLevel2({
                    deptId: userInfo.dept.deptId || '',
                    deptName: userInfo.dept.deptName || ''
                });
                setDeptLevel1(result[0]);
                return;
            }
            if (userInfo.dept.level == 3) {
                setDeptLevel3({
                    deptId: userInfo.dept.deptId || '',
                    deptName: userInfo.dept.deptName || '',
                });
                setDeptLevel1(result[0]);
                setDeptLevel2(result[1]);
                return;
            }
            if (userInfo.dept.level == 4) {
                setDeptLevel4({
                    deptId: userInfo.dept.deptId || '',
                    deptName: userInfo.dept.deptName || ''
                });
                parentDeptList && parentDeptList[0] && setDeptLevel1(parentDeptList[0]);
                parentDeptList && parentDeptList[1] && setDeptLevel2(parentDeptList[1]);
                parentDeptList && parentDeptList[2] && setDeptLevel3(parentDeptList[2]);
                return;
            }
        });
        setLevel(userInfo.dept.level || 0);
    }, [userInfo.dept.deptId]);

    // Send data to parent component
    useEffect(() => {
        if (selectorData?.deptId) {
            onSubmitted(selectorData);
        }
    }, [selectorData])

    return (
        <div className="flex justify-between items-center w-full h-fit pb-4 bg-white border-b-1 text-black gap-2">
            {/* Province */}
            <Combobox
                disabled={true}
                className="w-1/3 h-10"
                value={{
                    id: userInfo.dept?.provinceId || '',
                    name: userInfo.dept?.provinceName || ''
                }}
                label="Tỉnh/Thành phố *"
                options={[]}
                onChange={(provinceOption) => {
                    setProvince({
                        provinceId: provinceOption.id,
                        provinceName: provinceOption.name
                    });
                    onSubmitted({
                        provinceId: province?.provinceId || '',
                        deptId: ''
                    })
                }}
            />

            {/* Dept level 1 */}
            <Combobox
                disabled={level && level >= 1 ? true : false}
                className="w-1/3 h-10"
                value={{
                    id: deptLevel1?.deptId ? deptLevel1.deptId : '',
                    name: deptLevel1?.deptName ? deptLevel1.deptName : ''
                }}
                label="Phòng ban cấp 1 *"
                options={
                    deptLevel1List && deptLevel1List.map(department => ({
                        id: department.deptId || '',
                        name: department.deptName || ''
                    })) || []
                }
                onChange={(department) => {
                    setDeptLevel1({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onSubmitted({
                        provinceId: province?.provinceId || '',
                        deptId: department.id || ''
                    })
                }}
            />

            {/* Dept level 2 */}
            <Combobox
                disabled={level && level >= 2 ? true : false}
                className="w-1/3 h-10"
                value={{
                    id: deptLevel2?.deptId ? deptLevel2.deptId : '',
                    name: deptLevel2?.deptName ? deptLevel2.deptName : ''
                }}
                label="Phòng ban cấp 2 *"
                options={
                    deptLevel2List && deptLevel2List.map(department => ({
                        id: department.deptId || '',
                        name: department.deptName || ''
                    })) || []
                }
                onChange={(department) => {
                    setDeptLevel2({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onSubmitted({
                        provinceId: province?.provinceId || '',
                        deptId: department.id || deptLevel1?.deptId || ''
                    })
                }}
            />

            {/* Dept level 3 */}
            <Combobox
                disabled={level && level >= 3 ? true : false}
                className="w-1/3 h-10"
                value={{
                    id: deptLevel3?.deptId ? deptLevel3.deptId : '',
                    name: deptLevel3?.deptName ? deptLevel3.deptName : ''
                }}
                label="Phòng ban cấp 3 *"
                options={
                    deptLevel3List && deptLevel3List.map(department => ({
                        id: department.deptId || '',
                        name: department.deptName || ''
                    })) || []
                }
                onChange={(department) => {
                    setDeptLevel3({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onSubmitted({
                        provinceId: province?.provinceId || '',
                        deptId: department.id || deptLevel2?.deptId || ''
                    })
                }}
            />

            {/* Dept level 4 */}
            <Combobox
                disabled={level && level >= 4 ? true : false}
                className="w-1/3 h-10"
                value={{
                    id: deptLevel4?.deptId ? deptLevel4.deptId : '',
                    name: deptLevel4?.deptName ? deptLevel4.deptName : ''
                }}
                label="Phòng ban cấp 4 *"
                options={
                    deptLevel4List && deptLevel4List.map(department => ({
                        id: department.deptId || '',
                        name: department.deptName || ''
                    })) || []
                }
                onChange={(department) => {
                    setDeptLevel4({
                        deptId: department.id,
                        deptName: department.name
                    });
                    onSubmitted({
                        provinceId: province?.provinceId || '',
                        deptId: department.id || deptLevel3?.deptId || ''
                    })
                }}
            />
        </div>
    );
}
