export const colors = {
    // Cor primária oficial VIDA
    primary: '#0052e2',
    primaryLight: '#3d7ff5',
    primaryDark: '#003ba8',

    // Feedback colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Cores dos períodos do dia (rotina)
    periods: {
        morning: '#fbbf24',    // Amarelo/laranja manhã
        afternoon: '#f59e0b',  // Laranja tarde
        evening: '#3b82f6',    // Azul entardecer
        night: '#6366f1',      // Roxo/azul noite
    },

    // Tema Light
    light: {
        background: '#ffffff',
        surface: '#f8f9fa',
        card: '#ffffff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        shadow: '#00000010',
    },

    // Tema Dark
    dark: {
        background: '#0f172a',
        surface: '#1e293b',
        card: '#1e293b',
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        border: '#334155',
        shadow: '#00000040',
    },
};

export type ColorTheme = typeof colors.light;