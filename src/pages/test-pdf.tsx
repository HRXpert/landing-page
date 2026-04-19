import React from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@/app/components/PDFViewer'), { ssr: false });

const TestPDFPage = () => {
  const testPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Or your S3 link

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Viewer Test</h1>
      <PDFViewer fileUrl={testPdfUrl} zoom={100} />
    </div>
  );
};

export default TestPDFPage;
