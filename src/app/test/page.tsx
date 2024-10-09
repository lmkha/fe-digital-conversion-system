'use client';
import * as React from 'react';
import { getDepartments } from '@/services/department';
import DeptCombobox from '@/core/components/client-combobox-dept';

export default function Page() {
    const [departments, setDepartments] = React.useState<{
        name: string;
        deptId: string;
        provinceName: string;
        districtName: string;
    }[]>([]);

    React.useEffect(() => {
        getDepartments().then((data) => {
            setDepartments(data.map((item) => ({
                name: item.deptName,
                deptId: item.deptId,
                provinceName: item.provinceName,
                districtName: item.districtName
            })));
        });
    }, []);



    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <DeptCombobox customOptions={departments.map
                ((item) => ({
                    name: item.name,
                    provinceName: item.provinceName,
                    districtName: item.districtName,
                    id: item.deptId
                }))
            } />
        </div>
    );
}