/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Fragment, useEffect, useState } from "react";
import DepartmentComponent from "./components/department-item";
import Filter, { FilterData } from "./components/filter";
import AddNewDepartmentModal from "./modals/add-new-department";
import { useManagement } from "@/contexts/management-context";
import EditDepartmentModal from "./modals/edit-department";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import {
    BasicDepartment,
    deleteDepartments,
    findDepartmentsByFilterWithPageInfo,
    downloadDepartmentsExcelFile
} from '@/services/department';
import { useAppContext } from "@/contexts/app-context";
import { DepartmentItem } from "@/services/models/department-item";
import { usePermission } from '@/contexts/permission-context';
import DepartmentFilter, { DeptFilterData } from "../components/department-filter";

export default function Page() {
    const { permissionList } = usePermission();
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    const [selectorData, setSelectorData] = useState<DeptFilterData>();
    const [filterData, setFilterData] = useState<FilterData>();
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState(false);
    const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState(false);
    const [checkedItemIds, setCheckedItemIds] = useState<string[]>();
    const [refreshData, setRefreshData] = useState(false);
    const [departmentList, setDepartmentList] = useState<DepartmentItem[]>();
    const [editingDepartment, setEditingDepartment] = useState<DepartmentItem>();

    // Update department list and page info
    const updateDepartmentListAndPageInfo = async () => {
        if (selectorData?.provinceId) {
            await findDepartmentsByFilterWithPageInfo(
                {
                    provinceId: selectorData.provinceId,
                    parentId: selectorData.deptId,
                    level: filterData?.level,
                    districtName: filterData?.district,
                    wardName: filterData?.ward,
                }).then((result) => {
                    setDepartmentList(result.departments);
                    setFooterInfo && setFooterInfo({
                        ...footerInfo,
                        paginationInfo: result.paginationInfo
                    });
                });
        } else {
            setDepartmentList([]);
        }
    }
    // UseEffect----------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (selectorData && selectorData.provinceId) {
            updateDepartmentListAndPageInfo();
        } else {
            setDepartmentList([]);
        }
    }, [selectorData]);

    useEffect(() => {
        if (selectorData && selectorData.deptId && filterData) {
            updateDepartmentListAndPageInfo();
        }
    }, [filterData]);

    // Update export data footer
    useEffect(() => {
        setFooterInfo({
            ...footerInfo,
            exportDataFooter: () => {
                if (!selectorData?.provinceId) {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: 'error',
                        message: 'Vui lòng chọn tỉnh/thành phố trước khi tải file!'
                    });
                    return;
                }
                downloadDepartmentsExcelFile(
                    selectorData.provinceId,
                    selectorData.deptId,
                    filterData?.name ? filterData?.name : '',
                    filterData?.level ? filterData?.level : '',
                    filterData?.district ? filterData?.district : '',
                    filterData?.ward ? filterData?.ward : '',
                    footerInfo?.paginationInfo?.pageSize?.toString() ? footerInfo?.paginationInfo?.pageSize?.toString() : '',
                    footerInfo?.paginationInfo?.pageNumber?.toString() ? footerInfo?.paginationInfo?.pageNumber?.toString() : ''
                ).then((result) => {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: result ? 'success' : 'error',
                        message: result ? 'Tải file thành công!' : 'Tải file thất bại!'
                    });
                });
            },
        });
    }, [departmentList]);

    // Set header buttons
    useEffect(() => {
        setHeaderTitle('Phòng ban');
        if (permissionList.department.create) {
            setHeaderButtons([
                {
                    type: 'add',
                    label: 'Thêm phòng ban',
                    onClick: () => {
                        if (!selectorData?.provinceId) {
                            setToastInfo && setToastInfo({
                                show: true,
                                severity: 'error',
                                message: 'Vui lòng chọn tỉnh/thành phố trước khi thêm phòng ban!'
                            });
                        } else {
                            setShowAddNewDepartmentModal(true)
                        }
                    }
                }
            ]);
        } else {
            setHeaderButtons([]);
        }
    }, [setHeaderTitle, setHeaderButtons, selectorData?.provinceId, permissionList.department.create]);

    // Show or hide selected data toolbar
    useEffect(() => {
        if (checkedItemIds && checkedItemIds.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItemIds]);

    useEffect(() => {
        if (footerInfo?.paginationInfo?.pageSize && footerInfo?.paginationInfo?.pageNumber) {
            if (selectorData?.provinceId) {
                findDepartmentsByFilterWithPageInfo({
                    provinceId: selectorData.provinceId,
                    parentId: selectorData.deptId,
                    level: filterData?.level,
                    districtName: filterData?.district,
                    wardName: filterData?.ward,
                    pageSize: footerInfo?.paginationInfo?.pageSize?.toString(),
                    pageNumber: footerInfo?.paginationInfo?.pageNumber?.toString()
                }).then((result) => {
                    setDepartmentList(result.departments);
                });
            }
        }
    }, [footerInfo?.paginationInfo?.pageSize, footerInfo?.paginationInfo?.pageNumber]);

    return (
        <Fragment>
            <div className="flex-col text-black mt-4">
                <DepartmentFilter
                    refreshData={refreshData || false}
                    onRefreshDataFinished={() => setRefreshData(false)}
                    onSubmitted={(selectorData) => setSelectorData(selectorData)}
                />
                <Filter
                    isCheck={false}
                    onCheckAllChange={(isCheck) => { }}
                    onTextChange={(key, value) => { }}
                    onSubmitted={(filterData) => {
                        console.log(filterData);
                        setFilterData(filterData);
                    }}
                />

                {/* TableList */}
                <div className="flex-1 w-full max-h-[420px] overflow-y-auto">
                    {departmentList && departmentList.map((item, index) => (
                        <DepartmentComponent
                            id={item?.deptId ? item.deptId : ''}
                            key={index}
                            name={item?.deptName ? item.deptName : ''}
                            level={item?.level ? item.level : 0}
                            district={item?.districtName ? item.districtName : ''}
                            ward={item?.wardName ? item.wardName : ''}
                            isCheck={checkedItemIds && item.deptId && checkedItemIds.includes(item.deptId) ? true : false}
                            onSelect={(id) => {
                                setCheckedItemIds([...(checkedItemIds ? checkedItemIds : []), id]);
                            }}
                            onUnselect={(id) => {
                                setCheckedItemIds(checkedItemIds?.filter((item) => item !== id));
                            }}
                            onEdit={() => {
                                setEditingDepartment({
                                    deptId: item.deptId,
                                    deptName: item.deptName,
                                })
                                setShowEditDepartmentModal(true)
                            }}
                        />
                    ))}
                </div>
            </div>

            <AddNewDepartmentModal
                isVisible={showAddNewDepartmentModal}
                label="Thêm phòng ban"
                onClose={() => setShowAddNewDepartmentModal(false)}
                onSubmitted={(success, message, code) => {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: success ? 'success' : 'error',
                        message: message
                    });
                    if (success) {
                        setRefreshData(true);
                        updateDepartmentListAndPageInfo()
                    }
                }}
                parentId={selectorData?.deptId || ''}
                provinceId={selectorData?.provinceId || ''}
                provinceName={''}
            />
            <EditDepartmentModal
                isVisible={showEditDepartmentModal}
                label="Chỉnh sửa phòng ban"
                onClose={() => setShowEditDepartmentModal(false)}
                onSubmitted={(success, message, code) => {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: success ? 'success' : 'error',
                        message: message
                    });
                    if (success) {
                        updateDepartmentListAndPageInfo()
                    }
                }}
                deptId={editingDepartment?.deptId ? editingDepartment.deptId : ''}
            />
            <SelectedDataToolbar
                label="phòng ban"
                isShow={showSelectedDataToolbar}
                totalSelected={checkedItemIds ? checkedItemIds.length : 0}
                onDelete={() => {
                    if (!checkedItemIds || checkedItemIds.length === 0) {
                        return;
                    }
                    const dl = async () => {
                        const result = await deleteDepartments(checkedItemIds);
                        setToastInfo && setToastInfo({
                            show: true,
                            severity: result.success ? 'success' : 'error',
                            message: result.message
                        });
                        if (result.success) {
                            setCheckedItemIds([]);
                            updateDepartmentListAndPageInfo()
                            setRefreshData(true);
                        }
                    }
                    dl();
                }}
                onClose={() => {
                    setCheckedItemIds([]);
                    setShowSelectedDataToolbar(false);
                }}
            />
        </Fragment>
    );
}