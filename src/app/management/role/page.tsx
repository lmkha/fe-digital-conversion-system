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
                onClick: () => console.log('Add new role')
            }
        ]);
    }, []);

    return (
        <div>Role Page</div>
    );
}
