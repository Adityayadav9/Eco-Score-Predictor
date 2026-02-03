import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const calculateEcoScore = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/eco-score`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error occurred' };
  }
};
