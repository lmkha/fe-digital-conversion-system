'use client';

import Combobox from '@/core/components/combobox';
import * as React from 'react';

export default function Page() {

    return (
        <div className='flex items-center justify-center min-h-screen bg-white'>
            <Combobox
                label='CheckVar'
                value={{ name: '', id: '' }}
                options={[{ name: 'Kha', id: '1' }, { name: 'Kha2', id: '2' }]}
                onChange={(value) => console.log(value)}
            />
        </div>
    );
}
