import axiosInstance from "../axiosModels/axiosInstance";
import { AUTH_SERVER_URL } from "../endpoints";

interface AxiosError {
  response?: {
    data?: {
      message?: string;
      [key: string]: unknown;
    };
    status?: number;
  };
}

export interface CandidateProfile {
  _id?: string;
  userId?: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  headline?: string;
  profileDescription?: string;
  profileStatus?: 'incomplete' | 'complete';
  skills?: string[];
  education?: Array<{
    _id?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    institute?: string;
    degree?: string;
    field?: string;
    score?: string;
  }>;
  experiences?: Array<{
    _id?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    orgID?: string;
    orgName?: string;
    title?: string;
    mode?: string;
    details?: string;
  }>;
  resumeUrl?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

// Create candidate profile
export async function createCandidateProfile(profileData: {
  userId: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  headline?: string;
  profileDescription?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.post(`${AUTH_SERVER_URL}/candidates`, profileData);
    return data;
  } catch (error: unknown) {
    console.error("Error creating candidate profile:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Fetch candidate profile
export async function getCandidateProfile(): Promise<CandidateProfile | null> {
  try {
    const { data } = await axiosInstance.get(`${AUTH_SERVER_URL}/candidates/me`);
    return data;
  } catch (error: unknown) {
    console.error("Error fetching candidate profile:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Update phone number
export async function updatePhoneNumber(phoneNumber: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.put(`${AUTH_SERVER_URL}/candidates/phone-number`, { phoneNumber });
    return data;
  } catch (error: unknown) {
    console.error("Error updating phone number:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Update location
export async function updateLocation(location: { country: string; city: string }): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.put(`${AUTH_SERVER_URL}/candidates/location`, location);
    return data;
  } catch (error: unknown) {
    console.error("Error updating location:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Update headline
export async function updateHeadline(headline: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.put(`${AUTH_SERVER_URL}/candidates/headline`, { headline });
    return data;
  } catch (error: unknown) {
    console.error("Error updating headline:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Update description
export async function updateDescription(description: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.put(`${AUTH_SERVER_URL}/candidates/description`, { description });
    return data;
  } catch (error: unknown) {
    console.error("Error updating description:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Add education
export async function addEducation(education: {
  startDate?: Date | string;
  endDate?: Date | string;
  institute?: string;
  degree?: string;
  field?: string;
  score?: string;
}): Promise<CandidateProfile> {
  try {
    // Convert Date objects to ISO strings for JSON serialization
    const educationPayload = {
      ...education,
      startDate: education.startDate
        ? (education.startDate instanceof Date
            ? education.startDate.toISOString()
            : education.startDate)
        : undefined,
      endDate: education.endDate
        ? (education.endDate instanceof Date
            ? education.endDate.toISOString()
            : education.endDate)
        : undefined,
    };

    const { data } = await axiosInstance.post(`${AUTH_SERVER_URL}/candidates/education`, educationPayload);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding education:", error.message);
      console.error("Error details:", error);
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as AxiosError;
      console.error("Error adding education - Status:", axiosError.response?.status);
      console.error("Error adding education - Data:", axiosError.response?.data);
      throw new Error(axiosError.response?.data?.message || 'Failed to add education');
    } else {
      console.error("Error adding education:", error);
    }
    throw error;
  }
}

// Remove education
export async function removeEducation(educationId: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.delete(`${AUTH_SERVER_URL}/candidates/education/${educationId}`);
    return data;
  } catch (error: unknown) {
    console.error("Error removing education:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Add experience
export async function addExperience(experience: {
  startDate?: Date | string;
  endDate?: Date | string;
  orgID?: string;
  orgName?: string;
  title?: string;
  mode?: string;
  details?: string;
}): Promise<CandidateProfile> {
  try {
    // Convert Date objects to ISO strings for JSON serialization
    const experiencePayload = {
      ...experience,
      startDate: experience.startDate
        ? (experience.startDate instanceof Date
            ? experience.startDate.toISOString()
            : experience.startDate)
        : undefined,
      endDate: experience.endDate
        ? (experience.endDate instanceof Date
            ? experience.endDate.toISOString()
            : experience.endDate)
        : undefined,
    };

    const { data } = await axiosInstance.post(`${AUTH_SERVER_URL}/candidates/experience`, experiencePayload);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding experience:", error.message);
      console.error("Error details:", error);
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as AxiosError;
      console.error("Error adding experience - Status:", axiosError.response?.status);
      console.error("Error adding experience - Data:", axiosError.response?.data);
      throw new Error(axiosError.response?.data?.message || 'Failed to add experience');
    } else {
      console.error("Error adding experience:", error);
    }
    throw error;
  }
}

// Remove experience
export async function removeExperience(experienceId: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.delete(`${AUTH_SERVER_URL}/candidates/experience/${experienceId}`);
    return data;
  } catch (error: unknown) {
    console.error("Error removing experience:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Add skill
export async function addSkill(skill: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.post(`${AUTH_SERVER_URL}/candidates/skills`, { skill });
    return data;
  } catch (error: unknown) {
    console.error("Error adding skill:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Remove skill
export async function removeSkill(skill: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.delete(`${AUTH_SERVER_URL}/candidates/skills/${encodeURIComponent(skill)}`);
    return data;
  } catch (error: unknown) {
    console.error("Error removing skill:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Add social link
export async function addSocialLink(socialLink: { platform: string; url: string }): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.post(`${AUTH_SERVER_URL}/candidates/social-links`, socialLink);
    return data;
  } catch (error: unknown) {
    console.error("Error adding social link:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Update social link
export async function updateSocialLink(socialLink: { platform: string; url: string }): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.put(`${AUTH_SERVER_URL}/candidates/social-links`, socialLink);
    return data;
  } catch (error: unknown) {
    console.error("Error updating social link:", error instanceof Error ? error.message : error);
    throw error;
  }
}

// Remove social link
export async function removeSocialLink(platform: string): Promise<CandidateProfile> {
  try {
    const { data } = await axiosInstance.delete(`${AUTH_SERVER_URL}/candidates/social-links/${platform}`);
    return data;
  } catch (error: unknown) {
    console.error("Error removing social link:", error instanceof Error ? error.message : error);
    throw error;
  }
}

