
import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";
import { Application } from "@/types/application";

export interface GetOrganizationApplicationsParams {
  start?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  candidateId?: string;
  country?: string;
  city?: string;
  minResumeScore?: number;
  maxResumeScore?: number;
  yearsofExperience?: string;
  source?: 'PUBLIC_FORM' | 'BULK_UPLOAD';
  batchId?: string;
}

export async function getOrganizationApplications(
  params: GetOrganizationApplicationsParams = {}
): Promise<Application[]> {
  try {
    const queryParams = new URLSearchParams();

    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.status) queryParams.append('status', params.status);
    if (params.candidateId) queryParams.append('candidateId', params.candidateId);
    if (params.country) queryParams.append('country', params.country);
    if (params.city) queryParams.append('city', params.city);
    if (params.minResumeScore !== undefined) queryParams.append('minResumeScore', params.minResumeScore.toString());
    if (params.maxResumeScore !== undefined) queryParams.append('maxResumeScore', params.maxResumeScore.toString());
    if (params.yearsofExperience) queryParams.append('yearsofExperience', params.yearsofExperience);
    if (params.source) queryParams.append('source', params.source);
    if (params.batchId) queryParams.append('batchId', params.batchId);

    const query = queryParams.toString();
    const url = `${APPLICATION_SERVER_URL}/application/organization${query ? `?${query}` : ''}`;
    const response = await axiosInstance.get(url);
    const applications = response.data.applications || response.data;
    return Array.isArray(applications)
      ? applications.map((app: unknown) => new Application(app as Application))
      : [];
  } catch (error: unknown) {
    console.error("Error fetching org applications:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function getCompleteApplicationDetails(applicationId: string): Promise<Application> {
    try {
      const { data } = await axiosInstance.get(`${APPLICATION_SERVER_URL}/application/complete-application/${applicationId}`, { withCredentials: true });
      console.log(data)
      return new Application(data.application || data);
    } catch (error: unknown) {
      console.error(`Error fetching application ${applicationId}:`, error instanceof Error ? error.message : error);
      throw error;
    }
  }
