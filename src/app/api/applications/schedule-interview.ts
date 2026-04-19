import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";

export interface ScheduleInterviewRequest {
  applicationId: string;
  interviewerId: string; // Host interviewer who will own the meeting
  additionalInterviewerIds?: string[]; // Optional additional participants
  interviewType: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
  scheduledTimeFrom: string; // ISO date string
  scheduledTimeTo: string; // ISO date string
  mode?: 'in-person' | 'video' | 'phone';
}

export async function scheduleInterview(request: ScheduleInterviewRequest): Promise<{ message: string }> {
  try {
    const response = await axiosInstance.post(`${APPLICATION_SERVER_URL}/application/schedule-interview`, {
      applicationId: request.applicationId,
      interviewerId: request.interviewerId,
      additionalInterviewerIds: request.additionalInterviewerIds,
      interviewType: request.interviewType,
      scheduledTimeFrom: request.scheduledTimeFrom,
      scheduledTimeTo: request.scheduledTimeTo,
      mode: request.mode || 'video'
    });

    return response.data;
  } catch (error: unknown) {
    console.error("Error scheduling interview:", error instanceof Error ? error.message : error);
    throw error;
  }
}

