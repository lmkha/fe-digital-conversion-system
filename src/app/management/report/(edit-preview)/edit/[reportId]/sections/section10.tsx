"use client";

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, {
  TripleTextFieldGroupData,
} from "../components/triple-tf-group";
import SingleTextField, {
  SingleTextFieldData,
} from "../components/single-tf-group";
import { useEffect, useState } from "react";
import { SingleHelpText, TripleHelpText } from "../types";
import { isNonNegativeNumber } from "@/validators/report-detail";
export interface Section10Data {
  row1?: TripleTextFieldGroupData;
  row2?: TripleTextFieldGroupData;
  row3?: SingleTextFieldData;
}

interface Section10HelpText {
  row1?: TripleHelpText;
  row2?: TripleHelpText;
  row3?: SingleHelpText;
}

interface Section10Props {
  inputData?: Section10Data;
  listChange?: string[];
  onChange?: (data: Section10Data) => void;
}

export default function Section10({
  inputData,
  listChange,
  onChange,
}: Section10Props) {
  const [data, setData] = useState<Section10Data | undefined>(inputData);
  const [helpText, setHelpText] = useState<Section10HelpText>();

  const isSection10HelperTextEmpty = (section?: Section10HelpText): boolean => {
    return section
      ? Object.values(section).every((row) => {
          return Object.values(row).every(
            (text) => text === "" || text === undefined
          );
        })
      : true;
  };

  useEffect(() => {
    if (isSection10HelperTextEmpty(helpText) && data) {
      onChange?.(data);
    } else {
      onChange?.({});
    }
  }, [data]);
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight={"bold"} paddingBottom={2}>
          10. Chi phí thực hiện kế hoạch ATVSLĐ
        </Typography>
      </Stack>
      <Stack direction={"column"} spacing={2} paddingBottom={2}>
        <TripleTextFieldGroup
          label1="Các biện pháp kỹ thuật an toàn "
          label2="Các biện pháp kỹ thuật vệ sinh "
          label3="Trang bị phương tiện bảo vệ cá nhân "
          isChange1={listChange?.includes("safetyCosts")}
          isChange2={listChange?.includes("hygieneCost")}
          isChange3={listChange?.includes("equipmentCost")}
          defaultValue1={inputData?.row1?.value1 || "0.0"}
          defaultValue2={inputData?.row1?.value2 || "0.0"}
          defaultValue3={inputData?.row1?.value3 || "0.0"}
          endAdornmentText1="Triệu đồng"
          endAdornmentText2="Triệu đồng"
          endAdornmentText3="Triệu đồng"
          helperText1={helpText?.row1?.helperText1}
          helperText2={helpText?.row1?.helperText2}
          helperText3={helpText?.row1?.helperText3}
          onChange={(value) => {
            setData({ ...data, row1: value });
            if (!isNonNegativeNumber(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row1: {
                  ...prev?.row1,
                  helperText1: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText1: undefined },
              }));
            }
            if (!isNonNegativeNumber(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row1: {
                  ...prev?.row1,
                  helperText2: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText2: undefined },
              }));
            }
            if (!isNonNegativeNumber(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row1: {
                  ...prev?.row1,
                  helperText3: "Nhập số thập phân không âm",
                },
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
          label1="Chăm sóc sức khỏe người lao động "
          label2="Tuyên truyền huấn luyện "
          label3="Đánh giá nguy cơ rủi tro về ATVSLĐ "
          defaultValue1={inputData?.row2?.value1 || "0.0"}
          defaultValue2={inputData?.row2?.value2 || "0.0"}
          defaultValue3={inputData?.row2?.value3 || "0.0"}
          isChange1={listChange?.includes("healthCost")}
          isChange2={listChange?.includes("trainingCost")}
          isChange3={listChange?.includes("riskCost")}
          endAdornmentText1="Triệu đồng"
          endAdornmentText2="Triệu đồng"
          endAdornmentText3="Triệu đồng"
          helperText1={helpText?.row2?.helperText1}
          helperText2={helpText?.row2?.helperText2}
          helperText3={helpText?.row2?.helperText3}
          onChange={(value) => {
            setData({ ...data, row2: value });
            if (!isNonNegativeNumber(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row2: {
                  ...prev?.row2,
                  helperText1: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText1: undefined },
              }));
            }
            if (!isNonNegativeNumber(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row2: {
                  ...prev?.row2,
                  helperText2: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText2: undefined },
              }));
            }
            if (!isNonNegativeNumber(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row2: {
                  ...prev?.row2,
                  helperText3: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText3: undefined },
              }));
            }
          }}
        />
        <SingleTextField
          label1="Chi khác "
          isChange1={listChange?.includes("otherCost")}
          defaultValue={inputData?.row3?.value1 || "0.0"}
          endAdornmentText="Triệu đồng"
          helperText1={helpText?.row3?.helperText1}
          onChange={(value) => {
            setData({ ...data, row3: value });
            if (!isNonNegativeNumber(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row3: {
                  ...prev?.row3,
                  helperText1: "Nhập số thập phân không âm",
                },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText1: undefined },
              }));
            }
          }}
        />
      </Stack>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
}
