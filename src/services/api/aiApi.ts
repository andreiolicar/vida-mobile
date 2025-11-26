import { apiClient } from './client';

export const aiApi = {
    generateRoutine: async (preferences: any) => {
        const { data } = await apiClient.post('/ai/generate-routine', preferences);
        return data;
    },

    getDailyInsight: async () => {
        const { data } = await apiClient.get('/ai/daily-insight');
        return data;
    },

    prioritizeTasks: async (tasks: any[]) => {
        const { data } = await apiClient.post('/ai/prioritize-tasks', { tasks });
        return data;
    },

    optimizeTask: async (taskId: string, action: 'simplify' | 'split' | 'rewrite') => {
        const { data } = await apiClient.post(`/ai/optimize-task/${taskId}`, { action });
        return data;
    },
};