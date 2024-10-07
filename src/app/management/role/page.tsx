'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle } = useManagement();

    useEffect(() => {
        setHeaderTitle('Chức vụ');
        setHeaderButtons([
            {
                type: 'add',
                label: 'Add new',
                onClick: () => console.log('Add new role')
            }
        ]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <div>Role Page</div>
    );
}
