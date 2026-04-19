import axiosInstance from "../axiosModels/axiosInstance";
import { AUTH_SERVER_URL } from "../endpoints";

export interface ContactMessage {
  _id: string;
  name?: string;
  email?: string;
  message?: string;
  read?: boolean;
  createdAt?: string;
  [key: string]: unknown;
}

export interface GetMessagesParams {
  read?: boolean;
  name?: string;
  email?: string;
  start?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getContactMessages(params: GetMessagesParams = {}): Promise<ContactMessage[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.read !== undefined) queryParams.append('read', params.read.toString());
    if (params.name) queryParams.append('name', params.name);
    if (params.email) queryParams.append('email', params.email);
    if (params.start !== undefined) queryParams.append('start', params.start.toString());
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const query = queryParams.toString();
    const url = `${AUTH_SERVER_URL}/contact-us/messages${query ? `?${query}` : ''}`;
    const { data } = await axiosInstance.get(url);
    return data.messages || data || [];
  } catch (error: unknown) {
    console.error("Error fetching contact messages:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function markMessageAsRead(id: string): Promise<ContactMessage> {
  try {
    const { data } = await axiosInstance.put(`${AUTH_SERVER_URL}/contact-us/mark-read/${id}`);
    return data.message || data;
  } catch (error: unknown) {
    console.error(`Error marking message ${id} as read:`, error instanceof Error ? error.message : error);
    throw error;
  }
}
