"use client";

import { Divider, Stack, Typography } from "@mui/material";
import TripleTextFieldGroup, {
  TripleTextFieldGroupData,
} from "../components/triple-tf-group";
import { useEffect, useState } from "react";
import { TripleHelpText } from "../types";
import { isNonNegativeInteger } from "@/validators/report-detail";
import { convertStringToInteger } from "@/core/logic/convert";
export interface Section6Data {
  row1?: TripleTextFieldGroupData;
  row2?: TripleTextFieldGroupData;
}

interface Section6HelpText {
  row1?: TripleHelpText;
  row2?: TripleHelpText;
}
interface Section3Props {
  inputData?: Section6Data;
  listChange?: string[];
  onChange?: (data: Section6Data) => void;
}

export default function Section6({
  inputData,
  listChange,
  onChange,
}: Section3Props) {
  const [data, setData] = useState<Section6Data | undefined>(inputData);
  const [helpText, setHelpText] = useState<Section6HelpText>();

  const isSection6HelperTextEmpty = (section?: Section6HelpText): boolean => {
    return section
      ? Object.values(section).every((row) => {
          return Object.values(row).every(
            (text) => text === "" || text === undefined
          );
        })
      : true;
  };

  useEffect(() => {
    if (isSection6HelperTextEmpty(helpText) && data) {
      onChange?.(data);
    } else {
      onChange?.({});
    }
  }, [data]);
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight={"bold"} paddingBottom={2}>
          6. Máy, thiết bị có yêu cầu nghiêm ngặt về ATVSLĐ
        </Typography>
      </Stack>
      <Stack direction={"column"} spacing={2} paddingBottom={2}>
        <TripleTextFieldGroup
          label1="Tổng số"
          label2="Máy có yêu cầu nghiêm ngặt ATVSLĐ đang sử dụng"
          label3="Số đã được kiểm định"
          defaultValue1={inputData?.row1?.value1 || "0"}
          defaultValue2={inputData?.row1?.value2 || "0"}
          defaultValue3={inputData?.row1?.value3 || "0"}
          isChange1={listChange?.includes("totalSafetyEquipment")}
          isChange2={listChange?.includes("activeSafetyEquipmentCount")}
          isChange3={listChange?.includes("checkedEquipment")}
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
                  row1: {
                    ...prev?.row1,
                    helperText2: "Không được vượt quá tổng số",
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
                  row1: {
                    ...prev?.row1,
                    helperText3: "Không được vượt quá tổng số",
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
          label1="Số chưa được kiểm định"
          label2="Số đã được khai báo"
          label3="Số chưa được khai báo"
          isChange1={listChange?.includes("uncheckedEquipment")}
          isChange2={listChange?.includes("reportedSafetyEquipment")}
          isChange3={listChange?.includes("unreportedSafetyEquipment")}
          defaultValue1={inputData?.row2?.value1 || "0"}
          defaultValue2={inputData?.row2?.value2 || "0"}
          defaultValue3={inputData?.row2?.value3 || "0"}
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
              isNonNegativeInteger(data?.row1?.value3) &&
              isNonNegativeInteger(value.value1)
            ) {
              if (
                data?.row1?.value1 &&
                data?.row1?.value3 &&
                convertStringToInteger(value.value1) +
                  convertStringToInteger(data?.row1?.value3) !=
                  convertStringToInteger(data?.row1?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row2: {
                    ...prev?.row2,
                    helperText1:
                      "Tổng chưa kiểm định và điểm định phải bằng tổng số",
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
              isNonNegativeInteger(data?.row2?.value1) &&
              isNonNegativeInteger(value.value2)
            ) {
              if (
                data?.row2?.value1 &&
                convertStringToInteger(value.value2) >
                  convertStringToInteger(data?.row2?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row2: {
                    ...prev?.row2,
                    helperText2: "Không được vượt quá số chưa kiểm định",
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
              isNonNegativeInteger(data?.row2?.value1) &&
              isNonNegativeInteger(data?.row2?.value2) &&
              isNonNegativeInteger(value.value3)
            ) {
              if (
                data?.row2?.value1 &&
                data?.row2?.value2 &&
                convertStringToInteger(value.value3) +
                  convertStringToInteger(data?.row2?.value2) !=
                  convertStringToInteger(data?.row2?.value1)
              ) {
                setHelpText((prev) => ({
                  ...prev,
                  row2: {
                    ...prev?.row2,
                    helperText3:
                      "Tổng chưa khai báo và đã khai báo phải bằng số chưa được kiểm định",
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
      </Stack>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
}
