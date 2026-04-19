import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";

export interface InterviewFeedbackResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface InterviewFeedbackData {
  applicationId: string;
  interviewId: string;
  remarks: string;
  recommended: boolean;
  strengths?: string[];
  weaknesses?: string[];
}

export async function submitInterviewFeedback(data: InterviewFeedbackData): Promise<InterviewFeedbackResponse> {
  try {
    const response = await axiosInstance.post(
      `${APPLICATION_SERVER_URL}/application/submit-interview-feedback`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error("Error submitting interview feedback:", err);
    throw err;
  }
}
