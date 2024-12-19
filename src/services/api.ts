import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Define interfaces for type safety
interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface UserLoginData {
  email: string;
  password: string;
}

interface UserProfileData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export const apiService = {
  // User Registration
  register: async (userData: UserRegistrationData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Registration failed');
    }
  },

  // User Login
  login: async (credentials: UserLoginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Login failed');
    }
  },

  // Get User Profile
  getProfile: async (userId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Failed to fetch profile');
    }
  },

  // Update User Profile
  updateProfile: async (userId: string, profileData: UserProfileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/profile/${userId}`, profileData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Profile update failed');
    }
  },

  // Password Reset Request
  requestPasswordReset: async (email: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { email });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Password reset request failed');
    }
  },

  // Verify Password Reset Token
  verifyResetToken: async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/verify-reset-token/${token}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Invalid reset token');
    }
  }
};

// Global Axios Configuration
axios.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }
);
