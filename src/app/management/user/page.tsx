/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import Filter from "./components/filter";
import UserItem from "./components/user-item";
import AddUserModal from "./modals/add-user-modal";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle } = useManagement();
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);


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
            <Filter />

            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />

            <AddUserModal
                open={openAddUserModal}
                deptId="1"
                onClose={() => setOpenAddUserModal(false)}
                onSubmitted={(success, message) => {
                    console.log(success, message);
                }}
            />
        </div>
    );
}
