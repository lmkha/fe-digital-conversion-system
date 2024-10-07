'use client';

import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import { Department, getDepartments } from "@/services/department";

export default function Page() {
    const [checkData, setCheckData] = useState<Department[]>([])
    useEffect(() => {
        getDepartments(setCheckData);
    }, []);

    return (
        <div>
            <pre>{ }</pre>
        </div>
    );
}
