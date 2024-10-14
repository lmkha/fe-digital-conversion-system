/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import Toast from "@/core/components/toast";
import { Fragment, useEffect, useState } from "react";
import Selector from "./components/selector";
import { AddRoleModal } from "./modals/add-role-modal";
import Filter from "./components/filter";
import RoleItem from "./components/role-item";
import { deleteRole, getRoles, getRolesByFilter } from "@/services/role";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import { EditRoleModal } from "./modals/edit-role-modal";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle, setFooterInfo } = useManagement();
    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const [showEditRoleModal, setShowEditRoleModal] = useState(false);
    const [roleList, setRoleList] = useState<{
        roleId: string;
        roleCode: string;
        roleName: string;
        isCheck: boolean;
    }[]>([]);
    const [paginationInfoToRender, setPaginationInfoToRender] = useState<{
        pageNumber: string;
        total: string;
        start: string;
        end: string;
        pageSize: string;
    }>({
        pageNumber: '',
        total: '',
        start: '',
        end: '',
        pageSize: '',
    });
    const [paginationInfoToGetData, setPaginationInfoToGetData] = useState<{
        pageNumber: string;
        total: string;
        start: string;
        end: string;
        pageSize: string;
    }>({
        pageNumber: '',
        total: '',
        start: '',
        end: '',
        pageSize: '',
    });
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
    const [toastInfo, setToastInfo] = useState<{
        showToast: boolean
        severity: 'success' | 'error';
        message: string
    }>({
        showToast: false,
        severity: 'success',
        message: ''
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
                    setPaginationInfoToRender({
                        ...paginationInfoToRender,
                        pageNumber: result.pageInfo.pageNumber,
                        total: result.pageInfo.total,
                        start: result.pageInfo.start,
                        end: result.pageInfo.end,
                    });
                } else {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: result.message
                    });
                }
            });
        } else {
            setRoleList([]);
            setPaginationInfoToRender({
                pageNumber: '',
                total: '',
                start: '',
                end: '',
                pageSize: '',
            });
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
        setHeaderButtons([
            {
                type: 'add',
                label: 'Thêm vai trò',
                onClick: () => {
                    setShowAddRoleModal(true);
                }
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    // Set footer
    useEffect(() => {
        setFooterInfo({
            hasExportDataFooter: true,
            exportDataFooter: () => {

            },
            pageNumber: parseInt(paginationInfoToRender.pageNumber),
            total: parseInt(paginationInfoToRender.total),
            start: parseInt(paginationInfoToRender.start),
            end: parseInt(paginationInfoToRender.end),
            onChangePageNumber: (pageNumber) => {
                setPaginationInfoToGetData({
                    ...paginationInfoToGetData,
                    pageNumber: pageNumber.toString()
                });
            },
            onChangePageSize: (pageSize) => {
                setPaginationInfoToGetData({
                    ...paginationInfoToGetData,
                    pageNumber: '1',
                    pageSize: pageSize.toString()
                });
            }
        });
    }, [roleList]);

    // Get data when selectorData change
    useEffect(() => {
        updateRoleAndPageInfo();
    }, [selectorData])

    // Refresh data when refreshData change
    useEffect(() => {
        if (refreshData) {
            getRoles(selectorData.deptId).then((result) => {
                if (result.success) {
                    setRoleList(result.roles);
                    setPaginationInfoToRender({
                        ...paginationInfoToRender,
                        pageNumber: result.pageInfo.pageNumber,
                        total: result.pageInfo.total,
                        start: result.pageInfo.start,
                        end: result.pageInfo.end,
                    });
                } else {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: result.message
                    });
                }
            });
            setRefreshData(false);
        }
    }, [refreshData])

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
        if (filterData.permissionCode || filterData.permissionName) {
            getRolesByFilter(selectorData.deptId, filterData.permissionCode, filterData.permissionName).then((result) => {
                if (result.success) {
                    setRoleList(result.roles);
                    setPaginationInfoToRender({
                        ...paginationInfoToRender,
                        pageNumber: result.pageInfo.pageNumber,
                        total: result.pageInfo.total,
                        start: result.pageInfo.start,
                        end: result.pageInfo.end,
                    });
                } else {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: result.message
                    });
                }
            });
        } else {
            updateRoleAndPageInfo();
        }
    }, [filterData]);

    // Use 2 pageInfo to avoid infinite loop
    useEffect(() => {
        console.log(`Submit data: ${JSON.stringify(paginationInfoToGetData)} - ${JSON.stringify(filterData)}`);
        getRolesByFilter(
            selectorData.deptId,
            filterData.permissionCode,
            filterData.permissionName,
            paginationInfoToGetData.pageNumber,
            paginationInfoToGetData.pageSize
        ).then((result) => {
            if (result.success) {
                setRoleList(result.roles);
                setPaginationInfoToRender({
                    ...paginationInfoToRender,
                    pageNumber: result.pageInfo.pageNumber,
                    total: result.pageInfo.total,
                    start: result.pageInfo.start,
                    end: result.pageInfo.end,
                });
            } else {
                setToastInfo({
                    showToast: true,
                    severity: 'error',
                    message: result.message
                });
            }
        });
    }, [paginationInfoToGetData]);

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
                        if (!selectorData.provinceId) {
                            setToastInfo({
                                showToast: true,
                                severity: 'error',
                                message: 'Vui lòng chọn tỉnh/thành phố trước khi tìm kiếm!'
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
                    {roleList.map((item, index) => (
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
                    if (success) {
                        setToastInfo({
                            showToast: true,
                            severity: 'success',
                            message: message
                        });
                        setRefreshData(true);

                    } else {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: message
                        });
                    }
                }}
            />
            <EditRoleModal
                isOpen={showEditRoleModal}
                roleId={selectedItemIdToEdit}
                onClose={() => setShowEditRoleModal(false)}
                onSubmitted={(success, message) => {
                    if (success) {
                        setToastInfo({
                            showToast: true,
                            severity: 'success',
                            message: message
                        });
                        setRefreshData(true);

                    } else {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: message
                        });
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
                        if (result.success) {
                            setToastInfo({
                                showToast: true,
                                severity: 'success',
                                message: 'Xóa vai trò thành công!'
                            });
                            setCheckedItems([]);
                            updateRoleAndPageInfo();
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
                    handleUnselectAll();
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
