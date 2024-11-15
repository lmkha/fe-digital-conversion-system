/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, {
  TripleTextFieldGroupData,
} from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { isNonNegativeInteger, isNumber } from "@/validators/report-detail";
import { TripleHelpText } from "../types";
import { convertStringToInteger } from "@/core/logic/convert";

export interface Section1Data {
  row1?: TripleTextFieldGroupData;
  row2?: TripleTextFieldGroupData;
  row3?: TripleTextFieldGroupData;
}

interface Section1HelpText {
  row1?: TripleHelpText;
  row2?: TripleHelpText;
  row3?: TripleHelpText;
}

interface Section1Props {
  inputData?: Section1Data;
  listChange?: string[];
  onChange?: (data: Section1Data) => void;
}

export default function Section1({
  inputData,
  listChange,
  onChange,
}: Section1Props) {
  const [data, setData] = useState<Section1Data | undefined>(inputData);
  const [helpText, setHelpText] = useState<Section1HelpText>();

  const isSection1HelperTextEmpty = (section?: Section1HelpText): boolean => {
    return section
      ? Object.values(section).every((row) => {
          return Object.values(row).every(
            (text) => text === "" || text === undefined
          );
        })
      : true;
  };

  // Only call onChange when all helper text is filled(no error)
  useEffect(() => {
    if (isSection1HelperTextEmpty(helpText) && data) {
      onChange?.(data);
    } else {
      onChange?.({});
    }
  }, [data]);

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight={"bold"} paddingBottom={2}>
          1. Thông tin lao động
        </Typography>
      </Stack>
      <Stack direction={"column"} spacing={2} paddingBottom={2}>
        <TripleTextFieldGroup
          label1="Tổng số lao động"
          label2="Người làm công tác ATVSLĐ"
          label3="Người làm công tác y tế"
          isChange1={listChange?.includes("totalWorkers")}
          isChange2={listChange?.includes("safetyWorkers")}
          isChange3={listChange?.includes("healthWorkers")}
          defaultValue1={inputData?.row1?.value1 || "0"}
          defaultValue2={inputData?.row1?.value2 || "0"}
          defaultValue3={inputData?.row1?.value3 || "0"}
          helperText1={helpText?.row1?.helperText1}
          helperText2={helpText?.row1?.helperText2}
          helperText3={helpText?.row1?.helperText3}
          onChange={(value) => {
            setData({ ...data, row1: value });
            if (!isNonNegativeInteger(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText1: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText1: undefined },
              }));
            }
            if (!isNonNegativeInteger(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText2: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText2: undefined },
              }));
            }
            if (!isNonNegativeInteger(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText3: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row1: { ...prev?.row1, helperText3: undefined },
              }));
            }

            if (
              isNonNegativeInteger(value.value1) &&
              isNonNegativeInteger(value.value2)
            ) {
              if (
                convertStringToInteger(value.value2) >
                convertStringToInteger(value.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row1: {
                    ...prev?.row1,
                    helperText2: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row1: { ...prev?.row1, helperText2: undefined },
                }));
              }
            }
            if (
              isNonNegativeInteger(value.value1) &&
              isNonNegativeInteger(value.value3)
            ) {
              if (
                convertStringToInteger(value.value3) >
                convertStringToInteger(value.value3)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row1: {
                    ...prev?.row1,
                    helperText3: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row1: { ...prev?.row1, helperText3: undefined },
                }));
              }
            }
          }}
        />
        <TripleTextFieldGroup
          label1="Lao động nữ"
          label2="Lao động làm việc trong điều kiện độc hại"
          label3="Lao động là người chưa thành niên"
          defaultValue1={inputData?.row2?.value1 || "0"}
          defaultValue2={inputData?.row2?.value2 || "0"}
          defaultValue3={inputData?.row2?.value3 || "0"}
          isChange1={listChange?.includes("femaleWorkers")}
          isChange2={listChange?.includes("hazardousWorkers")}
          isChange3={listChange?.includes("underageWorkers")}
          helperText1={helpText?.row2?.helperText1}
          helperText2={helpText?.row2?.helperText2}
          helperText3={helpText?.row2?.helperText3}
          onChange={(value) => {
            setData({ ...data, row2: value });
            if (!isNonNegativeInteger(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText1: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText1: undefined },
              }));
            }
            if (!isNonNegativeInteger(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText2: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText2: undefined },
              }));
            }
            if (!isNonNegativeInteger(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText3: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row2: { ...prev?.row2, helperText3: undefined },
              }));
            }
            if (
              isNonNegativeInteger(data?.row1?.value1) &&
              isNonNegativeInteger(value.value1)
            ) {
              if (
                data?.row1?.value1 &&
                convertStringToInteger(value.value1) >
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row2: {
                    ...prev?.row2,
                    helperText1: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row2: { ...prev?.row2, helperText1: undefined },
                }));
              }
            }
            if (
              isNonNegativeInteger(data?.row1?.value1) &&
              isNonNegativeInteger(value.value2)
            ) {
              if (
                data?.row1?.value1 &&
                convertStringToInteger(value.value2) >
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row2: {
                    ...prev?.row2,
                    helperText2: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row2: { ...prev?.row2, helperText2: undefined },
                }));
              }
            }
            if (
              isNonNegativeInteger(data?.row1?.value1) &&
              isNonNegativeInteger(value.value3)
            ) {
              if (
                data?.row1?.value1 &&
                convertStringToInteger(value.value3) >
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row2: {
                    ...prev?.row2,
                    helperText3: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row2: { ...prev?.row2, helperText3: undefined },
                }));
              }
            }
          }}
        />
        <TripleTextFieldGroup
          label1="Lao động dưới 15 tuổi"
          label2="Lao động người khuyết tật"
          label3="Lao động người cao tuổi"
          defaultValue1={inputData?.row3?.value1 || "0"}
          defaultValue2={inputData?.row3?.value2 || "0"}
          defaultValue3={inputData?.row3?.value3 || "0"}
          isChange1={listChange?.includes("under15Workers")}
          isChange2={listChange?.includes("disabledWorkers")}
          isChange3={listChange?.includes("agedWorkers")}
          helperText1={helpText?.row3?.helperText1}
          helperText2={helpText?.row3?.helperText2}
          helperText3={helpText?.row3?.helperText3}
          onChange={(value) => {
            setData({ ...data, row3: value });
            if (!isNonNegativeInteger(value.value1)) {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText1: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText1: undefined },
              }));
            }
            if (!isNonNegativeInteger(value.value2)) {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText2: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText2: undefined },
              }));
            }
            if (!isNonNegativeInteger(value.value3)) {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText3: "Nhập số nguyên không âm" },
              }));
            } else {
              setHelpText((prev) => ({
                ...prev,
                row3: { ...prev?.row3, helperText3: undefined },
              }));
            }
            if (
              isNonNegativeInteger(data?.row1?.value1) &&
              isNonNegativeInteger(value.value1)
            ) {
              if (
                data?.row1?.value1 &&
                convertStringToInteger(value.value1) >
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row3: {
                    ...prev?.row2,
                    helperText1: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row3: { ...prev?.row2, helperText1: undefined },
                }));
              }
            }
            if (
              isNonNegativeInteger(data?.row1?.value1) &&
              isNonNegativeInteger(value.value2)
            ) {
              if (
                data?.row1?.value1 &&
                convertStringToInteger(value.value2) >
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row3: {
                    ...prev?.row3,
                    helperText2: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row3: { ...prev?.row3, helperText2: undefined },
                }));
              }
            }
            if (
              isNonNegativeInteger(data?.row1?.value1) &&
              isNonNegativeInteger(value.value3)
            ) {
              if (
                data?.row1?.value1 &&
                convertStringToInteger(value.value3) >
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row3: {
                    ...prev?.row3,
                    helperText3: "Không được vượt quá tổng số lao động",
                  },
                }));
              } else {
                setHelpText((prev) => ({
                  ...prev,
                  row3: { ...prev?.row3, helperText3: undefined },
                }));
              }
            }
          }}
        />
      </Stack>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
}
