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
    setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // ⚠️ IMPORTANTE: Estado inicial NÃO autenticado
            isAuthenticated: false,
            hasCompletedOnboarding: false,
            accessToken: null,
            refreshToken: null,

            login: (accessToken, refreshToken) =>
                set({
                    isAuthenticated: true,
                    accessToken,
                    refreshToken,
                }),

            logout: () => {
                console.log('🚪 Iniciando logout...');

                // ✅ SOLUÇÃO: Limpar userStore dinamicamente
                import('./userStore').then(({ useUserStore }) => {
                    console.log('🧹 Limpando userStore...');
                    useUserStore.getState().clearUser();
                });

                // Limpar todo o estado de autenticação
                set({
                    isAuthenticated: false,
                    hasCompletedOnboarding: false, // Reset onboarding
                    accessToken: null,
                    refreshToken: null,
                });

                // Limpar AsyncStorage manualmente (garantia extra)
                AsyncStorage.multiRemove([
                    'vida-user-storage',
                    'vida-auth-storage',
                ])
                    .then(() => {
                        console.log('✅ AsyncStorage limpo com sucesso');
                    })
                    .catch((error) => {
                        console.error('❌ Erro ao limpar AsyncStorage:', error);
                    });

                console.log('✅ Logout concluído');
            },

            completeOnboarding: () =>
                set({ hasCompletedOnboarding: true }),

            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken }),

            // Setter manual para testes
            setAuthenticated: (value) =>
                set({ isAuthenticated: value }),
        }),
        {
            name: 'vida-auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);