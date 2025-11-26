import { useState } from 'react';
import { useAuthStore, useUserStore } from '@/store';
import { authApi } from '@/services/api';

export function useAuth() {
    const { isAuthenticated, login, logout, completeOnboarding } = useAuthStore();
    const { setUser, clearUser } = useUserStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authApi.login({ email, password });

            // Salvar tokens
            login(response.accessToken, response.refreshToken);

            // Salvar dados do usuário
            setUser({
                ...response.user,
                dailyXP: 0,
                totalXP: 0,
                streak: 0,
            });

            return response;
        } catch (err: any) {
            const message = err.response?.data?.message || 'Erro ao fazer login';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authApi.register({ name, email, password });

            login(response.accessToken, response.refreshToken);
            setUser({
                ...response.user,
                dailyXP: 0,
                totalXP: 0,
                streak: 0,
            });

            return response;
        } catch (err: any) {
            const message = err.response?.data?.message || 'Erro ao criar conta';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);

        try {
            await authApi.logout();
        } catch (err) {
            console.error('Erro ao fazer logout:', err);
        } finally {
            logout();
            clearUser();
            setLoading(false);
        }
    };

    return {
        isAuthenticated,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        completeOnboarding,
    };
}