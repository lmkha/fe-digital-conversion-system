'use client';

import { Divider } from "@mui/material";

export function ChildItem({ no, type, permissionCode, permissionName }: PermissionItemProps) {
    return (
        <div>
            <div className='ml-10 flex h-12 pl-3 w-full justify-start items-center'>
                <div className='w-16 ml-10 flex justify-center'>
                    <h1>{no}</h1>
                </div>
                <div className='w-60 ml-24 flex justify-start'>
                    <h1>{type}</h1>
                </div>
                <div className='w-80 ml-12 flex justify-start'>
                    <h1>{permissionCode}</h1>
                </div>
                <div className='w-80 ml-40 flex justify-start'>
                    <h1>{permissionName}</h1>
                </div>
            </div>
            <Divider />
        </div>
    );
}
