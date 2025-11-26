import { useThemeStore } from '@/store';
import { lightTheme, darkTheme } from '@/styles/theme';

export function useTheme() {
    const { mode, isDark, setTheme, toggleTheme } = useThemeStore();

    const theme = isDark ? darkTheme : lightTheme;

    return {
        theme,
        colors: theme.colors,
        isDark,
        mode,
        setTheme,
        toggleTheme,
    };
}