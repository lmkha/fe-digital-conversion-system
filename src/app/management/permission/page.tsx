'use client';

import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Page() {
    const { setHeaderButtons, setHeaderTitle } = useManagement();
    useEffect(() => {
        setHeaderTitle('Phân quyền');
        setHeaderButtons([]);
    }, [setHeaderButtons, setHeaderTitle]);

    return (
        <div>Permission Page</div>
    );
}
