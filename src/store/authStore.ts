import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    isAuthenticated: boolean;
    hasCompletedOnboarding: boolean;
    accessToken: string | null;
    refreshToken: string | null;

    // Actions
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    completeOnboarding: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: true,
            hasCompletedOnboarding: false,
            accessToken: null,
            refreshToken: null,

            login: (accessToken, refreshToken) =>
                set({
                    isAuthenticated: true,
                    accessToken,
                    refreshToken,
                }),

            logout: () =>
                set({
                    isAuthenticated: false,
                    accessToken: null,
                    refreshToken: null,
                }),

            completeOnboarding: () =>
                set({ hasCompletedOnboarding: true }),

            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken }),
        }),
        {
            name: 'vida-auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);