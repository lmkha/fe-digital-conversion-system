/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import Filter from "./components/filter";
import UserItem from "./components/user-item";
import AddUserModal from "./modals/add-user-modal";
import Selector from "./components/selector";
import { findUserByDeptId, findUserByFilter } from "@/services/user";
import EditUserModal from "./modals/edit-user-modal";
import Toast from "@/core/components/toast";
import SelectedDataToolbar from "../components/selected-data-toolbar";
import { Typography } from "@mui/material";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle, setFooterInfo } = useManagement();
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [userList, setUserList] = useState<any[]>([]);
    const [paginationInfoToRender, setPaginationInfoToRender] = useState<{
        pageNumber: string;
        total: string;
        start: string;
        end: string;
        pageSize: string;
    }>({
        pageNumber: '0',
        total: '0',
        start: '0',
        end: '0',
        pageSize: '1',
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
        name: string;
        username: string;
        email: string;
        phone: string;
        role: string;
        jobTitle: string;
        status: string;
    }>({
        name: '',
        username: '',
        email: '',
        phone: '',
        role: '',
        jobTitle: '',
        status: ''
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
    // Logic functions ----------------------------------------------------------
    const handleUnselectAll = () => {
        setCheckedItems([]);
    }

    const updateUsersAndPageInfo = () => {
        if (selectorData.provinceId && selectorData.deptId) {
            findUserByDeptId(selectorData.deptId).then((result) => {
                if (result.success) {
                    setUserList(result.data.users);
                    setPaginationInfoToRender({
                        ...paginationInfoToRender,
                        pageNumber: result.data.pageInfo.pageNumber,
                        total: result.data.pageInfo.total,
                        start: result.data.pageInfo.start,
                        end: result.data.pageInfo.end,
                    });
                } else {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: result.message
                    });
                    setUserList([]);
                    setPaginationInfoToRender({
                        pageNumber: '',
                        total: '',
                        start: '',
                        end: '',
                        pageSize: '',
                    });
                }
            });
        } else {
            setUserList([]);
            setPaginationInfoToRender({
                pageNumber: '',
                total: '',
                start: '',
                end: '',
                pageSize: '',
            });
        }
    }

    // UseEffect ----------------------------------------------------------------
    // Set header
    useEffect(() => {
        setHeaderTitle('Người dùng');
        setHeaderButtons([
            {
                type: 'import',
                label: 'Thêm từ file',
                onClick: () => console.log('Import user')
            },
            {
                type: 'add',
                label: 'Thêm người dùng',
                onClick: () => {
                    if (!selectorData.deptId) {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: 'Vui lòng chọn đơn vị trước khi thêm người dùng!'
                        });
                    } else {
                        setOpenAddUserModal(true);
                    }
                }
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle, selectorData]);

    // Get data when selectorData change
    useEffect(() => {
        if (selectorData.deptId) {
            updateUsersAndPageInfo();
        } else {
            setUserList([]);
            setPaginationInfoToRender({
                pageNumber: '0',
                total: '0',
                start: '0',
                end: '0',
                pageSize: '1',
            });
        }
    }, [selectorData]);

    // Set footer
    useEffect(() => {
        console.log('CheckVar');
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
    }, [userList]);

    // Refresh data when refreshData change
    useEffect(() => {
        if (refreshData) {
            if (selectorData.deptId) {
                findUserByFilter(selectorData.deptId).then((result) => {
                    if (result.success) {
                        setUserList(result.data.users);
                        setPaginationInfoToRender({
                            ...paginationInfoToRender,
                            pageNumber: result.data.pageInfo.pageNumber,
                            total: result.data.pageInfo.total,
                            start: result.data.pageInfo.start,
                            end: result.data.pageInfo.end,
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
                setUserList([]);
                setPaginationInfoToRender({
                    pageNumber: '0',
                    total: '0',
                    start: '0',
                    end: '0',
                    pageSize: '1',
                });
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
            if (filterData.name || filterData.username || filterData.email || filterData.phone || filterData.role || filterData.jobTitle || filterData.status) {
                findUserByFilter(
                    selectorData.deptId,
                    '',
                    '',
                    filterData.name,
                    filterData.username,
                    filterData.email,
                    filterData.phone,
                    filterData.role,
                    filterData.jobTitle,
                    filterData.status
                ).then((result) => {
                    if (result.success) {
                        setUserList(result.data.users);
                        setPaginationInfoToRender({
                            ...paginationInfoToRender,
                            pageNumber: result.data.pageInfo.pageNumber,
                            total: result.data.pageInfo.total,
                            start: result.data.pageInfo.start,
                            end: result.data.pageInfo.end,
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
                updateUsersAndPageInfo();
            }
        }
    }, [filterData]);

    // Use 2 pageInfo to avoid infinite loop
    useEffect(() => {
        if (selectorData.deptId) {
            findUserByFilter(
                selectorData.deptId,
                paginationInfoToGetData.pageSize,
                paginationInfoToGetData.pageNumber,
                filterData.name,
                filterData.username,
                filterData.email,
                filterData.phone,
                filterData.role,
                filterData.jobTitle,
                filterData.status
            ).then((result) => {
                if (result.success) {
                    setUserList(result.data.users);
                    setPaginationInfoToRender({
                        ...paginationInfoToRender,
                        pageNumber: result.data.pageInfo.pageNumber,
                        total: result.data.pageInfo.total,
                        start: result.data.pageInfo.start,
                        end: result.data.pageInfo.end,
                    });
                } else {
                    setToastInfo({
                        showToast: true,
                        severity: 'error',
                        message: result.message
                    });
                }
            });
        }
    }, [paginationInfoToGetData]);

    // Render -------------------------------------------------------------------
    return (
        <div>
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
            <Filter
                onTextChange={(key, value) => {
                }}
                onSubmitted={(data) => {
                    if (!selectorData.deptId) {
                        setToastInfo({
                            showToast: true,
                            severity: 'error',
                            message: 'Vui lòng chọn tỉnh, đơn vị trước khi lọc!'
                        });
                        return;
                    }
                    setFilterData(data);
                }}
            />
            {
                userList.length === 0 && <Typography variant="h6" className="text-center mt-4">Không có dữ liệu</Typography>
            }
            {userList.length > 0 &&
                userList.map((user) => {
                    console.log(user);
                    return (
                        <UserItem
                            key={user.userId}
                            userId={user.userId}
                            name={user.fullName}
                            username={user.username}
                            email={user.email}
                            phone={user.phone}
                            role={user.realRole}
                            jobTitle={user.jobTitle}
                            status={user.status.toString()}
                            checked={checkedItems.includes(user.userId)}
                            onChangePassword={() => { }}
                            onEdit={() => {
                                setSelectedItemIdToEdit(user.userId);
                                setOpenEditUserModal(true);
                            }}
                            onselect={(id) => {
                                setCheckedItems([...checkedItems, id]);
                            }}
                            onUnselect={(id) => {
                                setCheckedItems(checkedItems.filter((item) => item !== id));
                            }}
                        />
                    );
                })}

            <AddUserModal
                open={openAddUserModal}
                deptId={selectorData.deptId}
                onClose={() => setOpenAddUserModal(false)}
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

            <EditUserModal
                open={openEditUserModal}
                userId={selectedItemIdToEdit}
                deptId="91f31539-1817-4f4e-a7b5-15a7786a4a10"
                onClose={() => setOpenEditUserModal(false)}
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
                label="người dùng"
                isShow={showSelectedDataToolbar}
                totalSelected={checkedItems.length}
                onDelete={() => {
                    // const dl = async () => {
                    //     const result = await deleteRole(
                    //         checkedItems
                    //     );
                    //     if (result.success) {
                    //         setToastInfo({
                    //             showToast: true,
                    //             severity: 'success',
                    //             message: 'Xóa vai trò thành công!'
                    //         });
                    //         setCheckedItems([]);
                    //         updateRoleAndPageInfo();
                    //         console.log('Delete success');
                    //     } else {
                    //         setToastInfo({
                    //             showToast: true,
                    //             severity: 'error',
                    //             message: result.message
                    //         });
                    //     }
                    // }
                    // dl();
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
        </div>
    );
}
