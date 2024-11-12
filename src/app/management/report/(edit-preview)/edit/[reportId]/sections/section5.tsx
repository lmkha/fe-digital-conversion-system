"use client";

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, {
  TripleTextFieldGroupData,
} from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { TripleHelpText } from "../types";
import { isPositiveFraction } from "@/core/logic/convert";
import { isNonNegativeNumber } from "@/validators/report-detail";
export interface Section5Data {
  row1?: TripleTextFieldGroupData;
  row2?: TripleTextFieldGroupData;
  row3?: TripleTextFieldGroupData;
}

interface Section5HelpText {
  row1?: TripleHelpText;
  row2?: TripleHelpText;
  row3?: TripleHelpText;
}

interface Section5Props {
  inputData?: Section5Data;
  listChange?: string[];
  onChange?: (data: Section5Data) => void;
}

export default function Section5({
  inputData,
  listChange,
  onChange,
}: Section5Props) {
  const [data, setData] = useState<Section5Data | undefined>(inputData);
  const [helpText, setHelpText] = useState<Section5HelpText>();

  const isSection5HelperTextEmpty = (section?: Section5HelpText): boolean => {
    return section
      ? Object.values(section).every((row) => {
          return Object.values(row).every(
            (text) => text === "" || text === undefined
          );
        })
      : true;
  };

  useEffect(() => {
    if (isSection5HelperTextEmpty(helpText) && data) {
      onChange?.(data);
    } else {
      onChange?.({});
    }
  }, [data]);

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight={"bold"} paddingBottom={2}>
          5. Huấn luyện về vệ sinh an toàn lao động
        </Typography>
        <Typography
          sx={{
            color: "red",
            fontWeight: "medium",
          }}
        >
          *** Lưu ý: Nhập số tiền theo đơn vị Triệu đồng
        </Typography>
      </Stack>
      <Stack direction={"column"} spacing={2} paddingBottom={2}>
        <TripleTextFieldGroup
          label1="Nhóm 1: SL huấn luyện/SL hiện có "
          label2="Nhóm 2: SL huấn luyện/SL hiện có (người/người)"
          label3="Nhóm 3: SL huấn luyện/SL hiện có (người/người)"
          isChange1={listChange?.includes("training1")}
          isChange2={listChange?.includes("training2")}
          isChange3={listChange?.includes("training3")}
          defaultValue1={inputData?.row1?.value1 || "0/0"}
          defaultValue2={inputData?.row1?.value2 || "0/0"}
          defaultValue3={inputData?.row1?.value3 || "0/0"}
          helperText1={helpText?.row1?.helperText1}
          helperText2={helpText?.row1?.helperText2}
          helperText3={helpText?.row1?.helperText3}
          onChange={(value) => {
            setData({ ...data, row1: value });
            if (!isPositiveFraction(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText1: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText1: undefined },
              }));
            }
            if (!isPositiveFraction(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText2: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText2: undefined },
              }));
            }
            if (!isPositiveFraction(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText3: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText3: undefined },
              }));
            }
          }}
        />
        <TripleTextFieldGroup
          label1="Trong đó: Tự huấn luyện"
          label2="Thuê tổ chức cung cấp dịch vụ huấn luyện"
          label3="Nhóm 4: SL huấn luyện/SL hiện có (người/người)"
          isChange1={listChange?.includes("selfTraining")}
          isChange2={listChange?.includes("outsourcedTraining")}
          isChange3={listChange?.includes("training4")}
          defaultValue1={inputData?.row2?.value1 || "0/0"}
          defaultValue2={inputData?.row2?.value2 || "0/0"}
          defaultValue3={inputData?.row2?.value3 || "0/0"}
          helperText1={helpText?.row2?.helperText1}
          helperText2={helpText?.row2?.helperText2}
          helperText3={helpText?.row2?.helperText3}
          onChange={(value) => {
            setData({ ...data, row2: value });
            if (!isPositiveFraction(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText1: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText1: undefined },
              }));
            }
            if (!isPositiveFraction(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText2: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText2: undefined },
              }));
            }
            if (!isPositiveFraction(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText3: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText3: undefined },
              }));
            }
          }}
        />
        <TripleTextFieldGroup
          label1="Nhóm 5: SL huấn luyện/SL hiện có (người/người)"
          label2="Nhóm 6: SL huấn luyện/SL hiện có (người/người)"
          label3="Tổng chi phí huấn luyện "
          defaultValue1={inputData?.row3?.value1 || "0/0"}
          defaultValue2={inputData?.row3?.value2 || "0/0"}
          defaultValue3={inputData?.row3?.value3 || "0.0"}
          isChange1={listChange?.includes("training5")}
          isChange2={listChange?.includes("training6")}
          isChange3={listChange?.includes("traningCost")}
          endAdornmentText3="Triệu đồng"
          helperText1={helpText?.row3?.helperText1}
          helperText2={helpText?.row3?.helperText2}
          helperText3={helpText?.row3?.helperText3}
          onChange={(value) => {
            setData({ ...data, row3: value });
            if (!isPositiveFraction(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText1: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText1: undefined },
              }));
            }
            if (!isPositiveFraction(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText2: "Nhập phân số không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText2: undefined },
              }));
            }
            if (!isNonNegativeNumber(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row3: {
                  ...prev?.row3,
                  helperText3: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText3: undefined },
              }));
            }
          }}
        />
      </Stack>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
}
