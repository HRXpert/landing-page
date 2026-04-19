
import axiosInstance from "../axiosModels/axiosInstance";
import { JOB_SERVER_URL } from "../endpoints";
import { Job } from "../../../types/job";



// --- GET PUBLIC JOB BY ID ---
export async function getPublicJob(jobId: string): Promise<Job> {
  try {
    const { data } = await axiosInstance.get(`${JOB_SERVER_URL}/job/public/get-job/${jobId}`);
    console.log(data)
    return new Job(data.job || data);
  } catch (error: unknown) {
    console.error(`Error fetching public job ${jobId}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}
