'use client';

import { Divider } from "@mui/material";

export function ChildItem({ no, type, permissionCode, permissionName }: PermissionItemProps) {
    return (
        <div>
            <div className='flex h-12 pl-11 w-full justify-between items-center'>
                <div className='ml-5 mr-16 w-1/12 flex justify-center'>
                    <h1>{no}</h1>
                </div>
                <div className='w-1/12 mr-20 flex justify-start'>
                    <h1>{type}</h1>
                </div>
                <div className='pl-10 w-1/3 flex justify-start'>
                    <h1>{permissionCode}</h1>
                </div>
                <div className='pl-28 w-1/3 flex justify-start'>
                    <h1>{permissionName}</h1>
                </div>
            </div>
            <Divider />
        </div>
    );
}
