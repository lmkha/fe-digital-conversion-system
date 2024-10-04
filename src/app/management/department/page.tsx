'use client';

import { Fragment, useEffect, useState } from "react";
import DepartmentItem from "./components/department-item";
import Filter from "./components/filter";
import Selector from "./components/selector";
import AddNewDepartmentModal from "./modals/add-new-department";
import { useManagement } from "@/contexts/management-context";
import EditDepartmentModal from "./modals/edit-department";
import SelectedDataToolbar from "../components/selected-data-toolbar";

export default function Page() {
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState(false);
    const [showEditDepartmentModal, setShowEditDepartmentModal] = useState(false);
    const [showSelectedDataToolbar, setShowSelectedDataToolbar] = useState(false);

    const { setHeaderButtons } = useManagement();
    useEffect(() => {
        setHeaderButtons([
            {
                type: 'add',
                label: 'Add new',
                onClick: () => setShowAddNewDepartmentModal(true)
            }
        ]);
        console.log('Page rendered');
    }, [setHeaderButtons]);

    return (
        <Fragment>
            <div className="flex-col">
                <Selector />
                <Filter />
                <div className="flex-1 w-full">
                    <DepartmentItem
                        name="Ủy ban nhân dân tỉnh Bình Thuận"
                        level="1"
                        district="Đức Linh"
                        ward="Đức Tài("
                        isCheck={false}
                        onEdit={() => setShowEditDepartmentModal(true)}
                    />
                </div>
            </div>

            <AddNewDepartmentModal
                label="Add New"
                isVisible={showAddNewDepartmentModal}
                onSubmit={() => console.log('Submit')}
                onClose={() => setShowAddNewDepartmentModal(false)}
            />
            <EditDepartmentModal
                label="Edit"
                isVisible={showEditDepartmentModal}
                onSubmit={() => console.log('Submit')}
                onClose={() => setShowEditDepartmentModal(false)}
            />
            <SelectedDataToolbar
                isShow={showSelectedDataToolbar}
                totalSelected={1}
                onDelete={() => console.log('Delete')}
                onClose={() => console.log('Close')}
            />
        </Fragment>
    );
}
