import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";

export interface Interview {
  _id: string;
  interviewerId: string;
  additionalInterviewers: string[];
  scheduledBy: string;
  interviewType: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
  scheduledTime: {
    from: string;
    to: string;
  };
  meetingLink?: string;
  mode: 'in-person' | 'video' | 'phone';
  interview_status: 'scheduled' | 'done' | 'cancelled';
  results?: {
    remarks: string;
    recommended: boolean;
    strengths: string[];
    weaknesses: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface UpdateInterviewResultsDto {
  applicationId: string;
  interviewId: string;
  remarks: string;
  recommended: boolean;
  strengths?: string[];
  weaknesses?: string[];
}

export async function getApplicationInterviews(applicationId: string): Promise<Interview[]> {
  try {
    const response = await axiosInstance.get(
      `${APPLICATION_SERVER_URL}/application/interviews/${applicationId}`,
      { withCredentials: true }
    );
    return response.data.interviews || response.data || [];
  } catch (error: unknown) {
    console.error("Error fetching application interviews:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function updateInterviewResults(dto: UpdateInterviewResultsDto): Promise<{ message: string }> {
  try {
    const response = await axiosInstance.put(
      `${APPLICATION_SERVER_URL}/application/update-interview-results`,
      dto
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error updating interview results:", error instanceof Error ? error.message : error);
    throw error;
  }
}

