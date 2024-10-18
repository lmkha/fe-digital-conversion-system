/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import Filter from "./components/filter";
import UserItem from "./components/user-item";
import AddUserModal from "./modals/add-user-modal";
import { get } from "@/hooks/use-local-storage";
import { useAuth } from '@/contexts/auth-context';
import Selector from "./components/selector";

export default function Page() {
    const { isLoggedIn } = useAuth();
    const { setHeaderButtons, setHeaderTitle } = useManagement();
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
    // Logic functions ----------------------------------------------------------


    // UseEffect ----------------------------------------------------------------
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
                onClick: () => { setOpenAddUserModal(true) }
            }
        ]);
    }, []);


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
            <Filter />

            {/* <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem /> */}
            <UserItem
                name="Nguyễn Văn A"
                username="nguyenvana"
                email="vana@gmail.com"
                phone="0372963456"
                role="Chuyên viên"
                jobTitle="Chuyên viên"
            />


            <AddUserModal
                open={openAddUserModal}
                deptId={''}
                onClose={() => setOpenAddUserModal(false)}
                onSubmitted={(success, message) => {
                    console.log(success, message);
                }}
            />
        </div>
    );
}
