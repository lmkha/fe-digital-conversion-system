/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import { Fragment, useEffect, useState } from "react";
import { AddRoleModal } from "./modals/add-role-modal";
import Filter, { FilterData } from "./components/filter";
import RoleComponent from "./components/role-item";
import { deleteRole, downloadExcelFile, getRoles, getRolesByFilter } from "@/services/role";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import { EditRoleModal } from "./modals/edit-role-modal";
import { useAppContext } from "@/contexts/app-context";
import { usePermission } from '@/contexts/permission-context';
import DepartmentFilter, { DeptFilterData } from "../components/department-filter";
import RoleItem from "@/services/models/role-item";

export default function Page() {
    const { permissionList } = usePermission();
    const { setToastInfo } = useAppContext();
    const { setHeaderButtons, setHeaderTitle, setFooterInfo, footerInfo } = useManagement();
    const [showAddRoleModal, setShowAddRoleModal] = useState<boolean>();
    const [showEditRoleModal, setShowEditRoleModal] = useState<boolean>();
    const [roleList, setRoleList] = useState<RoleItem[]>();
    const [filterData, setFilterData] = useState<FilterData>();
    const [selectorData, setSelectorData] = useState<DeptFilterData>();
    const [refreshData, setRefreshData] = useState<boolean>();
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState<boolean>();
    const [checkedItems, setCheckedItems] = useState<string[]>();
    const [selectedItemIdToEdit, setSelectedItemIdToEdit] = useState<string>();

    // Handle logic --------------------------------------------------------------------------------------------
    const updateRoleAndPageInfo = () => {
        if (selectorData?.provinceId && selectorData.deptId) {
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
        roleList && setCheckedItems(roleList.flatMap(item => item.id ? [item.id] : []));
        // Set isCheck to true for all item
        roleList && setRoleList(roleList.map(item => {
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
        roleList && setRoleList(roleList.map(item => {
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
                        if (!selectorData?.deptId) {
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
        if (selectorData?.deptId) {
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
                    filterData?.code || '',
                    filterData?.name || '',
                    selectorData?.deptId || '',
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
            if (selectorData?.deptId) {
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
        if (checkedItems && checkedItems.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItems]);

    // Update when filterData change
    useEffect(() => {
        if (selectorData?.deptId) {
            if (filterData?.code || filterData?.name) {
                getRolesByFilter(selectorData.deptId, filterData.code, filterData.name).then((result) => {
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
        if (selectorData?.deptId) {
            if (footerInfo?.paginationInfo?.pageNumber && footerInfo?.paginationInfo?.pageSize) {
                if (filterData?.code || filterData?.name) {
                    getRolesByFilter(
                        selectorData.deptId,
                        filterData.code,
                        filterData.name,
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
                <DepartmentFilter
                    refreshData={refreshData || false}
                    onRefreshDataFinished={() => { setRefreshData(false) }}
                    onSubmitted={(selectorData) => setSelectorData(selectorData)}
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
                        filterData && setFilterData({ ...filterData, [key]: value });
                    }}
                    onSubmitted={(data) => {
                        if (!selectorData?.deptId) {
                            setToastInfo && setToastInfo({
                                show: true,
                                severity: 'error',
                                message: 'Vui lòng chọn tỉnh, đơn vị trước khi lọc!'
                            });
                            return;
                        }
                        setFilterData({
                            code: data.code,
                            name: data.name
                        });
                    }}
                />

                {/* TableList */}
                <div className="flex-1 w-full max-h-[480px] overflow-y-auto">
                    {roleList && roleList.length === 0 && (
                        <div className="flex justify-center items-center h-full mt-4">
                            <span>Không có dữ liệu</span>
                        </div>
                    )}
                    {roleList && roleList.length > 0 &&
                        roleList.map((item, index) => (
                            <RoleComponent
                                id={item.id || ''}
                                key={index}
                                code={item.code || ''}
                                name={item.name || ''}
                                selected={item.selected || false}
                                onSelectedChange={(id, isCheck) => {
                                    if (isCheck) {
                                        checkedItems && setCheckedItems([...checkedItems, id]);
                                        setRoleList(roleList.map(item => {
                                            if (item.id === id) {
                                                return {
                                                    ...item,
                                                    isCheck: true
                                                }
                                            }
                                            return item;
                                        }));
                                    } else {
                                        checkedItems && setCheckedItems(checkedItems.filter(item => item !== id));
                                        setRoleList(roleList.map(item => {
                                            if (item.id === id) {
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
                                    setSelectedItemIdToEdit(item.id);
                                    setShowEditRoleModal(true);
                                }}
                            />
                        ))}
                </div>
            </div>

            <AddRoleModal
                isOpen={showAddRoleModal || false}
                deptId={selectorData?.deptId || ''}
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
                isOpen={showEditRoleModal || false}
                roleId={selectedItemIdToEdit || ''}
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
                isShow={showSelectedDataToolbar || false}
                totalSelected={checkedItems?.length || 0}
                onDelete={() => {
                    const dl = async () => {
                        if (!checkedItems) return;
                        const result = await deleteRole(checkedItems);
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
