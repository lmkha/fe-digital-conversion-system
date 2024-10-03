'use client';

import { useManagement } from "@/contexts/management-context";
import { useEffect } from "react";

export default function Page() {
    const { setHeaderButtons } = useManagement();
    useEffect(() => {
        setHeaderButtons([]);
    }, []);

    return (
        <div>Permission Page</div>
    );
}
