import axiosInstance from "../axiosModels/axiosInstance";
import { APPLICATION_SERVER_URL } from "../endpoints";
import { Application, ApplicationStatus } from "@/types/application";

export async function updateApplicationStatus(applicationId: string, newStatus: ApplicationStatus): Promise<Application> {
  try {
    const response = await axiosInstance.put(`${APPLICATION_SERVER_URL}/application/update-status`, {
      applicationId,
      newStatus
    });

    return new Application(response.data.application || response.data);
  } catch (error: unknown) {
    console.error("Error updating application status:", error instanceof Error ? error.message : error);
    throw error;
  }
}
