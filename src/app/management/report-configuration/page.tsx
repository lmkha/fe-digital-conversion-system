'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import AddEditReportModal from "./modals/add-edit-modal";

export default function ReportConfigurationPage() {
    const { setHeaderButtons, setHeaderTitle } = useManagement();
    const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
    const [editedItemId, setEditedItemId] = useState<string | null>(null);

    useEffect(() => {
        setHeaderTitle('Quản lý cấu hình báo cáo');
        setHeaderButtons([
            {
                type: 'add',
                label: 'Thêm báo cáo',
                onClick: () => {
                    setShowAddEditModal(true);
                    setEditedItemId(null);
                }
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <>
            <AddEditReportModal
                open={showAddEditModal}
                reportId={editedItemId}
                onClose={() => setShowAddEditModal(false)}
            />
        </>
    );
}
