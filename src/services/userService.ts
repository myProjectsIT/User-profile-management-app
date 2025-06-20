import api from './api';

export const getUserProfile = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfile = async (userId: number, data: any) => {
  try {
    const response = await api.put(`/users/${userId}`, { data });
    return response.data;
  } catch (error: any) {
    console.error('Error updating user profile:', error.response?.data || error.message);
    throw error;
  }
};