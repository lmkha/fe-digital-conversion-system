'use client';
import { usePermission } from '@/contexts/permission-context';

export default function Page() {
    const { permissionList } = usePermission();

    return (
        <div>
            {/* <h1>Management Page</h1> */}
            <pre>{JSON.stringify(permissionList, null, 2)}</pre>
        </div>
    );
}
