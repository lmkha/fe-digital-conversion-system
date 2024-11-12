/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useManagement } from "@/contexts/management-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";
import Section9 from "./sections/section9";
import Section10 from "./sections/section10";
import Section11 from "./sections/section11";
import Section12 from "./sections/section12";
import { ReportPageData } from "./types";
import { useEditPreviewReportDetailContext } from "@/contexts/edit-preview-report-detail-context";
import { useParams } from "next/navigation";
import {
  findReportDetailById,
  getReportDetailByHistoryId,
} from "@/services/report-detail";
import { useAppContext } from "@/contexts/app-context";
import { Box, Stack, Typography } from "@mui/material";
import HistoryButton from "./components/history-button";
import HistoryModal from "./components/histoty-modal";
import GoBackCurrentVersion from "./components/back-current-version-button";

export default function ReportDetail() {
  const { setToastInfo } = useAppContext();
  const { reportId } = useParams<{ reportId: string }>();
  const router = useRouter();
  const { setHeaderTitle, setHeaderButtons, setFooterInfo } = useManagement();
  const {
    goNext,
    setReportId,
    reportDetail,
    setReportDetail,
    currentVersionData,
    setCurrentVersionData,
  } = useEditPreviewReportDetailContext();
  const [pageData, setPageData] = useState<ReportPageData>();
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [historyPageData, setHistoryPageData] = useState<ReportPageData>();
  const [dataRender, setDataRender] = useState<ReportPageData>();
  const [listChange, setListChange] = useState<string[]>();

  function getEmptySectionsIndices(data: ReportPageData): string[] {
    return Object.entries(data)
      .map(([key, value], index) => {
        if (value === undefined || Object.keys(value).length === 0) {
          return key.replace(/[^0-9]/g, "");
        }
        return null;
      })
      .filter((index) => index !== null) as string[];
  }

  const checkDataBeforeGoNext = () => {
    if (dataRender) {
      const checkValue = getEmptySectionsIndices(dataRender);
      if (checkValue.length > 0) {
        if (checkValue.length === 1) {
          setToastInfo &&
            setToastInfo({
              show: true,
              message: `Vui lòng nhập đúng thông tin ở mục ${checkValue[0]}`,
              severity: "error",
            });
        } else {
          setToastInfo &&
            setToastInfo({
              show: true,
              message: `Vui lòng nhập đúng thông tin ở các phần ${checkValue.join(
                ", "
              )}`,
              severity: "error",
            });
        }
        return false;
      }
      return true;
    }
  };

  // Clear footer in this page
  useEffect(() => {
    setFooterInfo({});
  }, []);

  // Fetch report detail by reportId
  useEffect(() => {
    if (reportId) {
      if (reportDetail) {
        setPageData(reportDetail);
        setDataRender(reportDetail);
      } else {
        setReportId && setReportId(reportId);
        findReportDetailById(reportId).then((response) => {
          if (response.success) {
            setPageData(response.reportDetail);
          } else {
            setToastInfo &&
              setToastInfo({
                show: true,
                message: response.message || "Có lỗi xảy ra",
                severity: "error",
              });
          }
        });
      }
    }
  }, [reportId]);

  // Set header title and buttons
  useEffect(() => {
    setHeaderTitle("Báo cáo an toàn vệ sinh lao động");
    setHeaderButtons([
      {
        type: "cancel",
        onClick: () => {
          router.back();
        },
        label: "Hủy",
      },
      {
        type: "next",
        onClick: () => {
          if (!checkDataBeforeGoNext()) return;
          router.push("/management/report/preview");
          goNext();
        },
        label: "Bước tiếp theo",
      },
    ]);
  }, [setHeaderButtons, setHeaderTitle, dataRender]);

  useEffect(() => {
    if (pageData) {
      setCurrentVersionData && setCurrentVersionData(pageData);
      setDataRender(pageData);
    }
  }, [pageData]);

  useEffect(() => {
    if (historyPageData) {
      setDataRender(historyPageData);
    }
  }, [historyPageData]);

  useEffect(() => {
    if (dataRender) {
      setReportDetail && setReportDetail(dataRender);
    }
  }, [dataRender]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <GoBackCurrentVersion
            label="Phiên bản hiện tại"
            onClick={() => {
              setHistoryPageData(undefined);
              if (!pageData) {
                setPageData(currentVersionData);
              } else {
                setDataRender(pageData);
              }
            }}
          />
          <HistoryButton
            label="Lịch sử"
            onClick={() => {
              setOpenHistoryModal(true);
            }}
          />
        </Stack>
      </Box>
      <HistoryModal
        reportId={reportId}
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        onViewReportHistory={(reportHistoryId) => {
          getReportDetailByHistoryId({
            reportId: reportId,
            reportHistoryId: reportHistoryId,
          }).then((response) => {
            if (response.success) {
              if (!historyPageData) {
                setPageData(dataRender);
              }
              setListChange && setListChange(response.listChange);
              setHistoryPageData(response.reportDetail);
            } else {
              setToastInfo &&
                setToastInfo({
                  show: true,
                  message:
                    response.message || "Có lỗi xảy ra khi lấy dữ liệu lịch sử",
                  severity: "error",
                });
            }
          });
        }}
      />

      {historyPageData ? (
        <>
          <Section1
            inputData={historyPageData?.section1Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section1Data: data })
            }
          />
          <Section2
            inputData={historyPageData?.section2Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section2Data: data })
            }
          />
          <Section3
            inputData={historyPageData?.section3Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section3Data: data })
            }
          />
          <Section4
            inputData={historyPageData?.section4Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section4Data: data })
            }
          />
          <Section5
            inputData={historyPageData?.section5Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section5Data: data })
            }
          />
          <Section6
            inputData={historyPageData?.section6Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section6Data: data })
            }
          />
          <Section7
            inputData={historyPageData?.section7Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section7Data: data })
            }
          />
          <Section8
            inputData={historyPageData?.section8Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section8Data: data })
            }
          />
          <Section9
            inputData={historyPageData?.section9Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section9Data: data })
            }
          />
          <Section10
            inputData={historyPageData?.section10Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section10Data: data })
            }
          />
          <Section11
            inputData={historyPageData?.section11Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section11Data: data })
            }
          />
          <Section12
            inputData={historyPageData?.section12Data}
            listChange={listChange}
            onChange={(data) =>
              setDataRender({ ...dataRender, section12Data: data })
            }
          />
        </>
      ) : (
        <>
          {pageData ? (
            <>
              <Section1
                inputData={pageData?.section1Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section1Data: data })
                }
              />
              <Section2
                inputData={pageData?.section2Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section2Data: data })
                }
              />
              <Section3
                inputData={pageData?.section3Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section3Data: data })
                }
              />
              <Section4
                inputData={pageData?.section4Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section4Data: data })
                }
              />
              <Section5
                inputData={pageData?.section5Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section5Data: data })
                }
              />
              <Section6
                inputData={pageData?.section6Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section6Data: data })
                }
              />
              <Section7
                inputData={pageData?.section7Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section7Data: data })
                }
              />
              <Section8
                inputData={pageData?.section8Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section8Data: data })
                }
              />
              <Section9
                inputData={pageData?.section9Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section9Data: data })
                }
              />
              <Section10
                inputData={pageData?.section10Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section10Data: data })
                }
              />
              <Section11
                inputData={pageData?.section11Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section11Data: data })
                }
              />
              <Section12
                inputData={pageData?.section12Data}
                onChange={(data) =>
                  setDataRender({ ...dataRender, section12Data: data })
                }
              />
            </>
          ) : (
            <Typography sx={{ textAlign: "center" }} variant="body1">
              Đang tải dữ liệu...
            </Typography>
          )}
        </>
      )}
    </>
  );
}
