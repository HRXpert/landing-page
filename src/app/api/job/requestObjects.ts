import { EmploymentType, WorkMode, ExperienceLevel, JobStatus, Location } from "../../../types/job";

export interface PublishJobRequest {
  title: string;
  description: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  jobField: string;
  jobDomain: string;
  location: Location;
  experienceLevel?: ExperienceLevel;
  status?: JobStatus;
}
  