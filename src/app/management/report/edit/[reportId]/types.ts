import { Section1Data } from "./sections/section1";
import { Section10Data } from "./sections/section10";
import { Section11Data } from "./sections/section11";
import { Section12Data } from "./sections/section12";
import { Section2Data } from "./sections/section2";
import { Section3Data } from "./sections/section3";
import { Section4Data } from "./sections/section4";
import { Section5Data } from "./sections/section5";
import { Section6Data } from "./sections/section6";
import { Section7Data } from "./sections/section7";
import { Section8Data } from "./sections/section8";
import { Section9Data } from "./sections/section9";

export interface ReportPageData {
    section1Data?: Section1Data;
    section2Data?: Section2Data;
    section3Data?: Section3Data;
    section4Data?: Section4Data;
    section5Data?: Section5Data;
    section6Data?: Section6Data;
    section7Data?: Section7Data;
    section8Data?: Section8Data;
    section9Data?: Section9Data;
    section10Data?: Section10Data;
    section11Data?: Section11Data;
    section12Data?: Section12Data;
}
