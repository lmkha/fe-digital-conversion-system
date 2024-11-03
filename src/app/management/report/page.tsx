'use client';

import { useState } from "react";
import DepartmentFilter, { DeptFilterData } from "../components/department-filter";
import { FilterData } from "./types";
import Filter from "./components/filter";
import ReportItem from "./components/report-item";

export default function ReportPage() {
    const [selectorData, setSelectorData] = useState<DeptFilterData>();
    const [filterData, setFilterData] = useState<FilterData>();
    return (
        <>
            <DepartmentFilter
                refreshData={false}
                onRefreshDataFinished={() => { }}
                onSubmitted={(selectorData) => setSelectorData(selectorData)}
            />

            <Filter
                onSubmitted={(filterData) => setFilterData(filterData)}
            />

            <ReportItem
                status="Chờ duyệt"
                departmentName="Ủy ban nhân dân tỉnh Bình Thuận"
                level="1"
                startDate="01/07/2022"
                finishDate="30/07/2022"
                reportingPeriod="Cả năm"
                createdAt={{
                    date: '01/01/2023',
                    time: '12:27:02'
                }}
                createdBy="Phan Thanh Tùng"
            />
            <ReportItem
                status="Nhập liệu"
                departmentName="Ủy ban nhân dân tỉnh Bình Thuận"
                level="1"
                startDate="01/07/2022"
                finishDate="30/07/2022"
                reportingPeriod="Cả năm"
                createdBy="Phan Thanh Tùng"
            />
            <ReportItem
                status="Chờ duyệt"
                departmentName="Ủy ban nhân dân tỉnh Bình Thuận"
                level="1"
                startDate="01/07/2022"
                finishDate="30/07/2022"
                reportingPeriod="Cả năm"
                createdAt={{
                    date: '01/01/2023',
                    time: '12:27:02'
                }}
                createdBy="Phan Thanh Tùng"
            />
        </>
    );
}
