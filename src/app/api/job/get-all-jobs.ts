import axiosInstance from "../axiosModels/axiosInstance";
import { JOB_SERVER_URL } from "../endpoints";
import { Job } from "../../../types/job";

export interface GetAllJobsParams {
  start?: number;
  limit?: number;
  organizationId?: string;
  jobDomain?: string;
  jobField?: string;
  workMode?: string;
  employmentType?: string;
  experienceLevel?: string;
  search?: string;
  country?: string;
  city?: string;
}

export async function getAllJobs(params: GetAllJobsParams = {}): Promise<Job[]> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.organizationId) queryParams.append('organizationId', params.organizationId);
    if (params.jobDomain) queryParams.append('jobDomain', params.jobDomain);
    if (params.jobField) queryParams.append('jobField', params.jobField);
    if (params.workMode) queryParams.append('workMode', params.workMode);
    if (params.employmentType) queryParams.append('employmentType', params.employmentType);
    if (params.experienceLevel) queryParams.append('experienceLevel', params.experienceLevel);
    if (params.search) queryParams.append('search', params.search);
    if (params.country) queryParams.append('country', params.country);
    if (params.city) queryParams.append('city', params.city);

    const { data } = await axiosInstance.get(`${JOB_SERVER_URL}/job/all?${queryParams.toString()}`);
    return Array.isArray(data) ? data.map((job: unknown) => new Job(job as Job)) : [];
  } catch (error: unknown) {
    console.error("Error fetching jobs:", error instanceof Error ? error.message : error);
    throw error;
  }
}

