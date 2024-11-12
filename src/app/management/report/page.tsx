/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from "react";
import DepartmentFilter, { DeptFilterData } from "../components/department-filter";
import { FilterData } from "./types";
import Filter from "./components/filter";
import ReportComponent from "./components/report-item";
import ReportItem from "@/services/models/report-item";
import { findReportByFilter } from "@/services/report";
import { Box, Typography } from "@mui/material";
import { useManagement } from "@/contexts/management-context";
import { useRouter } from "next/navigation";
import { getListYears } from "@/services/report-config";

export default function ReportPage() {
  const router = useRouter();
  const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } = useManagement();
  const [deptFilterData, setDeptFilterData] = useState<DeptFilterData>();
  const [filterData, setFilterData] = useState<FilterData>({
    year: 0,
  });
  const [reports, setReports] = useState<ReportItem[]>();

  useEffect(() => {
    setHeaderTitle('Báo cáo an toàn vệ sinh lao động');
    getListYears().then((result) => {
      if (result.success) {
        setHeaderButtons([
          {
            type: 'select',
            label: 'Năm',
            selectValue: filterData?.year,
            options: result.years,
            onSelectChange: (newValue) => {
              setFilterData({ ...filterData, year: newValue });
            },
            onClick: () => { }
          }
        ]);
      }

    });
  }, [setHeaderButtons, setHeaderTitle, filterData?.year]);

  useEffect(() => {
    if (deptFilterData?.deptId) {
      findReportByFilter({
        deptId: deptFilterData?.deptId,
        reportPeriod: filterData?.reportPeriod,
        status: filterData?.status,
        deptName: filterData?.departmentName,
        level: filterData?.level,
        startDate: filterData?.startDate,
        finishDate: filterData?.finishDate,
        userUpdatedName: filterData?.userUpdateName,
        year: filterData?.year === 0 ? undefined : filterData?.year,
        updatedAt: filterData?.updatedAt,
      }).then((result) => {
        if (result.success) {
          setReports(result.data?.reports);
          setFooterInfo({
            ...footerInfo,
            paginationInfo: result.data?.paginationInfo
          });
        } else {
          setReports([]);
          setFooterInfo({
            ...footerInfo,
            paginationInfo: {
              ...footerInfo?.paginationInfo,
              total: 0,
              start: 0,
              end: 0
            }
          });
        }
      });
    }
  }, [deptFilterData?.deptId, filterData]);

  useEffect(() => {
    if (deptFilterData?.deptId) {
      findReportByFilter({
        pageSize: footerInfo?.paginationInfo?.pageSize,
        deptId: deptFilterData?.deptId,
        reportPeriod: filterData?.reportPeriod,
        status: filterData?.status,
        deptName: filterData?.departmentName,
        level: filterData?.level,
        startDate: filterData?.startDate,
        finishDate: filterData?.finishDate,
        userUpdatedName: filterData?.userUpdateName,
        year: filterData?.year === 0 ? undefined : filterData?.year,
        updatedAt: filterData?.updatedAt,
      }).then((result) => {
        if (result.success) {
          setReports(result.data?.reports);
          setFooterInfo({
            ...footerInfo,
            paginationInfo: {
              ...footerInfo?.paginationInfo,
              total: result.data?.paginationInfo?.total,
              start: result.data?.paginationInfo?.start,
              end: result.data?.paginationInfo?.end,
              pageNumber: result.data?.paginationInfo?.pageNumber
            }
          });
        } else {
          setReports([]);
          setFooterInfo({
            ...footerInfo,
            paginationInfo: {
              ...footerInfo?.paginationInfo,
              total: 0,
              start: 0,
              end: 0
            }
          });
        }
      });
    }
  }, [footerInfo?.paginationInfo?.pageSize]);

  useEffect(() => {
    if (deptFilterData?.deptId) {
      findReportByFilter({
        pageNumber: footerInfo?.paginationInfo?.pageNumber,
        pageSize: footerInfo?.paginationInfo?.pageSize,
        deptId: deptFilterData?.deptId,
        reportPeriod: filterData?.reportPeriod,
        status: filterData?.status,
        deptName: filterData?.departmentName,
        level: filterData?.level,
        startDate: filterData?.startDate,
        finishDate: filterData?.finishDate,
        userUpdatedName: filterData?.userUpdateName,
        year: filterData?.year === 0 ? undefined : filterData?.year,
        updatedAt: filterData?.updatedAt,
      }).then((result) => {
        if (result.success) {
          setReports(result.data?.reports);
          setFooterInfo({
            ...footerInfo,
            paginationInfo: {
              ...footerInfo?.paginationInfo,
              total: result.data?.paginationInfo?.total,
              start: result.data?.paginationInfo?.start,
              end: result.data?.paginationInfo?.end
            }
          });
        } else {
          setReports([]);
          setFooterInfo({
            ...footerInfo,
            paginationInfo: {
              ...footerInfo?.paginationInfo,
              total: 0,
              start: 0,
              end: 0
            }
          });
        }
      });
    }
  }, [footerInfo?.paginationInfo?.pageNumber]);

  return (
    <>
      <DepartmentFilter
        refreshData={false}
        onRefreshDataFinished={() => { }}
        onSubmitted={(selectorData) => setDeptFilterData(selectorData)}
      />

      <Filter
        onSubmitted={(newValue) => {
          // Year is not in filterData, so we need to keep it
          const year = filterData?.year;
          setFilterData({ ...newValue, year: year })
        }}
      />

      {reports?.length === 0 ? (
        <Typography variant="body1" textAlign={'center'}>Không có dữ liệu</Typography>
      ) : (
        <Box
          sx={{
            maxHeight: 430,
            overflowY: 'auto',
          }}
        >
          {reports?.map((report) => (
            <ReportComponent
              key={report.reportId}
              reportId={report.reportId}
              status={report.status}
              departmentName={report.deptName}
              level={report.level}
              startDate={report.startDate}
              finishDate={report.finishDate}
              reportingPeriod={report.reportPeriod}
              updatedAt={report.updatedAt}
              userUpdateName={report.userUpdateName}
              onView={(reportId) => {
                router.push(`/management/report/view/${reportId}`);
              }}
              onEdit={(reportId) => {
                router.push(`/management/report/edit/${reportId}`);
              }}
            />
          ))}
        </Box>
      )}
    </>
  );
}
