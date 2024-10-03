'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Page() {
    const { setHeaderButtons } = useManagement();

    useEffect(() => {
        setHeaderButtons([
            {
                type: 'add',
                label: 'Add new',
                onClick: () => console.log('Add new report configuration')
            }
        ]);
    }, []);

    return (
        <div>Report configuration Page</div>
    );
}
