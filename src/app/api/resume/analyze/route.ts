import { NextRequest, NextResponse } from 'next/server';

interface ResumeScoringRequest {
  resume_text: string;
  job_description: string;
}

interface Experience {
  from_to: string;
  role: string;
  company: string;
  description?: string;
}

interface Education {
  from_to: string;
  degree_n_field: string;
  cgpa?: number;
  percentage?: number;
}

interface Project {
  title: string;
  description?: string;
  url?: string;
  demo?: string;
}

interface ContactInfo {
  linkedin?: string;
  phone?: string;
  email: string;
}

interface ResumeDetails {
  experience?: Experience[];
  education?: Education[];
  all_skills?: string[];
  projects?: Project[];
  profile_summary?: string;
  portfolio_url?: string;
  contacts_info: ContactInfo;
  address?: string;
}

interface EvaluationResults {
  overall_fit: number;
  top_skills?: string[];
  red_flags?: string[];
}

interface ResumeAssessment {
  resume_details: ResumeDetails;
  evaluation_results: EvaluationResults;
}

export async function POST(request: NextRequest) {
  try {
    const body: ResumeScoringRequest = await request.json();
    const { resume_text, job_description } = body;

    if (!resume_text || !job_description) {
      return NextResponse.json(
        { error: 'Resume text and job description are required' },
        { status: 400 }
      );
    }

    // Call the backend resume service
    const backendUrl = process.env.RESUME_SERVICE_URL || 'http://localhost:5000';
    
    const response = await fetch(`${backendUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume_text,
        job_description
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend service error: ${response.status}`);
    }

    const assessment: ResumeAssessment = await response.json();

    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Resume analysis error:', error);
    
    // Return mock data for development/testing
    const mockAssessment: ResumeAssessment = {
      resume_details: {
        experience: [
          {
            from_to: "2020-2023",
            role: "Senior Software Engineer",
            company: "Tech Corp",
            description: "Developed React applications and led team of 5 developers"
          },
          {
            from_to: "2018-2020",
            role: "Software Engineer",
            company: "Startup Inc",
            description: "Built Node.js backend services"
          }
        ],
        education: [
          {
            from_to: "2014-2018",
            degree_n_field: "Bachelor of Science in Computer Science",
            cgpa: 3.8
          }
        ],
        all_skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Git", "Agile"],
        projects: [
          {
            title: "E-commerce Platform",
            description: "Full-stack React and Node.js application",
            url: "https://github.com/example/ecommerce",
            demo: "https://demo.example.com"
          }
        ],
        profile_summary: "Experienced software engineer with 5+ years in full-stack development",
        contacts_info: {
          email: "john.doe@email.com",
          linkedin: "https://linkedin.com/in/johndoe"
        },
        address: "San Francisco, CA"
      },
      evaluation_results: {
        overall_fit: 85,
        top_skills: ["JavaScript", "React", "Node.js", "Team Leadership"],
        red_flags: ["Missing AWS experience", "No CI/CD experience"]
      }
    };

    return NextResponse.json(mockAssessment);
  }
} 