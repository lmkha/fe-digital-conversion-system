/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Fragment, useEffect, useState } from "react";
import DepartmentItem from "./components/department-item";
import Filter, { FilterData } from "./components/filter";
import Selector from "./components/selector";
import { SelectorData } from "./components/selector";
import AddNewDepartmentModal from "./modals/add-new-department";
import { useManagement } from "@/contexts/management-context";
import EditDepartmentModal from "./modals/edit-department";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import {
    handleIsCheckChange,
    handleSelectAll,
    handleUnselectAll,
    BasicDepartment,
    DetailedDepartment,
    CheckedItem,
    deleteDepartments,
    findDepartmentsByFilterWithPageInfo,
    downloadDepartmentsExcelFile
} from '@/services/department';
import { useAppContext } from "@/contexts/app-context";

export default function Page() {
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    const [selectorData, setSelectorData] = useState<SelectorData>();
    const [filterData, setFilterData] = useState<FilterData>();
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState(false);
    const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState(false);
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>();
    const [refreshData, setRefreshData] = useState(false);
    const [departmentList, setDepartmentList] = useState<{
        department: DetailedDepartment;
        isCheck: boolean;
    }[]>([]);
    const [editingDepartment, setEditingDepartment] = useState<BasicDepartment>();

    // Update department list and page info
    const updateDepartmentListAndPageInfo = async () => {
        if (selectorData?.provinceId) {
            await findDepartmentsByFilterWithPageInfo(
                {
                    provinceId: selectorData.provinceId,
                    parentId: selectorData.parentId,
                    level: filterData?.level,
                    districtName: filterData?.district,
                    wardName: filterData?.ward,
                    pageSize: footerInfo?.paginationInfo?.pageSize?.toString(),
                    pageNumber: footerInfo?.paginationInfo?.pageNumber?.toString()
                }).then((result) => {
                    setDepartmentList(result.departments.map(item => ({
                        department: item,
                        isCheck: false
                    })));
                });
        } else {
            setDepartmentList([]);

        }
    }

    // Set footer info
    useEffect(() => {
        setFooterInfo({
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
                    selectorData.parentId,
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
    // useEffect(() => {
    //     setHeaderTitle('Phòng ban');
    //     if (departmentListInfo.level === '4') {
    //         setHeaderButtons([]);
    //         return;
    //     }
    //     setHeaderButtons([
    //         {
    //             type: 'add',
    //             label: 'Thêm phòng ban',
    //             onClick: () => {
    //                 if (!departmentListInfo.provinceId) {
    //                     setToastInfo({
    //                         showToast: true,
    //                         severity: 'error',
    //                         message: 'Vui lòng chọn tỉnh/thành phố trước khi thêm phòng ban!'
    //                     });
    //                 } else {
    //                     setShowAddNewDepartmentModal(true)
    //                 }
    //             }
    //         }
    //     ]);
    // }, [setHeaderTitle, setHeaderButtons, departmentListInfo?.provinceId, departmentListInfo.level]);

    // Show or hide selected data toolbar
    useEffect(() => {
        if (checkedItems && checkedItems.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItems]);

    return (
        <Fragment>
            <div className="flex-col text-black mt-4">
                <Selector
                    onChange={(provinceId, provinceName, parentId) => {
                        // setSelectorData({
                        //     provinceId: provinceId,
                        //     provinceName: provinceName,
                        //     parentId: parentId
                        // });
                    }}
                    refreshData={refreshData}
                    onRefreshDataFinished={() => setRefreshData(false)}
                    onCallBackInfoChange={(callBackInfo) => {
                        // setDepartmentListInfo({
                        //     ...departmentListInfo,
                        //     provinceId: callBackInfo.provinceId,
                        //     parentId: callBackInfo.parentId,
                        //     deptName: callBackInfo.deptName,
                        //     level: callBackInfo.level,
                        //     wardName: callBackInfo.wardName,
                        //     districtName: callBackInfo.districtName,
                        //     pageSize: callBackInfo.pageSize,
                        //     pageNumber: callBackInfo.pageNumber
                        // });
                    }}
                />
                <Filter
                    isCheck={false}
                    onCheckAllChange={(isCheck) => {
                        // if (isCheck) {
                        //     handleSelectAll(departmentList, setCheckedItems, setDepartmentList);
                        // } else {
                        //     handleUnselectAll(setCheckedItems, setDepartmentList);
                        // }
                    }}
                    onTextChange={(key, value) => {
                        // setFilterData({ ...filterData, [key]: value });
                    }}
                    onSubmitted={(filterData) => {
                        // if (!departmentListInfo.provinceId) {
                        //     setToastInfo({
                        //         showToast: true,
                        //         severity: 'error',
                        //         message: 'Vui lòng chọn tỉnh/thành phố trước khi tìm kiếm!'
                        //     });
                        //     return;
                        // }
                        // setDepartmentListInfo({
                        //     ...departmentListInfo,
                        //     deptName: filterData.name,
                        //     level: filterData.level,
                        //     districtName: filterData.district,
                        //     wardName: filterData.ward
                        // });
                    }}
                />

                {/* TableList */}
                <div className="flex-1 w-full max-h-[480px] overflow-y-auto">
                    {departmentList.map((item, index) => (
                        <DepartmentItem
                            id={item.department.deptId}
                            key={index}
                            name={item.department.deptName}
                            level={item.department.level}
                            district={item.department.districtName}
                            ward={item.department.wardName}
                            isCheck={item.isCheck}
                            onIsCheckChange={(id, isCheck) => { }}
                            onEdit={async () => {
                                setEditingDepartment({
                                    deptId: item.department.deptId,
                                    deptName: item.department.deptName,
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
                parentId={selectorData?.parentId ? selectorData.parentId : ''}
                provinceId={selectorData?.provinceId ? selectorData.provinceId : ''}
                provinceName={selectorData?.provinceName ? selectorData.provinceName : ''}
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
                totalSelected={checkedItems && checkedItems.length ? checkedItems.length : 0}
                onDelete={() => {
                    if (!checkedItems || checkedItems.length === 0) {
                        return;
                    }
                    const dl = async () => {
                        const result = await deleteDepartments(
                            checkedItems.map(item => item.id)
                        );
                        setToastInfo && setToastInfo({
                            show: true,
                            severity: result.success ? 'success' : 'error',
                            message: result.message
                        });
                        if (result.success) {
                            setCheckedItems([]);
                            updateDepartmentListAndPageInfo()
                            setRefreshData(true);
                        }
                    }
                    dl();
                }}
                onClose={() => {
                    setCheckedItems([]);
                    setShowSelectedDataToolbar(false);
                }}
            />
        </Fragment>
    );
}