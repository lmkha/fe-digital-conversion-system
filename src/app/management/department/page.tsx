'use client';

import { Fragment, useEffect, useState } from "react";
import DepartmentItem from "./components/department-item";
import Filter from "./components/filter";
import Selector from "./components/selector";
import AddNewDepartmentModal from "./modals/add-new-department";
import { useManagement } from "@/contexts/management-context";

export default function Page() {
    const [showAddNewDepartmentModal, setShowAddNewDepartmentModal] = useState(false);
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
    }, []);

    return (
        <Fragment>
            <div className="flex-col">
                <Selector />
                <Filter />
                <div className="flex-1 w-full">
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                    <DepartmentItem />
                </div>
            </div>

            <AddNewDepartmentModal
                isVisible={showAddNewDepartmentModal}
                onClose={() => setShowAddNewDepartmentModal(false)}
            />
        </Fragment>
    );
}
