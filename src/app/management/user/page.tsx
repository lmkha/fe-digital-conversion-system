'use client';
import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle } = useManagement();

    useEffect(() => {
        setHeaderTitle('Người dùng');
        setHeaderButtons([
            {
                type: 'import',
                label: 'Import',
                onClick: () => console.log('Import user')
            },
            {
                type: 'add',
                label: 'Add new',
                onClick: () => console.log('Add new user')
            }
        ]);
    }, []);

    return (
        <div>User Page</div>
    );
}
