import axiosInstance from "../axiosModels/axiosInstance";
import { AUTH_SERVER_URL } from "../endpoints";

export interface Recruiter {
  _id: string;
  userId?: string;
  fullName?: string;
  email?: string;
  status?: string;
  role?: string;
  organizationId?: string;
  user?: {
    fullname?: string;
    username?: string;
    email?: string;
    role?: string;
  };
  createdAt?: string;
  [key: string]: unknown;
}

export interface GetRecruitersParams {
  status?: string;
  start?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getAllRecruiters(params: GetRecruitersParams = {}): Promise<Recruiter[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const query = queryParams.toString();
    const url = `${AUTH_SERVER_URL}/recruiters/fetch-all${query ? `?${query}` : ''}`;
    const { data } = await axiosInstance.get(url);
    return data.recruiters || data || [];
  } catch (error: unknown) {
    console.error("Error fetching recruiters:", error instanceof Error ? error.message : error);
    throw error;
  }
}
