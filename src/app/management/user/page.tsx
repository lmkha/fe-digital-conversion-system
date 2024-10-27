/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import Filter, { FilterData } from "./components/filter";
import UserItemComponent from "./components/user-item";
import AddUserModal from "./modals/add-user-modal";
import Selector from "./components/selector";
import { SelectorData } from "./components/selector";
import { changeUserStatus, deleteUsers, findUserByDeptId, findUserByFilter } from "@/services/user";
import EditUserModal from "./modals/edit-user-modal";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import { Typography } from "@mui/material";
import { useAppContext } from "@/contexts/app-context";
import { UserItem } from "@/services/models/user-item";

export default function Page() {
    const { setToastInfo } = useAppContext();
    const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
    const [openAddUserModal, setOpenAddUserModal] = useState<boolean>();
    const [openEditUserModal, setOpenEditUserModal] = useState<boolean>();
    const [selectedItemIdToEdit, setSelectedItemIdToEdit] = useState<string>();
    const [userList, setUserList] = useState<UserItem[]>();
    const [refreshData, setRefreshData] = useState<boolean>();
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState<boolean>();
    const [checkedItems, setCheckedItems] = useState<string[]>();
    const [selectorData, setSelectorData] = useState<SelectorData>();
    const [filterData, setFilterData] = useState<FilterData>();

    // Logic functions ----------------------------------------------------------
    const handleUnselectAll = () => {
        setCheckedItems([]);
    }

    const updateUserList = () => {
        if (selectorData?.provinceId && selectorData.deptId) {
            findUserByDeptId(selectorData.deptId).then((result) => {
                if (result.success) {
                    setUserList(result.data.users);
                    setFooterInfo({
                        ...footerInfo,
                        paginationInfo: result.data.paginationInfo
                    });
                } else {
                    if (setToastInfo) setToastInfo({
                        show: true,
                        severity: 'error',
                        message: result.message
                    });
                    setUserList([]);
                }
                console.log('userList:', result.data);
            });
        } else {
            setUserList([]);
        }
    }

    const handleChangeUserStatus = (id: string, status: string) => {
        changeUserStatus(id, status).then((result) => {
            if (result.success) {
                if (setToastInfo) setToastInfo({
                    show: true,
                    severity: 'success',
                    message: 'Thay đổi trạng thái thành công!'
                });
                updateUserList();
            } else {
                if (setToastInfo) setToastInfo({
                    show: true,
                    severity: 'error',
                    message: result.message
                });
            }
        });
    }
    // UseEffect ----------------------------------------------------------------
    // Set header
    useEffect(() => {
        setHeaderTitle('Người dùng');
        setHeaderButtons([
            {
                type: 'import',
                label: 'Thêm từ file',
                onClick: () => {
                    if (setToastInfo) {
                        setToastInfo({
                            show: true,
                            severity: 'success',
                            message: 'Chức năng đang được phát triển!',
                            autoClose: true,
                            duration: 2000,
                        });
                    }
                }
            },
            {
                type: 'add',
                label: 'Thêm người dùng',
                onClick: () => {
                    if (!selectorData?.deptId) {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'error',
                            message: 'Vui lòng chọn đơn vị trước khi thêm người dùng!'
                        });
                    } else {
                        setOpenAddUserModal(true);
                    }
                }
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle, selectorData?.deptId]);

    // Get data when selectorData change
    useEffect(() => {
        console.log('selectorData in Page:', selectorData);
        if (selectorData?.deptId) {
            updateUserList();
        } else {
            setUserList([]);
        }
    }, [selectorData?.deptId]);

    // Refresh data when refreshData change
    useEffect(() => {
        if (refreshData) {
            if (selectorData?.deptId) {
                findUserByFilter({ deptId: selectorData.deptId }).then((result) => {
                    if (result.success) {
                        setUserList(result.data.users);

                    } else {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'error',
                            message: result.message
                        });
                    }
                });
            } else {
                setUserList([]);

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
        if (selectorData && selectorData?.deptId) {
            if (filterData?.name || filterData?.username || filterData?.email || filterData?.phone ||
                filterData?.role || filterData?.jobTitle || filterData?.status) {
                findUserByFilter({
                    deptId: selectorData?.deptId,
                    fullName: filterData.name,
                    username: filterData.username,
                    email: filterData.email,
                    phone: filterData.phone,
                    realRole: filterData.role,
                    jobTitle: filterData.jobTitle,
                    status: filterData.status
                }).then((result) => {
                    if (result.success) {
                        setUserList(result.data.users);

                    } else {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'error',
                            message: result.message
                        });
                    }
                });
            } else {
                updateUserList();
            }
        }
    }, [filterData]);

    // Update data when page size or page number change
    useEffect(() => {
        if (selectorData && selectorData?.deptId) {
            if (footerInfo?.paginationInfo?.pageSize && footerInfo?.paginationInfo?.pageNumber) {
                findUserByFilter({
                    deptId: selectorData?.deptId,
                    pageSize: footerInfo?.paginationInfo.pageSize.toString(),
                    pageNumber: footerInfo?.paginationInfo.pageNumber.toString(),
                    fullName: filterData?.name,
                    username: filterData?.username,
                    email: filterData?.email,
                    phone: filterData?.phone,
                    realRole: filterData?.role,
                    jobTitle: filterData?.jobTitle,
                    status: filterData?.status
                }).then((result) => {
                    if (result.success) {
                        setUserList(result.data.users);
                    } else {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'error',
                            message: result.message
                        });
                    }
                });
            }
        }
    }, [footerInfo?.paginationInfo]);
    // Render -------------------------------------------------------------------
    return (
        <div>
            <Selector
                onChange={(provinceId, provinceName, parentId) => { }}
                refreshData={false}
                onRefreshDataFinished={() => { }}
                onCallBackInfoChange={(callBackInfo) => {
                    setSelectorData({
                        provinceId: callBackInfo.provinceId,
                        deptId: callBackInfo.parentId
                    });
                }}
            />
            <Filter
                deptId={selectorData?.deptId}
                onTextChange={(key, value) => {
                }}
                onSubmitted={(data) => {
                    if (!selectorData?.deptId) {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'error',
                            message: 'Vui lòng chọn tỉnh, đơn vị trước khi lọc!'
                        });
                        return;
                    }
                    setFilterData(data);
                }}
            />
            {
                (userList && userList.length === 0) && <Typography variant="h6" className="text-center mt-4">Không có dữ liệu</Typography>
            }
            {userList && userList.length > 0 &&
                userList.map((user) => {
                    return (
                        <UserItemComponent
                            key={user.userId}
                            userId={user.userId}
                            name={user.fullName}
                            username={user.username}
                            email={user.email}
                            phone={user.phone}
                            role={user.realRole}
                            jobTitle={user.jobTitle}
                            status={user.status}
                            onStatusChange={(id, status) => { handleChangeUserStatus(id, status) }}
                            checked={checkedItems && checkedItems.includes(user.userId) ? true : false}
                            onChangePassword={() => { }}
                            onEdit={() => {
                                setSelectedItemIdToEdit(user.userId);
                                setOpenEditUserModal(true);
                            }}
                            onselect={(id) => {
                                setCheckedItems(checkedItems ? [...checkedItems, id] : [id]);
                            }}
                            onUnselect={(id) => {
                                setCheckedItems(checkedItems ? checkedItems.filter((item) => item !== id) : []);
                            }}
                        />
                    );
                })}

            <AddUserModal
                open={openAddUserModal ? true : false}
                deptId={selectorData?.deptId}
                onClose={() => setOpenAddUserModal(false)}
                onSubmitted={(success, message) => {
                    if (success) {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'success',
                            message: message
                        });
                        setRefreshData(true);

                    } else {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: 'error',
                            message: message
                        });
                    }
                }}
            />

            <EditUserModal
                open={openEditUserModal ? true : false}
                userId={selectedItemIdToEdit ? selectedItemIdToEdit : ''}
                deptId={selectorData?.deptId ? selectorData.deptId : ''}
                onClose={() => setOpenEditUserModal(false)}
                onSubmitted={(success, message) => {
                    if (success) {
                        if (setToastInfo) setToastInfo({
                            show: true,
                            severity: success ? 'success' : 'error',
                            message: message
                        });
                    }
                    if (success) {
                        setRefreshData(true);
                    }
                }}
            />

            <SelectedDataToolbar
                label="người dùng"
                isShow={showSelectedDataToolbar ? true : false}
                totalSelected={checkedItems && checkedItems.length || 0}
                onDelete={() => {
                    if (checkedItems) {
                        deleteUsers(checkedItems).then((result) => {
                            if (setToastInfo) setToastInfo({
                                show: true,
                                severity: result.success ? 'success' : 'error',
                                message: result.message
                            })
                            if (result.success) {
                                setCheckedItems([]);
                                updateUserList();
                            }
                        });
                    }
                }}
                onClose={() => {
                    handleUnselectAll();
                    setShowSelectedDataToolbar(false);
                }}
            />
        </div>
    );
}
