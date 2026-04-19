import axiosInstance from "../axiosModels/axiosInstance"; 
import { JOB_SERVER_URL } from "../endpoints"; 
import { Job, EmploymentType, WorkMode, ExperienceLevel, Location } from "../../../types/job";

export interface UpdateJobPayload {
  jobId: string;
  description?: any; // tiptap JSON object
  employmentType?: EmploymentType;
  workMode?: WorkMode;
  location?: Partial<Location>;
  experienceLevel?: ExperienceLevel;
}

export async function updateJob(payload: UpdateJobPayload): Promise<Job> {
  try {
    const response = await axiosInstance.put(`${JOB_SERVER_URL}/job`, payload);
    return new Job(response.data.job || response.data);
  } catch (error: unknown) {
    console.error("Error updating job:", error instanceof Error ? error.message : error);
    throw error;
  }
}
