import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
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

export const useUserStore = create<UserState>((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    updateUser: (updates) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
        })),

    clearUser: () => set({ user: null }),

    addXP: (amount) =>
        set((state) => ({
            user: state.user
                ? {
                    ...state.user,
                    dailyXP: state.user.dailyXP + amount,
                    totalXP: state.user.totalXP + amount,
                }
                : null,
        })),

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
}));