import axiosInstance from "@/core/axios/axios-instance";
import Base from "./base";

interface ReportDetailBaseModel {
    totalWorkers: number;
    femaleWorkers: number;
    under15Workers: number;
    safetyWorkers: number;
    hazardousWorkers: number;
    disabledWorkers: number;
    healthWorkers: number;
    underageWorkers: number;
    agedWorkers: number;
    totalAccidents: number;
    numWorkersDie: number;
    numFatalAccidents: number;
    totalAccidentCosts: number;
    numAccidentWorkers: number;
    accidentDaysLost: number;
    totalOccupationalDiseaseCases: number;
    earlyRetirementDueToDisease: number;
    newOccupationalDiseaseCases: number;
    totalOccupationalDiseaseCosts: number;
    occupationalDiseaseLeaveDays: number;
    healthType1: number;
    healthType2: number;
    healthType3: number;
    healthType4: number;
    healthType5: number;
    training1: string;
    training2: string;
    training3: string;
    training4: string;
    training5: string;
    training6: string;
    selfTraining: string;
    outsourcedTraining: string;
    traningCost: number;
    totalSafetyEquipment: number;
    uncheckedEquipment: number;
    checkedEquipment: number;
    activeSafetyEquipmentCount: number;
    reportedSafetyEquipment: number;
    unreportedSafetyEquipment: number;
    totalOvertimeWorkers: number;
    totalOvertime: number;
    maxOvertimeInMonth: number;
    numAllowanceWorkers: number;
    allowanceCost: number;
    observationSamples: number;
    nonStandardSamples: number;
    nonTemperatureStandardSamples: string;
    nonHumidityStandardSamples: string;
    nonLightStandardSamples: string;
    nonNoiseStandardSamples: string;
    nonToxicStandardSamples: string;
    nonVibrateStandardSamples: string;
    nonElectricStandardSamples: string;
    nonWindStandardSamples: string;
    nonDustStandardSamples: string;
    nonRadioactiveStandardSamples: string;
    nonOtherStandardSamples: string;
    safetyCosts: number;
    healthCost: number;
    hygieneCost: number;
    trainingCost: number;
    equipmentCost: number;
    riskCost: number;
    otherCost: number;
    oshaProviderName: string;
    healthProviderName: string;
    date: string;
}

export interface InputReportDetailAPIModel extends ReportDetailBaseModel {
    reportId: string;
}

export interface OutputReportDetailAPIModel extends ReportDetailBaseModel {
    reportDetailId: string;
    userEdit: string;
}

class ReportDetailAPI extends Base {
    async getReportDetailById(reportId: string) {
        try {
            const response = await this.get('/report-detail/find-by-id', {
                reportId: reportId
            });
            return {
                success: response.success,
                message: response.message,
                data: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }

    async updateReportDetail(data: InputReportDetailAPIModel) {
        try {
            const response = await this.post('/report-detail/create-update', data);
            return {
                success: response.success,
                message: response.message,
                data: response.data
            }
        } catch (err: any) {
            return {
                success: false,
                message: err.response.data.message,
                code: err.response.data.code
            }
        }
    }

    // async getPreviewReportDetail(data: InputReportDetailAPIModel) {
    //     try {
    //         // Make the request with axios, specifying that the response should be a blob
    //         const response = await axiosInstance.post('/report-detail/preview-report', data, { responseType: 'blob' });

    //         // Check if the response is actually a PDF (optional, but good practice)
    //         const contentType = response.headers['content-type'];
    //         if (!contentType || !contentType.includes('pdf')) {
    //             throw new Error('The response is not a valid PDF');
    //         }

    //         // Create a URL for the blob data
    //         const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

    //         // Create a link element to trigger the download
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'report.pdf'; // You can customize the filename here
    //         document.body.appendChild(link);
    //         link.click(); // Trigger the download

    //         // Clean up the link element and URL object after the download
    //         document.body.removeChild(link);
    //         window.URL.revokeObjectURL(url);

    //         return {
    //             success: true,
    //             data: {
    //                 url: url
    //             }
    //         };
    //     } catch (err: any) {
    //         console.error('Error fetching or downloading PDF:', err);
    //         return {
    //             success: false,
    //             message: err.response?.data?.message || 'An error occurred',
    //             code: err.response?.data?.code
    //         };
    //     }
    // }

    async getPreviewReportDetail(data: InputReportDetailAPIModel) {
        try {
            // Gửi yêu cầu với axios, định dạng kết quả là blob
            const response = await axiosInstance.post('/report-detail/preview-report', data, { responseType: 'arraybuffer' });

            const contentType = response.headers['content-type'];
            if (!contentType || !contentType.includes('pdf')) {
                throw new Error('The response is not a valid PDF');
            }

            // Trả về dữ liệu PDF dưới dạng ArrayBuffer
            return {
                success: true,
                data: {
                    fileData: response.data
                }
            };
        } catch (err: any) {
            console.error('Error fetching or downloading PDF:', err);
            return {
                success: false,
                message: err.response?.data?.message || 'An error occurred',
                code: err.response?.data?.code
            };
        }
    }


    async downloadReportDetailAsWord({ reportId }: { reportId: string }) {
        try {
            const response = await this.get('/report-detail/download-word',
                { reportId: reportId },
                { responseType: 'blob' }
            );

            // Create a URL for the blob data
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report_detail.docx'); // Set desired file name
            document.body.appendChild(link);
            link.click(); // Trigger download
            document.body.removeChild(link); // Remove the link element

            // Optionally, revoke the object URL after some time to free memory
            setTimeout(() => window.URL.revokeObjectURL(url), 100);

            return { success: true };

        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.message || 'An error occurred',
                code: err.response?.data?.code
            };
        }
    }
}

const reportDetailAPI = new ReportDetailAPI();
export default reportDetailAPI;
