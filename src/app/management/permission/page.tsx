/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import Filter from "./components/filter";
import { ParentItem } from "./components/parent-item";
import { getPermissionByFilter } from "@/services/permission";
import Toast from "@/core/components/toast";

export default function Page() {
    // Context ----------------------------------------------------------------------------------------
    const { setHeaderButtons, setHeaderTitle, setFooterInfo } = useManagement();
    const [permissionList, setPermissionList] = useState<{
        isExpanded: boolean;
        permissionId: string;
        permissionNo: string;
        permissionCode: string;
        permissionName: string;
        type: string;
        childrenList: {
            permissionId: string;
            permissionNo: string;
            type: string;
            permissionCode: string;
            permissionName: string;
            parentId: string;
        }[];
    }[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<{
        pageNumber: string;
        total: string;
        start: string;
        end: string;
        pageSize: string;
    }>({
        pageNumber: '',
        total: '',
        start: '',
        end: '',
        pageSize: '',
    });
    const [filterData, setFilterData] = useState<{
        type: string;
        permissionCode: string;
        permissionName: string;
    }>({
        type: '',
        permissionCode: '',
        permissionName: ''
    });
    // Only update page when pageInfo change
    const [pageInfo, setPageInfo] = useState<{
        paginationInfo: {
            pageNumber: string;
            total: string;
            start: string;
            end: string;
            pageSize: string;
        },
        filterData: {
            type: string;
            permissionCode: string;
            permissionName: string;
        }
    }>({
        paginationInfo: {
            pageNumber: '',
            total: '',
            start: '',
            end: '',
            pageSize: '',
        },
        filterData: {
            type: '',
            permissionCode: '',
            permissionName: ''
        }
    });
    const [toastInfo, setToastInfo] = useState<{
        showToast: boolean
        severity: 'success' | 'error';
        message: string
    }>({
        showToast: false,
        severity: 'success',
        message: ''
    });
    const [expanded, setExpanded] = useState<string>('');

    // Logic function ---------------------------------------------------------------------------------
    const handleChange = (panel: string) => {
        setExpanded((prev) => (prev === panel ? '' : panel));
    };


    // UseEffect --------------------------------------------------------------------------------------
    // Set header
    useEffect(() => {
        setHeaderTitle('Phân quyền');
        setHeaderButtons([]);
    }, [setHeaderButtons, setHeaderTitle]);

    // Get data when Component did mount
    useEffect(() => {
        getPermissionByFilter('', '', '', '').then((result) => {
            if (result.success) {
                setPermissionList(result.parentList);
                setPaginationInfo({
                    pageNumber: result.pageInfo.pageNumber,
                    total: result.pageInfo.total,
                    start: result.pageInfo.start,
                    end: result.pageInfo.end,
                    pageSize: ''
                });
            } else {
                // Set toast info
            }
        });
    }, []);

    // Update footer when list change, list only change when data update
    useEffect(() => {
        setFooterInfo({
            hasExportDataFooter: false,
            pageNumber: parseInt(paginationInfo.pageNumber),
            total: parseInt(paginationInfo.total),
            start: parseInt(paginationInfo.start),
            end: parseInt(paginationInfo.end),
            onChangePageNumber: (pageNumber: number) => {
                console.log(`Page number: ${pageNumber}`);
                setPaginationInfo({
                    ...paginationInfo,
                    pageNumber: pageNumber.toString(),
                });
            },
            onChangePageSize: (pageSize: number) => {
                console.log(`Page size: ${pageSize}`);
                setPaginationInfo({
                    ...paginationInfo,
                    pageSize: pageSize.toString(),
                })
            },
        });
    }, [permissionList]);

    // Get data when pageInfo change
    useEffect(() => {
        getPermissionByFilter(
            pageInfo.filterData.permissionCode,
            pageInfo.filterData.permissionName,
            pageInfo.paginationInfo.pageNumber,
            pageInfo.paginationInfo.pageSize
        ).then((result) => {
            if (result.success) {
                setPermissionList(result.parentList);
                setPaginationInfo({
                    pageNumber: result.pageInfo.pageNumber,
                    total: result.pageInfo.total,
                    start: result.pageInfo.start,
                    end: result.pageInfo.end,
                    pageSize: ''
                });
            } else {
                setToastInfo({
                    showToast: true,
                    severity: 'error',
                    message: result.message
                });
            }
        });
    }, [pageInfo]);

    // Render -----------------------------------------------------------------------------------------
    return (
        <div className="flex-col text-black mt-4">
            {/* Filter */}
            <Filter
                onTextChange={(key, value) => {
                    setFilterData({
                        ...filterData,
                        [key]: value
                    });
                }}
                onSubmitted={({ type, permissionCode, permissionName }) => {
                    // Update filter data of pageInfo
                    setPageInfo({
                        ...pageInfo,
                        filterData: {
                            type,
                            permissionCode,
                            permissionName
                        }
                    });
                }}
            />

            {/* List of parent item */}
            {permissionList.map((item) => (
                <ParentItem
                    key={item.permissionId}
                    id={item.permissionId}
                    no={item.permissionNo}
                    type={item.type}
                    permissionCode={item.permissionCode}
                    permissionName={item.permissionName}
                    childrenList={item.childrenList.map((child) => ({
                        id: child.permissionId,
                        no: child.permissionNo,
                        type: child.type,
                        permissionCode: child.permissionCode,
                        permissionName: child.permissionName,
                    }))}
                    isExpanded={expanded === item.permissionId}
                    onChangeItem={() => {
                        handleChange(item.permissionId);
                    }}
                />
            ))}

            {/* Toast message */}
            <Toast
                open={toastInfo.showToast}
                message={toastInfo.message}
                severity={toastInfo.severity}
                autoClose={true}
                duration={2000}
                onClose={() => setToastInfo({ ...toastInfo, showToast: false })}
            />
        </div>
    );
}
