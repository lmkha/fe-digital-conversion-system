'use client';
import * as React from 'react';
import { getDepartments, getProvinces } from '@/services/department';
import Combobox from '@/core/components/combobox';

export default function Page() {
    const [provinces, setProvinces] = React.useState<{ name: string, id: string }[]>([]);

    React.useEffect(() => {
        getProvinces().then((res) => {
            setProvinces(res.map((item) => ({ name: item.provinceName, id: item.provinceId })));
        });
    }, []);

    const defaultOption = { name: 'Tỉnh Bình Thuận', id: '6cc475a3-fc86-4f63-94ba-cc2e0c24e234' };

    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <Combobox
                label='Province'
                options={provinces}
                onChange={(value) => console.log(value)}
                defaultOption={defaultOption}
                className=''
            />
        </div>
    );
}