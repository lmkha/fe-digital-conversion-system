/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import Toast from "@/core/components/toast";
import { Fragment, useEffect, useState } from "react";
import Selector from "./components/selector";
import { AddRoleModal } from "./modals/add-role-modal";
import Filter from "./components/filter";
import RoleItem from "./components/role-item";
import { deleteRole, downloadExcelFile, getRoles, getRolesByFilter } from "@/services/role";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import { EditRoleModal } from "./modals/edit-role-modal";
import { useAppContext } from "@/contexts/app-context";
import { usePermission } from '@/contexts/permission-context';

export default function Page() {
    const { permissionList } = usePermission();
    const { setToastInfo } = useAppContext();
    const { setHeaderButtons, setHeaderTitle, setFooterInfo, footerInfo } = useManagement();
    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const [showEditRoleModal, setShowEditRoleModal] = useState(false);
    const [roleList, setRoleList] = useState<{
        roleId: string;
        roleCode: string;
        roleName: string;
        isCheck: boolean;
    }[]>([]);
    const [filterData, setFilterData] = useState<{
        permissionCode: string;
        permissionName: string;
    }>({
        permissionCode: '',
        permissionName: ''
    });
    const [selectorData, setSelectorData] = useState<{
        provinceId: string;
        deptId: string;
    }>({
        provinceId: '',
        deptId: ''
    });
    const [refreshData, setRefreshData] = useState(false);
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [selectedItemIdToEdit, setSelectedItemIdToEdit] = useState<string>('');

    // Handle logic --------------------------------------------------------------------------------------------
    const updateRoleAndPageInfo = () => {
        if (selectorData.provinceId && selectorData.deptId) {
            getRoles(selectorData.deptId).then((result) => {
                if (result.success) {
                    setRoleList(result.roles);
                    setFooterInfo({
                        ...footerInfo,
                        paginationInfo: result.pageInfo
                    });
                } else {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: 'error',
                        message: result.message
                    });
                    setRoleList([]);
                }
            });
        } else {
            setRoleList([]);
        }
    }

    const handleSelectAll = () => {
        // Add all id to checkedItems
        setCheckedItems(roleList.map(item => item.roleId));
        // Set isCheck to true for all item
        setRoleList(roleList.map(item => {
            return {
                ...item,
                isCheck: true
            }
        }));
    }

    const handleUnselectAll = () => {
        // Remove all id from checkedItems
        setCheckedItems([]);
        // Set isCheck to false for all item
        setRoleList(roleList.map(item => {
            return {
                ...item,
                isCheck: false
            }
        }));
    }
    // useEffect ------------------------------------------------------------------------------------------------
    // Set header
    useEffect(() => {
        setHeaderTitle('Vai trò');
        if (permissionList.role.create) {
            setHeaderButtons([
                {
                    type: 'add',
                    label: 'Thêm vai trò',
                    onClick: () => {
                        if (!selectorData.deptId) {
                            setToastInfo && setToastInfo({
                                show: true,
                                severity: 'error',
                                message: 'Vui lòng chọn đơn vị trước khi thêm vai trò!'
                            });
                        } else {
                            setShowAddRoleModal(true);
                        }
                    }
                }
            ]);
        }
    }, [setHeaderButtons, setHeaderTitle, selectorData, permissionList.role.create]);

    // Get data when selectorData change
    useEffect(() => {
        if (selectorData.deptId) {
            updateRoleAndPageInfo();
        } else {
            setRoleList([]);
        }
    }, [selectorData])

    // Set footer
    useEffect(() => {
        setFooterInfo({
            ...footerInfo,
            exportDataFooter: () => {
                downloadExcelFile(
                    filterData.permissionCode,
                    filterData.permissionName,
                    selectorData.deptId,
                    footerInfo?.paginationInfo?.pageNumber?.toString() ? footerInfo?.paginationInfo?.pageNumber?.toString() : '',
                    footerInfo?.paginationInfo?.pageSize?.toString() ? footerInfo?.paginationInfo?.pageSize?.toString() : '',
                ).then((result) => {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: result.success ? 'success' : 'error',
                        message: result.message
                    });
                });
            }
        });
    }, [roleList]);

    // Refresh data when refreshData change
    useEffect(() => {
        if (refreshData) {
            if (selectorData.deptId) {
                getRoles(selectorData.deptId).then((result) => {
                    if (result.success) {
                        setRoleList(result.roles);
                    } else {
                        setToastInfo && setToastInfo({
                            show: true,
                            severity: 'error',
                            message: result.message
                        });
                    }
                });
            } else {
                setRoleList([]);
            }
            setRefreshData(false);
        }
    }, [refreshData]);

    // Show or hide selected data toolbar
    useEffect(() => {
        if (checkedItems.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItems]);

    // Update when filterData change
    useEffect(() => {
        if (selectorData.deptId) {
            if (filterData.permissionCode || filterData.permissionName) {
                getRolesByFilter(selectorData.deptId, filterData.permissionCode, filterData.permissionName).then((result) => {
                    if (result.success) {
                        setRoleList(result.roles);
                        setFooterInfo({
                            ...footerInfo,
                            paginationInfo: result.pageInfo
                        });
                    } else {
                        setToastInfo && setToastInfo({
                            show: true,
                            severity: 'error',
                            message: result.message
                        });
                    }
                });
            } else {
                updateRoleAndPageInfo();
            }
        }
    }, [filterData]);

    // PageSize and PageNumber change
    useEffect(() => {
        if (selectorData.deptId) {
            if (footerInfo?.paginationInfo?.pageNumber && footerInfo?.paginationInfo?.pageSize) {
                if (filterData.permissionCode || filterData.permissionName) {
                    getRolesByFilter(
                        selectorData.deptId,
                        filterData.permissionCode,
                        filterData.permissionName,
                        footerInfo?.paginationInfo?.pageSize?.toString(),
                        footerInfo?.paginationInfo?.pageNumber?.toString(),
                    ).then((result) => {
                        if (result.success) {
                            setRoleList(result.roles);
                            setFooterInfo({
                                ...footerInfo,
                                paginationInfo: result.pageInfo
                            });
                        } else {
                            setToastInfo && setToastInfo({
                                show: true,
                                severity: 'error',
                                message: result.message
                            });
                        }
                    });
                } else {
                    updateRoleAndPageInfo();
                }
            }
        }
    }, [footerInfo?.paginationInfo?.pageSize, footerInfo?.paginationInfo?.pageNumber]);

    // Render ------------------------------------------------------------------------------------------------    
    return (
        <Fragment>
            <div className="flex-col text-black mt-4">
                {/* Selector */}
                <Selector
                    onChange={(provinceId, provinceName, parentId) => {
                        setSelectorData({
                            provinceId: provinceId,
                            deptId: parentId
                        });
                    }}
                    refreshData={false}
                    onRefreshDataFinished={() => { }}
                    onCallBackInfoChange={(callBackInfo) => { }}
                />
                {/* Filter */}
                <Filter
                    isCheck={false}
                    onCheckAllChange={(isCheck) => {
                        if (isCheck) {
                            handleSelectAll();
                        } else {
                            handleUnselectAll();
                        }
                    }}
                    onTextChange={(key, value) => {
                        setFilterData({ ...filterData, [key]: value });
                    }}
                    onSubmitted={(data) => {
                        if (!selectorData.deptId) {
                            setToastInfo && setToastInfo({
                                show: true,
                                severity: 'error',
                                message: 'Vui lòng chọn tỉnh, đơn vị trước khi lọc!'
                            });
                            return;
                        }
                        setFilterData({
                            permissionCode: data.code,
                            permissionName: data.name
                        });
                    }}
                />

                {/* TableList */}
                <div className="flex-1 w-full max-h-[480px] overflow-y-auto">
                    {roleList.length === 0 && (
                        <div className="flex justify-center items-center h-full mt-4">
                            <span>Không có dữ liệu</span>
                        </div>
                    )}
                    {roleList.length > 0 &&
                        roleList.map((item, index) => (
                            <RoleItem
                                id={item.roleId}
                                key={index}
                                code={item.roleCode}
                                name={item.roleName}
                                isCheck={item.isCheck}
                                onIsCheckChange={(id, isCheck) => {
                                    if (isCheck) {
                                        setCheckedItems([...checkedItems, id]);
                                        setRoleList(roleList.map(item => {
                                            if (item.roleId === id) {
                                                return {
                                                    ...item,
                                                    isCheck: true
                                                }
                                            }
                                            return item;
                                        }));
                                    } else {
                                        setCheckedItems(checkedItems.filter(item => item !== id));
                                        setRoleList(roleList.map(item => {
                                            if (item.roleId === id) {
                                                return {
                                                    ...item,
                                                    isCheck: false
                                                }
                                            }
                                            return item;
                                        }));
                                    }
                                }}
                                onEdit={() => {
                                    console.log(`Edit: ${item.roleId}`);
                                    setSelectedItemIdToEdit(item.roleId);
                                    setShowEditRoleModal(true);
                                }}
                            />
                        ))}
                </div>
            </div>

            <AddRoleModal
                isOpen={showAddRoleModal}
                deptId={selectorData.deptId}
                onClose={() => setShowAddRoleModal(false)}
                onSubmitted={(success, message) => {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: success ? 'success' : 'error',
                        message: message
                    });
                    if (success) {
                        setRefreshData(true);
                    }
                }}
            />
            <EditRoleModal
                isOpen={showEditRoleModal}
                roleId={selectedItemIdToEdit}
                onClose={() => setShowEditRoleModal(false)}
                onSubmitted={(success, message) => {
                    setToastInfo && setToastInfo({
                        show: true,
                        severity: success ? 'success' : 'error',
                        message: message
                    });
                    if (success) {
                        setRefreshData(true);
                    }
                }}
            />
            <SelectedDataToolbar
                label="vai trò"
                isShow={showSelectedDataToolbar}
                totalSelected={checkedItems.length}
                onDelete={() => {
                    const dl = async () => {
                        const result = await deleteRole(
                            checkedItems
                        );
                        setToastInfo && setToastInfo({
                            show: true,
                            severity: result.success ? 'success' : 'error',
                            message: result.message
                        });
                        if (result.success) {
                            setCheckedItems([]);
                            updateRoleAndPageInfo();
                        }
                    }
                    dl();
                }}
                onClose={() => {
                    handleUnselectAll();
                    setShowSelectedDataToolbar(false);
                }}
            />
        </Fragment>
    );
}
