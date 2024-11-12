import reportDetailAPI, { InputReportDetailAPIModel, OutputReportDetailAPIModel } from "@/api/report-detail";
import { ReportPageData } from "@/app/management/report/(edit-preview)/edit/[reportId]/types";


const transformReportDetailAPIModelToUIModel = (apiModel: OutputReportDetailAPIModel): ReportPageData => {
    function formatDate(dateString: string): string {
        const [year, month] = dateString.split("-");
        return `${month}/${year}`;
    }
    return {
        section1Data: {
            row1: {
                value1: apiModel.totalWorkers.toString(),
                value2: apiModel.safetyWorkers.toString(),
                value3: apiModel.healthWorkers.toString()
            },
            row2: {
                value1: apiModel.femaleWorkers.toString(),
                value2: apiModel.hazardousWorkers.toString(),
                value3: apiModel.underageWorkers.toString()
            },
            row3: {
                value1: apiModel.under15Workers.toString(),
                value2: apiModel.disabledWorkers.toString(),
                value3: apiModel.agedWorkers.toString()
            }
        },
        section2Data: {
            row1: {
                value1: apiModel.totalAccidents.toString(),
                value2: apiModel.numFatalAccidents.toString(),
                value3: apiModel.numAccidentWorkers.toString()
            },
            row2: {
                value1: apiModel.numWorkersDie.toString(),
                value2: apiModel.totalAccidentCosts.toString(),
                value3: apiModel.accidentDaysLost.toString()
            },
        },
        section3Data: {
            row1: {
                value1: apiModel.totalOccupationalDiseaseCases.toString(),
                value2: apiModel.newOccupationalDiseaseCases.toString(),
                value3: apiModel.occupationalDiseaseLeaveDays.toString()
            },
            row2: {
                value1: apiModel.earlyRetirementDueToDisease.toString(),
                value2: apiModel.totalOccupationalDiseaseCosts.toString(),
            }
        },
        section4Data: {
            row1: {
                value1: apiModel.healthType1.toString(),
                value2: apiModel.healthType2.toString(),
                value3: apiModel.healthType3.toString()
            },
            row2: {
                value1: apiModel.healthType4.toString(),
                value2: apiModel.healthType5.toString(),
            },
        },
        section5Data: {
            row1: {
                value1: apiModel.training1.toString(),
                value2: apiModel.training2.toString(),
                value3: apiModel.training3.toString()
            },
            row2: {
                value1: apiModel.selfTraining.toString(),
                value2: apiModel.outsourcedTraining.toString(),
                value3: apiModel.training4.toString()
            },
            row3: {
                value1: apiModel.training5.toString(),
                value2: apiModel.training6.toString(),
                value3: apiModel.traningCost.toString()
            },
        },
        section6Data: {
            row1: {
                value1: apiModel.totalSafetyEquipment.toString(),
                value2: apiModel.activeSafetyEquipmentCount.toString(),
                value3: apiModel.checkedEquipment.toString()
            },
            row2: {
                value1: apiModel.uncheckedEquipment.toString(),
                value2: apiModel.reportedSafetyEquipment.toString(),
                value3: apiModel.unreportedSafetyEquipment.toString()
            },
        },
        section7Data: {
            row1: {
                value1: apiModel.totalOvertimeWorkers.toString(),
                value2: apiModel.totalOvertime.toString(),
                value3: apiModel.maxOvertimeInMonth.toString()
            },
        },
        section8Data: {
            row1: {
                value1: apiModel.numAllowanceWorkers.toString(),
                value2: apiModel.allowanceCost.toString(),
            }
        },
        section9Data: {
            row1: {
                value1: apiModel.observationSamples.toString(),
                value2: apiModel.nonStandardSamples.toString(),
            },
            row2: {
                value1: apiModel.nonTemperatureStandardSamples.toString(),
                value2: apiModel.nonHumidityStandardSamples.toString(),
                value3: apiModel.nonWindStandardSamples.toString()
            },
            row3: {
                value1: apiModel.nonLightStandardSamples.toString(),
                value2: apiModel.nonNoiseStandardSamples.toString(),
                value3: apiModel.nonDustStandardSamples.toString()
            },
            row4: {
                value1: apiModel.nonVibrateStandardSamples.toString(),
                value2: apiModel.nonToxicStandardSamples.toString(),
                value3: apiModel.nonRadioactiveStandardSamples.toString()
            },
            row5: {
                value1: apiModel.nonElectricStandardSamples.toString(),
                value2: apiModel.nonOtherStandardSamples.toString(),
            },
        },
        section10Data: {
            row1: {
                value1: apiModel.safetyCosts.toString(),
                value2: apiModel.hygieneCost.toString(),
                value3: apiModel.equipmentCost.toString()
            },
            row2: {
                value1: apiModel.healthCost.toString(),
                value2: apiModel.trainingCost.toString(),
                value3: apiModel.riskCost.toString()
            },
            row3: {
                value1: apiModel.otherCost.toString(),
            },
        },
        section11Data: {
            row1: {
                value1: apiModel.oshaProviderName.toString(),
            },
            row2: {
                value1: apiModel.healthProviderName.toString(),
            }
        },
        section12Data: {
            row1: {
                value1: formatDate(apiModel.date),
            }
        }
    }
};

const parseNumber = (value: string): number => {
    return Number(value); // Chuyển đổi về kiểu number
};

const transformUIModelToReportDetailAPIModel = ({ reportId, uiModel }: { reportId: string, uiModel: ReportPageData }): InputReportDetailAPIModel => {
    function parseDate(dateString: string): string {
        const [month, year] = dateString.split("/");
        return `${year}-${month}`;
    }

    return {
        reportId: reportId,
        totalWorkers: parseNumber(uiModel.section1Data?.row1?.value1 ?? "0"),
        safetyWorkers: parseNumber(uiModel.section1Data?.row1?.value2 ?? "0"),
        healthWorkers: parseNumber(uiModel.section1Data?.row1?.value3 ?? "0"),
        femaleWorkers: parseNumber(uiModel.section1Data?.row2?.value1 ?? "0"),
        hazardousWorkers: parseNumber(uiModel.section1Data?.row2?.value2 ?? "0"),
        underageWorkers: parseNumber(uiModel.section1Data?.row2?.value3 ?? "0"),
        under15Workers: parseNumber(uiModel.section1Data?.row3?.value1 ?? "0"),
        disabledWorkers: parseNumber(uiModel.section1Data?.row3?.value2 ?? "0"),
        agedWorkers: parseNumber(uiModel.section1Data?.row3?.value3 ?? "0"),
        totalAccidents: parseNumber(uiModel.section2Data?.row1?.value1 ?? "0"),
        numFatalAccidents: parseNumber(uiModel.section2Data?.row1?.value2 ?? "0"),
        numAccidentWorkers: parseNumber(uiModel.section2Data?.row1?.value3 ?? "0"),
        numWorkersDie: parseNumber(uiModel.section2Data?.row2?.value1 ?? "0"),
        totalAccidentCosts: parseNumber(uiModel.section2Data?.row2?.value2 ?? "0"),
        accidentDaysLost: parseNumber(uiModel.section2Data?.row2?.value3 ?? "0"),
        totalOccupationalDiseaseCases: parseNumber(uiModel.section3Data?.row1?.value1 ?? "0"),
        newOccupationalDiseaseCases: parseNumber(uiModel.section3Data?.row1?.value2 ?? "0"),
        occupationalDiseaseLeaveDays: parseNumber(uiModel.section3Data?.row1?.value3 ?? "0"),
        earlyRetirementDueToDisease: parseNumber(uiModel.section3Data?.row2?.value1 ?? "0"),
        totalOccupationalDiseaseCosts: parseNumber(uiModel.section3Data?.row2?.value2 ?? "0"),
        healthType1: parseNumber(uiModel.section4Data?.row1?.value1 ?? "0"),
        healthType2: parseNumber(uiModel.section4Data?.row1?.value2 ?? "0"),
        healthType3: parseNumber(uiModel.section4Data?.row1?.value3 ?? "0"),
        healthType4: parseNumber(uiModel.section4Data?.row2?.value1 ?? "0"),
        healthType5: parseNumber(uiModel.section4Data?.row2?.value2 ?? "0"),
        training1: uiModel.section5Data?.row1?.value1 ?? "",
        training2: uiModel.section5Data?.row1?.value2 ?? "",
        training3: uiModel.section5Data?.row1?.value3 ?? "",
        training4: uiModel.section5Data?.row2?.value3 ?? "",
        training5: uiModel.section5Data?.row3?.value1 ?? "",
        training6: uiModel.section5Data?.row3?.value2 ?? "",
        selfTraining: uiModel.section5Data?.row2?.value1 ?? "",
        outsourcedTraining: uiModel.section5Data?.row2?.value2 ?? "",
        traningCost: parseNumber(uiModel.section5Data?.row3?.value3 ?? "0"),
        totalSafetyEquipment: parseNumber(uiModel.section6Data?.row1?.value1 ?? "0"),
        activeSafetyEquipmentCount: parseNumber(uiModel.section6Data?.row1?.value2 ?? "0"),
        checkedEquipment: parseNumber(uiModel.section6Data?.row1?.value3 ?? "0"),
        uncheckedEquipment: parseNumber(uiModel.section6Data?.row2?.value1 ?? "0"),
        reportedSafetyEquipment: parseNumber(uiModel.section6Data?.row2?.value2 ?? "0"),
        unreportedSafetyEquipment: parseNumber(uiModel.section6Data?.row2?.value3 ?? "0"),
        totalOvertimeWorkers: parseNumber(uiModel.section7Data?.row1?.value1 ?? "0"),
        totalOvertime: parseNumber(uiModel.section7Data?.row1?.value2 ?? "0"),
        maxOvertimeInMonth: parseNumber(uiModel.section7Data?.row1?.value3 ?? "0"),
        numAllowanceWorkers: parseNumber(uiModel.section8Data?.row1?.value1 ?? "0"),
        allowanceCost: parseNumber(uiModel.section8Data?.row1?.value2 ?? "0"),
        observationSamples: parseNumber(uiModel.section9Data?.row1?.value1 ?? "0"),
        nonStandardSamples: parseNumber(uiModel.section9Data?.row1?.value2 ?? "0"),
        nonTemperatureStandardSamples: uiModel.section9Data?.row2?.value1 ?? "",
        nonHumidityStandardSamples: uiModel.section9Data?.row2?.value2 ?? "",
        nonWindStandardSamples: uiModel.section9Data?.row2?.value3 ?? "",
        nonLightStandardSamples: uiModel.section9Data?.row3?.value1 ?? "",
        nonNoiseStandardSamples: uiModel.section9Data?.row3?.value2 ?? "",
        nonDustStandardSamples: uiModel.section9Data?.row3?.value3 ?? "",
        nonVibrateStandardSamples: uiModel.section9Data?.row4?.value1 ?? "",
        nonToxicStandardSamples: uiModel.section9Data?.row4?.value2 ?? "",
        nonRadioactiveStandardSamples: uiModel.section9Data?.row4?.value3 ?? "",
        nonElectricStandardSamples: uiModel.section9Data?.row5?.value1 ?? "",
        nonOtherStandardSamples: uiModel.section9Data?.row5?.value2 ?? "",
        safetyCosts: parseNumber(uiModel.section10Data?.row1?.value1 ?? "0"),
        hygieneCost: parseNumber(uiModel.section10Data?.row1?.value2 ?? "0"),
        equipmentCost: parseNumber(uiModel.section10Data?.row1?.value3 ?? "0"),
        healthCost: parseNumber(uiModel.section10Data?.row2?.value1 ?? "0"),
        trainingCost: parseNumber(uiModel.section10Data?.row2?.value2 ?? "0"),
        riskCost: parseNumber(uiModel.section10Data?.row2?.value3 ?? "0"),
        otherCost: parseNumber(uiModel.section10Data?.row3?.value1 ?? "0"),
        oshaProviderName: uiModel.section11Data?.row1?.value1 ?? "",
        healthProviderName: uiModel.section11Data?.row2?.value1 ?? "",
        date: parseDate(uiModel.section12Data?.row1?.value1 ?? "")
    };
};

export const findReportDetailById = async (reportId: string): Promise<{
    success: boolean;
    message?: string;
    reportDetail?: ReportPageData;
}> => {
    const result = await reportDetailAPI.getReportDetailById(reportId).then((response) => {
        const model = transformReportDetailAPIModelToUIModel(response.data);
        return {
            success: response.success,
            message: response.message,
            reportDetail: model
        }
    });
    return result;
};

export const updateReportDetail = async ({ reportId, uiModel }: { reportId: string, uiModel: ReportPageData }): Promise<{
    success: boolean;
    message?: string;
}> => {
    const model = transformUIModelToReportDetailAPIModel({
        reportId: reportId,
        uiModel: uiModel
    });
    const result = await reportDetailAPI.updateReportDetail(model).then((response) => {
        return {
            success: response.success,
            message: response.message
        }
    });
    return result;
}

export const getReportDetailPreviewPDF = async ({ reportId, uiModel }: { reportId: string, uiModel: ReportPageData }): Promise<{
    success: boolean;
    message?: string;
    fileData?: ArrayBuffer;
}> => {
    try {
        const model = transformUIModelToReportDetailAPIModel({
            reportId: reportId,
            uiModel: uiModel
        });

        const response = await reportDetailAPI.getPreviewReportDetail(model);

        if (!response.success) {
            return {
                success: false,
                message: response.message || 'Failed to fetch PDF'
            };
        }

        return {
            success: true,
            fileData: response.data?.fileData
        };
    } catch (error: any) {
        console.error('Error fetching report preview PDF:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'An error occurred while fetching the PDF'
        };
    }
}

export const downloadReportDetailAsWord = async ({ reportId }: { reportId: string }) => {
    const result = await reportDetailAPI.downloadReportDetailAsWord({ reportId: reportId });
    return result;
}

export const getReportDetailByHistoryId = async ({ reportId, reportHistoryId }: { reportId: string, reportHistoryId: string }): Promise<{
    success: boolean;
    message?: string;
    reportDetail?: ReportPageData;
    listChange?: string[];
}> => {
    const result = await reportDetailAPI.getReportDetailByHistoryId({ reportId: reportId, reportHistoryId: reportHistoryId }).then((response) => {
        const model = transformReportDetailAPIModelToUIModel(response.data.report);
        return {
            success: response.success,
            message: response.message,
            reportDetail: model,
            listChange: response.data.listChange
        }
    });
    return result;
};
