/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import Filter from "./components/filter";
import { ParentItem } from "./components/parent-item";
import { getPermissionByFilter } from "@/services/permission";
import { Box } from "@mui/material";

export default function Page() {
    // Context ----------------------------------------------------------------------------------------
    const { setHeaderButtons, setHeaderTitle, setFooterInfo, footerInfo } = useManagement();
    const [permissionList, setPermissionList] = useState<PermissionParentItem[]>();
    const [filterData, setFilterData] = useState<PermissionFilterData>();
    const [expanded, setExpanded] = useState<string[]>([]);

    // Logic function ---------------------------------------------------------------------------------
    const handleChange = (panel: string) => {
        setExpanded((prev) => {
            if (prev.includes(panel)) {
                return prev.filter((item) => item !== panel);
            } else {
                return [...prev, panel];
            }
        });
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
                setFooterInfo
            }
            setFooterInfo({
                ...footerInfo,
                paginationInfo: {
                    pageNumber: result.pageInfo.pageNumber,
                    total: result.pageInfo.total,
                    start: result.pageInfo.start,
                    end: result.pageInfo.end,
                }
            })
        });
    }, []);

    // Get data when filter data changed
    useEffect(() => {
        if (filterData) {
            getPermissionByFilter(filterData.permissionCode, filterData.permissionName, '', '').then((result) => {
                if (result.success) {
                    setPermissionList(result.parentList);
                    setFooterInfo({
                        ...footerInfo,
                        paginationInfo: {
                            pageNumber: result.pageInfo.pageNumber,
                            total: result.pageInfo.total,
                            start: result.pageInfo.start,
                            end: result.pageInfo.end,
                        }
                    })
                }
            });
        }
    }, [filterData]);

    // Render -----------------------------------------------------------------------------------------
    return (
        <div className="flex-col text-black mt-4">
            {/* Filter */}
            <Filter
                onSubmitted={(newValue) => {
                    setFilterData(newValue);
                }}
            />

            {/* List of parent item */}
            <Box
                sx={{
                    maxHeight: 430,
                    overflowY: 'auto',
                }}
            >
                {permissionList && permissionList.map((item) => (
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
                        isExpanded={expanded && expanded.includes(item.permissionId)}
                        onChangeItem={() => {
                            handleChange(item.permissionId);
                        }}
                    />
                ))}
            </Box>

        </div>
    );
}
