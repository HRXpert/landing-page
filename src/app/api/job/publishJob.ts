// services/jobService.ts
import axiosInstance from "../axiosModels/axiosInstance";
import { JOB_SERVER_URL } from "../endpoints";
import { PublishJobRequest } from "./requestObjects";
import { Job } from "../../../types/job";

export async function publishJob(jobData: PublishJobRequest): Promise<Job> {
  try {
    const { data } = await axiosInstance.post(`${JOB_SERVER_URL}/job/publish`, jobData);
    return new Job(data.job || data);
  } catch (error: unknown) {
    console.error("Error publishing job:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export interface GetOrganizationJobsParams {
  start?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  employmentType?: string;
  workMode?: string;
  jobField?: string;
  jobDomain?: string;
  experienceLevel?: string;
  country?: string;
  city?: string;
  minSalary?: number;
  maxSalary?: number;
  postedBy?: string;
}

export async function getOrganizationJobs(params: GetOrganizationJobsParams = {}): Promise<Job[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    if (params.status) queryParams.append('status', params.status);
    if (params.employmentType) queryParams.append('employmentType', params.employmentType);
    if (params.workMode) queryParams.append('workMode', params.workMode);
    if (params.jobField) queryParams.append('jobField', params.jobField);
    if (params.jobDomain) queryParams.append('jobDomain', params.jobDomain);
    if (params.experienceLevel) queryParams.append('experienceLevel', params.experienceLevel);
    if (params.country) queryParams.append('country', params.country);
    if (params.city) queryParams.append('city', params.city);
    if (params.minSalary !== undefined) queryParams.append('minSalary', params.minSalary.toString());
    if (params.maxSalary !== undefined) queryParams.append('maxSalary', params.maxSalary.toString());
    if (params.postedBy) queryParams.append('postedBy', params.postedBy);

    const query = queryParams.toString();
    const url = `${JOB_SERVER_URL}/job/organization-jobs${query ? `?${query}` : ''}`;
    const { data } = await axiosInstance.get(url);
    const jobs = data.jobs || data;
    return Array.isArray(jobs) ? jobs.map((job: unknown) => new Job(job as Job)) : [];
  } catch (error: unknown) {
    console.error("Error fetching organization jobs:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function closeJob(jobId: string): Promise<Job> {
  try {
    const { data } = await axiosInstance.put(`${JOB_SERVER_URL}/job/close-job/${jobId}`);
    return new Job(data.job || data);
  } catch (error: unknown) {
    console.error(`Error closing job ${jobId}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function publishDraftedJob(jobId: string): Promise<Job> {
  try {
    const { data } = await axiosInstance.put(`${JOB_SERVER_URL}/job/publish-job/${jobId}`);
    return new Job(data.job || data);
  } catch (error: unknown) {
    console.error(`Error publishing job ${jobId}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function deleteDraft(jobId: string): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await axiosInstance.put(`${JOB_SERVER_URL}/job/delete-job/${jobId}`);
    return data;
  } catch (error: unknown) {
    console.error(`Error deleting job ${jobId}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}


export async function pauseJob(jobId: string): Promise<Job> {
  try {
    const { data } = await axiosInstance.put(`${JOB_SERVER_URL}/job/pause-job/${jobId}`);
    return new Job(data.job || data);
  } catch (error: unknown) {
    console.error(`Error pausing job ${jobId}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function getJobById(jobId: string): Promise<Job> {
  try {
    const { data } = await axiosInstance.get(`${JOB_SERVER_URL}/job/get-job/${jobId}`);
    return new Job(data.job || data);
  } catch (error: unknown) {
    console.error(`Error fetching job ${jobId}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}
