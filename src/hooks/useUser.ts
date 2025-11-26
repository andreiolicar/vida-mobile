import { useState, useEffect } from 'react';
import { useUserStore } from '@/store';
import { userApi } from '@/services/api';

export function useUser() {
    const { user, setUser, updateUser, addXP, incrementStreak } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const profile = await userApi.getProfile();
            setUser(profile);
            return profile;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (updates: any) => {
        setLoading(true);
        setError(null);

        try {
            const updated = await userApi.updateProfile(updates);
            updateUser(updated);
            return updated;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        fetchProfile,
        updateProfile,
        addXP,
        incrementStreak,
    };
}