import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Registration failed');
    }
  },
  // Add other API methods
};
