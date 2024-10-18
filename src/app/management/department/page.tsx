/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Fragment, useEffect, useState } from "react";
import DepartmentItem from "./components/department-item";
import Filter from "./components/filter";
import Selector from "./components/selector";
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
import Toast from "@/core/components/toast";

export default function Page() {
    const [selectorData, setSelectorData] = useState({
        provinceId: '',
        provinceName: '',
        parentId: ''
    });
    const [filterData, setFilterData] = useState({
        code: '',
        level: '',
        district: '',
        ward: ''
    });
    const { setHeaderButtons, setHeaderTitle, setFooterInfo } = useManagement();
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState(false);
    const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState(false);
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        pageNumber: 0,
        total: 0,
        start: 0,
        end: 0,
    });
    const [departmentListInfo, setDepartmentListInfo] = useState<{
        provinceId: string,
        parentId: string,
        deptName: string,
        level: string,
        wardName: string,
        districtName: string,
        pageSize: string,
        pageNumber: string,
        toTalPage: string
    }>({
        provinceId: '',
        parentId: '',
        deptName: '',
        level: '',
        wardName: '',
        districtName: '',
        pageSize: '',
        pageNumber: '',
        toTalPage: ''
    });
    const [departmentList, setDepartmentList] = useState<{
        department: DetailedDepartment;
        isCheck: boolean;
    }[]>([]);
    const [editingDepartment, setEditingDepartment] = useState<BasicDepartment | null>(null);
    const [toastInfo, setToastInfo] = useState<{
        showToast: boolean
        severity: 'success' | 'error';
        message: string
    }>({
        showToast: false,
        severity: 'success',
        message: ''
    });

    // Update department list and page info
    const updateDepartmentListAndPageInfo = async () => {
        if (departmentListInfo.provinceId) {
            await findDepartmentsByFilterWithPageInfo(
                departmentListInfo.provinceId,
                departmentListInfo.parentId,
                departmentListInfo.deptName,
                '',
                departmentListInfo.wardName,
                departmentListInfo.districtName,
                departmentListInfo.pageSize,
                departmentListInfo.pageNumber
            ).then((result) => {
                setPageInfo({
                    pageNumber: result.pageNumber,
                    total: result.total,
                    start: result.start,
                    end: result.end
                });
                setDepartmentList(result.departments.map(item => ({
                    department: item,
                    isCheck: false
                })));
            });
        } else {
            setDepartmentList([]);
            setPageInfo({
                pageNumber: 0,
                total: 0,
                start: 0,
                end: 0
            });
        }
    }

    // Update department list and page info when departmentListInfo changes
    useEffect(() => {
        updateDepartmentListAndPageInfo();
    }, [departmentListInfo]);

    // Set footer info
    useEffect(() => {
        setFooterInfo({
            hasExportDataFooter: true,
            exportDataFooter: () => {
                if (!departmentListInfo.provinceId) {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: 'Vui lòng chọn tỉnh/thành phố trước khi tải file!'
                    });
                    return;
                }
                downloadDepartmentsExcelFile(
                    departmentListInfo.provinceId,
                    departmentListInfo.parentId,
                    departmentListInfo.deptName,
                    departmentListInfo.level,
                    departmentListInfo.districtName,
                    departmentListInfo.wardName,
                    departmentListInfo.pageSize,
                    departmentListInfo.pageNumber
                ).then((result) => {
                    if (!result) {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: 'Tải file thất bại!'
                        });
                    } else {
                        setToastInfo({
                            showToast: true,
                            severity: 'success',
                            message: 'Tải file thành công!'
                        });
                    }
                });
            },
            pageNumber: pageInfo.pageNumber,
            total: pageInfo.total,
            start: pageInfo.start,
            end: pageInfo.end,
            onChangePageNumber: (pageNumber: number) => {
                setDepartmentListInfo({
                    ...departmentListInfo,
                    pageNumber: pageNumber.toString()
                });
            },
            onChangePageSize: (pageSize: number) => {
                setDepartmentListInfo({
                    ...departmentListInfo,
                    pageNumber: '1',
                    pageSize: pageSize.toString()
                });
            }
        });
    }, [departmentList]);


    // Set header buttons
    useEffect(() => {
        setHeaderTitle('Phòng ban');
        if (departmentListInfo.level === '4') {
            setHeaderButtons([]);
            return;
        }
        setHeaderButtons([
            {
                type: 'add',
                label: 'Thêm phòng ban',
                onClick: () => {
                    if (!departmentListInfo.provinceId) {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: 'Vui lòng chọn tỉnh/thành phố trước khi thêm phòng ban!'
                        });
                    } else {
                        setShowAddNewDepartmentModal(true)
                    }
                }
            }
        ]);
    }, [setHeaderTitle, setHeaderButtons, departmentListInfo.provinceId, departmentListInfo.level]);

    // Show or hide selected data toolbar
    useEffect(() => {
        if (checkedItems.length > 0) {
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
                        setSelectorData({
                            provinceId: provinceId,
                            provinceName: provinceName,
                            parentId: parentId
                        });
                    }}
                    refreshData={refreshData}
                    onRefreshDataFinished={() => setRefreshData(false)}
                    onCallBackInfoChange={(callBackInfo) => {
                        console.log(`Level: ${callBackInfo.level}`);
                        setDepartmentListInfo({
                            ...departmentListInfo,
                            provinceId: callBackInfo.provinceId,
                            parentId: callBackInfo.parentId,
                            deptName: callBackInfo.deptName,
                            level: callBackInfo.level,
                            wardName: callBackInfo.wardName,
                            districtName: callBackInfo.districtName,
                            pageSize: callBackInfo.pageSize,
                            pageNumber: callBackInfo.pageNumber
                        });
                    }}
                />
                <Filter
                    isCheck={false}
                    onCheckAllChange={(isCheck) => {
                        if (isCheck) {
                            handleSelectAll(departmentList, setCheckedItems, setDepartmentList);
                        } else {
                            handleUnselectAll(setCheckedItems, setDepartmentList);
                        }
                    }}
                    onTextChange={(key, value) => {
                        setFilterData({ ...filterData, [key]: value });
                    }}
                    onSubmitted={(filterData) => {
                        if (!departmentListInfo.provinceId) {
                            setToastInfo({
                                showToast: true,
                                severity: 'error',
                                message: 'Vui lòng chọn tỉnh/thành phố trước khi tìm kiếm!'
                            });
                            return;
                        }
                        setDepartmentListInfo({
                            ...departmentListInfo,
                            deptName: filterData.name,
                            level: filterData.level,
                            districtName: filterData.district,
                            wardName: filterData.ward
                        });
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
                            onIsCheckChange={(id, isCheck) =>
                                handleIsCheckChange(id, isCheck, setCheckedItems, setDepartmentList)
                            }
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
                    if (success) {
                        setRefreshData(true);
                        // Refresh department list
                        updateDepartmentListAndPageInfo()
                        setToastInfo({
                            showToast: true,
                            severity: 'success',
                            message: 'Thêm phòng ban thành công!'
                        });
                    } else {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: message
                        });
                    }
                }}
                parentId={selectorData.parentId}
                provinceId={selectorData.provinceId}
                provinceName={selectorData.provinceName}
            />
            <EditDepartmentModal
                isVisible={showEditDepartmentModal}
                label="Chỉnh sửa phòng ban"
                onClose={() => setShowEditDepartmentModal(false)}
                onSubmitted={(success, message, code) => {
                    if (success) {
                        // Refresh department list
                        updateDepartmentListAndPageInfo()

                        setToastInfo({
                            showToast: true,
                            severity: 'success',
                            message: 'Cập nhật phòng ban thành công!'
                        });
                    } else {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: message
                        });
                    }
                }}
                deptId={editingDepartment?.deptId ? editingDepartment.deptId : ''}
            />
            <SelectedDataToolbar
                label="phòng ban"
                isShow={showSelectedDataToolbar}
                totalSelected={checkedItems.length}
                onDelete={() => {
                    const dl = async () => {
                        const result = await deleteDepartments(
                            checkedItems.map(item => item.id)
                        );
                        if (result.success) {
                            setToastInfo({
                                showToast: true,
                                severity: 'success',
                                message: 'Xóa phòng ban thành công!'
                            });
                            setCheckedItems([]);
                            updateDepartmentListAndPageInfo()
                            setRefreshData(true);
                        } else {
                            setToastInfo({
                                showToast: true,
                                severity: 'error',
                                message: result.message
                            });
                        }
                    }
                    dl();
                }}
                onClose={() => {
                    handleUnselectAll(setCheckedItems, setDepartmentList);
                    setShowSelectedDataToolbar(false);
                }}
            />
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