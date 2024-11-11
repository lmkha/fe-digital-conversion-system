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

const transformUIModelToReportDetailAPIModel = ({ reportId, uiModel }: { reportId: string, uiModel: ReportPageData }):
    InputReportDetailAPIModel => {
    function parseDate(dateString: string): string {
        const [month, year] = dateString.split("/");
        return `${year}-${month}`;
    }

    return {
        reportId: reportId,
        totalWorkers: parseInt(uiModel.section1Data?.row1?.value1 ?? "0", 10),
        safetyWorkers: parseInt(uiModel.section1Data?.row1?.value2 ?? "0", 10),
        healthWorkers: parseInt(uiModel.section1Data?.row1?.value3 ?? "0", 10),
        femaleWorkers: parseInt(uiModel.section1Data?.row2?.value1 ?? "0", 10),
        hazardousWorkers: parseInt(uiModel.section1Data?.row2?.value2 ?? "0", 10),
        underageWorkers: parseInt(uiModel.section1Data?.row2?.value3 ?? "0", 10),
        under15Workers: parseInt(uiModel.section1Data?.row3?.value1 ?? "0", 10),
        disabledWorkers: parseInt(uiModel.section1Data?.row3?.value2 ?? "0", 10),
        agedWorkers: parseInt(uiModel.section1Data?.row3?.value3 ?? "0", 10),
        totalAccidents: parseInt(uiModel.section2Data?.row1?.value1 ?? "0", 10),
        numFatalAccidents: parseInt(uiModel.section2Data?.row1?.value2 ?? "0", 10),
        numAccidentWorkers: parseInt(uiModel.section2Data?.row1?.value3 ?? "0", 10),
        numWorkersDie: parseInt(uiModel.section2Data?.row2?.value1 ?? "0", 10),
        totalAccidentCosts: parseInt(uiModel.section2Data?.row2?.value2 ?? "0", 10),
        accidentDaysLost: parseInt(uiModel.section2Data?.row2?.value3 ?? "0", 10),
        totalOccupationalDiseaseCases: parseInt(uiModel.section3Data?.row1?.value1 ?? "0", 10),
        newOccupationalDiseaseCases: parseInt(uiModel.section3Data?.row1?.value2 ?? "0", 10),
        occupationalDiseaseLeaveDays: parseInt(uiModel.section3Data?.row1?.value3 ?? "0", 10),
        earlyRetirementDueToDisease: parseInt(uiModel.section3Data?.row2?.value1 ?? "0", 10),
        totalOccupationalDiseaseCosts: parseInt(uiModel.section3Data?.row2?.value2 ?? "0", 10),
        healthType1: parseInt(uiModel.section4Data?.row1?.value1 ?? "0", 10),
        healthType2: parseInt(uiModel.section4Data?.row1?.value2 ?? "0", 10),
        healthType3: parseInt(uiModel.section4Data?.row1?.value3 ?? "0", 10),
        healthType4: parseInt(uiModel.section4Data?.row2?.value1 ?? "0", 10),
        healthType5: parseInt(uiModel.section4Data?.row2?.value2 ?? "0", 10),
        training1: uiModel.section5Data?.row1?.value1 ?? "",
        training2: uiModel.section5Data?.row1?.value2 ?? "",
        training3: uiModel.section5Data?.row1?.value3 ?? "",
        training4: uiModel.section5Data?.row2?.value3 ?? "",
        training5: uiModel.section5Data?.row3?.value1 ?? "",
        training6: uiModel.section5Data?.row3?.value2 ?? "",
        selfTraining: uiModel.section5Data?.row2?.value1 ?? "",
        outsourcedTraining: uiModel.section5Data?.row2?.value2 ?? "",
        traningCost: parseInt(uiModel.section5Data?.row3?.value3 ?? "0", 10),
        totalSafetyEquipment: parseInt(uiModel.section6Data?.row1?.value1 ?? "0", 10),
        activeSafetyEquipmentCount: parseInt(uiModel.section6Data?.row1?.value2 ?? "0", 10),
        checkedEquipment: parseInt(uiModel.section6Data?.row1?.value3 ?? "0", 10),
        uncheckedEquipment: parseInt(uiModel.section6Data?.row2?.value1 ?? "0", 10),
        reportedSafetyEquipment: parseInt(uiModel.section6Data?.row2?.value2 ?? "0", 10),
        unreportedSafetyEquipment: parseInt(uiModel.section6Data?.row2?.value3 ?? "0", 10),
        totalOvertimeWorkers: parseInt(uiModel.section7Data?.row1?.value1 ?? "0", 10),
        totalOvertime: parseInt(uiModel.section7Data?.row1?.value2 ?? "0", 10),
        maxOvertimeInMonth: parseInt(uiModel.section7Data?.row1?.value3 ?? "0", 10),
        numAllowanceWorkers: parseInt(uiModel.section8Data?.row1?.value1 ?? "0", 10),
        allowanceCost: parseInt(uiModel.section8Data?.row1?.value2 ?? "0", 10),
        observationSamples: parseInt(uiModel.section9Data?.row1?.value1 ?? "0", 10),
        nonStandardSamples: parseInt(uiModel.section9Data?.row1?.value2 ?? "0", 10),
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
        safetyCosts: parseInt(uiModel.section10Data?.row1?.value1 ?? "0", 10),
        hygieneCost: parseInt(uiModel.section10Data?.row1?.value2 ?? "0", 10),
        equipmentCost: parseInt(uiModel.section10Data?.row1?.value3 ?? "0", 10),
        healthCost: parseInt(uiModel.section10Data?.row2?.value1 ?? "0", 10),
        trainingCost: parseInt(uiModel.section10Data?.row2?.value2 ?? "0", 10),
        riskCost: parseInt(uiModel.section10Data?.row2?.value3 ?? "0", 10),
        otherCost: parseInt(uiModel.section10Data?.row3?.value1 ?? "0", 10),
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

// export const getReportDetailPreviewPDF = async ({ reportId, uiModel }: { reportId: string, uiModel: ReportPageData }): Promise<{
//     success: boolean;
//     message?: string;
//     pdfFileUrl?: string;
// }> => {
//     const model = transformUIModelToReportDetailAPIModel({
//         reportId: reportId,
//         uiModel: uiModel
//     });
//     const result = await reportDetailAPI.getPreviewReportDetail(model).then((response) => {
//         return {
//             success: response.success,
//             message: response.message,
//             pdfFileUrl: response.data?.url
//         }
//     });
//     return result;
// }

export const getReportDetailPreviewPDF = async ({ reportId, uiModel }: { reportId: string, uiModel: ReportPageData }): Promise<{
    success: boolean;
    message?: string;
    fileData?: ArrayBuffer;
}> => {
    try {
        // Biến đổi dữ liệu UI model thành API model
        const model = transformUIModelToReportDetailAPIModel({
            reportId: reportId,
            uiModel: uiModel
        });

        // Gọi API để lấy dữ liệu PDF dưới dạng ArrayBuffer (dữ liệu nhị phân)
        const response = await reportDetailAPI.getPreviewReportDetail(model);

        if (!response.success) {
            return {
                success: false,
                message: response.message || 'Failed to fetch PDF'
            };
        }

        // Trả về dữ liệu PDF dưới dạng ArrayBuffer
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
