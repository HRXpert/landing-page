export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';
export type WorkMode = 'onsite' | 'remote' | 'hybrid';
export type ExperienceLevel =
  | 'internship'
  | 'entry-level'
  | 'associate'
  | 'mid-senior'
  | 'director'
  | 'executive';
export type JobStatus = 'draft' | 'published' | 'paused' | 'closed';

export interface Location {
  country: string;
  city: string;
  address?: string;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  visibleToCandidate: boolean;
}

export class Job {
  _id!: string;
  title!: string;
  description!: string;
  employmentType!: EmploymentType;
  workMode!: WorkMode;
  jobField!: string;
  jobDomain!: string;
  location!: Location;
  experienceLevel!: ExperienceLevel;
  organizationId!: string;
  postedBy!: string;
  status!: JobStatus;
  salaryRange?: SalaryRange;
  closingDate?: Date;
  closedBy?: string;
  publishDate?: Date;
  publishedBy?: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Job) {
    Object.assign(this, data);
  }
}
