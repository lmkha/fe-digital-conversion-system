'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle } = useManagement();

    useEffect(() => {
        setHeaderTitle('Cấu hình báo cáo');
        setHeaderButtons([
            {
                type: 'add',
                label: 'Add new',
                onClick: () => console.log('Add new report configuration')
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <div>Report configuration Page</div>
    );
}
