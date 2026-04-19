import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";

interface RawInterviewData {
  interview?: {
    _id?: string;
    interviewType?: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
    scheduledTime?: { from: string; to: string };
    meetingLink?: string;
    mode?: 'in-person' | 'video' | 'phone';
    interview_status?: 'scheduled' | 'done' | 'cancelled';
    createdAt?: string;
  };
  _id?: string;
  applicationId?: string | { toString: () => string };
  applicant?: { fullName?: string; email?: string };
  jobId?: { _id?: string; title?: string; toString?: () => string } | string;
  interviewType?: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
  scheduledTime?: { from: string; to: string };
  meetingLink?: string;
  mode?: 'in-person' | 'video' | 'phone';
  interview_status?: 'scheduled' | 'done' | 'cancelled';
  createdAt?: string;
}

export interface InterviewerInterview {
  _id: string;
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  jobId: string;
  interviewType: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
  scheduledTime: {
    from: string;
    to: string;
  };
  meetingLink?: string;
  mode: 'in-person' | 'video' | 'phone';
  interview_status: 'scheduled' | 'done' | 'cancelled';
  createdAt: string;
}

export interface PendingFeedbackInterview {
  _id: string;
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  jobId: string;
  interviewType: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
  scheduledTime: {
    from: string;
    to: string;
  };
  meetingLink?: string;
  mode: 'in-person' | 'video' | 'phone';
  completedAt: string;
}

export interface GetInterviewerInterviewsParams {
  start?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  interviewType?: 'screening' | 'technical' | 'behavioral' | 'hr' | 'final';
  applicantCountry?: string;
  applicantCity?: string;
}

export async function getInterviewerUpcomingInterviews(params: GetInterviewerInterviewsParams = {}): Promise<InterviewerInterview[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.interviewType) queryParams.append('interviewType', params.interviewType);
    if (params.applicantCountry) queryParams.append('applicantCountry', params.applicantCountry);
    if (params.applicantCity) queryParams.append('applicantCity', params.applicantCity);

    const query = queryParams.toString();
    const url = `${APPLICATION_SERVER_URL}/application/interviews/upcoming${query ? `?${query}` : ''}`;

    console.log('Fetching upcoming interviews from:', url);
    const response = await axiosInstance.get(url, { withCredentials: true });

    console.log('Raw response data:', response.data);
    const rawData: RawInterviewData[] = Array.isArray(response.data) ? response.data : [];
    console.log('Raw data array:', rawData);

    // Transform backend structure to frontend interface
    const transformed = rawData
      .map((item) => {
        const base: InterviewerInterview = {
          _id: item.interview?._id || item._id || '',
          applicationId: (item.applicationId?.toString?.() || item.applicationId || '') as string,
          candidateName: item.applicant?.fullName || 'Unknown',
          candidateEmail: item.applicant?.email || '',
          jobTitle: typeof item.jobId === 'object' && item.jobId?.title ? item.jobId.title : 'Unknown Position',
          jobId: typeof item.jobId === 'object' && item.jobId?._id ? item.jobId._id.toString() : typeof item.jobId === 'string' ? item.jobId : '',
          interviewType: item.interview?.interviewType || item.interviewType || 'screening',
          scheduledTime: {
            from: item.interview?.scheduledTime?.from || item.scheduledTime?.from || '',
            to: item.interview?.scheduledTime?.to || item.scheduledTime?.to || '',
          },
          mode: item.interview?.mode || item.mode || 'video',
          interview_status: item.interview?.interview_status || item.interview_status || 'scheduled',
          createdAt: item.interview?.createdAt || item.createdAt || '',
        };
        const meetingLink = item.interview?.meetingLink || item.meetingLink;
        if (meetingLink) base.meetingLink = meetingLink;
        return base;
      })
      .filter(
        (item): item is InterviewerInterview =>
          Boolean(item._id && item.applicationId && item.scheduledTime.from && item.scheduledTime.to && item.createdAt && item.mode && item.interview_status)
      );

    console.log('Transformed upcoming interviews:', transformed);
    return transformed;
  } catch (err) {
    const error = err as { response?: { data?: unknown; status?: number } };
    console.error("Error fetching interviewer upcoming interviews:", error);
    console.error("Error response:", error?.response?.data);
    console.error("Error status:", error?.response?.status);
    throw error;
  }
}

export async function getInterviewerPendingFeedback(params: GetInterviewerInterviewsParams = {}): Promise<PendingFeedbackInterview[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.interviewType) queryParams.append('interviewType', params.interviewType);
    if (params.applicantCountry) queryParams.append('applicantCountry', params.applicantCountry);
    if (params.applicantCity) queryParams.append('applicantCity', params.applicantCity);

    const query = queryParams.toString();
    const url = `${APPLICATION_SERVER_URL}/application/interviews/feedback/pending${query ? `?${query}` : ''}`;

    console.log('Fetching pending feedback from:', url);
    const response = await axiosInstance.get(url, { withCredentials: true });

    console.log('Raw pending feedback data:', response.data);
    const rawData: RawInterviewData[] = Array.isArray(response.data) ? response.data : [];
    console.log('Raw pending data array:', rawData);

    // Transform backend structure to frontend interface
    const transformed = rawData
      .map((item) => {
        const base: PendingFeedbackInterview = {
          _id: item.interview?._id || item._id || '',
          applicationId: (typeof item.applicationId === 'object' && item.applicationId?.toString?.()) || (typeof item.applicationId === 'string' ? item.applicationId : ''),
          candidateName: item.applicant?.fullName || 'Unknown',
          candidateEmail: item.applicant?.email || '',
          jobTitle: typeof item.jobId === 'object' && item.jobId?.title ? item.jobId.title : 'Unknown Position',
          jobId: item.jobId && typeof item.jobId === 'object' && item.jobId._id ? item.jobId._id.toString() : typeof item.jobId === 'string' ? item.jobId : '',
          interviewType: item.interview?.interviewType || item.interviewType || 'screening',
          scheduledTime: {
            from: item.interview?.scheduledTime?.from || item.scheduledTime?.from || '',
            to: item.interview?.scheduledTime?.to || item.scheduledTime?.to || '',
          },
          mode: item.interview?.mode || item.mode || 'video',
          completedAt: item.interview?.scheduledTime?.to || item.scheduledTime?.to || '',
        };
        const meetingLink = item.interview?.meetingLink || item.meetingLink;
        if (meetingLink) base.meetingLink = meetingLink;
        return base;
      })
      .filter(
        (item): item is PendingFeedbackInterview =>
          Boolean(item._id && item.applicationId && item.interviewType && item.mode && item.completedAt)
      );

    console.log('Transformed pending feedback:', transformed);
    return transformed;
  } catch (err) {
    const error = err as { response?: { data?: unknown; status?: number } };
    console.error("Error fetching interviewer pending feedback:", error);
    console.error("Error response:", error?.response?.data);
    console.error("Error status:", error?.response?.status);
    throw error;
  }
}
