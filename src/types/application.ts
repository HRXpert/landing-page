import { Job } from "./job";

export type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'INTERVIEW_STARTED'
  | 'INTERVIEW_DONE'
  | 'INTERVIEW_SCORED'
  | 'OFFERED'
  | 'HIRED'
  | 'REJECTED'
  | 'PROCESSING'
  | 'READY'
  | 'FAILED_PARSING'
  | 'FAILED_SCORING'
  | 'COMPLETED';

export type ExperienceRange =
  | 'Less than 1 year'
  | '1-2 years'
  | '3-5 years'
  | '6-10 years'
  | '11-15 years'
  | '16-20 years'
  | 'More than 20 years';

// ----------- Subtypes -----------
export interface ApplicantInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio?: string;
  country: string;
  city: string;
  address?: string;
  zipCode?: string;
}

export interface ResumeScore {
  overall_fit: number;
  top_skills: string[];
  red_flags: string[];
  scoredAt: Date;
}

export interface Experience {
  from_to: string;
  role: string;
  company?: string;
  description?: string;
}

export interface Education {
  from_to: string;
  degree_n_field: string;
  cgpa?: number;
  percentage?: number;
}

export interface Project {
  title: string;
  description?: string;
}

export interface ResumeDetails {
  experience: Experience[];
  education: Education[];
  all_skills: string[];
  projects: Project[];
  profile_summary?: string;
}

export interface HistoryEntry {
  prevStatus: string;
  newStatus: string;
  date: Date;
  recruiter_id: string;
}

export interface AIInterviewConfig {
  required_questions: string[];
  skills_to_test: string;
  interviewer_persona: string;
  interview_style: 'technical' | 'balanced' | 'behavioral';
}

export interface AIInterviewSchedule {
  startTime: string;
  endTime: string;
  meetingLink: string | null;
}

export interface AIInterviewScoreDimension {
  name: string;
  score: number;
  max_score: number;
  justification: string;
  evidence: string[];
}

export interface AIInterviewScore {
  session_id: string;
  overall_score: number;
  dimensions: AIInterviewScoreDimension[];
  required_questions_coverage: {
    question: string;
    was_asked: boolean;
    response_quality_score: number | null;
    notes: string;
  }[] | null;
  summary: string;
  strengths: string[];
  areas_for_improvement: string[];
  scored_at: string;
}

export class Application {
  _id!: string;
  orgId!: string;
  jobId!: string;
  applicant!: ApplicantInfo;
  resumeUrl!: string;
  resumeScore?: ResumeScore;
  resumeDetails?: ResumeDetails;
  status!: ApplicationStatus;
  yearsofExperience!: ExperienceRange;
  source?: string;
  history: HistoryEntry[] = [];
  interviews?: any[];
  interviewSchedule?: AIInterviewSchedule;
  aiInterviewConfig?: AIInterviewConfig;
  aiInterviewScore?: AIInterviewScore;
  interviewTranscript?: { role: string; content: string }[];
  createdAt!: Date;
  updatedAt!: Date;

  job?: Job;

  constructor(data: Application) {
    Object.assign(this, data);
  }
}

export interface OtherApplication {
  application: {
    _id: string;
    status: string;
    createdAt: string;
  };
  job: {
    _id:string;
    title: string;
  };
}
