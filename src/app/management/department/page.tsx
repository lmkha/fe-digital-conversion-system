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
    getDepartments,
    handleIsCheckChange,
    handleSelectAll,
    handleUnselectAll,
    BasicDepartment,
    DetailedDepartment,
    CheckedItem,
    deleteDepartments
} from '@/services/department';
import Toast from "@/core/components/toast";

export default function Page() {
    const { setHeaderButtons } = useManagement();
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState(false);
    const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState(false);
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [departmentList, setDepartmentList] = useState<{
        department: DetailedDepartment;
        isCheck: boolean;
    }[]>([]);
    const [editingDepartment, setEditingDepartment] = useState<BasicDepartment | null>(null);
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

    // Set header buttons
    useEffect(() => {
        setHeaderButtons([
            {
                type: 'add',
                label: 'Add new',
                onClick: () => {
                    setShowAddNewDepartmentModal(true)
                }
            }
        ]);
        console.log('Page rendered');
    }, [setHeaderButtons]);

    // Get department list
    useEffect(() => {
        getDepartments(setDepartmentList);
    }, []);

    // Show selected data toolbar when selected data is not empty
    useEffect(() => {
        if (checkedItems.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItems]);

    // Call API to get data when filter data changes
    useEffect(() => {
        // console.log('Filter data changed');
    }, [filterData]);

    return (
        <Fragment>
            <div className="flex-col">
                <Selector
                    onChange={(provinceId, provinceName, parentId) => {
                        setSelectorData({
                            provinceId: provinceId,
                            provinceName: provinceName,
                            parentId: parentId
                        });
                        console.log(`CheckVar provinceId in Page: ${selectorData.provinceId}`);
                    }}
                    refreshData={refreshData}
                    onRefreshDataFinished={() => setRefreshData(false)}
                    onSentToTableListChange={(sentToTableList) => {
                        setDepartmentList(sentToTableList.map(item => ({
                            department: item,
                            isCheck: false
                        })));
                    }}
                />
                <Filter
                    provinceId={selectorData.provinceId}
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
                    onSentToTableListChange={(sentToTableList) => {
                        setDepartmentList(sentToTableList.map(item => ({
                            department: item,
                            isCheck: false
                        })));
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
                label="Add New"
                onClose={() => setShowAddNewDepartmentModal(false)}
                onSubmitted={(success, message, code) => {
                    if (success) {
                        getDepartments(setDepartmentList);
                        setRefreshData(true);
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
                label="Edit"
                onClose={() => setShowEditDepartmentModal(false)}
                onSubmitted={(success, message, code) => {
                    if (success) {
                        getDepartments(setDepartmentList);
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
                            getDepartments(setDepartmentList);
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
                onClose={() => console.log('Close')}
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
