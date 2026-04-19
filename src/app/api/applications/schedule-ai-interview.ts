import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";

export interface AIInterviewCriteria {
  required_questions?: string[];
  skills_to_test?: string;
  interviewer_persona?: string;
  interview_style?: 'technical' | 'balanced' | 'behavioral';
}

export interface ScheduleAIInterviewRequest extends AIInterviewCriteria {
  applicationId: string;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
}

export async function scheduleAIInterview(request: ScheduleAIInterviewRequest): Promise<{ message: string; meetingLink?: string }> {
  try {
    const response = await axiosInstance.post(`${APPLICATION_SERVER_URL}/application/schedule-ai-interview`, request);
    return response.data;
  } catch (error: unknown) {
    console.error("Error scheduling AI interview:", error instanceof Error ? error.message : error);
    throw error;
  }
}
