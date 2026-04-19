import axiosInstance from "../axiosModels/axiosInstance";
import { BILLING_SERVER_URL } from "../endpoints";

export interface Plan {
  _id: string;
  name: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
}

export interface UserAccess {
  status: "active" | "expired" | "none";
  planId?: string;
  validUntil?: string;
}

export interface PaymentHistory {
  _id: string;
  userId: string;
  planId: Plan;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed";
  createdAt: string;
}

export const getPlans = async (): Promise<{ success: boolean; data?: Plan[]; message?: string }> => {
  try {
    const response = await axiosInstance.get(`${BILLING_SERVER_URL}/billing/plans`);
    return { success: true, data: response.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch plans",
    };
  }
};

export const initiateCheckout = async (
  planId: string
): Promise<{ success: boolean; checkoutUrl?: string; message?: string }> => {
  try {
    const response = await axiosInstance.post(
      `${BILLING_SERVER_URL}/billing/checkout`,
      { planId }
    );
    return { success: true, checkoutUrl: response.data.checkoutUrl };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to initiate checkout",
    };
  }
};

export const getUserAccess = async (
  userId: string
): Promise<{ success: boolean; data?: UserAccess; message?: string }> => {
  try {
    const response = await axiosInstance.get(
      `${BILLING_SERVER_URL}/billing/access/${userId}`
    );
    return { success: true, data: response.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch access status",
    };
  }
};

export const getPaymentHistory = async (): Promise<{
  success: boolean;
  data?: PaymentHistory[];
  message?: string;
}> => {
  try {
    const response = await axiosInstance.get(
      `${BILLING_SERVER_URL}/billing/payments/history`
    );
    return { success: true, data: response.data };
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch payment history",
    };
  }
};
