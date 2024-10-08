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
        name: '',
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
    // When user change selector, filter or department list, this state will be updated. Use it to call API to get department list
    const [pageInfoResult, setPageInfoResult] = useState({
        pageNumber: '',
        totalPage: '',
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

    const updateDepartmentListAndPageInfo = async () => {
        if (departmentListInfo.provinceId) {
            await findDepartmentsByFilterWithPageInfo(
                departmentListInfo.provinceId,
                departmentListInfo.parentId,
                departmentListInfo.deptName,
                departmentListInfo.level,
                departmentListInfo.wardName,
                departmentListInfo.districtName,
                departmentListInfo.pageSize,
                departmentListInfo.pageNumber
            ).then((result) => {
                setPageInfoResult({
                    pageNumber: result.pageNumber.toString(),
                    totalPage: result.totalPage.toString()
                });
                setDepartmentList(result.departments.map(item => ({
                    department: item,
                    isCheck: false
                })));
            });
        } else {
            setDepartmentList([]);
            setPageInfoResult({
                pageNumber: '0',
                totalPage: '0'
            });
        }
    }

    useEffect(() => {
        updateDepartmentListAndPageInfo();
    }, [departmentListInfo]);

    useEffect(() => {
        setFooterInfo({
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
            pageNumber: pageInfoResult.pageNumber,
            totalPage: pageInfoResult.totalPage,
            totalSelected: departmentList.length.toString(),
            onChangePageNumber: (pageNumber) => {
                setDepartmentListInfo({
                    ...departmentListInfo,
                    pageNumber: pageNumber
                });
            },
            onChangePageSize: (pageSize) => {
                setDepartmentListInfo({
                    ...departmentListInfo,
                    pageSize: pageSize,
                    pageNumber: '1'
                });
            }
        });
    }, [departmentList]);



    // Set header buttons
    useEffect(() => {
        setHeaderTitle('Phòng ban');
        setHeaderButtons([
            {
                type: 'add',
                label: 'Thêm phòng ban',
                onClick: () => {
                    setShowAddNewDepartmentModal(true)
                }
            }
        ]);
    }, [setHeaderTitle, setHeaderButtons]);

    // Show selected data toolbar when selected data is not empty
    useEffect(() => {
        if (checkedItems.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItems]);

    return (
        <Fragment>
            <div className="flex-col text-black">
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
                        console.log(`Filter data, name: ${filterData.name}, level: ${filterData.level}, district: ${filterData.district}, ward: ${filterData.ward}`);
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
                <div className="flex-1 w-full">
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