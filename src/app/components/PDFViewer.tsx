'use client';

import React from 'react';
import { Viewer, Worker, ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export interface PdfViewerProps {
    fileUrl: string;
    zoom?: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    return (
        <div
            style={{
                height: '100vh', // Full viewport height
                width: '100%',
                overflowY: 'auto', // Allow vertical scroll
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div style={{ width: '100%' }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={fileUrl}
                        scrollMode={ScrollMode.Vertical}
                        defaultScale={SpecialZoomLevel.PageFit} // Fit one page in height
                    />
                </Worker>
            </div>
            
        </div>
    );
};

export default PdfViewer;
