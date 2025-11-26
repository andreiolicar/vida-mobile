import { apiClient } from './client';

export const userApi = {
    getProfile: async () => {
        const { data } = await apiClient.get('/user/profile');
        return data;
    },

    updateProfile: async (updates: any) => {
        const { data } = await apiClient.patch('/user/profile', updates);
        return data;
    },

    getStats: async () => {
        const { data } = await apiClient.get('/user/stats');
        return data;
    },
};