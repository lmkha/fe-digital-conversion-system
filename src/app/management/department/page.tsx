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
    deleteDepartments,
    downloadDepartmentsExcelFile,
    findDepartmentsByFilterWithPageInfo
} from '@/services/department';
import Toast from "@/core/components/toast";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { TfiImport } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function Page() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
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
    const { setHeaderButtons, setHeaderTitle } = useManagement();
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

    const updateDepartmentListAndPageInfo = () => {
        findDepartmentsByFilterWithPageInfo(
            departmentListInfo.provinceId,
            departmentListInfo.parentId,
            departmentListInfo.deptName,
            departmentListInfo.level,
            departmentListInfo.wardName,
            departmentListInfo.districtName,
            departmentListInfo.pageSize,
            departmentListInfo.pageNumber
        ).then((result) => {
            setDepartmentList(result.departments.map(item => ({
                department: item,
                isCheck: false
            })));
            setPageInfoResult({
                pageNumber: result.pageNumber.toString(),
                totalPage: result.totalPage.toString()
            });
        });
    }

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [isLoggedIn]);

    // Set header buttons
    useEffect(() => {
        setHeaderTitle('Phòng ban');
        setHeaderButtons([
            {
                type: 'add',
                label: 'Add new',
                onClick: () => {
                    setShowAddNewDepartmentModal(true)
                }
            }
        ]);
    }, [setHeaderTitle, setHeaderButtons]);

    // Get department list
    useEffect(() => {
        getDepartments().then((result) => {
            setDepartmentList(result.map(item => ({
                department: item,
                isCheck: false
            })));
        });
    }, []);


    // Show selected data toolbar when selected data is not empty
    useEffect(() => {
        if (checkedItems.length > 0) {
            setShowSelectedDataToolbar(true);
        } else {
            setShowSelectedDataToolbar(false);
        }
    }, [checkedItems]);

    // useEffect(() => {
    //     if (departmentListInfo.provinceId) {
    //         findDepartmentsByFilter(
    //             departmentListInfo.provinceId,
    //             departmentListInfo.parentId,
    //             departmentListInfo.deptName,
    //             departmentListInfo.level,
    //             departmentListInfo.districtName,
    //             departmentListInfo.wardName,
    //             departmentListInfo.pageSize,
    //             departmentListInfo.pageNumber
    //         ).then((result) => {
    //             setDepartmentList(result.map(item => ({
    //                 department: item,
    //                 isCheck: false
    //             })));
    //         });
    //     } else {
    //         getDepartments().then((result) => {
    //             setDepartmentList(result.map(item => ({
    //                 department: item,
    //                 isCheck: false
    //             })));
    //         })
    //     }
    // }, [departmentListInfo]);
    //---------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (departmentListInfo.provinceId) {
            updateDepartmentListAndPageInfo();
        } else {
            getDepartments().then((result) => {
                setDepartmentList(result.map(item => ({
                    department: item,
                    isCheck: false
                })));
            })
        }
    }, [departmentListInfo]);
    //---------------------------------------------------------------------------------------------------------

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
                        console.log(`CallBack in Page!`)
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

                    {/* Footer */}
                    <div className="w-10/12 fixed bottom-0 right-8 text-black">
                        <Footer
                            exportDataFooter={() => {
                                console.log('Check var info: ', departmentListInfo);
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
                            }}
                            pageNumber={pageInfoResult.pageNumber}
                            totalPage={pageInfoResult.totalPage}
                            onChangePageNumber={(pageNumber) => {
                                setDepartmentListInfo({
                                    ...departmentListInfo,
                                    pageNumber: pageNumber
                                });
                            }}
                            onChangePageSize={(pageSize) => {
                                setDepartmentListInfo({
                                    ...departmentListInfo,
                                    pageSize: pageSize,
                                    pageNumber: '1'
                                });
                            }}
                        />
                    </div>
                </div>
            </div>

            <AddNewDepartmentModal
                isVisible={showAddNewDepartmentModal}
                label="Add New"
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
                label="Edit"
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
                            getDepartments().then((result) => {
                                setDepartmentList(result.map(item => ({
                                    department: item,
                                    isCheck: false
                                })));
                            });
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

interface FooterProps {
    exportDataFooter: () => void;
    pageNumber: string;
    totalPage: string;
    onChangePageNumber: (pageNumber: string) => void;
    onChangePageSize: (pageSize: string) => void;
}
function Footer({ exportDataFooter, pageNumber, totalPage, onChangePageNumber, onChangePageSize }: FooterProps) {
    return (
        <div className='flex justify-between items-center h-10 w-full mx-4 mb-4 rounded-b-md bg-white shadow-md'>
            <button className="flex justify-center items-center gap-2 px-3 py-1 ml-2
                            text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md"
                onClick={() => {
                    console.log('Export data');
                    exportDataFooter();
                }}
            >
                <TfiImport />
                <span>Export Data</span>
            </button>

            <div className="mr-2 flex gap-4">
                <select className="flex justify-center items-center gap-0.5 px-1 rounded-md bg-gray-200"
                    title="itemsOfPage"
                    defaultValue="10"
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        onChangePageSize(selectedValue);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>

                <h1>{pageNumber} of {totalPage}</h1>
                <div className="flex gap-2">
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                    text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button
                            onClick={() => {
                                const newPageNumber = (parseInt(pageNumber) - 1);
                                if (newPageNumber > 0) {
                                    onChangePageNumber(newPageNumber.toString());
                                }
                            }}
                        >
                            {<GrFormPrevious />}
                        </button>
                    </div>
                    <div className="flex flex-col w-6 h-6 justify-center items-center 
                                text-gray-500 hover:text-black hover:bg-gray-200 hover:rounded-md">
                        <button
                            onClick={() => {
                                const newPageNumber = (parseInt(pageNumber) + 1);
                                if (newPageNumber <= parseInt(totalPage)) {
                                    onChangePageNumber(newPageNumber.toString());
                                }
                            }}
                        >
                            {<GrFormNext />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}