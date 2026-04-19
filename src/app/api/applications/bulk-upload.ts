import axios from 'axios';
import { AIS_SERVER_URL } from '../endpoints';

export interface BulkUploadResponse {
  success: boolean;
  batchId: string;
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  applicationIds: string[];
  errors?: Array<{
    fileName: string;
    error: string;
  }>;
}

/**
 * Upload multiple resumes for a specific job
 * @param files - Array of resume files
 * @param jobId - Job ID
 * @param orgId - Organization ID
 * @param batchId - Optional batch ID for tracking
 * @returns Bulk upload response
 */
export const bulkUploadResumes = async (
  files: File[],
  jobId: string,
  orgId: string,
  batchId?: string
): Promise<BulkUploadResponse> => {
  try {
    const formData = new FormData();

    // Append all files
    files.forEach((file) => {
      formData.append('resumes', file);
    });

    // Append bulk upload DTO as JSON string
    const bulkUploadDto = {
      jobId,
      orgId,
      batchId,
    };
    formData.append('bulkUploadDto', JSON.stringify(bulkUploadDto));

    const response = await axios.post<BulkUploadResponse>(
      `${AIS_SERVER_URL}/ingestion/applications/bulk-upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Send cookies with request
        timeout: 300000, // 5 minutes timeout for large uploads
      }
    );

    return response.data;
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } }; message?: string };
    console.error('Bulk upload error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to upload resumes'
    );
  }
};
