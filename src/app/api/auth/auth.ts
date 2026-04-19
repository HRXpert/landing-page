import axiosInstance from '../axiosModels/axiosInstance';
import { AUTH_SERVER_URL } from '../endpoints';

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

interface SignUpData {
  email: string;
  password: string;
  fullname: string;
  username: string;
  companyName?: string;
  domainUrl?: string;
  linkedin?: string;
  size_min?: number;
  size_max?: number;
  role: string;
}

export const fetchMe = async () => {
  try {
    const response = await axiosInstance.get(`${AUTH_SERVER_URL}/auth/me`);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    console.error('Fetch Me error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user data',
    };
  }
};
export const signInUser = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };

  try {
    const response = await axiosInstance.post(
      `${AUTH_SERVER_URL}/auth/login`,
      JSON.stringify(body),
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }
    );

    console.log('Login response:', response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    console.error('Login error:', error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
};

export const signUpUser = async (data: SignUpData) => {
  const body = {
    email: data.email,
    password: data.password,
    fullname: data.fullname,
    username: data.username,
    companyName: data.companyName,
    domainUrl: data.domainUrl,
    linkedin: data.linkedin,
    size_min: data.size_min,
    size_max: data.size_max,
    role: data.role
  };
  try {
    let response;
    if (body.role === "admin-recruiter") {
      response = await axiosInstance.post(
        `${AUTH_SERVER_URL}/auth/signup-organization`,
        JSON.stringify(body),
      );
      
    }
    else {
      response = await axiosInstance.post(
        `${AUTH_SERVER_URL}/auth/signup-candidate`,
        JSON.stringify(body),
      );
    }
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    console.error('Sign Up error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Sign Up failed',
    };
  }
};

export const forgot_Password = async (email: string) => {
  const body = {
    email,
  };

  try {
    const response = await axiosInstance.post(
      `${AUTH_SERVER_URL}/auth/forgot-password`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Login response:', response.data);

    return {
      success: true,
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    return {
      success: false,
      message: error.response?.data?.message || 'Try again later',
    };
  }
};

export const reset_Password = async (token: string, new_password: string) => {
  const body = {
    token: token,
    newPassword: new_password,
  };

  try {
    const response = await axiosInstance.post(
      `${AUTH_SERVER_URL}/auth/reset-password`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      message: response.data.message || 'Password reset successful',
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    return {
      success: false,
      message: error.response?.data?.message || 'Invalid token. Try again.',
    };
  }
};


export const resendVerificationEmail = async () => {
  try {
    const response = await axiosInstance.post(`${AUTH_SERVER_URL}/auth/resend-verification`);

    return {
      success: true,
      message: response.data.message || 'Verification email sent successfully',
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    return {
      success: false,
      message:
        error.response?.data?.message || 'Failed to resend verification email',
    };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`${AUTH_SERVER_URL}/auth/logout`);
    return {
      success: true,
      message: response.data.message || 'Logged out successfully',
    };
  } catch (err) {
    const error = err as AxiosErrorResponse;
    console.error('Logout error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed',
    };
  }
};