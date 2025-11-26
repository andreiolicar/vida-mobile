import { useState } from 'react';
import { aiApi } from '@/services/api';

export function useAI() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateRoutine = async (preferences: any) => {
        setLoading(true);
        setError(null);

        try {
            const routine = await aiApi.generateRoutine(preferences);
            return routine;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getDailyInsight = async () => {
        setLoading(true);
        setError(null);

        try {
            const insight = await aiApi.getDailyInsight();
            return insight;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const prioritizeTasks = async (tasks: any[]) => {
        setLoading(true);
        setError(null);

        try {
            const prioritized = await aiApi.prioritizeTasks(tasks);
            return prioritized;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        generateRoutine,
        getDailyInsight,
        prioritizeTasks,
    };
}