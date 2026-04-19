import axiosInstance from "../axiosModels/axiosInstance";
import { AUTH_SERVER_URL } from "../endpoints";

export interface Organization {
  _id: string;
  name: string;
  domain?: string;
  logoURL?: string;
  description?: string;
  location?: string;
  industry?: string;
  links?: Map<string, string>;
  sizeRange?: { min: number; max?: number };
}

export interface OrganizationName {
  _id: string;
  name: string;
}

// Fetch organization by ID (may require auth)
export async function getOrganizationById(orgId: string): Promise<Organization | null> {
  try {
    const { data } = await axiosInstance.get(`${AUTH_SERVER_URL}/organizations/details/${orgId}`);
    return data;
  } catch (error: unknown) {
    console.error(`Error fetching organization ${orgId}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

// Fetch all organization names (public endpoint)
export async function getAllOrganizationsNames(): Promise<OrganizationName[]> {
  try {
    const { data } = await axiosInstance.get(`${AUTH_SERVER_URL}/organizations/organizations-names`);
    return data || [];
  } catch (error: unknown) {
    console.error('Error fetching all organizations:', error instanceof Error ? error.message : error);
    return [];
  }
}

// Find organization by name (case-insensitive, handles URL-encoded names)
export async function getOrganizationByName(orgName: string): Promise<Organization | null> {
  try {
    // Decode URL-encoded name and normalize
    const decodedName = decodeURIComponent(orgName).replace(/-/g, ' ').trim();
    
    // Get all organizations
    const allOrgs = await getAllOrganizationsNames();
    
    // Find matching organization (case-insensitive)
    const matchingOrg = allOrgs.find(
      org => org.name.toLowerCase() === decodedName.toLowerCase()
    );
    
    if (!matchingOrg) {
      return null;
    }
    
    // Try to get full organization details (may fail if auth required)
    const orgDetails = await getOrganizationById(matchingOrg._id);
    
    // If details fetch failed, return basic org info
    if (!orgDetails) {
      return {
        _id: matchingOrg._id,
        name: matchingOrg.name,
      } as Organization;
    }
    
    return orgDetails;
  } catch (error: unknown) {
    console.error(`Error fetching organization by name ${orgName}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

// Fetch multiple organizations by IDs
export async function getOrganizationsByIds(orgIds: string[]): Promise<Map<string, string>> {
  const orgMap = new Map<string, string>();
  
  // Fetch organizations in parallel
  const promises = orgIds.map(async (orgId) => {
    const org = await getOrganizationById(orgId);
    if (org) {
      orgMap.set(orgId, org.name);
    }
  });
  
  await Promise.all(promises);
  return orgMap;
}

