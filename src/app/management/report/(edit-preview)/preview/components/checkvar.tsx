// import React, { useState, useRef } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// interface PDFViewerProps {
//     blob: Blob;
// }

// const PDFViewer: React.FC<PDFViewerProps> = ({ blob }) => {
//     const [numPages, setNumPages] = useState(null);
//     const containerRef = useRef<HTMLDivElement>(null);

//     pdfjs.getDocument(blob).promise.then((pdf) => {
//         setNumPages(pdf.numPages);
//         // Tính toán kích thước container để điều chỉnh kích thước PDF
//         if (containerRef.current) {
//             const containerWidth = containerRef.current.clientWidth;
//             const scale = containerWidth / pdf.getPage(1).view[2];
//             pdf.pages.forEach((page) => {
//                 page.scale(scale);
//             });
//         }
//     });

//     return (
//         <div ref={containerRef}>
//             <Document file={blob} onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}>
//                 {Array.from(new Array(numPages), (el, index) => (
//                     <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                 ))}
//             </Document>
//         </div>
//     );
// };

// export default PDFViewer;