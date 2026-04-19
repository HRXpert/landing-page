import dynamic from 'next/dynamic';

const LazyPdfViewer = dynamic(() => import('./PDFViewer'), { ssr: false });

export default LazyPdfViewer;
