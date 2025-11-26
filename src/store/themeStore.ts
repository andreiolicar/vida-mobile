import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
    mode: ThemeMode;
    isDark: boolean;

    // Actions
    setTheme: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: 'light',
            isDark: false,

            setTheme: (mode) =>
                set({
                    mode,
                    isDark: mode === 'dark',
                }),

            toggleTheme: () => {
                const currentMode = get().mode;
                const newMode = currentMode === 'light' ? 'dark' : 'light';
                set({
                    mode: newMode,
                    isDark: newMode === 'dark',
                });
            },
        }),
        {
            name: 'vida-theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);