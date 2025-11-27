import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    level: number;
    currentXP: number;
    nextLevelXP: number;
    dailyXP: number;
    totalXP: number;
    streak: number;
}

interface UserState {
    user: User | null;

    // Actions
    setUser: (user: User) => void;
    updateUser: (updates: Partial<User>) => void;
    clearUser: () => void;
    addXP: (amount: number) => void;
    incrementStreak: () => void;
    resetStreak: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => set({ user }),

            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),

            clearUser: () => set({ user: null }),

            addXP: (amount) =>
                set((state) => {
                    if (!state.user) return { user: null };

                    const newDailyXP = state.user.dailyXP + amount;
                    const newTotalXP = state.user.totalXP + amount;
                    const newCurrentXP = state.user.currentXP + amount;

                    // Verificar se subiu de nível
                    let level = state.user.level;
                    let currentXP = newCurrentXP;
                    let nextLevelXP = state.user.nextLevelXP;

                    while (currentXP >= nextLevelXP) {
                        level += 1;
                        currentXP -= nextLevelXP;
                        nextLevelXP = Math.floor(nextLevelXP * 1.5); // Aumenta 50% a cada nível
                    }

                    return {
                        user: {
                            ...state.user,
                            dailyXP: newDailyXP,
                            totalXP: newTotalXP,
                            currentXP,
                            level,
                            nextLevelXP,
                        },
                    };
                }),

            incrementStreak: () =>
                set((state) => ({
                    user: state.user
                        ? { ...state.user, streak: state.user.streak + 1 }
                        : null,
                })),

            resetStreak: () =>
                set((state) => ({
                    user: state.user ? { ...state.user, streak: 0 } : null,
                })),
        }),
        {
            name: 'vida-user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);